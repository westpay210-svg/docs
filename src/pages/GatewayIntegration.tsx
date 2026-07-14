import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/docs/PageHeader';
import { PropertyTable } from '../components/docs/PropertyTable';
import { Callout } from '../components/docs/Callout';
import { CodeBlock } from '../components/code/CodeBlock';

export const GatewayIntegration: React.FC = () => {
  const environments = [
    { name: 'Staging', url: 'https://sandbox-api.westrapay.com' },
    { name: 'Live', url: 'https://api.westrapay.com' },
  ];

  const initializeParams = [
    { name: 'amount', type: 'integer', required: true, description: 'Amount in lowest currency unit (e.g., Cents)' },
    { name: 'email', type: 'string', required: true, description: "Customer's email address" },
    { name: 'currency', type: 'string', required: true, description: 'e.g., USD' },
    { name: 'reference', type: 'string', required: true, description: 'Unique transaction reference' },
    { name: 'callbackUrl', type: 'string', required: false, description: 'URL for transaction status notifications' },
    { name: 'channels', type: 'array', required: false, description: 'Payment methods e.g., ["card", "bank"]' },
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
    { name: 'authorizationType', type: 'string', description: 'e.g., MPGS_3DS' },
    { name: 'channel', type: 'string', description: 'e.g., Card' },
    { name: 'transactionDate', type: 'datetime', description: 'ISO timestamp' },
  ];

  const statusCodes = [
    { code: 0, status: 'COMPLETED', description: 'Transaction completed successfully', color: 'green' },
    { code: 1, status: 'PENDING', description: 'Awaiting processing', color: 'yellow' },
    { code: 2, status: 'AUTHORIZED', description: 'Authorization successful', color: 'green' },
    { code: 3, status: 'CAPTURED', description: 'Funds captured', color: 'green' },
    { code: 4, status: 'DECLINED', description: 'Payment declined', color: 'red' },
    { code: 5, status: 'CANCELED', description: 'Transaction cancelled', color: 'gray' },
    { code: 6, status: 'REFUNDED', description: 'Fully refunded', color: 'purple' },
    { code: 7, status: 'CHARGED_BACK', description: 'Dispute raised', color: 'orange' },
    { code: 8, status: 'IN_PROGRESS', description: 'Still processing', color: 'blue' },
    { code: 9, status: 'VOIDED', description: 'Voided by merchant or system', color: 'gray' },
    { code: 10, status: 'PENDING_REVIEW', description: 'Under manual review', color: 'yellow' },
    // { code: 11, status: 'PARTIALLY_REFUNDED', description: 'Partially refunded', color: 'purple' },
    { code: 12, status: 'UNDER_INVESTIGATION', description: 'Under investigation', color: 'orange' },
    { code: 13, status: 'FAILED_TO_CAPTURE', description: 'Failed capture post-authorization', color: 'red' },
    { code: 14, status: 'EXPIRED', description: 'Authorization expired', color: 'orange' },
    // { code: 15, status: 'SUSPENDED', description: 'Temporarily paused', color: 'yellow' },
    // { code: 16, status: 'TRANSFERRED', description: 'Settled/finalized elsewhere', color: 'green' },
  ];

  const initializeRequestJson = `{
  "amount": 100000,
  "email": "example@gmail.com",
  "currency": "USD",
  "reference": "{{$randomUUID}}",
  "callbackUrl": "{{$randomUrl}}",
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
    "authorizationUrl": "https://checkout.westrapay.com/S0h-Jcxbpd_1O_MkUZ-i",
    "reference": "{Merchant Ref}",
    "accessCode": "S0h-Jcxbpd_1O_MkUZ-i"
  },
  "errors": []
}`;

  const verifyResponseJson = `{
  "status": 200,
  "message": "Request successfully processed",
  "data": {
    "merchant": "Westrapay Live",
    "reference": "S0h-Jcxbpd_1O_MkUZ-i",
    "merchantRef": "2d059b6a-4626-47e2-8f35-f903ce7a5f22",
    "grossAmount": 50.75,
    "requestedAmount": 50.00,
    "transactionFee": 0.75,
    "settlementAmount": 50.00,
    "customerId": "example@gmail.com",
    "currencyCode": "USD",
    "callbackUrl": "https://sandbox-checkout.westrapay.com/receipt",
    "transactionDate": "2025-03-10T14:04:15.158112",
    "channel": "Card",
    "status": 2
  },
  "errors": []
}`;

  const getStatusBadgeClass = (color: string) => {
    const map: Record<string, string> = {
      green: 'bg-kiwi-50 text-kiwi-700 border border-kiwi-200',
      red: 'bg-red-50 text-red-700 border border-red-200',
      yellow: 'bg-amber-50 text-amber-700 border border-amber-200',
      orange: 'bg-amber-50 text-amber-700 border border-amber-200',
      blue: 'bg-kiwi-100 text-kiwi-800 border border-kiwi-300',
      purple: 'bg-slate-100 text-slate-600 border border-slate-200',
      gray: 'bg-slate-100 text-slate-600 border border-slate-200',
    };
    return map[color] || map.gray;
  };

  return (
    <div className="max-w-4xl">
      <PageHeader
        label="Gateway Integration"
        title="Gateway Integration"
        description="Integrate with the Westrapay Payment Gateway. Initialize transactions and verify payment status using two RESTful API endpoints."
      />

      {/* Environments */}
      <h2 className="text-base font-semibold text-slate-900 mb-4">Environments</h2>
      <div className="border border-slate-200 rounded overflow-hidden my-4">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Base URL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {environments.map((env, i) => (
              <tr key={i}>
                <td className="px-4 py-2.5 text-slate-700 font-medium">{env.name}</td>
                <td className="px-4 py-2.5 font-mono text-slate-600">{env.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Authentication */}
      <h2 className="text-base font-semibold text-slate-900 mb-4">Authentication</h2>
      <Callout type="info" title="Authentication">
        Use your public key (Authorization header) to initialize transactions. Use your private key (Authorization header) to verify transactions.
      </Callout>

      {/* Initialize Transaction */}
      <h2 className="text-base font-semibold text-slate-900 mb-4">Initialize Transaction</h2>
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded font-mono text-[13px] mb-4">
        <span className="px-2 py-0.5 text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200 rounded">POST</span>
        <code className="text-slate-700">/transaction/initialize</code>
      </div>
      <PropertyTable properties={initializeParams} />
      <CodeBlock code={initializeRequestJson} language="json" title="Request Body" />
      <h3 className="text-[13px] font-semibold text-slate-800 mt-6 mb-3">Response Fields</h3>
      <PropertyTable properties={initializeResponseFields} showRequired={false} />
      <CodeBlock code={initializeResponseJson} language="json" title="Sample Response" />

      {/* Verify Transaction */}
      <h2 className="text-base font-semibold text-slate-900 mb-4 mt-8">Verify Transaction</h2>
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded font-mono text-[13px] mb-4">
        <span className="px-2 py-0.5 text-[11px] font-bold bg-kiwi-50 text-kiwi-700 border border-kiwi-200 rounded">GET</span>
        <code className="text-slate-700">/transaction/verify/{'{transactionReference}'}</code>
      </div>
      <Callout type="note">
        Use your private key for verification. Pass transactionReference as a path parameter.
      </Callout>
      <div className="border border-slate-200 rounded overflow-hidden my-4">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Parameter</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Required</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            <tr>
              <td className="px-4 py-2.5 font-mono text-slate-800">transactionReference</td>
              <td className="px-4 py-2.5 text-slate-500">string</td>
              <td className="px-4 py-2.5">
                <span className="inline-flex items-center px-1.5 py-0.5 text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200 rounded">required</span>
              </td>
              <td className="px-4 py-2.5 text-slate-500">Reference of the transaction</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 className="text-[13px] font-semibold text-slate-800 mt-6 mb-3">Response Fields</h3>
      <PropertyTable properties={verifyResponseFields} showRequired={false} />
      <CodeBlock code={verifyResponseJson} language="json" />

      {/* Transaction Status Codes */}
      <h2 className="text-base font-semibold text-slate-900 mb-4 mt-8">Transaction Status Codes</h2>
      <div className="border border-slate-200 rounded overflow-hidden my-4">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Code</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {statusCodes.map((s) => (
              <tr key={s.code}>
                <td className="px-4 py-2.5 font-mono font-bold text-slate-700">{s.code}</td>
                <td className="px-4 py-2.5">
                  <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded ${getStatusBadgeClass(s.color)}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-slate-500">{s.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Next step footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-10">
        <span className="text-[13px] text-slate-500">Next</span>
        <Link
          to="/server-to-server"
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-kiwi-700 bg-kiwi-50 border border-kiwi-200 rounded hover:bg-kiwi-100 transition-colors"
        >
          Server to Server <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
