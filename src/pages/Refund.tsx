import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/docs/PageHeader';
import { Callout } from '../components/docs/Callout';
import { PropertyTable } from '../components/docs/PropertyTable';
import { CodeBlock } from '../components/code/CodeBlock';

export const Refund: React.FC = () => {
  const pathParameters = [
    { name: 'transactionReference', type: 'string', required: true, description: 'Unique reference of the original transaction to refund.' }
  ];

  const requestParameters = [
    { name: 'transactionReference', type: 'string', required: true, description: 'Unique reference of the original transaction to refund.' },
    { name: 'refundAmount', type: 'decimal', required: true, description: 'Refunded transaction amount.' },
    { name: 'refundReason', type: 'string', required: false, description: 'Reason for the refund (optional but recommended for record keeping).' }
  ];

  const headers = [
    { key: 'Authorization', value: 'Bearer {{private_key}}', required: true, description: 'Merchant\'s private key for authentication.' },
    { key: 'Content-Type', value: 'application/json', required: true, description: 'Specifies JSON payload format.' }
  ];

  const responseFields = [
    { name: 'transactionReference', type: 'string', description: 'Unique reference for the refund transaction.' },
    { name: 'reference', type: 'string', description: 'Merchant\'s original order reference.' },
    { name: 'refundedAmount', type: 'decimal', description: 'Refunded transaction amount.' },
    { name: 'transactionAmount', type: 'decimal', description: 'Original transaction amount.' },
    { name: 'transactionDate', type: 'string', description: 'Timestamp when the transaction was processed.' },
    { name: 'refundedDate', type: 'string', description: 'Timestamp when the refund was processed.' },
    { name: 'currencyCode', type: 'string', description: 'Currency code (e.g., USD).' },
    { name: 'status', type: 'integer', description: 'Refund status code (see Status Codes).' },
    { name: 'acquirerCode', type: 'string', description: 'Acquirer/bank response code (00 = approved).' },
    { name: 'acquirerMessage', type: 'string', description: 'Acquirer/bank status message (e.g., Approved).' },
    { name: 'remainingAmount', type: 'decimal', description: 'Remaining amount that can still be refunded.' },
    { name: 'refundHistory', type: 'array', description: 'Array of previous refund transactions for this order.' },
    { name: 'partialRefund', type: 'boolean', description: 'True if refundedAmount is less than transactionAmount.' }
  ];

  const errorCodes = [
    { code: '400', message: 'Bad Request', description: 'Invalid transactionReference or missing parameters.' },
    { code: '401', message: 'Unauthorized', description: 'Invalid private_key.' },
    { code: '404', message: 'Not Found', description: 'Original transaction not found.' },
    { code: '500', message: 'Server Error', description: 'Gateway processing failure.' }
  ];

  const requestBodyJson = `{
  "transactionReference": "Fa5JliRhi6vblnEHYZ",
  "refundAmount": 37.00,
  "refundReason": "Customer requested refund"
}`;

  const successResponseJson = `{
    "status": 200,
    "message": "Request successfully processed",
    "data": {
        "transactionReference": "Fa5JliRhi6vblnEHYZ",
        "reference": "TX187-BC6C-D61DC0D083FF",
        "refundedAmount": 37.00,
        "transactionAmount": 50.00,
        "transactionDate": "2025-05-14T18:21:20.728393",
        "refundedDate": "2025-06-14T21:43:59.502652783",
        "currencyCode": "USD",
        "status": 6,
        "acquirerCode": "00",
        "acquirerMessage": "Approved",
        "remainingAmount": 13.00,
        "refundHistory": [
            {
                "refundId": "AVT84h9nRMIgR_RF",
                "amount": 37.00,
                "timestamp": "2025-06-14T21:43:58.866706",
                "status": "REFUNDED"
            }
        ],
        "partialRefund": true
    },
    "errors": []
}`;

  return (
    <div className="max-w-4xl">
      <PageHeader
        label="Server to Server"
        title="Refund Transaction"
        description="Initiate full or partial refunds for previously processed transactions. Requires the original transaction reference."
      />

      <Callout type="info" title="Two possible outcomes">
        <ul className="mt-1 space-y-1">
          <li><strong>Refunded</strong> — The refund is successfully processed and approved.</li>
          <li><strong>Declined</strong> — The refund request is rejected due to insufficient funds, invalid transaction reference, expired authorization, or other restrictions.</li>
        </ul>
      </Callout>

      <div className="mb-8 mt-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Endpoint</h2>
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded font-mono text-[13px] mb-4">
          <span className="px-2 py-0.5 text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded">PUT</span>
          <code className="text-slate-700">/transaction/refund/{'{transactionReference}'}</code>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Path Parameter</h2>
        <div className="border border-slate-200 rounded overflow-hidden my-4">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Parameter</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {pathParameters.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-[13px] text-slate-700">{p.name}</td>
                  <td className="px-4 py-3 text-[13px] text-slate-500">{p.type}</td>
                  <td className="px-4 py-3 text-[13px] text-slate-500">required</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Headers</h2>
        <div className="border border-slate-200 rounded overflow-hidden my-4">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Key</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {headers.map((h, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-[13px] text-slate-700">{h.key}</td>
                  <td className="px-4 py-3 font-mono text-[13px] text-slate-500">{h.value}</td>
                  <td className="px-4 py-3 text-[13px] text-slate-500">{h.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Request Parameters</h2>
        <PropertyTable properties={requestParameters} />
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Request Body</h2>
        <CodeBlock code={requestBodyJson} language="json" />
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Error Responses</h2>
        <div className="border border-slate-200 rounded overflow-hidden my-4">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Code</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Message</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {errorCodes.map((e, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-[13px] text-red-600">{e.code}</td>
                  <td className="px-4 py-3 text-[13px] text-slate-700">{e.message}</td>
                  <td className="px-4 py-3 text-[13px] text-slate-500">{e.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Response Fields</h2>
        <PropertyTable properties={responseFields} showRequired={false} />
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Success Response</h2>
        <CodeBlock code={successResponseJson} language="json" />
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-10">
        <span className="text-[13px] text-slate-500">Next in Server to Server</span>
        <Link to="/server-to-server/status-code" className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-kiwi-700 bg-kiwi-50 border border-kiwi-200 rounded hover:bg-kiwi-100 transition-colors">
          Status Codes <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
