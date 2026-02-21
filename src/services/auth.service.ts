import { apiClient } from './api.config';
import { AuthTokenResponse } from '../types/api.types';

class AuthService {
  async generateAccessToken(apiKey: string, clientId: string): Promise<AuthTokenResponse> {
    try {
      const response = await apiClient.auth.get<AuthTokenResponse>('/api/uaa/api/auth', {
        headers: {
          'x-api-key': apiKey,
          'x-client-id': clientId,
        },
      });

      if (response.data.accessToken) {
        apiClient.setToken(response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  }

  logout() {
    apiClient.clearToken();
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!apiClient.getToken();
  }
}

export const authService = new AuthService();