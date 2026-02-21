# Kiwi Finance API Dashboard

A modern React application for managing Kiwi Finance APIs - handle payouts, virtual accounts, and account management with ease.

## Features

- **Authentication**: Secure login with API key and Client ID
- **Virtual Accounts**: Create reserved and temporary virtual accounts for collections
- **Payouts**: Send money transfers to bank accounts across Nigeria
- **Account Management**: View balances and manage financial information
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live balance updates and transaction status tracking

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Kiwi Finance API credentials (API Key and Client ID)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kiwi-finance-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:
   ```
   REACT_APP_ENV=sandbox
   REACT_APP_API_KEY=your_api_key_here
   REACT_APP_CLIENT_ID=your_client_id_here
   ```

5. Start the development server:
   ```bash
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Environments

The application supports both sandbox and production environments:

- **Sandbox**: `https://staging.api.kiwifinance.tech`
- **Production**: `https://api.kiwifinance.tech`

Set `REACT_APP_ENV=production` to use the production environment.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## Project Structure

```
src/
├── components/           # React components
│   ├── account/         # Account management components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components
│   ├── layout/          # Layout components
│   ├── payouts/         # Payout components
│   └── virtual-accounts/ # Virtual account components
├── contexts/            # React contexts
├── services/            # API service layer
├── types/               # TypeScript type definitions
├── App.tsx              # Main App component
└── index.tsx            # Application entry point
```

## API Features Implemented

### Authentication
- Generate access token using API Key and Client ID
- Automatic token refresh and session management

### Collections - Virtual Accounts
- Create Reserved Virtual Account (Individual)
- Create Reserved Virtual Account (Corporate)
- Create Temporary Static Virtual Account
- Create Temporary Dynamic Virtual Account
- Check virtual account transaction status

### Payouts
- Get list of supported banks
- Name enquiry for account validation
- Initiate bank transfers
- Check transfer status

### Account Management
- Get account balance
- Get single account balance by account number
- View commission and rebate points

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions about the Kiwi Finance API, please refer to the official documentation or contact the Kiwi Finance support team.