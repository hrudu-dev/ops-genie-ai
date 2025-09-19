const AWS = require('aws-sdk');

exports.handler = async (event) => {
    try {
        // Collect performance metrics
        const metrics = await collectPerformanceMetrics();
        
        // Analyze for anomalies
        const anomalies = await detectAnomalies(metrics);
        
        // Send alerts if needed
        if (anomalies.length > 0) {
            await sendPerformanceAlerts(anomalies);
        }
        
        // Store metrics
        await storeMetrics(metrics);
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Performance monitoring completed',
                metricsCollected: Object.keys(metrics).length,
                anomaliesDetected: anomalies.length
            })
        };
        
    } catch (error) {
        console.error('Performance monitoring failed:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Monitoring failed' })
        };
    }
};

async function collectPerformanceMetrics() {
    const cloudwatch = new AWS.CloudWatch();
    
    // Get metrics from CloudWatch
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - 5 * 60 * 1000); // Last 5 minutes
    
    const metricQueries = [
        {
            name: 'ResponseTime',
            namespace: 'AWS/ApplicationELB',
            metricName: 'TargetResponseTime'
        },
        {
            name: 'ErrorRate',
            namespace: 'AWS/ApplicationELB',
            metricName: 'HTTPCode_Target_5XX_Count'
        },
        {
            name: 'RequestCount',
            namespace: 'AWS/ApplicationELB',
            metricName: 'RequestCount'
        }
    ];
    
    const metrics = {};
    
    for (const query of metricQueries) {
        try {
            const result = await cloudwatch.getMetricStatistics({
                Namespace: query.namespace,
                MetricName: query.metricName,
                StartTime: startTime,
                EndTime: endTime,
                Period: 300,
                Statistics: ['Average', 'Maximum']
            }).promise();
            
            metrics[query.name] = result.Datapoints;
        } catch (error) {
            console.error(`Failed to get metric ${query.name}:`, error);
            metrics[query.name] = [];
        }
    }
    
    return metrics;
}

async function detectAnomalies(metrics) {
    const anomalies = [];
    
    // Check response time anomalies
    if (metrics.ResponseTime && metrics.ResponseTime.length > 0) {
        const avgResponseTime = metrics.ResponseTime.reduce((sum, dp) => sum + dp.Average, 0) / metrics.ResponseTime.length;
        
        if (avgResponseTime > 2000) { // 2 seconds threshold
            anomalies.push({
                type: 'high_response_time',
                severity: 'HIGH',
                value: avgResponseTime,
                threshold: 2000,
                message: `Average response time (${avgResponseTime}ms) exceeds threshold`
            });
        }
    }
    
    // Check error rate anomalies
    if (metrics.ErrorRate && metrics.ErrorRate.length > 0) {
        const totalErrors = metrics.ErrorRate.reduce((sum, dp) => sum + dp.Sum, 0);
        const totalRequests = metrics.RequestCount.reduce((sum, dp) => sum + dp.Sum, 0);
        const errorRate = totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0;
        
        if (errorRate > 5) { // 5% error rate threshold
            anomalies.push({
                type: 'high_error_rate',
                severity: 'CRITICAL',
                value: errorRate,
                threshold: 5,
                message: `Error rate (${errorRate.toFixed(2)}%) exceeds threshold`
            });
        }
    }
    
    return anomalies;
}

async function sendPerformanceAlerts(anomalies) {
    const sns = new AWS.SNS();
    
    for (const anomaly of anomalies) {
        await sns.publish({
            TopicArn: process.env.PERFORMANCE_ALERTS_TOPIC,
            Message: JSON.stringify(anomaly),
            Subject: `Performance Alert: ${anomaly.type}`
        }).promise();
    }
}

async function storeMetrics(metrics) {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    
    await dynamodb.put({
        TableName: process.env.METRICS_TABLE,
        Item: {
            timestamp: new Date().toISOString(),
            metrics: metrics,
            ttl: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days TTL
        }
    }).promise();
}