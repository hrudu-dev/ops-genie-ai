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
2. Send an email to: **security@opsgenie-ai.com** (replace with your actual security email)
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

#### Authentication & Authorization
- Use strong, unique passwords for all accounts
- Enable multi-factor authentication (MFA) when available
- Regularly review and rotate API keys and access tokens
- Implement proper role-based access control (RBAC)

#### Data Protection
- Use HTTPS/TLS for all communications
- Encrypt sensitive data at rest and in transit
- Regularly backup data and test recovery procedures
- Implement proper data retention and deletion policies

#### Infrastructure Security
- Keep all dependencies and packages up to date
- Use environment variables for sensitive configuration
- Implement proper network segmentation and firewalls
- Regular security audits and vulnerability assessments

#### Application Security
- Validate and sanitize all user inputs
- Implement proper error handling (avoid exposing sensitive information)
- Use secure coding practices and conduct code reviews
- Implement rate limiting and DDoS protection

### Security Features

OpsGenie AI includes the following security features:

- **AI-Powered Password Strength Analysis**: Real-time password strength validation
- **Secure Authentication Flow**: Protected login/signup processes
- **Theme-based Security**: Dark/light mode doesn't expose sensitive data
- **Input Validation**: All user inputs are validated and sanitized
- **Secure Headers**: Proper security headers implementation

### Responsible Disclosure

We believe in responsible disclosure and will work with security researchers to:

- Understand and reproduce the vulnerability
- Develop and test a fix
- Coordinate the release of the fix
- Publicly acknowledge your contribution (if desired)

### Bug Bounty Program

Currently, we do not have a formal bug bounty program, but we greatly appreciate security researchers who help us improve the security of OpsGenie AI. We will acknowledge your contributions and may provide recognition in our security hall of fame.

### Security Updates

Security updates will be:

- Released as soon as possible after a fix is developed
- Documented in our changelog with appropriate severity levels
- Communicated through our official channels
- Backward compatible when possible

### Contact Information

For security-related inquiries:
- **Email**: security@opsgenie-ai.com
- **PGP Key**: [Link to PGP key if available]

For general support:
- **GitHub Issues**: For non-security related bugs and feature requests
- **Documentation**: Check our README.md and documentation first

---

Thank you for helping keep OpsGenie AI and our users safe!