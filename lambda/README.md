# Lambda Functions for OpsGenie AI

This directory contains AWS Lambda functions for security monitoring, performance tracking, and system maintenance.

## Functions

### Security Functions

#### `auth-monitor.js`
- **Purpose**: Monitor authentication events and detect suspicious activities
- **Triggers**: Webhook from Supabase auth events
- **Alerts**: SNS notifications for security incidents
- **Features**:
  - Brute force detection
  - Unusual login patterns
  - Geographic anomalies
  - Failed login monitoring

#### `vulnerability-scanner.js`
- **Purpose**: Automated security vulnerability scanning
- **Schedule**: Daily at 2 AM UTC
- **Features**:
  - Dependency vulnerability checks
  - Configuration security analysis
  - API endpoint security testing
  - Automated ticket creation for critical issues

### Monitoring Functions

#### `health-check.js`
- **Purpose**: Comprehensive system health monitoring
- **Schedule**: Every 5 minutes
- **Checks**:
  - Application availability
  - Database connectivity
  - API response times
  - External service dependencies

#### `performance-monitor.js`
- **Purpose**: Performance metrics collection and anomaly detection
- **Schedule**: Every 5 minutes
- **Metrics**:
  - Response times
  - Error rates
  - Request volumes
  - Resource utilization

## Deployment

### Prerequisites
- AWS CLI configured
- SAM CLI installed
- Appropriate IAM permissions

### Deploy Infrastructure
```bash
# Deploy Lambda functions and infrastructure
sam build
sam deploy --guided

# Set parameters:
# - Environment: prod/staging/dev
# - AppUrl: Your application URL
# - SupabaseUrl: Your Supabase project URL
# - SupabaseAnonKey: Your Supabase anonymous key
```

### Environment Variables
Each function requires specific environment variables:

- `SECURITY_ALERTS_TOPIC`: SNS topic for security alerts
- `HEALTH_ALERTS_TOPIC`: SNS topic for health alerts
- `PERFORMANCE_ALERTS_TOPIC`: SNS topic for performance alerts
- `SCAN_RESULTS_TABLE`: DynamoDB table for scan results
- `METRICS_TABLE`: DynamoDB table for metrics storage

## Monitoring and Alerts

### SNS Topics
- **Security Alerts**: Critical security events and vulnerabilities
- **Health Alerts**: System availability and connectivity issues
- **Performance Alerts**: Performance degradation and anomalies

### CloudWatch Integration
- All functions log to CloudWatch
- Custom metrics published for monitoring
- Alarms configured for function failures

## Security Considerations

- Functions use least-privilege IAM roles
- Sensitive data encrypted in transit and at rest
- API endpoints secured with authentication
- Regular security scans and updates

## Maintenance

- Dependencies updated weekly via GitHub Actions
- Functions monitored for errors and performance
- Logs retained for 30 days
- Metrics stored with TTL for cost optimization