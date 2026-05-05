import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/docs/PageHeader';
import { Callout } from '../components/docs/Callout';
import { PropertyTable } from '../components/docs/PropertyTable';
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
    <div className="max-w-4xl">
      <PageHeader
        label="Server to Server"
        title="Charge a Card (2DS)"
        description="Capture a 2D Secure card transaction directly from your server without customer redirection."
      />

      <Callout type="danger" title="Verve cards not supported">
        The 2DS flow is disallowed for Verve cards as per business rules.
      </Callout>

      <div className="mb-8 mt-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">About 2DS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-200 rounded p-4">
            <h3 className="text-[13px] font-semibold text-slate-900 mb-2">2DS Features</h3>
            <ul className="text-[13px] text-slate-600 space-y-1">
              <li>• Direct server-to-server communication</li>
              <li>• No customer redirection required</li>
              <li>• Streamlined payment flow</li>
              <li>• Faster transaction processing</li>
            </ul>
          </div>
          <div className="border border-slate-200 rounded p-4">
            <h3 className="text-[13px] font-semibold text-slate-900 mb-2">Security Considerations</h3>
            <ul className="text-[13px] text-slate-600 space-y-1">
              <li>• Lower authentication level than 3DS</li>
              <li>• Verve cards not supported</li>
              <li>• Higher risk assessment</li>
              <li>• Merchant liability considerations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Endpoint</h2>
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded font-mono text-[13px] mb-4">
          <span className="px-2 py-0.5 text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200 rounded">POST</span>
          <code className="text-slate-700">/transaction/charge</code>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Request Parameters</h2>
        <PropertyTable properties={requestParameters} />
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Headers</h2>
        <CodeBlock code="Content-Type: application/json" language="bash" />
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Request Body</h2>
        <CodeBlock code={requestBodyJson} language="json" />
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Response Fields</h2>
        <PropertyTable properties={responseFields} showRequired={false} />
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Success Response</h2>
        <CodeBlock code={successResponseJson} language="json" />
      </div>

      <Callout type="danger" title="400 Bad Request">
        Returned when request parameters are invalid. Body contains a JSON object with the card transaction response.
      </Callout>

      <div className="mb-8 mt-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">2DS vs 3DS Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-200 rounded p-4">
            <h3 className="text-[13px] font-semibold text-slate-900 mb-2">2DS Advantages</h3>
            <ul className="text-[13px] text-slate-600 space-y-1">
              <li>• No customer redirection needed</li>
              <li>• Faster transaction completion</li>
              <li>• Simplified integration</li>
              <li>• Direct server communication</li>
            </ul>
          </div>
          <div className="border border-slate-200 rounded p-4">
            <h3 className="text-[13px] font-semibold text-slate-900 mb-2">Security Considerations</h3>
            <ul className="text-[13px] text-slate-600 space-y-1">
              <li>• Lower authentication level than 3DS</li>
              <li>• Verve cards not supported</li>
              <li>• Higher risk assessment</li>
              <li>• Merchant liability considerations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-10">
        <span className="text-[13px] text-slate-500">Next in Server to Server</span>
        <Link to="/server-to-server/charge-card-otp" className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-kiwi-700 bg-kiwi-50 border border-kiwi-200 rounded hover:bg-kiwi-100 transition-colors">
          Charge Card (OTP) <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
