import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, AlertCircle, Globe, Info, ArrowRight } from 'lucide-react';

export const StatusCode: React.FC = () => {
  const transactionStatusCodes = [
    { code: 0, status: 'COMPLETED', description: 'The transaction was successfully processed and settled.', icon: CheckCircle, color: 'green' },
    { code: 1, status: 'PENDING', description: 'The transaction has been initiated and is awaiting further processing.', icon: Clock, color: 'yellow' },
    { code: 2, status: 'AUTHORIZED', description: 'The transaction has been approved successfully.', icon: CheckCircle, color: 'green' },
    { code: 3, status: 'CAPTURED', description: 'The transaction funds have been successfully transferred.', icon: CheckCircle, color: 'green' },
    { code: 4, status: 'DECLINED', description: 'The transaction was rejected by the payment processor or issuing bank.', icon: XCircle, color: 'red' },
    { code: 5, status: 'CANCELED', description: 'The transaction was canceled by the user or merchant before processing.', icon: XCircle, color: 'gray' },
    { code: 6, status: 'REFUNDED', description: 'The transaction amount was fully refunded to the customer.', icon: CheckCircle, color: 'purple' },
    { code: 7, status: 'CHARGED BACK', description: 'The transaction was reversed due to a customer dispute (chargeback).', icon: AlertCircle, color: 'orange' },
    { code: 8, status: 'IN PROGRESS', description: 'The transaction is currently being processed.', icon: Clock, color: 'blue' },
    { code: 9, status: 'VOIDED', description: 'The transaction was voided, meaning no funds were transferred.', icon: XCircle, color: 'gray' },
    { code: 10, status: 'PENDING REVIEW', description: 'The transaction is under manual review for fraud or compliance checks.', icon: AlertCircle, color: 'yellow' },
    { code: 11, status: 'PARTIALLY REFUNDED', description: 'A portion of the transaction amount was refunded.', icon: CheckCircle, color: 'purple' },
    { code: 12, status: 'UNDER INVESTIGATION', description: 'The transaction is flagged for potential fraud and is under investigation.', icon: AlertCircle, color: 'orange' },
    { code: 13, status: 'FAILED TO CAPTURE', description: 'The capture attempt failed after the transaction was authorized.', icon: XCircle, color: 'red' },
    { code: 14, status: 'EXPIRED', description: 'The transaction was not completed within the required timeframe and expired.', icon: AlertCircle, color: 'orange' },
    { code: 15, status: 'SUSPENDED', description: 'The transaction has been temporarily placed on hold pending further action.', icon: AlertCircle, color: 'yellow' },
    { code: 16, status: 'TRANSFERRED', description: 'The transaction funds were successfully transferred to another account.', icon: CheckCircle, color: 'green' },
    { code: 17, status: 'SCHEDULED', description: 'The transaction is set to be processed at a future date (e.g., recurring payments).', icon: Clock, color: 'blue' }
  ];


  const getStatusColor = (color: string) => {
    const colorMap = {
      green: 'text-green-400 bg-green-500/10 border-green-500/30',
      red: 'text-red-400 bg-red-500/10 border-red-500/30',
      yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
      blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      purple: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      orange: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
      gray: 'text-gray-400 bg-gray-500/10 border-gray-500/30'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Status Code</h1>
        
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-white-muted mb-6 leading-relaxed">
            This document provides comprehensive information about transaction status codes used throughout the Kiwi Finance API system. 
            Understanding these codes is essential for proper transaction handling and status tracking.
          </p>
        </div>

        {/* Transaction Status Codes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Transaction Status Codes</h2>
          
          <div className="grid gap-4">
            {transactionStatusCodes.map((status) => {
              const IconComponent = status.icon;
              return (
                <div key={status.code} className={`rounded-lg border p-4 ${getStatusColor(status.color)}`}>
                  <div className="flex items-start">
                    <div className="flex items-center mr-4">
                      <IconComponent className="h-5 w-5 mr-2" />
                      <span className="font-mono text-lg font-bold">{status.code}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{status.status}</h3>
                      <p className="text-sm opacity-90">{status.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Guidelines */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Additional Guidelines</h2>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 mb-4">
                <Info className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Implementation Notes</h3>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• Transactions with statuses such as <strong className="text-white">PENDING_REVIEW</strong>, <strong className="text-white">UNDER_INVESTIGATION</strong>, or <strong className="text-white">SUSPENDED</strong> may require further action to proceed.</li>
                <li>• It is recommended to handle each status appropriately to provide a seamless user experience.</li>
                <li>• Always implement proper error handling and status monitoring for production systems.</li>
                <li>• Use webhook notifications to receive real-time status updates for asynchronous processing.</li>
              </ul>
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
              Continue with transaction history and reporting capabilities
            </p>
            <Link
              to="/server-to-server/transaction-history"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              Transaction History
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};