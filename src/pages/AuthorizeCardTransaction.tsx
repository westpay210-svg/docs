import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/docs/PageHeader';
import { Callout } from '../components/docs/Callout';
import { PropertyTable } from '../components/docs/PropertyTable';
import { StepList } from '../components/docs/StepList';
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
    <div className="max-w-4xl">
      <PageHeader
        label="Server to Server"
        title="Authorize a Card Transaction"
        description="Complete OTP authorization for a pending card transaction. Use the transactionReference from the Charge a Card response."
      />

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Authorization Flow</h2>
        <StepList steps={[
          { title: 'Charge Card', description: 'Initiate a charge using the OTP flow — the system sends an OTP to the customer\'s registered phone.' },
          { title: 'Customer Receives OTP', description: 'Customer receives the one-time password via SMS and enters it in your application.' },
          { title: 'Authorize Transaction', description: 'Submit the OTP and transactionReference to this endpoint to complete the payment.' },
        ]} />
      </div>

      <Callout type="info" title="Use the right reference">
        The transactionReference in this request must match the one returned from the Charge a Card (OTP) response.
      </Callout>

      <div className="mb-8 mt-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Endpoint</h2>
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded font-mono text-[13px] mb-4">
          <span className="px-2 py-0.5 text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200 rounded">POST</span>
          <code className="text-slate-700">/transaction/charge/authorize</code>
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
        <h2 className="text-base font-semibold text-slate-900 mb-4">Transaction Status</h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded bg-white">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-[11px] font-bold">2</span>
            <span className="text-[13px] font-medium text-green-700">AUTHORIZED</span>
            <span className="text-[13px] text-slate-500">— Transaction successfully authorized</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded bg-white">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-[11px] font-bold">✕</span>
            <span className="text-[13px] font-medium text-red-700">FAILED</span>
            <span className="text-[13px] text-slate-500">— Authorization failed or declined</span>
          </div>
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
        <Link to="/server-to-server/verify-transaction-status" className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-kiwi-700 bg-kiwi-50 border border-kiwi-200 rounded hover:bg-kiwi-100 transition-colors">
          Verify Transaction Status <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
