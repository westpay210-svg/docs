import React from 'react';
import { CodeTabs } from '../components/code/CodeTabs';
import { Link } from 'react-router-dom';
import { ArrowRight, Key, Globe, Shield, Zap, Lock, Check, Sparkles, Server, TestTube } from 'lucide-react';

export const GettingStarted: React.FC = () => {
  const quickStartCode = [
    {
      language: 'javascript',
      code: `// 1. Install axios or use fetch
npm install axios

// 2. Authenticate and get access token
const auth = await fetch('https://api.kiwifinance.tech/api/uaa/api/auth', {
  method: 'GET',
  headers: {
    'x-api-key': 'your-api-key',
    'x-client-id': 'your-client-id'
  }
});

const { accessToken } = await auth.json();

// 3. Use the token for API calls
const response = await fetch('https://api.kiwifinance.tech/api/business/business/account/v2/balance', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${accessToken}\`
  }
});

const balance = await response.json();
console.log('Account Balance:', balance.accountBalance);`
    },
    {
      language: 'python',
      code: `# 1. Install requests
pip install requests

import requests

# 2. Authenticate and get access token
auth_response = requests.get(
    'https://api.kiwifinance.tech/api/uaa/api/auth',
    headers={
        'x-api-key': 'your-api-key',
        'x-client-id': 'your-client-id'
    }
)

access_token = auth_response.json()['accessToken']

# 3. Use the token for API calls
balance_response = requests.get(
    'https://api.kiwifinance.tech/api/business/business/account/v2/balance',
    headers={'Authorization': f'Bearer {access_token}'}
)

balance = balance_response.json()
print(f"Account Balance: {balance['accountBalance']}")`
    },
    {
      language: 'curl',
      code: `# 1. Authenticate and get access token
curl --request GET \\
  --url https://api.kiwifinance.tech/api/uaa/api/auth \\
  --header 'x-api-key: your-api-key' \\
  --header 'x-client-id: your-client-id'

# Response: {"accessToken": "eyJhbGciOiJSUzI1NiJ9..."}

# 2. Use the token for API calls
curl --request GET \\
  --url https://api.kiwifinance.tech/api/business/business/account/v2/balance \\
  --header 'Authorization: Bearer your-access-token'`
    }
  ];

  const steps = [
    {
      icon: Key,
      title: 'Get API Credentials',
      description: 'Sign up for a Kiwi Finance account and obtain your API key and client ID from the dashboard.',
      action: 'Get API Keys',
      href: 'https://merchant.akupay.africa/',
      color: 'kiwi'
    },
    {
      icon: Shield,
      title: 'Authenticate',
      description: 'Use your credentials to generate an access token via the authentication endpoint.',
      action: 'View Auth Docs',
      href: '/authentication',
      color: 'accent'
    },
    {
      icon: Zap,
      title: 'Make API Calls',
      description: 'Include the Bearer token in your requests to access all Kiwi Finance API endpoints.',
      action: 'Explore Endpoints',
      href: '/collections',
      color: 'highlight'
    },
    {
      icon: Globe,
      title: 'Go Live',
      description: 'Test in sandbox, then switch to production when ready to process real transactions.',
      action: 'Production Setup',
      href: '#',
      color: 'orange'
    }
  ];

  const securityBestPractices = [
    { title: 'Never expose API keys', description: 'Keep your API keys secure and never include them in client-side code' },
    { title: 'Use HTTPS', description: 'Always make API calls over HTTPS to ensure data encryption' },
    { title: 'Handle tokens securely', description: 'Store access tokens securely and refresh them before expiry' },
    { title: 'Implement error handling', description: 'Always handle API errors gracefully in your application' },
    { title: 'Rate limiting', description: 'Respect API rate limits to ensure reliable service' },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
      kiwi: { bg: 'bg-kiwi-500/10', border: 'border-kiwi-500/20', text: 'text-kiwi-400', icon: 'bg-kiwi-500/20' },
      accent: { bg: 'bg-accent-500/10', border: 'border-accent-500/20', text: 'text-accent-400', icon: 'bg-accent-500/20' },
      highlight: { bg: 'bg-highlight-500/10', border: 'border-highlight-500/20', text: 'text-highlight-400', icon: 'bg-highlight-500/20' },
      orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', icon: 'bg-orange-500/20' },
    };
    return colors[color] || colors.kiwi;
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-kiwi-500/10 border border-kiwi-500/20">
            <Zap className="h-6 w-6 text-kiwi-400" />
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">Getting Started</h1>
            <span className="flex items-center gap-1 px-2 py-1 text-[10px] font-semibold text-kiwi-400 bg-kiwi-500/10 rounded-full border border-kiwi-500/20">
              <Sparkles className="h-3 w-3" />
              Start here
            </span>
          </div>
        </div>
        <p className="text-lg text-white/60 leading-relaxed max-w-3xl">
          Get up and running with the Kiwi Finance API in just a few minutes.
          Follow this guide to authenticate and make your first API call.
        </p>
      </div>

      {/* Quick Start Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {steps.map((step, index) => {
          const colors = getColorClasses(step.color);
          return (
            <div key={index} className="relative group">
              <div className={`h-full rounded-2xl ${colors.bg} border ${colors.border} p-5 hover:border-white/20 transition-all duration-300`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl ${colors.icon}`}>
                    <step.icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <span className={`text-xs font-bold ${colors.text} ${colors.icon} px-2 py-1 rounded-full`}>
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/50 mb-4 leading-relaxed">{step.description}</p>
                <Link
                  to={step.href}
                  className={`inline-flex items-center text-sm ${colors.text} hover:opacity-80 font-medium`}
                  target={step.action === 'Get API Keys' ? '_blank' : ''}
                >
                  {step.action}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Code Example */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Start Code Example</h2>
        <p className="text-white/60 mb-6">
          Here's a complete example showing how to authenticate and check your account balance:
        </p>
        <CodeTabs examples={quickStartCode} />
      </div>

      {/* Environment Information */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">API Environments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sandbox */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/20 p-6 hover:border-yellow-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-500/20 mb-4">
                <TestTube className="h-6 w-6 text-yellow-400" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">Sandbox Environment</h3>
              <p className="text-sm text-white/50 mb-5">
                Use the sandbox environment for development and testing. No real money is processed.
              </p>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-yellow-400 uppercase tracking-wider">Auth Base URL</span>
                  <code className="block mt-1 text-xs bg-yellow-500/10 px-3 py-2 rounded-lg text-yellow-300 font-mono break-all">
                    https://staging.api.kiwifinance.tech
                  </code>
                </div>
                <div>
                  <span className="text-xs font-medium text-yellow-400 uppercase tracking-wider">Base URL</span>
                  <code className="block mt-1 text-xs bg-yellow-500/10 px-3 py-2 rounded-lg text-yellow-300 font-mono break-all">
                    https://staging.api.kiwifinance.tech/api/paas
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Production */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-kiwi-500/10 via-kiwi-500/5 to-transparent border border-kiwi-500/20 p-6 hover:border-kiwi-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-kiwi-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-kiwi-500/20 mb-4">
                <Server className="h-6 w-6 text-kiwi-400" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">Production Environment</h3>
              <p className="text-sm text-white/50 mb-5">
                Production environment for live transactions. Real money is processed here.
              </p>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-kiwi-400 uppercase tracking-wider">Auth Base URL</span>
                  <code className="block mt-1 text-xs bg-kiwi-500/10 px-3 py-2 rounded-lg text-kiwi-300 font-mono break-all">
                    https://api.kiwifinance.tech
                  </code>
                </div>
                <div>
                  <span className="text-xs font-medium text-kiwi-400 uppercase tracking-wider">Base URL</span>
                  <code className="block mt-1 text-xs bg-kiwi-500/10 px-3 py-2 rounded-lg text-kiwi-300 font-mono break-all">
                    https://api.kiwifinance.tech/api/business
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-12">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-accent-500/20">
              <Lock className="h-5 w-5 text-accent-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Security Best Practices</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {securityBestPractices.map((practice, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-accent-500/20 flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-accent-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-white">{practice.title}:</span>
                  <span className="text-sm text-white/50 ml-1">{practice.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Steps CTA */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-kiwi-500 to-accent-500 opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

        <div className="relative p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white mb-3 text-center">What's Next?</h2>
          <p className="text-white/80 mb-8 text-center max-w-lg mx-auto">
            Now that you're set up, explore the different API endpoints available
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Authentication', href: '/authentication' },
              { label: 'Collections', href: '/collections' },
              { label: 'Payouts', href: '/payouts' },
              { label: 'Account', href: '/account' },
            ].map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
              >
                {link.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
