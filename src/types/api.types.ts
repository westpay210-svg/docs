export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    mobile: string | null;
    firstName: string;
    lastName: string;
    role: string;
    roles: string[];
    kycLevel: string;
    selfie: string;
    accountPublicId: string;
  };
  properties: Array<{
    name: string;
    value: string;
  }>;
}

export interface VirtualAccountRequest {
  requestId: string;
  amount?: string;
}

export interface ReservedAccountRequest {
  requestId: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  mobile?: string;
  dob?: string;
  bvn?: string;
  companyName?: string;
  file?: File;
}

export interface VirtualAccountResponse {
  accountName: string;
  amount?: number;
  description?: string;
  paymentRequestId?: string;
  accountNumber: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED';
  accountNumberExpiry?: string;
  requestId: string;
  institutionName?: string;
  institutionCode?: string;
  type?: 'RESERVE' | 'TEMPORARY';
}

export interface Bank {
  id: string;
  code: string;
  name: string;
  logoUrl: string;
}

export interface NameEnquiryResponse {
  bank: string;
  accountNumber: string;
  name: string;
}

export interface TransferRequest {
  amount: number;
  bankCode: string;
  recipientAccountNumber: string;
  narration: string;
  requestId: string;
}

export interface TransferResponse {
  reference: string;
  status: 'PENDING' | 'COMPLETE' | 'FAILED';
  destination: string;
  destinationName: string;
}

export interface AccountBalance {
  accountBalance: number;
  overdraftLimit: number;
  commission: number;
  rebatePoints: number;
  totalAccountBalance: number;
}

export interface SingleAccountBalance {
  accountNumber: string;
  accountBalance: number;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}