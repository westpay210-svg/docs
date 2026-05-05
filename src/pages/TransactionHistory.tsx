import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/docs/PageHeader';
import { Callout } from '../components/docs/Callout';
import { PropertyTable } from '../components/docs/PropertyTable';
import { CodeBlock } from '../components/code/CodeBlock';

export const TransactionHistory: React.FC = () => {
  const queryParameters = [
    { name: 'startDate', type: 'Unix Timestamp', required: false, description: 'Filters transactions from this timestamp (inclusive).', default: '24 hours ago' },
    { name: 'endDate', type: 'Unix Timestamp', required: false, description: 'Filters transactions up to this timestamp (inclusive).', default: 'Current time' },
    { name: 'status', type: 'Integer', required: false, description: 'Filters by transaction status (e.g., 6 = Refunded).', default: 'All statuses' },
    { name: 'reference', type: 'String', required: false, description: 'Filters by transactionReference or merchantRef.', default: '' },
    { name: 'page', type: 'Integer', required: false, description: 'Page number for pagination (minimum 1)', default: '1' },
    { name: 'size', type: 'Integer', required: false, description: 'Items per page (maximum 100)', default: '25' }
  ];

  const headers = [
    { key: 'Authorization', value: '{{private_key}}', required: true, description: 'Merchant\'s private key for authentication.' }
  ];

  const responseFields = [
    { name: 'transactionReference', type: 'string', description: 'Unique reference for the refund transaction.' },
    { name: 'reference', type: 'decimal', description: 'Merchant\'s original order reference.' },
    { name: 'grossAmount', type: 'decimal', description: 'Original transaction amount.' },
    { name: 'requestedAmount', type: 'decimal', description: 'Amount requested by the merchant' },
    { name: 'transactionFee', type: 'decimal', description: 'Processing/Transaction fee deducted' },
    { name: 'settlementAmount', type: 'decimal', description: 'Net amount after fees' },
    { name: 'customerId', type: 'string', description: 'Unique customer identifier (e.g, email address)' },
    { name: 'currencyCode', type: 'string', description: 'Currency code (e.g., USD/NGN).' },
    { name: 'createdDate', type: 'string', description: 'Timestamp when the transaction was created.' },
    { name: 'status', type: 'integer', description: 'Refund status code (see Status Codes).' },
    { name: 'errorCode', type: 'string', description: 'Error code (0 = success)' }
  ];

  const successResponseJson = `{
  "status": 200,
  "message": "Request successfully processed",
  "data": {
    "content": [
      {
        "transactionReference": "XLs8M1jl0I2dzPYmmzfE",
        "reference": "9e165283-00ac-48e7-813f-e559324e5502",
        "grossAmount": 150.00,
        "requestedAmount": 150.00,
        "transactionFee": 2.25,
        "settlementAmount": 147.75,
        "customerId": "example@email.com",
        "currencyCode": "USD",
        "createdDate": "2025-03-30T17:01:46.827105",
        "status": 1,
        "errorCode": "0"
      },
      {
        "transactionReference": "MX9KiGstDRW_tpsaB9zp",
        "reference": "bf925674-4430-4374-9e04-4918332ca0e7",
        "grossAmount": 2.00,
        "requestedAmount": 2.00,
        "transactionFee": 0.00,
        "settlementAmount": 2.00,
        "customerId": "test@example.com",
        "currencyCode": "USD",
        "createdDate": "2025-03-30T14:27:20.240288",
        "status": 1,
        "errorCode": "0"
      }
    ],
    "number": 0,
    "size": 25,
    "totalElements": 2,
    "totalPages": 1,
    "last": true,
    "first": true
  },
  "errors": []
}`;

  return (
    <div className="max-w-4xl">
      <PageHeader
        label="Server to Server"
        title="Transaction History"
        description="Retrieve a paginated, filtered list of past transactions for reconciliation, reporting, and auditing."
      />

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Endpoint</h2>
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded font-mono text-[13px] mb-4 overflow-x-auto">
          <span className="px-2 py-0.5 text-[11px] font-bold bg-kiwi-50 text-kiwi-700 border border-kiwi-200 rounded flex-shrink-0">GET</span>
          <code className="text-slate-700 whitespace-nowrap">/transaction/history?startDate={'{startDate}'}&amp;endDate={'{endDate}'}&amp;status={'{status}'}&amp;reference={'{reference}'}&amp;page={'{page}'}&amp;size={'{size}'}</code>
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
        <h2 className="text-base font-semibold text-slate-900 mb-4">Query Parameters</h2>
        <PropertyTable properties={queryParameters} showRequired={false} showDefault={true} />
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Sample Response</h2>
        <CodeBlock code={successResponseJson} language="json" />
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Response Fields</h2>
        <PropertyTable properties={responseFields} showRequired={false} />
      </div>

      <Callout type="note">
        All query parameters are optional and can be combined. Default window is the last 24 hours.
      </Callout>

      <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-10">
        <span className="text-[13px] text-slate-500">Next</span>
        <Link to="/webhook" className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-kiwi-700 bg-kiwi-50 border border-kiwi-200 rounded hover:bg-kiwi-100 transition-colors">
          Webhooks <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
