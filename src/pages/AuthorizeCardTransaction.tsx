import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Key, Globe, ArrowRight } from 'lucide-react';
import { CodeBlock } from '../components/code/CodeBlock';

export const AuthorizeCardTransaction: React.FC = () => {
  const requestParameters = [
    { name: 'transactionReference', type: 'string', required: true, description: 'The reference ID of the transaction being authorized.' },
    { name: 'otp', type: 'string', required: true, description: 'The One-Time Password (OTP) provided to the user.' },
    { name: 'authorizationType', type: 'string', required: true, description: 'Indicates the type of authentication required.' }
  ];

  const responseFields = [
    { name: 'status', type: 'int', description: 'HTTP status code.' },
    { name: 'message', type: 'string', description: 'Authorization response message.' },
    { name: 'data', type: 'object', description: 'The authorization response data.' },
    { name: 'status', type: 'int', description: 'Transaction status code (e.g., 2 = AUTHORIZED).' },
    { name: 'errorMessage', type: 'string', description: 'Additional details about the transaction status.' },
    { name: 'transactionReference', type: 'string', description: 'Unique reference for the transaction (use for OTP auth).' },
    { name: 'authorizationType', type: 'string', description: 'Indicates the type of authentication required.' },
    { name: 'grossAmount', type: 'number', description: 'Total transaction amount in the base currency.' },
    { name: 'callbackURL', type: 'string', description: 'URL for callback notifications.' },
    { name: 'clientReference', type: 'string', description: 'Merchant-provided reference for the transaction.' },
    { name: 'paymentReference', type: 'string', description: 'Payment gateway\'s internal reference.' }
  ];

  const errorCodes = [
    { code: '400', message: 'Invalid OTP', description: 'OTP is missing or incorrect.' },
    { code: '404', message: 'Transaction Not Found', description: 'The resource or transaction does not exist.' },
    { code: '500', message: 'Server Error', description: 'An error occurred on the server.' }
  ];

  const requestBodyJson = `{
    "transactionReference": "fK3AcK_Y7Hg1B_r9mfM7",// Use the reference from the Charge a Card response
    "otp": "123456",
    "authorizationType": "OTP"
}`;

  const successResponseJson = `{
    "status": 200,
    "message": "Request successfully processed",
    "data": {
        "status": 2,
        "errorMessage": "Approved by Financial Institution",
        "transactionReference": "fK3AcK_Y7Hg1B_r9mfM7",
        "authorizationType": "OTP",
        "grossAmount": 100.00,
        "callbackUrl": "https://merchant.com/callback",
        "clientReference": "txn123456780",
        "paymentReference": "FBN|API|MX21696|12-03-2025|474797448|303637",
        "charge": true
    },
    "errors": []
}`;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Authorize a Card Transaction</h1>
        
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-white-muted mb-6 leading-relaxed">
            Authorizes a transaction using an OTP (One-Time Password). This endpoint is used to complete the transaction 
            authorization process after the customer has received and entered their OTP.
          </p>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20 p-6 hover:border-green-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/20 mb-4">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Authorization Process</h3>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• Complete transaction authorization with OTP verification</li>
                <li>• Final step in the OTP authentication flow</li>
                <li>• Confirms customer consent and identity</li>
                <li>• Processes payment upon successful verification</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Authorization Flow */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Authorization Flow</h2>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">1</div>
                <div className="flex items-center flex-1">
                  <span className="text-white font-medium">Charge Card Request</span>
                  <ArrowRight className="h-4 w-4 mx-3 text-white/40" />
                  <span className="text-white/70">OTP Sent to Customer</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">2</div>
                <div className="flex items-center flex-1">
                  <span className="text-white font-medium">Customer Receives OTP</span>
                  <ArrowRight className="h-4 w-4 mx-3 text-white/40" />
                  <span className="text-white/70">Enters OTP in Application</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">3</div>
                <div className="flex items-center flex-1">
                  <span className="text-white font-medium">Authorize Transaction</span>
                  <ArrowRight className="h-4 w-4 mx-3 text-white/40" />
                  <span className="text-white/70">Payment Processed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Endpoint */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Endpoint</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center">
              <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">POST</span>
              <code className="text-lime font-mono">/transaction/charge/authorize</code>
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

          {/* Headers */}
          <h3 className="text-lg font-semibold text-white mb-4">Headers:</h3>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
            <code className="text-lime">Content-Type: application/json</code>
          </div>
        </div>

        {/* Request Body Example */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Request Body:</h3>
          <CodeBlock code={requestBodyJson} language="json" />
        </div>

        {/* Important Note */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/20 p-6 mb-8 hover:border-yellow-500/40 transition-all duration-300">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-start gap-4">
            <div className="p-2 rounded-xl bg-yellow-500/20 flex-shrink-0">
              <Key className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Important</h3>
              <p className="text-sm text-white/70">
                Use the <code className="bg-yellow-500/20 px-2 py-1 rounded text-yellow-400">transactionReference</code> returned from the
                initial "Charge a Card" request. This reference links the authorization to the original transaction.
              </p>
            </div>
          </div>
        </div>

        {/* Responses */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Responses</h2>
          
          {/* 200 OK Response */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">200 OK:</h3>
            <p className="text-white-muted mb-4">Body: JSON object containing the card transaction authorization response.</p>
            
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

          {/* 400 Bad Request */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border border-red-500/20 p-6 mb-6 hover:border-red-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-white mb-2">400 Bad Request:</h3>
              <p className="text-sm text-white/70">
                Returned when the OTP or transactionReference is missing or invalid.
              </p>
            </div>
          </div>
        </div>

        {/* Transaction Status Codes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Transaction Status Codes</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</div>
                <div>
                  <span className="text-green-400 font-medium">AUTHORIZED</span>
                  <p className="text-sm text-green-500/80">Transaction successfully authorized</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">X</div>
                <div>
                  <span className="text-red-400 font-medium">FAILED</span>
                  <p className="text-sm text-red-500/80">Authorization failed or declined</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Responses Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Error Responses</h2>
          
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
              Continue with transaction status verification and monitoring
            </p>
            <Link
              to="/server-to-server/verify-transaction-status"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              Verify Transaction Status
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};