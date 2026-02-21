import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Shield, Globe, Phone, Key, ArrowRight } from 'lucide-react';
import { CodeBlock } from '../components/code/CodeBlock';

export const ChargeCardOTP: React.FC = () => {
  const requestParameters = [
    { name: 'cardNumber', type: 'string', required: true, description: 'The card number of the user.' },
    { name: 'expiryYear', type: 'string', required: true, description: 'Expiry year of the card.' },
    { name: 'expiryMonth', type: 'string', required: true, description: 'Expiry month of the card.' },
    { name: 'cvv', type: 'string', required: true, description: 'The card\'s CVV security code.' },
    { name: 'amount', type: 'int', required: true, description: 'The transaction amount. (in kobo/cents format e.g "1000" is 10 NGN/USD)' },
    { name: 'currency', type: 'string', required: true, description: 'The currency of the transaction (e.g., USD, NGN).' },
    { name: 'reference', type: 'string', required: true, description: 'A unique reference for the transaction.' },
    { name: 'callbackUrl', type: 'string', required: true, description: 'Callback URL for notifications.' },
    { name: 'webhookURL', type: 'string', required: true, description: 'Custom webhook URL for notifications. The webhookUrl must start with http or https to ensure it is a valid URL.' },
    { name: 'sourceUrl', type: 'string', required: false, description: 'The originating URL.' },
    { name: 'cardPin', type: 'int', required: true, description: 'The card\'s PIN for additional authentication.' },
    { name: 'Terminal ID (TID)', type: 'string', required: false, description: 'Uniquely identifies a specific payment terminal, virtual endpoint, or logical channel under a merchant account (MID)' }
  ];

  const responseFields = [
    { name: 'status', type: 'int', description: 'HTTP status code.' },
    { name: 'message', type: 'string', description: 'Transaction response message.' },
    { name: 'data', type: 'object', description: 'The transaction response data.' },
    { name: 'status', type: 'object', description: 'The authorization status.' },
    { name: 'authorizationType', type: 'string', description: 'Indicates the type of authentication required.' },
    { name: 'otpMessage', type: 'string', description: 'A message instructing the customer to enter the OTP sent to their phone.' },
    { name: 'otpMessageSupport', type: 'string', description: 'Additional instructions for customers who did not receive the OTP.' },
    { name: 'reference', type: 'string', description: 'A unique reference for the transaction, used to track the payment process.' }
  ];

  const errorCodes = [
    { code: '400', message: 'Invalid Request', description: 'Missing or invalid parameters.' },
    { code: '403', message: 'Unauthorized', description: 'Invalid API key or signature.' },
    { code: '500', message: 'Server Error', description: 'Unexpected server failure.' }
  ];

  const requestBodyJson = `{
  "cardNumber": "5060990580000217499",
    "tid": "TT9GMG",
  "expiryYear": 50,
  "expiryMonth": 5,
  "cvv": "123",
  "amount": 10000,// The amount is formatted in kobo (e.g., 10000 represents 100.00 in the base currency).
  "email": "example@gmail.com",
  "currency": "NGN",
  "reference": "{{Randomstring}}",
  "callbackUrl": "https://merchant.com/callback",
  "webhookURL": "httpss://merchantwebhookurl.com", //If passed, and if webhook notification is enabled for merchant
  "sourceUrl": "https//sourceexample.com",
  "cardPin": 1111
}`;

  const successResponseJson = `{
    "status": 200,
    "message": "Request successfully processed",
    "data": {
        "status": 200,
        "authorizationType": "OTP",
        "otpMessage": "Kindly enter the OTP sent to 234803***8900",
        "otpMessageSupport": "Didn't get the OTP? Dial *322*0# on your phone (MTN, Etisalat,           Airtel) Glo, use *805*0#.",
        "reference": "fK3AcK_Y7Hg1B_r9mfM7"
    },
    "errors": []
}`;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Charge a Card (OTP Auth)</h1>
        
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-white-muted mb-6 leading-relaxed">
            This endpoint processes card transactions using One-Time Password (OTP) authentication for enhanced security. 
            The customer receives an OTP via SMS to their registered phone number to authorize the transaction.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20 p-6 hover:border-purple-500/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/20 mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">OTP Authentication</h3>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>• SMS-based verification</li>
                  <li>• Enhanced security layer</li>
                  <li>• Real-time authorization</li>
                  <li>• Customer phone verification</li>
                </ul>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20 p-6 hover:border-green-500/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/20 mb-4">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Security Features</h3>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>• PIN + OTP dual authentication</li>
                  <li>• Fraud prevention</li>
                  <li>• Customer consent verification</li>
                  <li>• Network provider support</li>
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
              <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-mono mr-3">POST</span>
              <code className="text-lime font-mono">/transaction/charge</code>
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

        {/* Responses */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Responses</h2>
          
          {/* 200 OK Response */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">200 OK:</h3>
            <p className="text-white-muted mb-4">Body: JSON object containing the card transaction response.</p>
            
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
                Returned when request parameters are invalid.
              </p>
            </div>
          </div>
        </div>

        {/* OTP Process Flow */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">OTP Process Flow</h2>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 p-6 mb-6 hover:border-blue-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 mb-4">
                <Phone className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Customer Experience</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Transaction Initiation</h4>
                    <p className="text-sm text-white/70">Customer provides card details and PIN</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">OTP Generation</h4>
                    <p className="text-sm text-white/70">System sends OTP to customer's registered phone number</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">OTP Entry</h4>
                    <p className="text-sm text-white/70">Customer enters received OTP to authorize transaction</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Transaction Completion</h4>
                    <p className="text-sm text-white/70">Payment is processed upon successful OTP verification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OTP Support Information */}
          {/* <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-3">
              <Key className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold text-yellow-500">OTP Support</h3>
            </div>
            <p className="text-sm text-yellow-500/90 mb-2">
              If customers don't receive the OTP, they can use the following USSD codes:
            </p>
            <ul className="text-sm text-yellow-500/90 space-y-1">
              <li>• <strong>MTN, Etisalat, Airtel:</strong> <code className="bg-yellow-500/20 px-2 py-1 rounded">*322*0#</code></li>
              <li>• <strong>Glo:</strong> <code className="bg-yellow-500/20 px-2 py-1 rounded">*805*0#</code></li>
            </ul>
          </div> */}
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
              Continue with card transaction authorization process
            </p>
            <Link
              to="/server-to-server/authorize-card-transaction"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              Authorize a Card Transaction
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};