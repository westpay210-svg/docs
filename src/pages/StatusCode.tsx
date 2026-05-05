import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/docs/PageHeader';
import { Callout } from '../components/docs/Callout';

export const StatusCode: React.FC = () => {
  const transactionStatusCodes = [
    { code: 0, status: 'COMPLETED', description: 'The transaction was successfully processed and settled.', color: 'green' },
    { code: 1, status: 'PENDING', description: 'The transaction has been initiated and is awaiting further processing.', color: 'yellow' },
    { code: 2, status: 'AUTHORIZED', description: 'The transaction has been approved successfully.', color: 'green' },
    { code: 3, status: 'CAPTURED', description: 'The transaction funds have been successfully transferred.', color: 'green' },
    { code: 4, status: 'DECLINED', description: 'The transaction was rejected by the payment processor or issuing bank.', color: 'red' },
    { code: 5, status: 'CANCELED', description: 'The transaction was canceled by the user or merchant before processing.', color: 'gray' },
    { code: 6, status: 'REFUNDED', description: 'The transaction amount was fully refunded to the customer.', color: 'purple' },
    { code: 7, status: 'CHARGED BACK', description: 'The transaction was reversed due to a customer dispute (chargeback).', color: 'orange' },
    { code: 8, status: 'IN PROGRESS', description: 'The transaction is currently being processed.', color: 'blue' },
    { code: 9, status: 'VOIDED', description: 'The transaction was voided, meaning no funds were transferred.', color: 'gray' },
    { code: 10, status: 'PENDING REVIEW', description: 'The transaction is under manual review for fraud or compliance checks.', color: 'yellow' },
    { code: 11, status: 'PARTIALLY REFUNDED', description: 'A portion of the transaction amount was refunded.', color: 'purple' },
    { code: 12, status: 'UNDER INVESTIGATION', description: 'The transaction is flagged for potential fraud and is under investigation.', color: 'orange' },
    { code: 13, status: 'FAILED TO CAPTURE', description: 'The capture attempt failed after the transaction was authorized.', color: 'red' },
    { code: 14, status: 'EXPIRED', description: 'The transaction was not completed within the required timeframe and expired.', color: 'orange' },
    { code: 15, status: 'SUSPENDED', description: 'The transaction has been temporarily placed on hold pending further action.', color: 'yellow' },
    { code: 16, status: 'TRANSFERRED', description: 'The transaction funds were successfully transferred to another account.', color: 'green' },
    { code: 17, status: 'SCHEDULED', description: 'The transaction is set to be processed at a future date (e.g., recurring payments).', color: 'blue' },
  ];

  const getStatusBadgeClass = (color: string) => {
    const map: Record<string, string> = {
      green: 'bg-kiwi-50 text-kiwi-700 border border-kiwi-200',
      red: 'bg-red-50 text-red-700 border border-red-200',
      yellow: 'bg-amber-50 text-amber-700 border border-amber-200',
      blue: 'bg-slate-100 text-slate-700 border border-slate-200',
      purple: 'bg-slate-100 text-slate-600 border border-slate-200',
      orange: 'bg-amber-100 text-amber-800 border border-amber-300',
      gray: 'bg-slate-100 text-slate-500 border border-slate-200',
    };
    return map[color] || map.gray;
  };

  return (
    <div className="max-w-4xl">
      <PageHeader
        label="Server to Server"
        title="Status Codes"
        description="Transaction status codes used throughout the Westrapay API. Use these to handle payment outcomes and update your system accordingly."
      />

      {/* Transaction Status Codes */}
      <h2 className="text-base font-semibold text-slate-900 mb-4">Transaction Status Codes</h2>
      <div className="border border-slate-200 rounded overflow-hidden my-4">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Code</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {transactionStatusCodes.map((s) => (
              <tr key={s.code}>
                <td className="px-4 py-2.5 font-mono text-[13px] font-bold text-slate-700">{s.code}</td>
                <td className="px-4 py-2.5">
                  <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded ${getStatusBadgeClass(s.color)}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-[13px] text-slate-500">{s.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Implementation Notes */}
      <h2 className="text-base font-semibold text-slate-900 mb-4 mt-8">Implementation Notes</h2>
      <Callout type="info" title="Implementation notes">
        <ul className="space-y-1.5 text-[13px]">
          <li>• Transactions with statuses such as <strong>PENDING_REVIEW</strong>, <strong>UNDER_INVESTIGATION</strong>, or <strong>SUSPENDED</strong> may require further action to proceed.</li>
          <li>• It is recommended to handle each status appropriately to provide a seamless user experience.</li>
          <li>• Always implement proper error handling and status monitoring for production systems.</li>
          <li>• Use webhook notifications to receive real-time status updates for asynchronous processing.</li>
        </ul>
      </Callout>

      {/* Next step footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-10">
        <span className="text-[13px] text-slate-500">Next</span>
        <Link
          to="/server-to-server/transaction-history"
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-kiwi-700 bg-kiwi-50 border border-kiwi-200 rounded hover:bg-kiwi-100 transition-colors"
        >
          Transaction History <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
