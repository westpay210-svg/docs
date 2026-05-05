import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/docs/PageHeader';
import { Callout } from '../components/docs/Callout';
import { PropertyTable } from '../components/docs/PropertyTable';
import { CodeBlock } from '../components/code/CodeBlock';

export const VerifyTransactionStatus: React.FC = () => {
  const headers = [
    { key: 'Authorization', value: '{PRIVATE_KEY}', required: true, description: 'The merchant\'s private key.' },
    { key: 'Content-Type', value: 'application/json', required: true, description: 'Specifies the media type of the resource.' }
  ];

  const pathParameters = [
    { name: 'transactionReference', type: 'string', required: true, description: 'The unique reference identifier of the transaction.' }
  ];

  const responseFields = [
    { name: 'transactionReference', type: 'string', description: 'A unique identifier assigned to the transaction.' },
    { name: 'merchantRef', type: 'string', description: 'The reference provided by the merchant during the transaction.' },
    { name: 'status', type: 'string', description: 'The current status of the transaction. Refer to Transaction Status table.' },
    { name: 'statusCode', type: 'integer', description: 'The numerical code representing the transaction status. Refer to Transaction Status table.' },
    { name: 'grossAmount', type: 'decimal', description: 'The total transaction amount, including fees (e.g., 100.00).' },
    { name: 'currencyCode', type: 'string', description: 'The currency used in the transaction (e.g., "USD", "NGN").' },
    { name: 'date', type: 'string', description: 'The date and time the transaction was initiated, formatted in ISO 8601 (YYYY-MM-DDTHH:MM:SSZ).' },
    { name: 'customerId', type: 'string', description: 'The unique identifier of the customer, which may include name and email.' }
  ];

  const errorCodes = [
    { code: '401', message: 'Unauthorized', description: 'Invalid merchant private key.' },
    { code: '403', message: 'Forbidden', description: 'IP address not whitelisted.' },
    { code: '404', message: 'Not Found', description: 'Transaction reference not found.' }
  ];

  const successResponseJson = `{
    "status": 200,
    "message": "Request successfully processed",
    "data": {
        "merchant": "Merchant 1",
        "transactionReference": "GjO2EBd_k1pu4mHmluXn",
        "merchantRef": "ecc0c53f-5130-4717-8ef1-1ac1ef02214c",
        "grossAmount": 50.75,
        "requestedAmount": 50.00,
        "transactionFee": 0.75,
        "settlementAmount": 49.25,
        "customerId": "example@gmail.com",
        "currencyCode": "USD",
        "callbackUrl": "https://merchanturl.com",
        "authorizationType": "OPEN",
        "paymentRequestor": "Merchant Limited",
        "transactionDate": "2025-03-11T14:43:50.172275",
        "status": 2
    },
    "errors": []
}`;

  const error401Json = `{
  "status": "error",
  "message": "Unauthorized request. Please provide a valid merchant private key."
}`;

  const error403Json = `{
  "status": "error",
  "message": "Access denied. Your IP address is not whitelisted."
}`;

  const error404Json = `{
  "status": "error",
  "message": "Transaction not found for reference: TRX123456789."
}`;

  return (
    <div className="max-w-4xl">
      <PageHeader
        label="Server to Server"
        title="Verify Transaction Status"
        description="Check the current status of any transaction using its unique reference. Always verify with your private key before fulfilling orders."
      />

      <Callout type="danger" title="Private key required">
        This endpoint uses your private key (x-private-key header). Never expose it in client-side code.
      </Callout>

      <div className="mb-8 mt-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Endpoint</h2>
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded font-mono text-[13px] mb-4">
          <span className="px-2 py-0.5 text-[11px] font-bold bg-kiwi-50 text-kiwi-700 border border-kiwi-200 rounded">GET</span>
          <code className="text-slate-700">/transaction/verify/{'{transactionReference}'}</code>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Headers</h2>
        <div className="border border-slate-200 rounded overflow-hidden my-4">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Key</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {headers.map((h, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-[13px] text-slate-700">{h.key}</td>
                  <td className="px-4 py-3 font-mono text-[13px] text-slate-500">{h.value}</td>
                  <td className="px-4 py-3 text-[13px] text-slate-500">{h.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Path Parameters</h2>
        <PropertyTable properties={pathParameters} />
      </div>

      <Callout type="note">
        No request body required — this endpoint uses the path parameter and headers only.
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

      <div className="mb-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Example Error Responses</h2>

        <h3 className="text-[13px] font-semibold text-slate-700 mb-2">HTTP 401: Unauthorized</h3>
        <CodeBlock code={error401Json} language="json" />

        <h3 className="text-[13px] font-semibold text-slate-700 mb-2 mt-4">HTTP 403: Forbidden</h3>
        <CodeBlock code={error403Json} language="json" />

        <h3 className="text-[13px] font-semibold text-slate-700 mb-2 mt-4">HTTP 404: Not Found</h3>
        <CodeBlock code={error404Json} language="json" />
      </div>

      <Callout type="warning" title="IP Whitelisting">
        The merchant IP must be whitelisted for private key usage. Contact support to configure.
      </Callout>

      <div className="mt-6">
        <Callout type="note">
          Refer to the <Link to="/server-to-server/status-code" className="underline text-slate-700 hover:text-slate-900">Transaction Status table</Link> for all possible statuses and their meanings.
        </Callout>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-10">
        <span className="text-[13px] text-slate-500">Next in Server to Server</span>
        <Link to="/server-to-server/refund" className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-kiwi-700 bg-kiwi-50 border border-kiwi-200 rounded hover:bg-kiwi-100 transition-colors">
          Refund <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
