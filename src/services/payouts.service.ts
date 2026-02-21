import { apiClient } from './api.config';
import { 
  Bank, 
  NameEnquiryResponse, 
  TransferRequest, 
  TransferResponse 
} from '../types/api.types';

interface BanksResponse {
  content: Bank[];
  pageable: string;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: any[];
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

class PayoutsService {
  async getBankList(): Promise<Bank[]> {
    const response = await apiClient.api.get<BanksResponse>('/bank/transfer/v1/banks');
    return response.data.content;
  }

  async nameEnquiry(bankCode: string, accountNumber: string): Promise<NameEnquiryResponse> {
    const response = await apiClient.api.get<NameEnquiryResponse>(
      `/bank/transfer/v1/banks/code/${bankCode}/accounts/account-number/${accountNumber}/name`
    );
    return response.data;
  }

  async initiateTransfer(data: TransferRequest): Promise<TransferResponse> {
    const response = await apiClient.api.post<TransferResponse>(
      '/bank/transfer/v1/transfer-funds',
      data
    );
    return response.data;
  }

  async getTransferStatus(reference: string): Promise<TransferResponse> {
    const response = await apiClient.api.get<TransferResponse>(
      `/bank/transfer/v1/transfer-funds/status/reference/${reference}`
    );
    return response.data;
  }
}

export const payoutsService = new PayoutsService();