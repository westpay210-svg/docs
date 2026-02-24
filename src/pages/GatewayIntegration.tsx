import React from 'react';
import { CreditCard, Shield, Globe, CheckCircle, Clock, XCircle, AlertCircle, ArrowRight, Lock } from 'lucide-react';
import { CodeBlock } from '../components/code/CodeBlock';

export const GatewayIntegration: React.FC = () => {
  const environments = [
    { name: 'Staging', url: 'https://sandbox-api.kiwifinance.tech' },
    { name: 'Live', url: 'https://api.kiwifinance.tech' },
  ];

  const initializeParams = [
    { name: 'amount', type: 'integer', required: true, description: 'Amount in lowest currency unit (e.g., Cents)' },
    { name: 'email', type: 'string', required: true, description: "Customer's email address" },
    { name: 'currency', type: 'string', required: true, description: 'e.g., USD, NGN' },
    { name: 'reference', type: 'string', required: true, description: 'Unique transaction reference' },
    { name: 'callbackUrl', type: 'string', required: false, description: 'URL for transaction status notifications' },
    { name: 'channels', type: 'array', required: true, description: 'Payment methods e.g., ["card", "bank"]' },
    { name: 'bearer', type: 'integer', required: true, description: '1 = Merchant bears fee, 2 = Customer' },
    { name: 'metadata', type: 'object', required: false, description: 'Custom metadata' },
  ];

  const initializeResponseFields = [
    { name: 'status', type: 'string', description: 'Request status (e.g., 200)' },
    { name: 'authorizationUrl', type: 'string', description: 'URL to redirect customer for payment' },
    { name: 'reference', type: 'string', description: "Merchant's reference" },
    { name: 'accessCode', type: 'string', description: 'Internal transaction ID' },
  ];

  const verifyResponseFields = [
    { name: 'merchant', type: 'string', description: 'Merchant name' },
    { name: 'reference', type: 'string', description: 'Payment gateway reference' },
    { name: 'merchantRef', type: 'string', description: "Merchant's transaction reference" },
    { name: 'grossAmount', type: 'float', description: 'Total amount charged' },
    { name: 'transactionFee', type: 'float', description: 'Fee charged' },
    { name: 'settlementAmount', type: 'float', description: 'Net amount received' },
    { name: 'customerId', type: 'string', description: 'Customer identifier (email)' },
    { name: 'status', type: 'integer', description: 'Transaction status code' },
    { name: 'authorizationType', type: 'string', description: 'e.g., ISW_OTP' },
    { name: 'channel', type: 'string', description: 'e.g., Card' },
    { name: 'transactionDate', type: 'datetime', description: 'ISO timestamp' },
  ];

  const statusCodes = [
    { code: 0, status: 'COMPLETED', description: 'Transaction completed successfully', icon: CheckCircle, color: 'green' },
    { code: 1, status: 'PENDING', description: 'Awaiting processing', icon: Clock, color: 'yellow' },
    { code: 2, status: 'AUTHORIZED', description: 'Authorization successful', icon: CheckCircle, color: 'green' },
    { code: 3, status: 'CAPTURED', description: 'Funds captured', icon: CheckCircle, color: 'green' },
    { code: 4, status: 'DECLINED', description: 'Payment declined', icon: XCircle, color: 'red' },
    { code: 5, status: 'CANCELED', description: 'Transaction cancelled', icon: XCircle, color: 'gray' },
    { code: 6, status: 'REFUNDED', description: 'Fully refunded', icon: CheckCircle, color: 'purple' },
    { code: 7, status: 'CHARGED_BACK', description: 'Dispute raised', icon: AlertCircle, color: 'orange' },
    { code: 8, status: 'IN_PROGRESS', description: 'Still processing', icon: Clock, color: 'blue' },
    { code: 9, status: 'VOIDED', description: 'Voided by merchant or system', icon: XCircle, color: 'gray' },
    { code: 10, status: 'PENDING_REVIEW', description: 'Under manual review', icon: AlertCircle, color: 'yellow' },
    { code: 11, status: 'PARTIALLY_REFUNDED', description: 'Partially refunded', icon: CheckCircle, color: 'purple' },
    { code: 12, status: 'UNDER_INVESTIGATION', description: 'Under investigation', icon: AlertCircle, color: 'orange' },
    { code: 13, status: 'FAILED_TO_CAPTURE', description: 'Failed capture post-authorization', icon: XCircle, color: 'red' },
    { code: 14, status: 'EXPIRED', description: 'Authorization expired', icon: AlertCircle, color: 'orange' },
    { code: 15, status: 'SUSPENDED', description: 'Temporarily paused', icon: AlertCircle, color: 'yellow' },
    { code: 16, status: 'TRANSFERRED', description: 'Settled/finalized elsewhere', icon: CheckCircle, color: 'green' },
    { code: 17, status: 'SCHEDULED', description: 'Future-dated transaction', icon: Clock, color: 'blue' },
  ];

  const initializeRequestJson = `{
  "amount": 100000,
  "email": "example@gmail.com",
  "currency": "USD",
  "reference": "{{$randomUUID}}",
  "callbackUrl": "{{$randomUrl}}",
  "channels": ["card", "bank"],
  "bearer": 1,
  "metadata": {
    "customerId": "CUST12345",
    "orderId": "ORDER67890"
  }
}`;

  const initializeResponseJson = `{
  "status": 200,
  "message": "Request successfully processed",
  "data": {
    "authorizationUrl": "https://gateway.kiwifinance.tech/S0h-Jcxbpd_1O_MkUZ-i",
    "reference": "{Merchant Ref}",
    "accessCode": "S0h-Jcxbpd_1O_MkUZ-i"
  },
  "errors": []
}`;

  const verifyResponseJson = `{
  "status": 200,
  "message": "Request successfully processed",
  "data": {
    "merchant": "Kiwi Nectarlive",
    "reference": "S0h-Jcxbpd_1O_MkUZ-i",
    "merchantRef": "2d059b6a-4626-47e2-8f35-f903ce7a5f22",
    "grossAmount": 50.75,
    "requestedAmount": 50.00,
    "transactionFee": 0.75,
    "settlementAmount": 50.00,
    "customerId": "example@gmail.com",
    "currencyCode": "USD",
    "callbackUrl": "https://test-gateway.kiwifinance.tech/receipt",
    "transactionDate": "2025-03-10T14:04:15.158112",
    "channel": "Card",
    "status": 2
  },
  "errors": []
}`;

  const getStatusColor = (color: string) => {
    const colorMap: Record<string, string> = {
      green: 'text-green-400 bg-green-500/10 border-green-500/30',
      red: 'text-red-400 bg-red-500/10 border-red-500/30',
      yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
      blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      purple: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      orange: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
      gray: 'text-gray-400 bg-gray-500/10 border-gray-500/30',
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-accent-500/10 border border-accent-500/20">
              <CreditCard className="h-6 w-6 text-accent-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Gateway Integration</h1>
          </div>
          <p className="text-lg text-white/60 leading-relaxed max-w-3xl">
            Integrate with the Kiwi Finance Payment Gateway using RESTful APIs. This guide covers the two main endpoints: Initialize Transaction and Verify Transaction.
          </p>
        </div>

        {/* API Overview */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">API Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {environments.map((env, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent-500/10 via-accent-500/5 to-transparent border border-accent-500/20 p-6 hover:border-accent-500/40 transition-all duration-300">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <h3 className="text-lg font-semibold text-white mb-2">{env.name} URL</h3>
                  <code className="text-sm text-kiwi-400 bg-white/5 px-3 py-2 rounded-lg block overflow-x-auto">
                    {env.url}
                  </code>
                </div>
              </div>
            ))}
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-start gap-4">
              <div className="p-2 rounded-xl bg-blue-500/20 flex-shrink-0">
                <Lock className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Authentication</h3>
                <code className="text-sm text-white/70 bg-white/5 px-3 py-2 rounded-lg block">
                  Authorization: {'<your_public_api_key>'}
                </code>
                <p className="text-sm text-white/60 mt-2">Response is in JSON format.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Initialize Transaction */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-green-500/20">
              <ArrowRight className="h-5 w-5 text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Initialize Transaction</h2>
          </div>

          {/* Endpoint */}
          <div className="mb-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center">
                <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">POST</span>
                <code className="text-lime font-mono">/transaction/initialize</code>
              </div>
            </div>
            <p className="text-sm text-white/60 mt-2">
              The authorization at the point of initializing a transaction is your <strong className="text-kiwi-400">public key</strong>.
            </p>
          </div>

          {/* Request Parameters */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Request Body</h3>
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Parameter</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Required</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {initializeParams.map((param, index) => (
                      <tr key={index} className="hover:bg-white/5">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-lime">{param.name}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">{param.type}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            param.required
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {param.required ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-white-muted">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <h4 className="text-md font-semibold text-white mb-4">Sample Request:</h4>
            <CodeBlock code={initializeRequestJson} language="json" />
          </div>

          {/* Response */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Sample Response</h3>
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Field</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {initializeResponseFields.map((field, index) => (
                      <tr key={index} className="hover:bg-white/5">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-lime">{field.name}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">{field.type}</td>
                        <td className="px-4 py-4 text-sm text-white-muted">{field.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <CodeBlock code={initializeResponseJson} language="json" />
          </div>
        </div>

        {/* Verify Transaction */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-blue-500/20">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Verify Transaction</h2>
          </div>

          {/* Endpoint */}
          <div className="mb-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center">
                <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">GET</span>
                <code className="text-lime font-mono">/transaction/verify/{'{transactionReference}'}</code>
              </div>
            </div>
            <p className="text-sm text-white/60 mt-2">
              The authorization at the point of verifying a transaction is your <strong className="text-kiwi-400">private key</strong>.
            </p>
          </div>

          {/* Path Parameters */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Path Parameters</h3>
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Parameter</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Required</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-lime">transactionReference</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">string</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Yes
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-white-muted">Reference of the transaction to verify</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Response */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Sample Response</h3>
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Field</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {verifyResponseFields.map((field, index) => (
                      <tr key={index} className="hover:bg-white/5">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-lime">{field.name}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">{field.type}</td>
                        <td className="px-4 py-4 text-sm text-white-muted">{field.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <CodeBlock code={verifyResponseJson} language="json" />
          </div>
        </div>

        {/* Status Codes */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Status Codes</h2>

          <div className="grid gap-3">
            {statusCodes.map((status) => {
              const IconComponent = status.icon;
              return (
                <div key={status.code} className={`rounded-lg border p-4 ${getStatusColor(status.color)}`}>
                  <div className="flex items-start">
                    <div className="flex items-center mr-4">
                      <IconComponent className="h-5 w-5 mr-2" />
                      <span className="font-mono text-lg font-bold">{status.code}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{status.status}</h3>
                      <p className="text-sm opacity-90">{status.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What's Next */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-kiwi-500 to-accent-500 opacity-90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
          <div className="relative p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Globe className="h-6 w-6 text-white" />
              <h2 className="text-xl font-bold text-white">What's Next</h2>
            </div>
            <p className="text-white/80 mb-6">
              Explore Server-to-Server integration for advanced payment processing
            </p>
            <a
              href="/server-to-server"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              Server to Server API
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
