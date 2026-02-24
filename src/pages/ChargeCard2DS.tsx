import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Server, Globe, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import { CodeBlock } from '../components/code/CodeBlock';

export const ChargeCard2DS: React.FC = () => {
  const requestParameters = [
    { name: 'cardNumber', type: 'string', required: true, description: 'The card number of the user.' },
    { name: 'expiryYear', type: 'string', required: true, description: 'Expiry year of the card.' },
    { name: 'expiryMonth', type: 'string', required: true, description: 'Expiry month of the card.' },
    { name: 'cvv', type: 'string', required: true, description: 'The card\'s CVV security code.' },
    { name: 'amount', type: 'int', required: true, description: 'The transaction amount. (in cents/kobo format e.g "1000" is 10 USD/NGN)' },
    { name: 'currency', type: 'string', required: true, description: 'The currency of the transaction (e.g., USD, NGN).' },
    { name: 'reference', type: 'string', required: true, description: 'A unique reference for the transaction.' },
    { name: 'callbackUrl', type: 'string', required: true, description: 'Callback URL for notifications.' },
    { name: 'sourceUrl', type: 'string', required: false, description: 'The originating URL.' },
    { name: 'webhookURL', type: 'string', required: true, description: 'Custom webhook URL for notifications. The webhookUrl must start with http or https to ensure it is a valid URL.' },
    { name: 'browserDetails', type: 'object', required: false, description: 'Detailed information about the payer\'s browser. When provided, increase the transaction success rate.' },
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

  const requestBodyJson = `{
    "amount": 10000,
    "email": "john.wick@kiwi",
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
        "firstName": "John",
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
        "status": 2,
        "authorizationType": "2DS",
        "callbackUrl": "https://merchant.com/callback",
        "ref": "pajgYkkiAtfAYc4dg2QC",
        "grossAmount": 100.00,
        "reference": "0f7f209a-8134-437e-a62d-6f38187ad1d6",
        "errorMessage": "Approved",
        "errorCode": "00",
        "paymentRequestor": "KiwiFinance Service Ltd",
        "version": "2DS"
    },
    "errors": []
}`;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Charge a Card (2DS)</h1>
        
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-white-muted mb-6 leading-relaxed">
            This endpoint captures a 2D Secure (2DS) card transaction using server-to-server communication. 
          </p>
          
          {/* Important Restriction */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border border-red-500/20 p-6 mb-6 hover:border-red-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-start gap-4">
              <div className="p-2 rounded-xl bg-red-500/20 flex-shrink-0">
                <XCircle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Important Restriction</h3>
                <p className="text-sm text-white/70">
                  For <strong className="text-red-400">Verve cards</strong>, this operation is <strong className="text-red-400">disallowed</strong> as per business rules.
                </p>
              </div>
            </div>
          </div>

          {/* 2DS Features */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 mb-4">
                <Server className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">2D Secure Features</h3>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• Direct server-to-server communication</li>
                <li>• No customer redirection required</li>
                <li>• Streamlined payment flow</li>
                <li>• Faster transaction processing</li>
              </ul>
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
              <p className="text-sm text-white/70 mt-2">
                Body: JSON object containing the card transaction response.
              </p>
            </div>
          </div>
        </div>

        {/* Key Differences from 3DS */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Key Differences from 3DS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20 p-6 hover:border-green-500/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="text-xl font-semibold text-white mb-3">2DS Advantages</h3>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>• No customer redirection needed</li>
                  <li>• Faster transaction completion</li>
                  <li>• Simplified integration</li>
                  <li>• Direct server communication</li>
                </ul>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent border border-orange-500/20 p-6 hover:border-orange-500/40 transition-all duration-300">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="text-xl font-semibold text-white mb-3">Security Considerations</h3>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>• Lower authentication level than 3DS</li>
                  <li>• Verve cards not supported</li>
                  <li>• Higher risk assessment</li>
                  <li>• Merchant liability considerations</li>
                </ul>
              </div>
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
              Continue with OTP authentication for enhanced security
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