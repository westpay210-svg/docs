import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { accountService } from '../../services/account.service';
import { AccountBalance, SingleAccountBalance } from '../../types/api.types';
import { 
  Wallet, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  RefreshCw,
  Search,
  CreditCard,
  Building2
} from 'lucide-react';
import toast from 'react-hot-toast';

interface SingleAccountFormData {
  accountNumber: string;
}

export const AccountManagement: React.FC = () => {
  const [balance, setBalance] = useState<AccountBalance | null>(null);
  const [singleBalance, setSingleBalance] = useState<SingleAccountBalance | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [isLoadingSingle, setIsLoadingSingle] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const singleAccountForm = useForm<SingleAccountFormData>();

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const data = await accountService.getBalance();
      setBalance(data);
      setLastUpdated(new Date());
      toast.success('Balance updated successfully');
    } catch (error: any) {
      console.error('Failed to fetch balance:', error);
      toast.error('Failed to fetch balance');
    } finally {
      setIsLoadingBalance(false);
    }
  };

  const handleSingleAccountLookup = async (data: SingleAccountFormData) => {
    setIsLoadingSingle(true);
    setSingleBalance(null);

    try {
      const response = await accountService.getSingleAccountBalance(data.accountNumber);
      setSingleBalance(response);
      toast.success('Account balance retrieved successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch account balance');
    } finally {
      setIsLoadingSingle(false);
    }
  };

  const balanceCards = [
    {
      title: 'Account Balance',
      value: balance?.accountBalance || 0,
      icon: DollarSign,
      color: 'text-kiwi-600',
      bgColor: 'bg-kiwi-100',
      description: 'Available funds in your account'
    },
    {
      title: 'Total Balance',
      value: balance?.totalAccountBalance || 0,
      icon: Wallet,
      color: 'text-kiwi-600',
      bgColor: 'bg-kiwi-100',
      description: 'Total account balance including overdraft'
    },
    {
      title: 'Overdraft Limit',
      value: balance?.overdraftLimit || 0,
      icon: CreditCard,
      color: 'text-accent-600',
      bgColor: 'bg-kiwi-100',
      description: 'Available overdraft facility'
    },
    {
      title: 'Commission',
      value: balance?.commission || 0,
      icon: TrendingUp,
      color: 'text-kiwi-600',
      bgColor: 'bg-kiwi-50',
      description: 'Commission earned'
    },
    {
      title: 'Rebate Points',
      value: balance?.rebatePoints || 0,
      icon: Activity,
      color: 'text-accent-600',
      bgColor: 'bg-kiwi-100',
      description: 'Loyalty points earned',
      isPoints: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Account Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                View and manage your account balances and financial information
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <button
                onClick={fetchBalance}
                disabled={isLoadingBalance}
                className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-slate-900 bg-kiwi-700 hover:bg-kiwi-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kiwi-700 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${isLoadingBalance ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {balanceCards.map((card, index) => (
              <div key={card.title} className="bg-white border border-gray-200 rounded p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`inline-flex items-center justify-center p-3 ${card.bgColor} rounded`}>
                      <card.icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {card.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {isLoadingBalance ? (
                            <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                          ) : card.isPoints ? (
                            card.value.toLocaleString()
                          ) : (
                            `₦${card.value.toLocaleString()}`
                          )}
                        </div>
                      </dd>
                      <dd className="mt-1">
                        <p className="text-xs text-gray-500">{card.description}</p>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Account Summary */}
          <div className="bg-gradient-to-r from-kiwi-700 to-kiwi-600 rounded p-6 text-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Account Summary</h3>
                <p className="mt-1 text-sm text-slate-900 text-opacity-90">
                  Complete overview of your financial status
                </p>
              </div>
              <Building2 className="h-8 w-8 text-slate-900 text-opacity-80" />
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-slate-900 text-opacity-80">Available Balance</p>
                <p className="text-2xl font-bold">
                  {balance ? `₦${balance.accountBalance.toLocaleString()}` : '₦0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-900 text-opacity-80">Total Resources</p>
                <p className="text-2xl font-bold">
                  {balance ? `₦${(balance.accountBalance + balance.overdraftLimit).toLocaleString()}` : '₦0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-900 text-opacity-80">Earnings</p>
                <p className="text-2xl font-bold">
                  {balance ? `₦${balance.commission.toLocaleString()}` : '₦0'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Single Account Lookup */}
      <div className="bg-white shadow rounded">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Account Balance Lookup</h2>
              <p className="mt-1 text-sm text-gray-500">
                Check the balance of a specific account number
              </p>
            </div>
            <Search className="h-6 w-6 text-gray-400" />
          </div>

          <form onSubmit={singleAccountForm.handleSubmit(handleSingleAccountLookup)} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex-1">
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                  Account Number
                </label>
                <input
                  type="text"
                  {...singleAccountForm.register('accountNumber')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-kiwi-700 focus:border-kiwi-700"
                  placeholder="Enter account number"
                  maxLength={10}
                  required
                />
              </div>
              <div className="flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
                <button
                  type="submit"
                  disabled={isLoadingSingle}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-slate-900 bg-kiwi-700 hover:bg-kiwi-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kiwi-700 disabled:opacity-50"
                >
                  {isLoadingSingle ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Check Balance
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Single Account Result */}
          {singleBalance && (
            <div className="mt-6 bg-gray-50 rounded p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Account Balance Result</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Account Number</p>
                  <p className="text-lg font-medium text-gray-900 font-mono">
                    {singleBalance.accountNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Account Balance</p>
                  <p className="text-lg font-medium text-gray-900">
                    ₦{singleBalance.accountBalance.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white shadow rounded">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Account Information</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-kiwi-100">
                  <DollarSign className="h-5 w-5 text-kiwi-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Balance Calculation</h3>
                <p className="text-sm text-gray-500">
                  Your total balance includes your account balance plus any available overdraft facility.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-kiwi-100">
                  <TrendingUp className="h-5 w-5 text-kiwi-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Commission Tracking</h3>
                <p className="text-sm text-gray-500">
                  Track your earnings from transactions and services provided through the platform.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-kiwi-100">
                  <Activity className="h-5 w-5 text-accent-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Rebate Points</h3>
                <p className="text-sm text-gray-500">
                  Earn loyalty points for your transactions that can be redeemed for various benefits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};