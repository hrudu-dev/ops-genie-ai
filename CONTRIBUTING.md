# Contributing to OpsGenie AI

Thank you for your interest in contributing to OpsGenie AI! We welcome contributions from the community and are excited to work with you.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@opsgenie-ai.com].

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Git**
- **TypeScript** knowledge
- **React/Next.js** experience

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/opsgenie-ai.git
   cd opsgenie-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## How to Contribute

### Types of Contributions

We welcome several types of contributions:

- **🐛 Bug Reports**: Help us identify and fix issues
- **✨ Feature Requests**: Suggest new features or improvements
- **📝 Documentation**: Improve our docs, README, or code comments
- **🔧 Code Contributions**: Fix bugs or implement new features
- **🎨 UI/UX Improvements**: Enhance the user interface and experience
- **🧪 Testing**: Add or improve tests
- **🌐 Translations**: Help translate the application

### Before You Start

1. **Check existing issues** to see if your bug/feature is already being discussed
2. **Create an issue** to discuss your proposed changes (for significant features)
3. **Get feedback** from maintainers before starting work on large changes

## Pull Request Process

### 1. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Write clean, readable code
- Follow our coding standards
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run the development server
npm run dev

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests (when available)
npm run test
```

### 4. Commit Your Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Examples of good commit messages:
git commit -m "feat: add AI-powered password strength analysis"
git commit -m "fix: resolve sidebar navigation issue on mobile"
git commit -m "docs: update installation instructions"
git commit -m "style: improve responsive design for tablets"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub with:

- **Clear title** describing the change
- **Detailed description** of what you changed and why
- **Screenshots** for UI changes
- **Testing instructions** for reviewers
- **Link to related issues**

## Coding Standards

### TypeScript/JavaScript

- Use **TypeScript** for all new code
- Follow **ESLint** configuration
- Use **Prettier** for code formatting
- Prefer **functional components** with hooks
- Use **async/await** over promises when possible

### React/Next.js

- Use **Next.js 14** app directory structure
- Implement **responsive design** (mobile-first)
- Use **shadcn/ui** components when possible
- Follow **React best practices**
- Use **proper TypeScript types**

### CSS/Styling

- Use **Tailwind CSS** for styling
- Follow **mobile-first** responsive design
- Use **semantic class names**
- Maintain **consistent spacing** and colors
- Support **dark/light themes**

### File Structure

```
opsgenie-ai/
├── app/                    # Next.js app directory
│   ├── console/           # Console application pages
│   ├── login/             # Authentication pages
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## Testing Guidelines

### Writing Tests

- Write **unit tests** for utility functions
- Write **integration tests** for components
- Write **end-to-end tests** for critical user flows
- Use **Jest** and **React Testing Library**
- Aim for **meaningful test coverage**

### Test Structure

```typescript
// Example test structure
describe('Component Name', () => {
  it('should render correctly', () => {
    // Test implementation
  })

  it('should handle user interactions', () => {
    // Test implementation
  })
})
```

## Documentation

### Code Documentation

- Add **JSDoc comments** for functions and components
- Use **clear variable and function names**
- Document **complex logic** with inline comments
- Keep **README.md** up to date

### API Documentation

- Document **all API endpoints**
- Include **request/response examples**
- Document **error responses**
- Use **OpenAPI/Swagger** when possible

## Community

### Getting Help

- **GitHub Discussions**: For questions and general discussion
- **GitHub Issues**: For bug reports and feature requests
- **Discord/Slack**: [Link to community chat if available]

### Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub contributors** page

## Development Workflow

### Issue Labels

We use the following labels to categorize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority issues
- `priority: low` - Low priority issues

### Release Process

1. **Development** happens on feature branches
2. **Pull requests** are reviewed and merged to `main`
3. **Releases** are tagged and published
4. **Changelog** is updated with each release

## Questions?

If you have questions about contributing, please:

1. Check existing **GitHub Discussions**
2. Create a new **Discussion** for general questions
3. Create an **Issue** for specific bugs or features
4. Reach out to maintainers directly if needed

---

Thank you for contributing to OpsGenie AI! 🚀