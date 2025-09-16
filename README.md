# OpsGenie AI

OpsGenie AI is a modern, AI-powered console designed for Managed Service Providers (MSPs) and IT teams. It provides a suite of tools to streamline operations, monitor systems, and manage user interactions, all enhanced with generative AI capabilities.

## Features

- **Authentication**: Secure login, signup, and password reset functionality
- **AI-Powered Password Strength**: Real-time feedback on password strength during signup, powered by Genkit and Google's Gemini models
- **AI Troubleshooting Chatbot**: An integrated AI assistant to help users diagnose and solve IT issues
- **Ticket Triage**: A central hub for managing and prioritizing support tickets
- **Anomaly Detection**: Configure and monitor system metrics to proactively identify unusual patterns
- **SLA Monitoring**: Track and ensure compliance with Service Level Agreements
- **Growth Dashboard**: Visualize key metrics like ticket resolution, user growth, and resolution rates with interactive charts
- **User Management**: Easily manage users, roles, and permissions within your organization
- **Extensions**: Integrate third-party tools and services to extend the console's functionality
- **Profile & Settings**: Manage user profiles and customize application settings
- **Theming**: Includes a dark and light mode toggle for user preference

## Tech Stack

- **Frontend**: React 18, Next.js 14, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd opsgenie-ai
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
opsgenie-ai/
├── app/                          # Next.js 13+ app directory
│   ├── console/                  # Main console application
│   │   ├── ai-assistant/         # AI troubleshooting chatbot
│   │   ├── tickets/              # Ticket management system
│   │   ├── growth/               # Analytics dashboard
│   │   └── layout.tsx            # Console layout with sidebar
│   ├── login/                    # Authentication pages
│   ├── signup/
│   ├── forgot-password/
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/
│   ├── ui/                       # Reusable UI components
│   └── theme-provider.tsx        # Theme context provider
├── lib/
│   └── utils.ts                  # Utility functions
└── public/                       # Static assets
```

## Key Pages

### Authentication
- **Login** (`/login`): Secure user authentication
- **Signup** (`/signup`): User registration with AI-powered password strength analysis
- **Forgot Password** (`/forgot-password`): Password reset functionality

### Console Dashboard
- **Dashboard** (`/console`): Overview of system metrics and recent activity
- **AI Assistant** (`/console/ai-assistant`): Interactive AI troubleshooting chatbot
- **Ticket Triage** (`/console/tickets`): Support ticket management and prioritization
- **Growth Dashboard** (`/console/growth`): Analytics and performance metrics

## Features in Detail

### AI-Powered Password Strength
The signup process includes real-time password strength analysis that provides:
- Strength scoring (1-5 scale)
- Visual feedback with color-coded progress bars
- Specific suggestions for improvement
- Real-time validation as users type

### AI Troubleshooting Assistant
An intelligent chatbot that helps with:
- Network connectivity issues
- Security best practices
- Performance optimization
- Step-by-step troubleshooting guides
- Quick action buttons for common problems

### Ticket Management
Comprehensive ticket triage system featuring:
- Priority-based categorization (Critical, High, Medium, Low)
- Status tracking (Open, In Progress, Resolved)
- Advanced filtering and search
- Assignment management
- Real-time updates

### Growth Analytics
Data visualization and insights including:
- Monthly ticket volume trends
- Customer satisfaction tracking
- Team performance metrics
- Category-based ticket distribution
- AI-generated insights and recommendations

## Customization

### Theming
The application supports both light and dark themes using next-themes. Users can toggle between themes using the switch in the console header.

### Styling
Built with Tailwind CSS and shadcn/ui components for consistent, accessible design. Custom color schemes are defined in `globals.css` using CSS custom properties.

## Development

### Adding New Pages
1. Create a new directory under `app/console/`
2. Add a `page.tsx` file with your component
3. Update the navigation array in `app/console/layout.tsx`

### Creating UI Components
1. Add new components to `components/ui/`
2. Follow the existing patterns using Radix UI primitives
3. Use the `cn()` utility for conditional styling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository or contact the development team.