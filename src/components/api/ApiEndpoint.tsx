import React, { useState } from 'react';
import { CodeTabs } from '../code/CodeTabs';
import { ApiEndpoint as ApiEndpointType } from '../../types/docs.types';
import { 
  ChevronDown, 
  ChevronRight, 
  Play, 
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface ApiEndpointProps {
  endpoint: ApiEndpointType;
}

export const ApiEndpoint: React.FC<ApiEndpointProps> = ({ endpoint }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeResponseTab, setActiveResponseTab] = useState(0);

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'POST':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'DELETE':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'PATCH':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) {
      return 'text-green-600';
    } else if (status >= 400 && status < 500) {
      return 'text-yellow-600';
    } else if (status >= 500) {
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300) {
      return <CheckCircle className="h-4 w-4" />;
    } else if (status >= 400) {
      return <AlertCircle className="h-4 w-4" />;
    }
    return <Info className="h-4 w-4" />;
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 mb-8" id={endpoint.id}>
      <div className="p-4 sm:p-6 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getMethodColor(endpoint.method)}`}>
                {endpoint.method}
              </span>
              <code className="text-xs sm:text-sm font-mono text-white-muted bg-dark px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/20 break-all">
                {endpoint.url}
              </code>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              {endpoint.title}
            </h3>
            <p className="text-sm sm:text-base text-white-muted leading-relaxed">{endpoint.description}</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-lime text-dark text-xs sm:text-sm font-medium rounded-lg hover:bg-lime/90 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              {expanded ? 'Compress' : 'Expand'}
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 sm:p-2 rounded-lg text-white-muted hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              {expanded ? (
                <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="bg-dark/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6">
            {/* Left Column - Documentation */}
            <div className="space-y-6 sm:space-y-8">
              {/* Parameters */}
              {endpoint.parameters && endpoint.parameters.length > 0 && (
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Parameters</h4>
                  <div className="bg-dark rounded-lg border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Required</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-dark divide-y divide-white/10">
                        {endpoint.parameters.map((param, index) => (
                          <tr key={index} className="hover:bg-white/5 transition-colors">
                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-mono text-white font-medium">{param.name}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white-muted">{param.type}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                param.required 
                                  ? 'bg-red-50 text-red-700 border border-red-200' 
                                  : 'bg-gray-50 text-gray-700 border border-gray-200'
                              }`}>
                                {param.required ? 'Required' : 'Optional'}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white-muted">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Request Body */}
              {endpoint.requestBody && (
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Request Body</h4>
                  <p className="text-sm text-white-muted mb-4 leading-relaxed">{endpoint.requestBody.description}</p>
                  <CodeTabs examples={[{
                    language: 'json',
                    code: JSON.stringify(endpoint.requestBody.example, null, 2),
                    title: 'Example Request'
                  }]} />
                </div>
              )}

              {/* Responses */}
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Responses</h4>
                <div className="space-y-3">
                  {endpoint.responses.map((response, index) => (
                    <div key={index} className="bg-dark border border-white/10 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setActiveResponseTab(index)}
                        className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                          activeResponseTab === index ? 'bg-white/10' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={getStatusColor(response.status)}>
                            {getStatusIcon(response.status)}
                          </div>
                          <span className={`font-semibold text-lg ${getStatusColor(response.status)}`}>
                            {response.status}
                          </span>
                          <span className="text-white-muted font-medium">{response.description}</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                          activeResponseTab === index ? 'rotate-180' : ''
                        }`} />
                      </button>
                      {activeResponseTab === index && (
                        <div className="border-t border-white/10 bg-white/5">
                          <div className="p-4">
                            <CodeTabs examples={[{
                              language: 'json',
                              code: JSON.stringify(response.example, null, 2),
                              title: 'Response Example'
                            }]} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Code Examples */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Code Examples</h4>
              <div className="sticky top-6">
                <CodeTabs examples={endpoint.codeExamples} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};