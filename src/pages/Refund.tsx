import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, DollarSign, Globe, AlertTriangle, ArrowRight } from 'lucide-react';
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
    { name: 'currencyCode', type: 'string', description: 'Currency code (e.g., NGN/ USD).' },
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
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Refund Transaction</h1>
        
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-white-muted mb-6 leading-relaxed">
            The refund endpoint enables merchants to initiate refunds (Full and Partial) for previously processed transactions via a PUT request. 
            It requires the original transaction reference and processes the specified refund amount using either the Kiwi Finance-generated or merchant reference.
          </p>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 p-6 mb-6 hover:border-blue-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 mb-4">
                <AlertTriangle className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Refund Results</h3>
              <p className="text-sm text-white/70 mb-2">
                When initiating a refund for a transaction, there are two possible results:
              </p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• <strong className="text-white">Refunded</strong> – The refund is successfully processed and approved.</li>
                <li>• <strong className="text-white">Declined</strong> – The refund request is rejected due to insufficient funds, invalid transaction reference, expired authorization, or other restrictions.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20 p-6 hover:border-green-500/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/20 mb-4">
                  <RotateCcw className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Refund Processing</h3>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>• Full and partial refunds supported</li>
                  <li>• Automatic validation of refund eligibility</li>
                  <li>• Real-time status tracking</li>
                  <li>• Multiple refunds per transaction allowed</li>
                </ul>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 mb-4">
                  <DollarSign className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Financial Control</h3>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>• Amount validation against original transaction</li>
                  <li>• Automatic fee calculations</li>
                  <li>• Currency conversion handling</li>
                  <li>• Settlement timeline management</li>
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
              <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">PUT</span>
              <code className="text-lime font-mono">/transaction/refund/{'{transactionReference}'}</code>
            </div>
          </div>
        </div>

        {/* Path Parameters */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Path Parameter</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Parameter</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {pathParameters.map((param, index) => (
                    <tr key={index} className="hover:bg-white/5">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-lime">{param.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">{param.type}</td>
                      <td className="px-4 py-4 text-sm text-white-muted">{param.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

        {/* Request Parameters */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Request Parameters</h2>
          <p className="text-white-muted mb-4">Body (JSON):</p>
          
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-6">
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
                  {requestParameters.map((param, index) => (
                    <tr key={index} className="hover:bg-white/5">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-lime">{param.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">{param.type}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          param.required 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {param.required ? 'Required' : 'Optional'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-white-muted">{param.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Request Body Example */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Request Body:</h3>
          <CodeBlock code={requestBodyJson} language="json" />
        </div>

        {/* Error Handling */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Error Handling</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Status Code</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Message</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {errorCodes.map((error, index) => (
                    <tr key={index} className="hover:bg-white/5">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-red-400">{error.code}</td>
                      <td className="px-4 py-4 text-sm text-white-muted">{error.message}</td>
                      <td className="px-4 py-4 text-sm text-white-muted">{error.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Response Fields */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Response</h2>
          <p className="text-white-muted mb-4">
            A JSON response containing details of the refund operation and processing status.
          </p>
          
          <h3 className="text-lg font-semibold text-white mb-4">Fields in the refund response:</h3>
          
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

          <h4 className="text-md font-semibold text-white mb-4">Response (Success):</h4>
          <CodeBlock code={successResponseJson} language="json" />
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
              Continue with transaction status codes and error handling
            </p>
            <Link
              to="/server-to-server/status-code"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              Status Code
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};