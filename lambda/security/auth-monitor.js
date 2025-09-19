const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {
    try {
        // Monitor authentication events from Supabase
        const authEvent = JSON.parse(event.body);
        
        // Check for suspicious activities
        const suspiciousPatterns = [
            'multiple_failed_logins',
            'login_from_new_location',
            'unusual_time_login',
            'brute_force_attempt'
        ];
        
        if (suspiciousPatterns.includes(authEvent.type)) {
            await sendSecurityAlert({
                type: authEvent.type,
                userId: authEvent.user_id,
                timestamp: authEvent.timestamp,
                metadata: authEvent.metadata
            });
        }
        
        // Log to CloudWatch
        console.log('Auth event processed:', {
            type: authEvent.type,
            userId: authEvent.user_id,
            timestamp: new Date().toISOString()
        });
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Auth event processed successfully' })
        };
        
    } catch (error) {
        console.error('Error processing auth event:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};

async function sendSecurityAlert(alertData) {
    const message = {
        alert: 'Security Event Detected',
        type: alertData.type,
        userId: alertData.userId,
        timestamp: alertData.timestamp,
        severity: getSeverityLevel(alertData.type)
    };
    
    await sns.publish({
        TopicArn: process.env.SECURITY_ALERTS_TOPIC,
        Message: JSON.stringify(message),
        Subject: `Security Alert: ${alertData.type}`
    }).promise();
}

function getSeverityLevel(eventType) {
    const severityMap = {
        'brute_force_attempt': 'HIGH',
        'multiple_failed_logins': 'MEDIUM',
        'login_from_new_location': 'LOW',
        'unusual_time_login': 'LOW'
    };
    return severityMap[eventType] || 'MEDIUM';
}