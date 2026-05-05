import React from 'react';
import { ApiEndpoint } from '../components/api/ApiEndpoint';
import { authenticationEndpoint } from '../data/apiData';
import { PageHeader } from '../components/docs/PageHeader';
import { Callout } from '../components/docs/Callout';
import { StepList } from '../components/docs/StepList';

export const Authentication: React.FC = () => {
  const authSteps = [
    { title: 'Get your API keys', description: 'Log in to your Westrapay dashboard and navigate to API Keys.' },
    { title: 'Choose the right key', description: 'Use your public key (x-public-key header) for Gateway Integration. Use your private key (x-private-key header) for Server-to-Server calls and transaction verification.' },
    { title: 'Add the header', description: 'Pass the key in the appropriate HTTP header on every request to the API.' },
    { title: 'Verify before fulfilling', description: 'Always verify transaction status with your private key before fulfilling orders or disbursing value.' },
  ];

  const importantNotes = [
    'Never expose your private key in client-side code or public repositories.',
    'Public keys are safe to use in frontend code for gateway initialization.',
    'Private keys must only be used in server-side code.',
    'Switch the base URL from sandbox to production when going live.',
  ];

  return (
    <div className="max-w-4xl">
      <PageHeader
        label="Security"
        title="Authentication"
        description="The Westrapay API uses public and private key authentication. Use your public key for Gateway Integration and your private key for Server-to-Server calls and transaction verification."
      />

      <section className="mb-10">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Authentication Flow</h2>
        <StepList steps={authSteps} />
      </section>

      <Callout type="warning" title="Keep private keys secure">
        <ul className="mt-1 space-y-1">
          {importantNotes.map((n, i) => <li key={i}>{n}</li>)}
        </ul>
      </Callout>

      <section className="mt-10">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Login Endpoint</h2>
        <ApiEndpoint endpoint={authenticationEndpoint} />
      </section>
    </div>
  );
};
