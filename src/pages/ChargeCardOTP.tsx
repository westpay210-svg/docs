import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/docs/PageHeader';
import { Callout } from '../components/docs/Callout';
import { PropertyTable } from '../components/docs/PropertyTable';
import { StepList } from '../components/docs/StepList';
import { CodeBlock } from '../components/code/CodeBlock';

export const ChargeCardOTP: React.FC = () => {
  const requestParameters = [
    { name: 'cardNumber', type: 'string', required: true, description: 'The card number of the user.' },
    { name: 'expiryYear', type: 'string', required: true, description: 'Expiry year of the card.' },
    { name: 'expiryMonth', type: 'string', required: true, description: 'Expiry month of the card.' },
    { name: 'cvv', type: 'string', required: true, description: 'The card\'s CVV security code.' },
    { name: 'amount', type: 'int', required: true, description: 'The transaction amount. (in cents/kobo format e.g "1000" is 10 USD/NGN)' },
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
  "amount": 10000,// The amount is formatted in Cent (e.g., 10000 represents 100.00 in the base currency).
  "email": "example@gmail.com",
  "currency": "USD",
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
    <div className="max-w-4xl">
      <PageHeader
        label="Server to Server"
        title="Charge a Card (OTP Auth)"
        description="Process card payments using SMS OTP authentication. The customer receives an OTP to their registered phone number."
      />

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">OTP Process Flow</h2>
        <StepList steps={[
          { title: 'Transaction Initiation', description: 'Customer provides card details and PIN to initiate the payment.' },
          { title: 'OTP Generation', description: 'System sends a one-time password to the customer\'s registered phone number via SMS.' },
          { title: 'OTP Entry', description: 'Customer enters the received OTP to authorize the transaction.' },
          { title: 'Transaction Completion', description: 'Payment is processed upon successful OTP verification.' },
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

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Response Fields</h2>
        <PropertyTable properties={responseFields} showRequired={false} />
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Success Response</h2>
        <CodeBlock code={successResponseJson} language="json" />
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
        <Link to="/server-to-server/authorize-card-transaction" className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-kiwi-700 bg-kiwi-50 border border-kiwi-200 rounded hover:bg-kiwi-100 transition-colors">
          Authorize Card Transaction <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
