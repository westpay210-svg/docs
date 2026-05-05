import React from 'react';
import { PageHeader } from '../components/docs/PageHeader';
import { Callout } from '../components/docs/Callout';
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
    <div className="max-w-4xl">
      <PageHeader
        label="Gateway Integration"
        title="Payment Channel"
        description="Westrapay supports multiple payment channels. Use the channels array in your initialize request to control which methods are shown to your customers."
      />

      {/* Supported Channels */}
      <h2 className="text-base font-semibold text-slate-900 mb-4">Supported Channels</h2>
      <div className="border border-slate-200 rounded overflow-hidden my-4">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Payment Method</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {paymentMethods.map((m, i) => (
              <tr key={i}>
                <td className="px-4 py-2.5 text-slate-700 font-medium">{m.method}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded border ${
                      m.available
                        ? 'bg-kiwi-50 text-kiwi-700 border-kiwi-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Channel Selection */}
      <h2 className="text-base font-semibold text-slate-900 mb-4 mt-8">Channel Selection</h2>
      <p className="text-[13px] text-slate-600 mb-4 leading-relaxed">
        Specify payment channels using the <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-700">channels</code> array in your initialize request. Pass an empty array <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-700">[]</code> to show all available channels.
      </p>
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded font-mono text-[13px] mb-4">
        <span className="px-2 py-0.5 text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200 rounded">POST</span>
        <code className="text-slate-700">/transaction/initialize</code>
      </div>
      <CodeBlock code={sampleRequest} language="json" title="Example Request" />
      <Callout type="info">
        Passing an empty channels array displays all available payment methods. Specify particular channels (e.g., ["card", "bank"]) to restrict the options shown.
      </Callout>
    </div>
  );
};
