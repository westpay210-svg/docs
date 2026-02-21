import React from 'react';
import { Link } from 'react-router-dom';
import { Webhook as WebhookIcon, Globe, Settings, AlertTriangle, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { CodeBlock } from '../components/code/CodeBlock';
import setupWebhookImage from '../assets/setupwebhook.png';

export const Webhook: React.FC = () => {
  const setupSteps = [
    {
      step: 1,
      text: 'In the "API Key" tab on your dashboard, click on "Add webhook"'
    },
    {
      step: 2,
      text: 'You can pass the webhook URL in the request body however, you must enable webhook notification on your portal.'
    },
    {
      step: 3,
      text: 'Merchants can override the default webhook URL by passing a',
      code: 'webhookUrl',
      textAfter: 'field in the request body.'
    }
  ];

  const webhookEvents = [
    {
      event: 'transaction.success',
      description: 'A transaction was successfully completed.'
    },
    {
      event: 'initiate.authentication',
      description: 'This returns which payer authetication. mechanism recommends you use for a transaction. (3DS authetication version 1 or 2).'
    },
    {
      event: 'authenticate.payer',
      description: 'This notification is sent after the Autheticate Payer process is completed.'
    },
    {
      event: 'authorization',
      description: 'This notification is sent after the Authorization or Pay transaction process is completed.'
    },
    {
      event: 'capture',
      description: 'This notification is sent after the card Capture process is completed.'
    },
    {
      event: 'refund.success',
      description: 'A refund was successfully processed. It includes the outcome of the financial transaction processing.'
    },
    {
      event: 'update.authorization',
      description: 'This notification is sent after the Update Authorization process is completed.'
    },
    {
      event: 'void',
      description: 'This notification is sent on completeion of a Void transaction operatin.'
    },
    {
      event: 'verify',
      description: 'This notification is sent after the Verify transaction process is completed. It will include the outcome of the financial transaction processing.'
    }
  ];

  const requestBodyJson = `{
  "transactionReference": "TXN-20250929-123456",
  "merchantRef": "MER-99887766",
  "grossAmount": 1500.00,
  "requestedAmount": 1500.00,
  "transactionFee": 25.50,
  "settlementAmount": 1474.50,
  "customerId": "CUS-55667788",
  "transactionDate": "2025-09-29T14:25:30",
  "currencyCode": "NGN",
  "callbackUrl": "https://merchant.example.com/callback",
  "status": 1,
  "paymentRequestor": "WEB",
  "errorCode": null,
  "errorMessage": null,
  "externalRef": "EXT-REF-12345",
  "paymentSource": "CARD",
  "metadata": {
    "deviceType": "MOBILE",
    "customerEmail": "customer@example.com",
    "promoCode": "WELCOME100"
  },
  "createdDate": "2025-09-29T14:20:00",
  "refundedAmount": 200.00,
  "lastRefundDate": "2025-09-29T15:00:00"
}`;

  const responseJson = `{
    "authentication": {
        "threeDS": {
            "status": "Y",
            "eci": "05"
        },
        "threeDS2": {
            "status": "N",
            "challengeIndicator": "04"
        },
        "amount": 100.50,
        "time": "2025-03-17T12:34:56Z",
        "transactionId": "txn_123456789",
        "version": "2.1.0"
    },
    "authorizationResponse": {
        "cardSecurityCodeError": "N",
        "commercialCardIndicator": "Y",
        "date": "2025-03-17",
        "financialNetworkCode": "VISA",
        "financialNetworkDate": "2025-03-17",
        "posData": "123456",
        "posEntryMode": "05",
        "processingCode": "00",
        "responseCode": "00",
        "stan": "123456",
        "time": "12:34:56",
        "transactionIdentifier": "456789123"
    },
    "device": {
        "browser": "Chrome"
    },
    "gatewayEntryPoint": "WEB",
    "merchant": "Merchant_001",
    "order": {
        "amount": 100.50,
        "authenticationStatus": "SUCCESS",
        "chargeback": {
            "amount": 0.00,
            "currency": "USD"
        },
        "creationTime": "2025-03-17T12:00:00Z",
        "currency": "USD",
        "id": "order_987654321",
        "lastUpdatedTime": "2025-03-17T12:45:00Z",
        "merchantAmount": 98.00,
        "merchantCategoryCode": "5411",
        "merchantCurrency": "USD",
        "notificationUrl": "https://merchant.com/webhook",
        "reference": "INV-20250317-001",
        "status": "COMPLETED",
        "totalAuthorizedAmount": 100.50,
        "totalCapturedAmount": 100.50,
        "totalDisbursedAmount": 98.00,
        "totalRefundedAmount": 0.00
    },
    "response": {
        "acquirerCode": "00",
        "acquirerMessage": "Approved",
        "cardSecurityCode": {
            "acquirerCode": "00",
            "gatewayCode": "APPROVED"
        },
        "gatewayCode": "APPROVED",
        "gatewayRecommendation": "PROCEED"
    },
    "result": "SUCCESS",
    "sourceOfFunds": {
        "provided": {
            "card": {
                "brand": "VISA",
                "expiry": {
                    "month": "12",
                    "year": "2027"
                },
                "fundingMethod": "CREDIT",
                "number": "411111******1111",
                "scheme": "VISA",
                "storedOnFile": "YES"
            }
        },
        "type": "CARD"
    },
    "timeOfLastUpdate": "2025-03-17T12:45:00Z",
    "timeOfRecord": "2025-03-17T12:34:56Z",
    "transaction": {
        "acquirer": {
            "batch": 12345,
            "date": "2025-03-17",
            "id": "acq_987654",
            "merchantId": "mid_456789",
            "settlementDate": "2025-03-18",
            "timeZone": "UTC",
            "transactionId": "txn_123456789"
        },
        "amount": 100.50,
        "authenticationStatus": "SUCCESS",
        "authorizationCode": "AUTH123",
        "currency": "USD",
        "id": "txn_123456789",
        "receipt": "RCPT-123456",
        "reference": "INV-20250317-001",
        "source": "WEB",
        "stan": "123456",
        "terminal": "TID12345",
        "type": "PURCHASE"
    },
    "version": "1.0"
}`;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Webhook</h1>
        
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-white-muted mb-4 leading-relaxed">
            This is a HTTP callback that sends real-time notfication to a configured URL (endpoint) when specific events occur. 
            Unlike pooling where your system repeatedly calls for updates, webhook notifies your system as soon as an event 
            happens by sending a HTTP POST request to the configured URL.
          </p>
          <p className="text-white-muted mb-6">
            The specified endpoint must support receiving JSON data via an HTTPS POST request.
          </p>
        </div>

        {/* Setting Up Webhook */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Settings className="h-6 w-6 text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold text-white">Setting Up Webhook</h2>
          </div>
          
          {/* Webhook Setup Image */}
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 p-6 mb-6 hover:border-blue-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <ol className="text-white/70 space-y-3">
                {setupSteps.map((stepItem, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-400 font-bold mr-3">{stepItem.step}.</span>
                    <span>
                      {stepItem.text}
                      {stepItem.code && (
                        <>
                          {' '}
                          <code className="bg-blue-500/20 px-2 py-1 rounded text-blue-300">
                            {stepItem.code}
                          </code>
                          {stepItem.textAfter && ` ${stepItem.textAfter}`}
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border border-red-500/20 p-6 mb-6 hover:border-red-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-start gap-4">
              <div className="p-2 rounded-xl bg-red-500/20 flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Important Requirements</h3>
                <p className="text-sm text-white/70 mb-2">
                  The <code className="bg-red-500/20 px-2 py-1 rounded text-red-400">webhookUrl</code> must start with <code className="bg-red-500/20 px-2 py-1 rounded text-red-400">http</code> or <code className="bg-red-500/20 px-2 py-1 rounded text-red-400">https</code>.
                  If invalid, the request will fail with an error.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20 p-6 mb-6 hover:border-green-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-start gap-4">
              <div className="p-2 rounded-xl bg-green-500/20 flex-shrink-0">
                <Clock className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Retry Mechanism</h3>
                <p className="text-sm text-white/70">
                  If a transaction notification fails to deliver to your webhook endpoint, our retry mechanism ensures delivery.
                  Upon successful receipt, your service should respond with an <strong className="text-white">HTTP 200</strong> code. If any other response
                  is received, the notification is marked as 'failed' and retried at intervals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Webhook Events */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <WebhookIcon className="h-6 w-6 text-purple-500 mr-3" />
            <h2 className="text-xl font-semibold text-white">Webhook Events</h2>
          </div>
          <p className="text-white-muted mb-6">Below is a list of webhook events:</p>
          
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Event Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {webhookEvents.map((event, index) => (
                    <tr key={index} className="hover:bg-white/5">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-lime">{event.event}</td>
                      <td className="px-6 py-4 text-sm text-white-muted">{event.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Request Body */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Request Body:</h3>
          <CodeBlock code={requestBodyJson} language="json" />
        </div>

        {/* Important Note */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/20 p-6 mb-8 hover:border-yellow-500/40 transition-all duration-300">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-start gap-4">
            <div className="p-2 rounded-xl bg-yellow-500/20 flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Note:</h3>
              <p className="text-sm text-white/70">
                Webhook needs to be enabled and configured on the dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Response */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Response:</h3>
          <CodeBlock code={responseJson} language="json" />
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
              Continue with 3D Secure card processing implementation
            </p>
            <Link
              to="/server-to-server/charge-card-3ds"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              Charge a Card (3DS)
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};