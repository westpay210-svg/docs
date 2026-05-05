import React from 'react';
import { PageHeader } from '../components/docs/PageHeader';
import { Callout } from '../components/docs/Callout';
import { StepList } from '../components/docs/StepList';
import { CodeBlock } from '../components/code/CodeBlock';

export const Webhook: React.FC = () => {
  const setupSteps = [
    {
      step: 1,
      text: 'In the "API Key" tab on your dashboard, click on "Add webhook"',
    },
    {
      step: 2,
      text: 'You can pass the webhook URL in the request body however, you must enable webhook notification on your portal.',
    },
    {
      step: 3,
      text: 'Merchants can override the default webhook URL by passing a',
      code: 'webhookUrl',
      textAfter: 'field in the request body.',
    },
  ];

  const webhookEvents = [
    {
      event: 'transaction.success',
      description: 'A transaction was successfully completed.',
    },
    {
      event: 'initiate.authentication',
      description: 'This returns which payer authetication. mechanism recommends you use for a transaction. (3DS authetication version 1 or 2).',
    },
    {
      event: 'authenticate.payer',
      description: 'This notification is sent after the Autheticate Payer process is completed.',
    },
    {
      event: 'authorization',
      description: 'This notification is sent after the Authorization or Pay transaction process is completed.',
    },
    {
      event: 'capture',
      description: 'This notification is sent after the card Capture process is completed.',
    },
    {
      event: 'refund.success',
      description: 'A refund was successfully processed. It includes the outcome of the financial transaction processing.',
    },
    {
      event: 'update.authorization',
      description: 'This notification is sent after the Update Authorization process is completed.',
    },
    {
      event: 'void',
      description: 'This notification is sent on completeion of a Void transaction operatin.',
    },
    {
      event: 'verify',
      description: 'This notification is sent after the Verify transaction process is completed. It will include the outcome of the financial transaction processing.',
    },
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
  "currencyCode": "USD",
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

  const stepsForList = setupSteps.map((s, i) => ({
    title: `Step ${i + 1}`,
    description:
      s.text +
      (s.code ? ` Use the ${s.code} field.` : ''),
  }));

  return (
    <div className="max-w-4xl">
      <PageHeader
        label="Webhooks"
        title="Webhook"
        description="Receive real-time HTTP POST notifications whenever a payment event occurs. Configure a webhook endpoint to keep your system in sync without polling."
      />

      {/* How Webhooks Work */}
      <h2 className="text-base font-semibold text-slate-900 mb-4">How Webhooks Work</h2>
      <Callout type="info">
        Unlike polling, webhooks push notifications to your endpoint the moment an event happens. Your endpoint must accept HTTPS POST requests with JSON bodies.
      </Callout>

      {/* Setup */}
      <h2 className="text-base font-semibold text-slate-900 mb-4 mt-8">Setup</h2>
      <StepList steps={stepsForList} />
      <Callout type="danger" title="HTTPS required">
        The webhookUrl must start with http or https. Invalid URLs will be rejected with an error.
      </Callout>
      <Callout type="info" title="Retry mechanism">
        If delivery fails, webhooks are retried at intervals. Respond with HTTP 200 on success. Any other response marks the notification as failed.
      </Callout>

      {/* Webhook Events */}
      <h2 className="text-base font-semibold text-slate-900 mb-4 mt-8">Webhook Events</h2>
      <div className="border border-slate-200 rounded overflow-hidden my-4">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Event</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {webhookEvents.map((e, i) => (
              <tr key={i}>
                <td className="px-4 py-2.5 font-mono text-slate-800 whitespace-nowrap">{e.event}</td>
                <td className="px-4 py-2.5 text-slate-500">{e.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Request Body */}
      <h2 className="text-base font-semibold text-slate-900 mb-4 mt-8">Request Body</h2>
      <CodeBlock code={requestBodyJson} language="json" />

      {/* Response Example */}
      <h2 className="text-base font-semibold text-slate-900 mb-4 mt-8">Response Example</h2>
      <CodeBlock code={responseJson} language="json" />

      <Callout type="note">
        Webhook must be enabled and configured in your dashboard before events will be sent.
      </Callout>
    </div>
  );
};
