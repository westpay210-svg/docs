import React from 'react';
import { Wallet } from 'lucide-react';
import { CodeBlock } from '../components/code/CodeBlock';

export const PaymentChannel: React.FC = () => {
  const paymentMethods = [
    { method: 'Card Payment', status: 'Available', available: true },
    { method: 'Bank Transfer', status: 'Available', available: true },
    { method: 'Opay', status: 'Available', available: true },
    { method: 'Palmpay', status: 'Available', available: true },
    { method: 'USSD', status: 'Coming Soon', available: false },
    { method: 'Direct Debit', status: 'Coming Soon', available: false },
  ];

  const sampleRequest = `{
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

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Wallet className="h-6 w-6 text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Payment Channel</h1>
        </div>
      </div>

      {/* Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
        <p className="text-white-muted mb-6 leading-relaxed">
          Kiwi Finance payment gateway enables merchants to accept payments seamlessly through multiple channels.
          The system provides reliable APIs for initializing, processing, and verifying payments securely.
        </p>
      </div>

      {/* Supported Payment Methods & Channels */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Supported Payment Methods & Channels</h2>

        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Payment Method</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {paymentMethods.map((method, index) => (
                  <tr key={index} className="hover:bg-white/5">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">{method.method}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        method.available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {method.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Channel Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Channel Selection</h2>

        <p className="text-white-muted mb-4 leading-relaxed">
          When initializing a transaction, you can specify which payment channels to display to your customers using the <code className="text-kiwi-400 bg-white/5 px-2 py-0.5 rounded">channels</code> array.
        </p>

        <div className="mb-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center">
              <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">POST</span>
              <code className="text-lime font-mono">/transaction/initialize</code>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-4">Sample Request</h3>
        <CodeBlock code={sampleRequest} language="json" />
        <div className="bg-blue-500/10 mt-8 border border-blue-500/30 rounded-lg p-4 mb-6">
          <p className="text-blue-400 text-sm">
            <strong>Note:</strong> If you pass an empty array <code className="bg-blue-500/20 px-1.5 py-0.5 rounded">[]</code>, all available payment channels will be displayed to the customer. If you specify particular channels (e.g., <code className="bg-blue-500/20 px-1.5 py-0.5 rounded">["card", "bank"]</code>), only those specific payment methods will be shown.
          </p>
        </div>
      </div>
    </div>
  );
};
