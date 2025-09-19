const AWS = require('aws-sdk');
const https = require('https');

exports.handler = async (event) => {
    try {
        const healthChecks = await Promise.all([
            checkApplicationHealth(),
            checkDatabaseHealth(),
            checkAPIHealth(),
            checkExternalServices()
        ]);
        
        const overallHealth = determineOverallHealth(healthChecks);
        
        if (overallHealth.status !== 'healthy') {
            await sendHealthAlert(overallHealth);
        }
        
        // Store metrics in CloudWatch
        await publishMetrics(healthChecks);
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                status: overallHealth.status,
                checks: healthChecks,
                timestamp: new Date().toISOString()
            })
        };
        
    } catch (error) {
        console.error('Health check failed:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Health check failed' })
        };
    }
};

async function checkApplicationHealth() {
    try {
        const response = await makeHttpRequest(process.env.APP_URL + '/api/health');
        return {
            service: 'application',
            status: response.statusCode === 200 ? 'healthy' : 'unhealthy',
            responseTime: response.responseTime,
            details: response.body
        };
    } catch (error) {
        return {
            service: 'application',
            status: 'unhealthy',
            error: error.message
        };
    }
}

async function checkDatabaseHealth() {
    try {
        // Check Supabase connection
        const response = await makeHttpRequest(process.env.SUPABASE_URL + '/rest/v1/', {
            headers: {
                'apikey': process.env.SUPABASE_ANON_KEY
            }
        });
        
        return {
            service: 'database',
            status: response.statusCode === 200 ? 'healthy' : 'unhealthy',
            responseTime: response.responseTime
        };
    } catch (error) {
        return {
            service: 'database',
            status: 'unhealthy',
            error: error.message
        };
    }
}

async function checkAPIHealth() {
    try {
        const response = await makeHttpRequest(process.env.APP_URL + '/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'health check' })
        });
        
        return {
            service: 'ai-api',
            status: response.statusCode < 500 ? 'healthy' : 'unhealthy',
            responseTime: response.responseTime
        };
    } catch (error) {
        return {
            service: 'ai-api',
            status: 'unhealthy',
            error: error.message
        };
    }
}

async function checkExternalServices() {
    const services = [
        { name: 'google-ai', url: 'https://generativelanguage.googleapis.com' },
        { name: 'supabase', url: process.env.SUPABASE_URL }
    ];
    
    const results = await Promise.all(
        services.map(async (service) => {
            try {
                const response = await makeHttpRequest(service.url);
                return {
                    service: service.name,
                    status: response.statusCode < 500 ? 'healthy' : 'unhealthy',
                    responseTime: response.responseTime
                };
            } catch (error) {
                return {
                    service: service.name,
                    status: 'unhealthy',
                    error: error.message
                };
            }
        })
    );
    
    return results;
}

function determineOverallHealth(checks) {
    const flatChecks = checks.flat();
    const unhealthyServices = flatChecks.filter(check => check.status === 'unhealthy');
    
    if (unhealthyServices.length === 0) {
        return { status: 'healthy', message: 'All services operational' };
    } else if (unhealthyServices.length <= 2) {
        return { status: 'degraded', message: 'Some services experiencing issues', issues: unhealthyServices };
    } else {
        return { status: 'unhealthy', message: 'Multiple services down', issues: unhealthyServices };
    }
}

async function sendHealthAlert(healthStatus) {
    const sns = new AWS.SNS();
    
    await sns.publish({
        TopicArn: process.env.HEALTH_ALERTS_TOPIC,
        Message: JSON.stringify(healthStatus),
        Subject: `System Health Alert: ${healthStatus.status.toUpperCase()}`
    }).promise();
}

async function publishMetrics(checks) {
    const cloudwatch = new AWS.CloudWatch();
    
    const metrics = checks.flat().map(check => ({
        MetricName: 'ServiceHealth',
        Dimensions: [
            { Name: 'Service', Value: check.service }
        ],
        Value: check.status === 'healthy' ? 1 : 0,
        Unit: 'Count',
        Timestamp: new Date()
    }));
    
    await cloudwatch.putMetricData({
        Namespace: 'OpsGenieAI/Health',
        MetricData: metrics
    }).promise();
}

function makeHttpRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        
        const req = https.request(url, options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    body: body,
                    responseTime: Date.now() - startTime
                });
            });
        });
        
        req.on('error', reject);
        req.setTimeout(10000, () => reject(new Error('Request timeout')));
        
        if (options.body) {
            req.write(options.body);
        }
        
        req.end();
    });
}