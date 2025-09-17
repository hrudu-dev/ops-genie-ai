# Security Policy

## Supported Versions

We actively support the following versions of OpsGenie AI with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of OpsGenie AI seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Create a private security advisory on GitHub or email: **hrudu.shibu@gmail.com**
3. Include the following information:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact assessment
   - Any suggested fixes (if available)

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Initial Assessment**: We will provide an initial assessment within 5 business days
- **Regular Updates**: We will keep you informed of our progress throughout the investigation
- **Resolution Timeline**: We aim to resolve critical vulnerabilities within 30 days

### Security Best Practices

When using OpsGenie AI, please follow these security best practices:

#### Environment Variables & API Keys
- Never commit `.env.local` or files containing sensitive credentials to version control
- Use strong, unique API keys for Google AI and Supabase
- Regularly rotate API keys and access tokens
- Use environment-specific configurations for development, staging, and production

#### Database Security (Supabase)
- Enable Row Level Security (RLS) policies (included in our schema)
- Use the principle of least privilege for database access
- Regularly audit user permissions and access logs
- Keep your Supabase project and dependencies up to date

#### AI API Security
- Protect your Google AI API keys
- Implement rate limiting on chat endpoints
- Validate and sanitize all user inputs to AI models
- Monitor AI API usage and costs

#### Infrastructure (AWS Amplify)
- Use environment variables for all sensitive configuration
- Enable HTTPS for all communications
- Regularly update dependencies
- Monitor application logs for security events

### Security Features

OpsGenie AI includes the following security features:

- **AI-Powered Password Strength Analysis**: Real-time password strength validation using Genkit
- **Secure Database**: Supabase with Row Level Security policies
- **Input Validation**: All user inputs are validated and sanitized
- **Secure API Endpoints**: Protected chat and database operations
- **Environment Isolation**: Proper separation of development and production environments

### Contact Information

For security-related inquiries:
- **Email**: hrudu.shibu@gmail.com
- **GitHub**: [@hrudu-dev](https://github.com/hrudu-dev)

For general support:
- **GitHub Issues**: For non-security related bugs and feature requests
- **Documentation**: Check our README.md first

---

**Maintainers**: Hrudu Shibu & Ashwini N  
**Last Updated**: January 2025

Thank you for helping keep OpsGenie AI and our users safe!