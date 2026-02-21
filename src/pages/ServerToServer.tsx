import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Shield, Lock, Globe, AlertTriangle, Server, Check, ArrowRight, Key } from 'lucide-react';
import { Environments } from './Environments';
import { ChargeCard3DS } from './ChargeCard3DS';
import { ChargeCard2DS } from './ChargeCard2DS';
import { ChargeCardOTP } from './ChargeCardOTP';
import { AuthorizeCardTransaction } from './AuthorizeCardTransaction';
import { VerifyTransactionStatus } from './VerifyTransactionStatus';
import { Refund } from './Refund';
import { StatusCode } from './StatusCode';
import { TransactionHistory } from './TransactionHistory';

const ServerToServerHome: React.FC = () => {
  const features = [
    { icon: Shield, text: '3D Secure (3DS) transactions for authentication and authorization' },
    { icon: Key, text: 'Transaction authorization via OTP verification' },
    { icon: Check, text: 'Transaction status verification to track payments' },
    { icon: Lock, text: 'Industry-standard security protocols for safe transaction processing' },
  ];

  const securityHeaders = [
    { key: 'Authorization', value: '{PRIVATE_KEY}', required: true, description: 'The merchant\'s private key used for authentication.' },
    { key: 'Content-Type', value: 'application/json', required: true, description: 'Specifies that the request body is in JSON format.' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-accent-500/10 border border-accent-500/20">
            <Server className="h-6 w-6 text-accent-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Server-to-Server</h1>
        </div>
        <p className="text-lg text-white/60 leading-relaxed max-w-3xl">
          Process and manage transactions securely with our Payment Gateway API.
          All API requests must be made using HTTPS and include authentication headers.
        </p>
      </div>

      {/* Features */}
      <div className="mb-12">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">API Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="p-2 rounded-lg bg-kiwi-500/10">
                  <feature.icon className="h-4 w-4 text-kiwi-400" />
                </div>
                <span className="text-sm text-white/70 leading-relaxed">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Authentication & Security Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* API Authentication Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border border-red-500/20 p-6 hover:border-red-500/40 transition-all duration-300">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/20 mb-4">
              <Shield className="h-6 w-6 text-red-400" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">API Authentication</h3>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-red-400" />
                </div>
                <span className="text-sm text-white/70">All requests must be initiated from the server to protect the merchant's private key.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-red-400" />
                </div>
                <span className="text-sm text-white/70">Requests must originate from whitelisted IP addresses associated with the private key.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Security Headers Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent-500/10 via-accent-500/5 to-transparent border border-accent-500/20 p-6 hover:border-accent-500/40 transition-all duration-300">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-500/20 mb-4">
              <Lock className="h-6 w-6 text-accent-400" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">Security Headers</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              These headers must be included in all API requests for proper authentication and content type specification.
            </p>
          </div>
        </div>
      </div>

      {/* Security Headers Table */}
      <div className="mb-12">
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">Required Headers</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Key</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Required</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {securityHeaders.map((header, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-kiwi-400">{header.key}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-white/60">{header.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-kiwi-500/20 text-kiwi-400 border border-kiwi-500/30">
                        Yes
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">{header.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="mb-12">
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/20 p-6">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex items-start gap-4">
            <div className="p-2 rounded-xl bg-yellow-500/20 flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Important Notes</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span className="text-sm text-white/70">Create and set-up your business profile on the merchant dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span className="text-sm text-white/70">Ensure the private key is securely stored and never exposed on the client side.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-kiwi-500 to-accent-500 opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

        <div className="relative p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Globe className="h-6 w-6 text-white" />
            <h2 className="text-xl font-bold text-white">What's Next</h2>
          </div>
          <p className="text-white/80 mb-6">
            Continue with environment configuration and API endpoint documentation
          </p>
          <Link
            to="/server-to-server/environments"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-semibold rounded-xl hover:bg-white/90 transition-colors"
          >
            Environments
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ServerToServer: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ServerToServerHome />} />
      <Route path="environments" element={<Environments />} />
      <Route path="charge-card-3ds" element={<ChargeCard3DS />} />
      <Route path="charge-card-2ds" element={<ChargeCard2DS />} />
      <Route path="charge-card-otp" element={<ChargeCardOTP />} />
      <Route path="authorize-card-transaction" element={<AuthorizeCardTransaction />} />
      <Route path="verify-transaction-status" element={<VerifyTransactionStatus />} />
      <Route path="refund" element={<Refund />} />
      <Route path="status-code" element={<StatusCode />} />
      <Route path="transaction-history" element={<TransactionHistory />} />
    </Routes>
  );
};
