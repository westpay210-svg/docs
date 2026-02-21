import React from 'react';
import { ApiEndpoint } from '../components/api/ApiEndpoint';
import { authenticationEndpoint } from '../data/apiData';
import { Shield, AlertTriangle, Check, Key, Lock } from 'lucide-react';

export const Authentication: React.FC = () => {
  const authSteps = [
    'Login to your Kiwi Finance dashboard and navigate to the API Keys menu',
    'Obtain API key and client ID from your Kiwi Finance dashboard',
    'Call the authentication endpoint with your credentials',
    'Receive an access token in the response',
    'Include the access token in all subsequent API requests',
  ];

  const importantNotes = [
    'Keep your API keys secure and never expose them in client-side code',
    'Access tokens have a limited lifetime and should be refreshed regularly',
    'Use the refresh token to obtain new access tokens when they expire',
    'All API requests must include the Authorization header with a valid Bearer token',
    'Remember to switch the base URL from staging to production when going live',
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-kiwi-500/10 border border-kiwi-500/20">
            <Shield className="h-6 w-6 text-kiwi-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Authentication</h1>
        </div>
        <p className="text-lg text-white/60 leading-relaxed max-w-3xl">
          The Kiwi Finance API uses API keys for authentication. You need to generate an access token
          using your API key and client ID before making any API calls.
        </p>
      </div>

      {/* Authentication Flow */}
      <div className="mb-12">
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent-500/10 via-accent-500/5 to-transparent border border-accent-500/20 p-6">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-accent-500/20">
                <Key className="h-5 w-5 text-accent-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Authentication Flow</h3>
            </div>

            <ol className="space-y-3">
              {authSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-500/20 text-accent-400 text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-sm text-white/70">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="mb-12">
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/20 p-6">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl bg-yellow-500/20">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Important Notes</h3>
            </div>

            <ul className="space-y-3">
              {importantNotes.map((note, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-500/20 flex-shrink-0 mt-0.5">
                    <Lock className="h-3 w-3 text-yellow-400" />
                  </div>
                  <span className="text-sm text-white/70">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* API Endpoint */}
      <ApiEndpoint endpoint={authenticationEndpoint} />
    </div>
  );
};
