import React from 'react';
import { CodeTabs } from '../components/code/CodeTabs';
import { Link } from 'react-router-dom';
import { ArrowRight, Server, TestTube } from 'lucide-react';
import { PageHeader } from '../components/docs/PageHeader';
import { Callout } from '../components/docs/Callout';
import { StepList } from '../components/docs/StepList';

const quickStartCode = [
  {
    language: 'javascript',
    code: `// Gateway Integration - Initialize payment (uses public key)
const checkout = await fetch('https://api.westrapay.com/transaction/initialize', {
  method: 'POST',
  headers: {
    'x-public-key': 'your-public-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 100000,
    email: 'customer@example.com',
    currency: 'USD',
    channels: ['card', 'bank']
  })
});

const { checkoutUrl, reference } = await checkout.json();

// Server-to-Server - Verify transaction (uses private key)
const verification = await fetch(\`https://api.westrapay.com/v1/transaction/verify/\${reference}\`, {
  method: 'GET',
  headers: { 'x-private-key': 'your-private-key' }
});

const transaction = await verification.json();
console.log('Transaction Status:', transaction.status);`,
  },
  {
    language: 'python',
    code: `import requests

# Gateway Integration - Initialize payment
checkout_response = requests.post(
    'https://api.westrapay.com/transaction/initialize',
    headers={'x-public-key': 'your-public-key', 'Content-Type': 'application/json'},
    json={'amount': 100000, 'email': 'customer@example.com', 'currency': 'USD', 'channels': ['card', 'bank']}
)

reference = checkout_response.json()['reference']

# Verify transaction
verification = requests.get(
    f'https://api.westrapay.com/v1/transaction/verify/{reference}',
    headers={'x-private-key': 'your-private-key'}
)
print(f"Status: {verification.json()['status']}")`,
  },
  {
    language: 'curl',
    code: `# Initialize payment
curl --request POST \\
  --url https://api.westrapay.com/transaction/initialize \\
  --header 'x-public-key: your-public-key' \\
  --header 'Content-Type: application/json' \\
  --data '{"amount":100000,"email":"customer@example.com","currency":"USD","channels":["card","bank"]}'

# Verify transaction
curl --request GET \\
  --url https://api.westrapay.com/v1/transaction/verify/{reference} \\
  --header 'x-private-key: your-private-key'`,
  },
];

const steps = [
  { title: 'Create an account', description: 'Sign up at app.westrapay.com/auth/register or log in to the sandbox at sandbox-app.westrapay.com/auth/login.' },
  { title: 'Get your API keys', description: 'Navigate to API Keys in your dashboard. Copy your public key (for frontend) and private key (for backend).' },
  { title: 'Make your first call', description: 'Use your public key to initialize a payment via the Gateway Integration endpoint.' },
  { title: 'Verify the transaction', description: 'After payment, use your private key server-side to verify the transaction status before fulfilling orders.' },
  { title: 'Go live', description: 'Switch your base URL from sandbox (sandbox-api.westrapay.com) to production (api.westrapay.com) when ready.' },
];

const securityBestPractices = [
  'Never expose your private key in client-side code or public repositories.',
  'Always make API calls over HTTPS.',
  'Use public key for gateway integration, private key for server-to-server.',
  'Always handle API errors gracefully in your application.',
  'Verify webhook signatures using your private key.',
];

export const GettingStarted: React.FC = () => (
  <div className="max-w-4xl">
    <PageHeader
      label="Quick Start"
      title="Getting Started"
      description="Get up and running with the Westrapay API in a few minutes. Follow this guide to authenticate and make your first API call."
    />

    {/* Steps */}
    <section className="mb-10">
      <h2 className="text-base font-semibold text-slate-900 mb-4">Integration Steps</h2>
      <StepList steps={steps} />
    </section>

    {/* Quick start code */}
    <section className="mb-10">
      <h2 className="text-base font-semibold text-slate-900 mb-1">Quick Start Example</h2>
      <p className="text-sm text-slate-500 mb-4">Initialize a payment and verify the result with just a few lines.</p>
      <CodeTabs examples={quickStartCode} />
    </section>

    {/* Environments */}
    <section id="api-env" className="mb-10 scroll-mt-20">
      <h2 className="text-base font-semibold text-slate-900 mb-4">API Environments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-slate-200 rounded bg-white p-5">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 bg-amber-50 rounded">
              <TestTube className="h-4 w-4 text-amber-500" />
            </div>
            <span className="text-sm font-semibold text-slate-900">Sandbox</span>
            <span className="ml-auto px-2 py-0.5 text-[10px] font-semibold text-amber-600 bg-amber-50 rounded border border-amber-200">Testing</span>
          </div>
          <p className="text-[13px] text-slate-500 mb-3">For development and testing. No real money is processed.</p>
          <code className="block text-[12px] font-mono text-slate-700 bg-slate-50 px-3 py-2 rounded border border-slate-200 break-all mb-2">
            https://sandbox-api.westrapay.com
          </code>
          <a
            href="https://sandbox-app.westrapay.com/auth/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] text-kiwi-600 hover:text-kiwi-700 font-medium"
          >
            Log in to sandbox dashboard →
          </a>
        </div>
        <div className="border border-kiwi-200 rounded bg-kiwi-50/30 p-5">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 bg-kiwi-100 rounded">
              <Server className="h-4 w-4 text-kiwi-600" />
            </div>
            <span className="text-sm font-semibold text-slate-900">Production</span>
            <span className="ml-auto px-2 py-0.5 text-[10px] font-semibold text-kiwi-700 bg-kiwi-50 rounded border border-kiwi-200">Live</span>
          </div>
          <p className="text-[13px] text-slate-500 mb-3">For live transactions. Real money is processed here.</p>
          <code className="block text-[12px] font-mono text-slate-700 bg-slate-50 px-3 py-2 rounded border border-slate-200 break-all mb-2">
            https://api.westrapay.com
          </code>
          <a
            href="https://app.westrapay.com/auth/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] text-kiwi-600 hover:text-kiwi-700 font-medium"
          >
            Create a production account →
          </a>
        </div>
      </div>
    </section>

    {/* Security practices */}
    <section className="mb-10">
      <h2 className="text-base font-semibold text-slate-900 mb-4">Security Best Practices</h2>
      <Callout type="tip" title="Recommended practices">
        <ul className="mt-1 space-y-1.5">
          {securityBestPractices.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 text-teal-500">✓</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Callout>
    </section>

    {/* Next steps */}
    <section>
      <h2 className="text-base font-semibold text-slate-900 mb-4">Next Steps</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Authentication', href: '/authentication' },
          { label: 'Gateway Integration', href: '/gateway-integration' },
          { label: 'Server to Server', href: '/server-to-server' },
          { label: 'Webhook', href: '/webhook' },
        ].map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="flex items-center justify-between gap-2 px-4 py-3 text-[13px] font-medium text-slate-700 bg-white border border-slate-200 rounded hover:border-kiwi-300 hover:text-kiwi-700 transition-colors"
          >
            {link.label}
            <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  </div>
);
