import React, { useEffect, useState } from 'react';
import { accountService } from '../../services/account.service';
import { AccountBalance } from '../../types/api.types';
import { useAuth } from '../../contexts/AuthContext';
import { 
  DollarSign, 
  CreditCard, 
  Send, 
  Activity,
  TrendingUp,
  Wallet,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<AccountBalance | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const data = await accountService.getBalance();
      setBalance(data);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      toast.error('Failed to fetch account balance');
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    {
      name: 'Account Balance',
      value: balance ? `₦${balance.accountBalance.toLocaleString()}` : '₦0',
      icon: DollarSign,
      color: 'text-kiwi-600',
      bgColor: 'bg-kiwi-100',
    },
    {
      name: 'Total Balance',
      value: balance ? `₦${balance.totalAccountBalance.toLocaleString()}` : '₦0',
      icon: Wallet,
      color: 'text-kiwi-600',
      bgColor: 'bg-kiwi-100',
    },
    {
      name: 'Commission',
      value: balance ? `₦${balance.commission.toLocaleString()}` : '₦0',
      icon: TrendingUp,
      color: 'text-accent-600',
      bgColor: 'bg-kiwi-100',
    },
    {
      name: 'Rebate Points',
      value: balance ? balance.rebatePoints.toLocaleString() : '0',
      icon: Activity,
      color: 'text-kiwi-600',
      bgColor: 'bg-kiwi-50',
    },
  ];

  const quickActions = [
    {
      name: 'Create Virtual Account',
      description: 'Generate virtual accounts for collections',
      href: '/dashboard/virtual-accounts',
      icon: CreditCard,
      color: 'bg-kiwi-700 hover:bg-kiwi-500',
    },
    {
      name: 'Send Payout',
      description: 'Transfer funds to bank accounts',
      href: '/dashboard/payouts',
      icon: Send,
      color: 'bg-kiwi-600 hover:bg-kiwi-700',
    },
    {
      name: 'Account Management',
      description: 'View balances and transaction history',
      href: '/dashboard/account',
      icon: Users,
      color: 'bg-kiwi-700 hover:bg-kiwi-800',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-50 border border-slate-200 overflow-hidden shadow rounded">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="mt-1 text-sm text-slate-900-muted">
                Here's what's happening with your Westrapay account today.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-900-muted">Account ID</p>
              <p className="text-sm font-medium text-slate-900">
                {user?.accountPublicId?.slice(0, 8)}...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.name} className="bg-slate-50 border border-slate-200 overflow-hidden shadow rounded">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`inline-flex items-center justify-center p-3 ${stat.bgColor} rounded`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-slate-900-muted truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-slate-900">
                        {isLoading ? (
                          <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
                        ) : (
                          stat.value
                        )}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-50 border border-slate-200 shadow rounded">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <a
                key={action.name}
                href={action.href}
                className={`relative group ${action.color} rounded p-6 text-white transition-colors`}
              >
                <div>
                  <span className="rounded inline-flex p-3 bg-white bg-opacity-20">
                    <action.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {action.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-900 text-opacity-90">
                    {action.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-slate-50 border border-slate-200 shadow rounded">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Recent Activity</h2>
          <div className="text-center py-8">
            <Activity className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-2 text-sm font-medium text-slate-900">No recent activity</h3>
            <p className="mt-1 text-sm text-slate-900-muted">
              Your recent transactions and activities will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};