import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { virtualAccountsService } from '../../services/virtual-accounts.service';
import { VirtualAccountResponse } from '../../types/api.types';
import { 
  CreditCard, 
  Building2, 
  User, 
  Clock,
  CheckCircle,
  Copy,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ReservedAccountFormData {
  requestId: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  mobile: string;
  dob: string;
  bvn: string;
}

interface CorporateAccountFormData {
  requestId: string;
  companyName: string;
  mobile: string;
  file: FileList;
}

interface TemporaryAccountFormData {
  requestId: string;
  amount: string;
}

export const VirtualAccounts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reserved-individual' | 'reserved-corporate' | 'temporary-static' | 'temporary-dynamic'>('reserved-individual');
  const [isLoading, setIsLoading] = useState(false);
  const [createdAccount, setCreatedAccount] = useState<VirtualAccountResponse | null>(null);

  const reservedForm = useForm<ReservedAccountFormData>();
  const corporateForm = useForm<CorporateAccountFormData>();
  const temporaryForm = useForm<TemporaryAccountFormData>();

  const generateRequestId = () => {
    return `REQ${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  const handleReservedIndividual = async (data: ReservedAccountFormData) => {
    setIsLoading(true);
    try {
      const response = await virtualAccountsService.createReservedAccountIndividual(data);
      setCreatedAccount(response);
      toast.success('Reserved virtual account created successfully!');
      reservedForm.reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReservedCorporate = async (data: CorporateAccountFormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('requestId', data.requestId);
      formData.append('companyName', data.companyName);
      formData.append('mobile', data.mobile);
      if (data.file[0]) {
        formData.append('file', data.file[0]);
      }

      const response = await virtualAccountsService.createReservedAccountCorporate(formData);
      setCreatedAccount(response);
      toast.success('Corporate virtual account created successfully!');
      corporateForm.reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemporaryAccount = async (data: TemporaryAccountFormData, isDynamic: boolean = false) => {
    setIsLoading(true);
    try {
      const response = isDynamic 
        ? await virtualAccountsService.createTemporaryDynamicAccount(data)
        : await virtualAccountsService.createTemporaryStaticAccount(data);
      
      setCreatedAccount(response);
      toast.success(`${isDynamic ? 'Dynamic' : 'Static'} temporary account created successfully!`);
      temporaryForm.reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const tabs = [
    { id: 'reserved-individual', name: 'Reserved - Individual', icon: User },
    { id: 'reserved-corporate', name: 'Reserved - Corporate', icon: Building2 },
    { id: 'temporary-static', name: 'Temporary - Static', icon: Clock },
    { id: 'temporary-dynamic', name: 'Temporary - Dynamic', icon: RefreshCw },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Virtual Accounts</h1>
              <p className="mt-1 text-sm text-gray-500">
                Create and manage virtual accounts for payments collection
              </p>
            </div>
            <CreditCard className="h-8 w-8 text-nectar-primary" />
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
                    activeTab === tab.id
                      ? 'border-nectar-primary text-nectar-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'reserved-individual' && (
              <form onSubmit={reservedForm.handleSubmit(handleReservedIndividual)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Request ID</label>
                    <input
                      type="text"
                      {...reservedForm.register('requestId')}
                      defaultValue={generateRequestId()}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">BVN</label>
                    <input
                      type="text"
                      {...reservedForm.register('bvn')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      {...reservedForm.register('firstname')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      {...reservedForm.register('lastname')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                    <input
                      type="text"
                      {...reservedForm.register('middlename')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                    <input
                      type="tel"
                      {...reservedForm.register('mobile')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      {...reservedForm.register('dob')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-nectar-primary hover:bg-nectar-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nectar-primary disabled:opacity-50"
                  >
                    {isLoading ? 'Creating...' : 'Create Account'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'reserved-corporate' && (
              <form onSubmit={corporateForm.handleSubmit(handleReservedCorporate)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Request ID</label>
                    <input
                      type="text"
                      {...corporateForm.register('requestId')}
                      defaultValue={generateRequestId()}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      {...corporateForm.register('companyName')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                    <input
                      type="tel"
                      {...corporateForm.register('mobile')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Document Upload</label>
                    <input
                      type="file"
                      {...corporateForm.register('file')}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-nectar-primary file:text-white hover:file:bg-nectar-accent"
                      accept="image/*,.pdf"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-nectar-primary hover:bg-nectar-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nectar-primary disabled:opacity-50"
                  >
                    {isLoading ? 'Creating...' : 'Create Account'}
                  </button>
                </div>
              </form>
            )}

            {(activeTab === 'temporary-static' || activeTab === 'temporary-dynamic') && (
              <form onSubmit={temporaryForm.handleSubmit((data) => handleTemporaryAccount(data, activeTab === 'temporary-dynamic'))} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Request ID</label>
                    <input
                      type="text"
                      {...temporaryForm.register('requestId')}
                      defaultValue={generateRequestId()}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount (NGN)</label>
                    <input
                      type="number"
                      {...temporaryForm.register('amount')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-nectar-primary hover:bg-nectar-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nectar-primary disabled:opacity-50"
                  >
                    {isLoading ? 'Creating...' : 'Create Account'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Created Account Display */}
      {createdAccount && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Account Created Successfully!</h3>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  createdAccount.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {createdAccount.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-500">Account Name</label>
                <div className="mt-1 flex items-center">
                  <span className="text-sm text-gray-900">{createdAccount.accountName}</span>
                  <button
                    onClick={() => copyToClipboard(createdAccount.accountName)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Account Number</label>
                <div className="mt-1 flex items-center">
                  <span className="text-sm font-mono text-gray-900">{createdAccount.accountNumber}</span>
                  <button
                    onClick={() => copyToClipboard(createdAccount.accountNumber)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {createdAccount.institutionName && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Bank</label>
                  <p className="mt-1 text-sm text-gray-900">{createdAccount.institutionName}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Request ID</label>
                <p className="mt-1 text-sm font-mono text-gray-900">{createdAccount.requestId}</p>
              </div>
              
              {createdAccount.amount && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Amount</label>
                  <p className="mt-1 text-sm text-gray-900">₦{createdAccount.amount.toLocaleString()}</p>
                </div>
              )}
              
              {createdAccount.accountNumberExpiry && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Expires At</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(createdAccount.accountNumberExpiry).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};