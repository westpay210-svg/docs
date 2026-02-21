import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { payoutsService } from '../../services/payouts.service';
import { Bank, NameEnquiryResponse, TransferResponse } from '../../types/api.types';
import { 
  Send, 
  Search, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Copy,
  Eye,
  Building2
} from 'lucide-react';
import toast from 'react-hot-toast';

interface TransferFormData {
  amount: number;
  bankCode: string;
  recipientAccountNumber: string;
  narration: string;
  requestId: string;
}

interface NameEnquiryFormData {
  bankCode: string;
  accountNumber: string;
}

export const Payouts: React.FC = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [nameEnquiry, setNameEnquiry] = useState<NameEnquiryResponse | null>(null);
  const [isLoadingBanks, setIsLoadingBanks] = useState(true);
  const [isLoadingName, setIsLoadingName] = useState(false);
  const [isLoadingTransfer, setIsLoadingTransfer] = useState(false);
  const [transferResult, setTransferResult] = useState<TransferResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'name-enquiry' | 'transfer'>('name-enquiry');

  const nameForm = useForm<NameEnquiryFormData>();
  const transferForm = useForm<TransferFormData>();

  useEffect(() => {
    fetchBanks();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredBanks(
        banks.filter(bank => 
          bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bank.code.includes(searchTerm)
        )
      );
    } else {
      setFilteredBanks(banks);
    }
  }, [searchTerm, banks]);

  const fetchBanks = async () => {
    try {
      const data = await payoutsService.getBankList();
      setBanks(data);
      setFilteredBanks(data);
    } catch (error) {
      toast.error('Failed to fetch banks');
    } finally {
      setIsLoadingBanks(false);
    }
  };

  const generateRequestId = () => {
    return `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  const handleNameEnquiry = async (data: NameEnquiryFormData) => {
    setIsLoadingName(true);
    setNameEnquiry(null);
    
    try {
      const response = await payoutsService.nameEnquiry(data.bankCode, data.accountNumber);
      setNameEnquiry(response);
      toast.success('Account name resolved successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to resolve account name');
    } finally {
      setIsLoadingName(false);
    }
  };

  const handleTransfer = async (data: TransferFormData) => {
    setIsLoadingTransfer(true);
    setTransferResult(null);

    try {
      const response = await payoutsService.initiateTransfer({
        ...data,
        requestId: data.requestId || generateRequestId()
      });
      setTransferResult(response);
      toast.success('Transfer initiated successfully!');
      transferForm.reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to initiate transfer');
    } finally {
      setIsLoadingTransfer(false);
    }
  };

  const checkTransferStatus = async (reference: string) => {
    try {
      const response = await payoutsService.getTransferStatus(reference);
      setTransferResult(response);
      toast.success('Transfer status updated');
    } catch (error: any) {
      toast.error('Failed to get transfer status');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETE':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'PENDING':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'FAILED':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETE':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
              <p className="mt-1 text-sm text-gray-500">
                Send money to bank accounts across the globe
              </p>
            </div>
            <Send className="h-8 w-8 text-nectar-primary" />
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('name-enquiry')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'name-enquiry'
                    ? 'border-nectar-primary text-nectar-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Name Enquiry
                </div>
              </button>
              <button
                onClick={() => setActiveTab('transfer')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'transfer'
                    ? 'border-nectar-primary text-nectar-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Send className="h-4 w-4 mr-2" />
                  Send Transfer
                </div>
              </button>
            </nav>
          </div>

          {/* Bank Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Banks
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-nectar-primary focus:border-nectar-primary"
                placeholder="Search banks by name or code..."
              />
            </div>
            
            {searchTerm && (
              <div className="mt-2 max-h-60 overflow-y-auto border border-gray-200 rounded-md">
                {filteredBanks.length === 0 ? (
                  <div className="p-3 text-sm text-gray-500">No banks found</div>
                ) : (
                  filteredBanks.slice(0, 10).map((bank) => (
                    <div
                      key={bank.id}
                      onClick={() => {
                        setSelectedBank(bank);
                        setSearchTerm(bank.name);
                        nameForm.setValue('bankCode', bank.code);
                        transferForm.setValue('bankCode', bank.code);
                      }}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <img
                          src={bank.logoUrl}
                          alt={bank.name}
                          className="h-6 w-6 mr-3 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{bank.name}</p>
                          <p className="text-xs text-gray-500">Code: {bank.code}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Tab Content */}
          {activeTab === 'name-enquiry' && (
            <form onSubmit={nameForm.handleSubmit(handleNameEnquiry)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bank Code</label>
                  <input
                    type="text"
                    {...nameForm.register('bankCode')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                    placeholder="Enter bank code or select from search"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Number</label>
                  <input
                    type="text"
                    {...nameForm.register('accountNumber')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                    placeholder="Enter 10-digit account number"
                    maxLength={10}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoadingName}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-nectar-primary hover:bg-nectar-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nectar-primary disabled:opacity-50"
                >
                  {isLoadingName ? 'Resolving...' : 'Resolve Name'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'transfer' && (
            <form onSubmit={transferForm.handleSubmit(handleTransfer)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Request ID</label>
                  <input
                    type="text"
                    {...transferForm.register('requestId')}
                    defaultValue={generateRequestId()}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount (NGN)</label>
                  <input
                    type="number"
                    {...transferForm.register('amount', { valueAsNumber: true })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bank Code</label>
                  <input
                    type="text"
                    {...transferForm.register('bankCode')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                    placeholder="Select bank from search above"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recipient Account Number</label>
                  <input
                    type="text"
                    {...transferForm.register('recipientAccountNumber')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                    maxLength={10}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Narration</label>
                  <input
                    type="text"
                    {...transferForm.register('narration')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nectar-primary focus:border-nectar-primary"
                    placeholder="Payment description"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoadingTransfer}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-nectar-primary hover:bg-nectar-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nectar-primary disabled:opacity-50"
                >
                  {isLoadingTransfer ? 'Processing...' : 'Send Transfer'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Name Enquiry Result */}
      {nameEnquiry && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Account Name Resolution</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">Account Resolved Successfully</p>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-green-600">Bank Code</p>
                      <p className="text-sm font-medium text-green-800">{nameEnquiry.bank}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-600">Account Number</p>
                      <p className="text-sm font-medium text-green-800">{nameEnquiry.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-600">Account Name</p>
                      <p className="text-sm font-medium text-green-800">{nameEnquiry.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Result */}
      {transferResult && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Transfer Status</h3>
              <div className="flex items-center space-x-2">
                {getStatusIcon(transferResult.status)}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transferResult.status)}`}>
                  {transferResult.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-500">Reference</label>
                <div className="mt-1 flex items-center">
                  <span className="text-sm font-mono text-gray-900">{transferResult.reference}</span>
                  <button
                    onClick={() => copyToClipboard(transferResult.reference)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Destination Account</label>
                <p className="mt-1 text-sm font-mono text-gray-900">{transferResult.destination}</p>
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-500">Recipient Name</label>
                <p className="mt-1 text-sm text-gray-900">{transferResult.destinationName}</p>
              </div>
            </div>

            {transferResult.status === 'PENDING' && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => checkTransferStatus(transferResult.reference)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nectar-primary"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Check Status
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};