import axios, { AxiosInstance } from 'axios';

export const API_CONFIG = {
  sandbox: {
    authBaseUrl: 'https://staging.api.kiwifinance.tech',
    baseUrl: 'https://staging.api.kiwifinance.tech/api/paas',
  },
  production: {
    authBaseUrl: 'https://api.kiwifinance.tech',
    baseUrl: 'https://api.kiwifinance.tech/api/business',
  },
};

export const getEnvironment = (): 'sandbox' | 'production' => {
  return process.env.REACT_APP_ENV === 'production' ? 'production' : 'sandbox';
};

export const getConfig = () => {
  return API_CONFIG[getEnvironment()];
};

class ApiClient {
  private authInstance: AxiosInstance;
  private apiInstance: AxiosInstance;
  private accessToken: string | null = null;

  constructor() {
    const config = getConfig();
    
    this.authInstance = axios.create({
      baseURL: config.authBaseUrl,
      timeout: 30000,
    });

    this.apiInstance = axios.create({
      baseURL: config.baseUrl,
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.apiInstance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.apiInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          this.clearToken();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  setToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('accessToken', token);
  }

  clearToken() {
    this.accessToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('accessToken');
    }
    return this.accessToken;
  }

  get auth() {
    return this.authInstance;
  }

  get api() {
    return this.apiInstance;
  }
}

export const apiClient = new ApiClient();