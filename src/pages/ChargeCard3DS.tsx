import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/docs/PageHeader';
import { Callout } from '../components/docs/Callout';
import { PropertyTable } from '../components/docs/PropertyTable';
import { StepList } from '../components/docs/StepList';
import { CodeBlock } from '../components/code/CodeBlock';

export const ChargeCard3DS: React.FC = () => {
  const requestParameters = [
    { name: 'cardNumber', type: 'string', required: true, description: 'The card number of the user.' },
    { name: 'expiryYear', type: 'string', required: true, description: 'Expiry year of the card.' },
    { name: 'expiryMonth', type: 'string', required: true, description: 'Expiry month of the card.' },
    { name: 'cvv', type: 'string', required: true, description: 'The card\'s CVV security code.' },
    { name: 'amount', type: 'int', required: true, description: 'The transaction amount. (in cents/kobo format e.g "1000" is 10 USD/NGN)' },
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
        "acsUrl": "https://sandbox-checkout.westrapay.com/acs/CaW8K1xydcE5v24f_xEt",
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
    <div className="max-w-4xl">
      <PageHeader
        label="Server to Server"
        title="Charge a Card (3DS)"
        description="Initialize a 3D Secure card transaction. The customer is redirected to the ACS for authentication, then returns to your callback URL."
      />

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">How It Works</h2>
        <StepList steps={[
          { title: 'Initialize the Payment', description: 'Start the payment process and redirect the customer to the ACS (Access Control Server) for 3DS authentication.' },
          { title: 'Verify the Payment', description: 'Confirm the payment status after the customer completes the 3DS authentication.' },
        ]} />
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

      <Callout type="warning" title="3DS Redirect Required">
        Merchant must redirect the user to <code>acsUrl</code> for 3DS authentication. Upon completion, the user is redirected to the callback URL with the following parameters:
        <ul className="mt-2 space-y-1">
          {callbackParameters.map((param, i) => (
            <li key={i}><code>{param.name}</code> — {param.description}</li>
          ))}
        </ul>
      </Callout>

      <div className="mb-8 mt-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Response Fields</h2>
        <PropertyTable properties={responseFields} showRequired={false} />
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Success Response</h2>
        <CodeBlock code={successResponseJson} language="json" />
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Webhook URL Validation</h2>
        <Callout type="danger" title="Invalid Webhook URL">
          If the webhookUrl does not start with <code>http</code> or <code>https</code>, the system will reject the request with a 400 error.
        </Callout>
        <div className="mt-4">
          <CodeBlock code={webhookErrorJson} language="json" />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Error Responses</h2>
        <div className="border border-slate-200 rounded overflow-hidden my-4">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Code</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Message</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {errorCodes.map((e, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-[13px] text-red-600">{e.code}</td>
                  <td className="px-4 py-3 text-[13px] text-slate-700">{e.message}</td>
                  <td className="px-4 py-3 text-[13px] text-slate-500">{e.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-10">
        <span className="text-[13px] text-slate-500">Next in Server to Server</span>
        <Link to="/server-to-server/charge-card-2ds" className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-kiwi-700 bg-kiwi-50 border border-kiwi-200 rounded hover:bg-kiwi-100 transition-colors">
          Charge Card (2DS) <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
