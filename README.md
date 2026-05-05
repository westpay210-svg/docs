# Westrapay API Documentation

A React-based documentation site for the Westrapay payment API — covering Gateway Integration, Server-to-Server payments, Webhooks, and more.

## Features

- **Gateway Integration**: Initialize and verify payments via a hosted checkout
- **Server to Server**: Charge cards directly (3DS, 2DS, OTP), authorize transactions, verify status, and issue refunds
- **Webhooks**: Real-time event notifications for payment lifecycle events
- **Authentication**: Public and private key authentication guide
- **Interactive API Reference**: Expandable endpoint cards with request/response examples and code samples
- **Responsive Design**: Works on desktop and mobile

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Syntax Highlighting**: react-syntax-highlighter
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd westra-docs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Environments

| Environment | Base URL |
|-------------|----------|
| Sandbox | `https://sandbox-api.westrapay.com` |
| Production | `https://api.westrapay.com` |

Set `REACT_APP_ENV=production` in your `.env` file to switch to the production environment.

## Available Scripts

- `npm start` — Runs the app in development mode
- `npm run build` — Builds the app for production
- `npm test` — Launches the test runner

## Project Structure

```
src/
├── components/
│   ├── api/             # ApiEndpoint — expandable endpoint cards
│   ├── auth/            # Login form
│   ├── code/            # CodeBlock and CodeTabs
│   ├── dashboard/       # Dashboard layout and widgets
│   ├── docs/            # Reusable doc components (PageHeader, Callout, StepList, PropertyTable)
│   ├── layout/          # DocLayout and DashboardLayout
│   └── sidebar/         # Navigation sidebar
├── data/                # API endpoint data (parameters, examples, responses)
├── pages/               # One file per documentation page
├── services/            # API service layer
├── types/               # TypeScript type definitions
├── App.tsx
└── index.tsx
```

## Documentation Pages

- **Overview** — API home with quick start, base URLs, and example request
- **Getting Started** — Step-by-step integration guide
- **Authentication** — Public and private key usage
- **Gateway Integration** — Initialize and verify transactions
- **Payment Channel** — Supported payment methods
- **End-to-End Test** — Test cards, bank accounts, and wallet numbers
- **Server to Server** — Charge Card (3DS / 2DS / OTP), Authorize, Verify, Refund, Status Codes, Transaction History
- **Webhook** — Event types, payload schema, and best practices

## Support

For support and questions about the Westrapay API, visit [westrapay.com](https://westrapay.com) or contact the Westrapay support team.
