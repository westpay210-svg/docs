import { apiClient } from './api.config';
import { AccountBalance, SingleAccountBalance } from '../types/api.types';

class AccountService {
  async getBalance(): Promise<AccountBalance> {
    const response = await apiClient.api.get<AccountBalance>('/business/account/v2/balance');
    return response.data;
  }

  async getSingleAccountBalance(accountNumber: string): Promise<SingleAccountBalance> {
    const response = await apiClient.api.get<SingleAccountBalance>(
      `/business/account/v2/single?accountNumber=${accountNumber}`
    );
    return response.data;
  }
}

export const accountService = new AccountService();