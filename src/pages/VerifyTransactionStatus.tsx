import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Globe, AlertTriangle, Lock, Eye, ArrowRight } from 'lucide-react';
import { CodeBlock } from '../components/code/CodeBlock';

export const VerifyTransactionStatus: React.FC = () => {
  const headers = [
    { key: 'Authorization', value: '{PRIVATE_KEY}', required: true, description: 'The merchant\'s private key.' },
    { key: 'Content-Type', value: 'application/json', required: true, description: 'Specifies the media type of the resource.' }
  ];

  const pathParameters = [
    { name: 'transactionReference', type: 'string', required: true, description: 'The unique reference identifier of the transaction.' }
  ];

  const responseFields = [
    { name: 'transactionReference', type: 'string', description: 'A unique identifier assigned to the transaction.' },
    { name: 'merchantRef', type: 'string', description: 'The reference provided by the merchant during the transaction.' },
    { name: 'status', type: 'string', description: 'The current status of the transaction. Refer to Transaction Status table.' },
    { name: 'statusCode', type: 'integer', description: 'The numerical code representing the transaction status. Refer to Transaction Status table.' },
    { name: 'grossAmount', type: 'decimal', description: 'The total transaction amount, including fees (e.g., 100.00).' },
    { name: 'currencyCode', type: 'string', description: 'The currency used in the transaction (e.g., "USD", "NGN").' },
    { name: 'date', type: 'string', description: 'The date and time the transaction was initiated, formatted in ISO 8601 (YYYY-MM-DDTHH:MM:SSZ).' },
    { name: 'customerId', type: 'string', description: 'The unique identifier of the customer, which may include name and email.' }
  ];

  const errorCodes = [
    { code: '401', message: 'Unauthorized', description: 'Invalid merchant private key.' },
    { code: '403', message: 'Forbidden', description: 'IP address not whitelisted.' },
    { code: '404', message: 'Not Found', description: 'Transaction reference not found.' }
  ];

  const successResponseJson = `{
    "status": 200,
    "message": "Request successfully processed",
    "data": {
        "merchant": "Merchant 1",
        "transactionReference": "GjO2EBd_k1pu4mHmluXn",
        "merchantRef": "ecc0c53f-5130-4717-8ef1-1ac1ef02214c",
        "grossAmount": 50.75,
        "requestedAmount": 50.00,
        "transactionFee": 0.75,
        "settlementAmount": 49.25,
        "customerId": "example@gmail.com",
        "currencyCode": "NGN",
        "callbackUrl": "https://merchanturl.com",
        "authorizationType": "OPEN",
        "paymentRequestor": "Merchant Limited",
        "transactionDate": "2025-03-11T14:43:50.172275",
        "status": 2
    },
    "errors": []
}`;

  const error401Json = `{
  "status": "error",
  "message": "Unauthorized request. Please provide a valid merchant private key."
}`;

  const error403Json = `{
  "status": "error",
  "message": "Access denied. Your IP address is not whitelisted."
}`;

  const error404Json = `{
  "status": "error",
  "message": "Transaction not found for reference: TRX123456789."
}`;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Verify Transaction Status</h1>
        
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-white-muted mb-6 leading-relaxed">
            This endpoint allows merchants to verify the status of a transaction using the unique transaction reference.
          </p>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 mb-4">
                <Search className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Transaction Verification</h3>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• Real-time transaction status checking</li>
                <li>• Comprehensive transaction details retrieval</li>
                <li>• Secure server-to-server verification</li>
                <li>• Support for all transaction types</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Endpoint */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Endpoint</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center">
              <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">GET</span>
              <code className="text-lime font-mono">/transaction/verify/{'{transactionReference}'}</code>
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

        {/* Path Parameters */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Path Parameters</h2>
          
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
                  {pathParameters.map((param, index) => (
                    <tr key={index} className="hover:bg-white/5">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-lime">{param.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">{param.type}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Required
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

        {/* Request */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Request</h2>
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-500/10 via-gray-500/5 to-transparent border border-gray-500/20 p-6 hover:border-gray-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gray-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-500/20 mb-4">
                <Eye className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">No Request Body</h3>
              <p className="text-sm text-white/70">
                There is no additional request body, as this endpoint primarily uses the path parameter and headers.
              </p>
            </div>
          </div>
        </div>

        {/* Response Fields */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Response</h2>
          <p className="text-white-muted mb-4">
            A JSON response containing details of the transaction, including its current status.
          </p>
          
          <h3 className="text-lg font-semibold text-white mb-4">Fields in the transaction response:</h3>
          
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

        {/* Error Responses */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Error Responses</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-6">
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

          {/* Example Error Responses */}
          <h3 className="text-lg font-semibold text-white mb-4">Example Error Responses:</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-md font-semibold text-red-400 mb-2">HTTP 401: Unauthorized</h4>
              <CodeBlock code={error401Json} language="json" />
            </div>
            
            <div>
              <h4 className="text-md font-semibold text-red-400 mb-2">HTTP 403: Forbidden</h4>
              <CodeBlock code={error403Json} language="json" />
            </div>
            
            <div>
              <h4 className="text-md font-semibold text-red-400 mb-2">HTTP 404: Not Found</h4>
              <CodeBlock code={error404Json} language="json" />
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Important Notes</h2>

          <div className="space-y-4">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border border-red-500/20 p-6 hover:border-red-500/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start gap-4">
                <div className="p-2 rounded-xl bg-red-500/20 flex-shrink-0">
                  <Lock className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Private Key Security</h3>
                  <p className="text-sm text-white/70">
                    Ensure the private key is handled securely on your backend. Do not expose it on the client side
                    (e.g., browser or mobile app).
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent border border-orange-500/20 p-6 hover:border-orange-500/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start gap-4">
                <div className="p-2 rounded-xl bg-orange-500/20 flex-shrink-0">
                  <Shield className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">IP Whitelisting</h3>
                  <p className="text-sm text-white/70">
                    The merchant's IP address must be whitelisted for the private key. Contact support to configure
                    this if needed.
                  </p>
                </div>
              </div>
            </div>

            <Link to={'/server-to-server/status-code'} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/20 p-6 block hover:border-yellow-500/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start gap-4">
                <div className="p-2 rounded-xl bg-yellow-500/20 flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Transaction Status Mapping</h3>
                  <p className="text-sm text-white/70">
                    Refer to the <span className='underline text-yellow-400'>Transaction Status table</span> for all possible statuses and their meanings.
                  </p>
                </div>
              </div>
            </Link>
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
              Continue with transaction refund processing capabilities
            </p>
            <Link
              to="/server-to-server/refund"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              Refund
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};