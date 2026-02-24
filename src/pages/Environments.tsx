import React from 'react';
import { Link } from 'react-router-dom';
import { TestTube, Globe, CreditCard, CheckCircle, XCircle, AlertCircle, Server, ArrowRight } from 'lucide-react';

export const Environments: React.FC = () => {
  const testCards = [
    {
      number: '5060990580000217499',
      expiry: '03/50',
      cvv: '111',
      pin: '1111',
      otp: '123456',
      description: 'Verve card for successful transactions.',
      type: 'success'
    },
    {
      number: '4012000033330026',
      expiry: '03/50',
      cvv: '111',
      pin: 'NA',
      otp: 'NA',
      description: 'Visa card for successful transactions',
      type: 'success'
    },
    {
      number: '4000000000002503',
      expiry: '03/50',
      cvv: '111',
      pin: 'NA',
      otp: 'NA',
      description: 'Visa card for failed transactions.',
      type: 'failed'
    },
    {
      number: '5555555555554444',
      expiry: '09/25',
      cvv: '111',
      pin: 'NA',
      otp: 'NA',
      description: 'Mastercard for successful transactions.',
      type: 'success'
    },
    {
      number: '5060990580000000390',
      expiry: '10/40',
      cvv: '111',
      pin: '1111',
      otp: '123456',
      description: 'Verve card for failed transactions (insufficient funds).',
      type: 'failed'
    },
    {
      number: '2223000000000023',
      expiry: '12/34',
      cvv: '123',
      pin: 'NA',
      otp: '',
      description: 'Frictionless (2DS)',
      type: 'frictionless'
    }
  ];

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-kiwi-400" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'frictionless':
        return <AlertCircle className="h-4 w-4 text-accent-400" />;
      default:
        return null;
    }
  };


  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-highlight-500/10 border border-highlight-500/20">
            <Globe className="h-6 w-6 text-highlight-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Environments</h1>
        </div>
        <p className="text-lg text-white/60 leading-relaxed max-w-3xl">
          Configure your integration for sandbox testing or live production transactions.
        </p>
      </div>

      {/* Sandbox Environment */}
      <div className="mb-12">
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/20 p-6 hover:border-yellow-500/40 transition-all duration-300">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-500/20">
                <TestTube className="h-6 w-6 text-yellow-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Sandbox Environment</h2>
            </div>

            <p className="text-sm text-white/60 mb-6 leading-relaxed max-w-3xl">
              The Sandbox environment is used for testing and development. It simulates transactions without processing actual payments,
              allowing you to refine your integration before going live.
            </p>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-medium text-yellow-400 uppercase tracking-wider">Base URL</span>
                <code className="block mt-1 text-sm bg-yellow-500/10 px-4 py-3 rounded-xl text-yellow-300 font-mono break-all border border-yellow-500/20">
                  https://sandbox-api.kiwifinance.tech/
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Cards Section */}
      <div className="mb-12">
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-kiwi-500/20">
              <CreditCard className="h-5 w-5 text-kiwi-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Test Cards</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Card Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Expiry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">CVV</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">PIN</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">OTP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {testCards.map((card, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-kiwi-400">{card.number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-white/60">{card.expiry}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-white/60">{card.cvv}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-white/60">{card.pin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-white/60">{card.otp || '-'}</td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(card.type)}
                        <span>{card.description}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Live Environment */}
      <div className="mb-12">
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-kiwi-500/10 via-kiwi-500/5 to-transparent border border-kiwi-500/20 p-6 hover:border-kiwi-500/40 transition-all duration-300">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-kiwi-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-kiwi-500/20">
                <Server className="h-6 w-6 text-kiwi-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Live Environment</h2>
            </div>

            <p className="text-sm text-white/60 mb-6 leading-relaxed max-w-3xl">
              The Live environment processes real transactions and actual customer data. Ensure thorough testing and readiness before transitioning.
            </p>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-medium text-kiwi-400 uppercase tracking-wider">Base URL</span>
                <code className="block mt-1 text-sm bg-kiwi-500/10 px-4 py-3 rounded-xl text-kiwi-300 font-mono break-all border border-kiwi-500/20">
                  https://api.kiwifinance.tech/
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-kiwi-500 to-accent-500 opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

        <div className="relative p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-3">What's Next</h2>
          <p className="text-white/80 mb-6">
            Learn how to charge a card with 3D Secure authentication for secure payments
          </p>
          <Link
            to="/server-to-server/charge-card-3ds"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-semibold rounded-xl hover:bg-white/90 transition-colors"
          >
            Charge a Card (3DS)
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
