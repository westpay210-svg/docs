import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Shield, Globe, AlertTriangle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { CodeBlock } from '../components/code/CodeBlock';

export const ChargeCard3DS: React.FC = () => {
  const requestParameters = [
    { name: 'cardNumber', type: 'string', required: true, description: 'The card number of the user.' },
    { name: 'expiryYear', type: 'string', required: true, description: 'Expiry year of the card.' },
    { name: 'expiryMonth', type: 'string', required: true, description: 'Expiry month of the card.' },
    { name: 'cvv', type: 'string', required: true, description: 'The card\'s CVV security code.' },
    { name: 'amount', type: 'int', required: true, description: 'The transaction amount. (in kobo/cents format e.g "1000" is 10 NGN/USD)' },
    { name: 'email', type: 'string', required: true, description: 'The email address of the customer/cardholder' },
    { name: 'currency', type: 'string', required: true, description: 'The currency of the transaction (e.g., USD, NGN).' },
    { name: 'reference', type: 'string', required: true, description: 'A unique reference for the transaction.' },
    { name: 'callbackUrl', type: 'string', required: true, description: 'Callback URL for 3DS route.' },
    { name: 'sourceUrl', type: 'string', required: false, description: 'The originating URL.' },
    { name: 'webhookURL', type: 'string', required: true, description: 'Custom webhook URL for notifications. The webhookUrl must start with http or https to ensure it is a valid URL.' },
    { name: 'browserDetails', type: 'object', required: false, description: 'Detailed information about the payer\'s browser. When provided, increase the transaction success rate' },
    { name: 'customer', type: 'object', required: true, description: 'Detailed information on the customer making the payment. When provided, it increases the transaction success rate' },
    { name: 'Terminal ID (TID)', type: 'string', required: false, description: 'Uniquely identifies a specific payment terminal, virtual endpoint, or logical channel under a merchant account (MID)' }
  ];

  const responseFields = [
    { name: 'status', type: 'int', description: 'HTTP status code.' },
    { name: 'message', type: 'string', description: 'Transaction response message.' },
    { name: 'data', type: 'object', description: 'The transaction response data.' },
    { name: 'status', type: 'object', description: 'The authorization status.' },
    { name: 'authorizationType', type: 'string', description: 'Indicates the type of authentication required.' },
    { name: 'acsUrl', type: 'string', description: 'The URL to which the customer must be redirected to complete 3DS authentication.' },
    { name: 'reference', type: 'string', description: 'A unique reference for the transaction, used to track the payment process.' },
    { name: 'version', type: 'string', description: 'Version of 3D Secure being used.' },
    { name: 'errors', type: 'array', description: 'A list of errors, if any.' },
    { name: 'paymentRequestor', type: 'string', description: 'The entity or system initiating the payment request, such as a the merchant.' }
  ];

  const callbackParameters = [
    { name: 'transactionReference', description: 'Unique identifier assigned to the transaction' },
    { name: 'status', description: 'The current status of the transaction' },
    { name: 'errorMessage', description: 'Error message included in redirect' },
    { name: 'reference', description: 'The reference provided by the merchant during the transaction Error' }
  ];

  const errorCodes = [
    { code: '400', message: 'Invalid Request', description: 'Missing or invalid parameters.' },
    { code: '403', message: 'Unauthorized', description: 'Invalid API key or signature.' },
    { code: '500', message: 'Server Error', description: 'Unexpected server failure.' }
  ];

  const requestBodyJson = `{
    "amount": 10000,
    "email": "john.wick@aku.africa",
    "currency": "USD",
    "reference": "000045mG7mTL022NzzQ1",
    "callbackUrl": "https://example.com/",
    "webhookUrl": "https://example.com/",
    "sourceUrl": "https//sourceexample.com",
    "cardNumber": "5555555555554444",
    "tid": "TT9GMG",
    "cvv": "123",
    "expiryYear": 25,
    "expiryMonth": 12,
    "browserDetails": {
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        "acceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "language": "en-US",
        "javaEnabled": true,
        "colorDepth": 24,
        "screenHeight": 1080,
        "screenWidth": 1920,
        "timeZone": -60,
        "javaScriptEnabled": true,
        "ipAddress": "192.168.1.1",
        "cardTrustLevel": "FTD"
    },
    "customer": {
        "firstName": "Jane",
        "lastName": "Doe",
        "address": {
            "city": "Rome",
            "postcodeZip": "00184",
            "country": "IT",
            "street": "Via Cavour 21",
            "stateProvinceCode":"DE"
        }
    }
}`;

  const successResponseJson = `{
    "status": 200,
    "message": "Request successfully processed",
    "data": {
        "status": 200,
        "authorizationType": "3DS",
        "acsUrl": "https://test-gateway.akupay.africa/acs/CaW8K1xydcE5v24f_xEt",
        "reference": "CaW8K1xydcE5v24f_xEt",
        "paymentRequestor": "Merchant Limited",
        "version": "3DS2"
    },
    "errors": []
}`;

  const webhookErrorJson = `{  
  "status": 400,  
  "message": "Invalid webhook URL. The URL must start with 'http' or 'https'."  
}`;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Charge a Card (3DS)</h1>
        
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-white-muted mb-4 leading-relaxed">
            This process initializes a 3D Secure (3DS) transaction, requiring user authentication via redirection and it involves two main steps:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20 p-6 hover:border-green-500/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/20 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Initialize the Payment</h3>
                <p className="text-sm text-white/70">
                  Start the payment process and redirect the customer to the ACS (Access Control Server) for 3DS authentication.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 mb-4">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Verify the Payment</h3>
                <p className="text-sm text-white/70">
                  Confirm the payment status after the customer completes the 3DS authentication.
                </p>
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

        {/* Example Error Responses */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Example Error Responses</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Webhook URL</h3>
            <p className="text-white-muted mb-4">
              If the webhookUrl is invalid (e.g., does not start with http or https), the system will reject the request with an error message:
            </p>
            <CodeBlock code={webhookErrorJson} language="json" />
          </div>
        </div>

        {/* Important Note */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/20 p-6 mb-8 hover:border-yellow-500/40 transition-all duration-300">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-start gap-4">
            <div className="p-2 rounded-xl bg-yellow-500/20 flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Note:</h3>
              <p className="text-sm text-white/70 mb-2">
                Merchant must redirect the user to <code className="bg-yellow-500/20 px-2 py-1 rounded text-yellow-400">acsUrl</code> for 3DS authentication.
                Upon completion, the user is redirected to the callback URL with the following parameters:
              </p>

              <div className="mt-4">
                <h4 className="text-md font-semibold text-white mb-2">Callback Parameters:</h4>
                <div className="space-y-2">
                  {callbackParameters.map((param, index) => (
                    <div key={index} className="flex">
                      <code className="bg-yellow-500/20 px-2 py-1 rounded text-yellow-400 text-xs mr-2 flex-shrink-0">
                        {param.name}
                      </code>
                      <span className="text-xs text-white/60">{param.description}</span>
                    </div>
                  ))}
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
              Continue with OTP authentication for card transactions
            </p>
            <Link
              to="/server-to-server/charge-card-otp"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              Charge a Card (OTP Auth)
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};