import { apiClient } from './api.config';
import { 
  VirtualAccountRequest, 
  VirtualAccountResponse, 
  ReservedAccountRequest 
} from '../types/api.types';

class VirtualAccountsService {
  async createReservedAccountIndividual(data: ReservedAccountRequest): Promise<VirtualAccountResponse> {
    const response = await apiClient.api.post<VirtualAccountResponse>(
      '/business/account/v2/reserve-account/requests',
      data
    );
    return response.data;
  }

  async createReservedAccountCorporate(data: FormData): Promise<VirtualAccountResponse> {
    const response = await apiClient.api.post<VirtualAccountResponse>(
      '/business/account/v2/reserve-account/requests/company',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  async createTemporaryStaticAccount(data: VirtualAccountRequest): Promise<VirtualAccountResponse> {
    const response = await apiClient.api.post<VirtualAccountResponse>(
      '/business/account/v2/virtual-account/requests',
      data
    );
    return response.data;
  }

  async createTemporaryDynamicAccount(data: VirtualAccountRequest): Promise<VirtualAccountResponse> {
    const response = await apiClient.api.post<VirtualAccountResponse>(
      '/business/account/v2/virtual-account/requests/dynamic',
      data
    );
    return response.data;
  }

  async getTemporaryAccountStatus(requestId: string): Promise<any> {
    const response = await apiClient.api.get(
      `/business/account/v2/virtual-account/payment-status?requestId=${requestId}`
    );
    return response.data;
  }

  async getTransferStatus(reference: string): Promise<any> {
    const response = await apiClient.api.get(
      `/bank/transfer/v1/transfer-funds/status/reference/${reference}`
    );
    return response.data;
  }
}

export const virtualAccountsService = new VirtualAccountsService();