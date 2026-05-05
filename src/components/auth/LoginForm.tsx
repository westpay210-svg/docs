import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Key, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const LoginForm: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [clientId, setClientId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(apiKey, clientId);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-slate-50 backdrop-blur-lg border border-slate-200 rounded-md shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-lime rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-dark" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Westrapay API</h2>
            <p className="mt-2 text-sm text-slate-900-muted">
              Sign in to access your dashboard
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-slate-900">
                API Key
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="apiKey"
                  type="password"
                  required
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 bg-white border border-slate-300 rounded placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent"
                  placeholder="Enter your API key"
                />
              </div>
            </div>

            <div>
              <label htmlFor="clientId" className="block text-sm font-medium text-slate-900">
                Client ID
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="clientId"
                  type="text"
                  required
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 bg-white border border-slate-300 rounded placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent"
                  placeholder="Enter your Client ID"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-dark bg-lime hover:bg-lime/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-900-muted">
              Environment: {process.env.REACT_APP_ENV === 'production' ? 'Production' : 'Sandbox'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};