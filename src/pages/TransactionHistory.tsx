import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Download, Globe, ArrowRight } from 'lucide-react';
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
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Transaction History</h1>
        
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-white-muted mb-6 leading-relaxed">
            The Transaction History endpoint allows merchants to retrieve a filtered list of past transactions based on date range, status, or reference. 
            This is useful for reconciliation, reporting, and auditing purposes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 mb-4">
                  <Search className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Advanced Search</h3>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>• Date range filtering</li>
                  <li>• Status-based queries</li>
                  <li>• Amount range searches</li>
                  <li>• Customer transaction lookup</li>
                </ul>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20 p-6 hover:border-green-500/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/20 mb-4">
                  <Filter className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Flexible Filtering</h3>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>• Multiple filter combinations</li>
                  <li>• Currency-specific queries</li>
                  <li>• Payment method filtering</li>
                  <li>• Merchant reference lookup</li>
                </ul>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20 p-6 hover:border-purple-500/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/20 mb-4">
                  <Download className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Export Ready</h3>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>• Pagination support</li>
                  <li>• Bulk data retrieval</li>
                  <li>• Structured JSON response</li>
                  <li>• Summary statistics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Endpoint */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Endpoint</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center">
              <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">GET</span>
              <code className="text-lime font-mono">
                /transaction/history?startDate={'{startDate}'}&endDate={'{endDate}'}&status={'{status}'}&reference={'{reference}'}&page={'{page}'}&size={'{size}'}
              </code>
            </div>
          </div>
        </div>

        {/* Headers */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Headers</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Key</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Required</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {headers.map((header, index) => (
                    <tr key={index} className="hover:bg-white/5">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-lime">{header.key}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">{header.value}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Yes
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-white-muted">{header.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Query Parameters */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Query Parameters</h2>
          <p className="text-white-muted mb-4">All query parameters are optional and can be combined for advanced filtering:</p>
          
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Parameter</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {queryParameters.map((param, index) => (
                    <tr key={index} className="hover:bg-white/5">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-lime">{param.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">{param.type}</td>
                      <td className="px-4 py-4 text-sm text-white-muted">{param.description}</td>
                      <td className="px-4 py-4 text-sm text-white-muted">{param.default}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sample Response */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Sample Response</h2>
          <CodeBlock code={successResponseJson} language="json" />
        </div>

        {/* Response Fields */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Response Fields</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-6">
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
                  {responseFields.map((field, index) => (
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
              You've completed the Server-to-Server API documentation. Explore other sections for additional integration options.
            </p>
            <Link
              to="/webhook"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              Webhook
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};