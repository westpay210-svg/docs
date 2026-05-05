import React, { useState } from 'react';
import { CodeTabs } from '../code/CodeTabs';
import { PropertyTable } from '../docs/PropertyTable';
import { ApiEndpoint as ApiEndpointType } from '../../types/docs.types';
import { ChevronDown, ChevronRight, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ApiEndpointProps {
  endpoint: ApiEndpointType;
}

const METHOD_STYLES: Record<string, string> = {
  GET:    'bg-kiwi-50 text-kiwi-700 border-kiwi-200',
  POST:   'bg-teal-50 text-teal-700 border-teal-200',
  PUT:    'bg-amber-50 text-amber-700 border-amber-200',
  DELETE: 'bg-red-50 text-red-700 border-red-200',
  PATCH:  'bg-slate-100 text-slate-700 border-slate-200',
};

const statusColor = (code: number) =>
  code >= 200 && code < 300 ? 'text-kiwi-600' :
  code >= 400 && code < 500 ? 'text-amber-600' :
  code >= 500 ? 'text-red-600' : 'text-slate-600';

const StatusIcon: React.FC<{ code: number }> = ({ code }) => {
  if (code >= 200 && code < 300) return <CheckCircle className="h-3.5 w-3.5" />;
  if (code >= 400) return <AlertCircle className="h-3.5 w-3.5" />;
  return <Info className="h-3.5 w-3.5" />;
};

export const ApiEndpoint: React.FC<ApiEndpointProps> = ({ endpoint }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeResponse, setActiveResponse] = useState(0);

  return (
    <div id={endpoint.id} className="border border-slate-200 rounded bg-white mb-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-100">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${METHOD_STYLES[endpoint.method] ?? METHOD_STYLES.GET}`}>
              {endpoint.method}
            </span>
            <code className="text-[12px] font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 break-all">
              {endpoint.url}
            </code>
          </div>
          <h3 className="text-[15px] font-semibold text-slate-900 mb-1">{endpoint.title}</h3>
          <p className="text-[13px] text-slate-500 leading-relaxed">{endpoint.description}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded hover:bg-slate-100 transition-colors flex-shrink-0"
        >
          {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {/* Body */}
      {expanded && (
        <div className="bg-slate-50/60">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {/* Left: docs */}
            <div className="p-5 space-y-6">
              {endpoint.parameters && endpoint.parameters.length > 0 && (
                <section>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-3">Parameters</p>
                  <PropertyTable properties={endpoint.parameters} />
                </section>
              )}
              {endpoint.requestBody && (
                <section>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-1">Request Body</p>
                  <p className="text-[13px] text-slate-500 mb-3 leading-relaxed">{endpoint.requestBody.description}</p>
                  <CodeTabs examples={[{ language: 'json', code: JSON.stringify(endpoint.requestBody.example, null, 2), title: 'Example' }]} />
                </section>
              )}
              <section>
                <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-3">Responses</p>
                <div className="space-y-2">
                  {endpoint.responses.map((res, i) => (
                    <div key={i} className="border border-slate-200 rounded bg-white overflow-hidden">
                      <button
                        onClick={() => setActiveResponse(i)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-[13px] transition-colors ${activeResponse === i ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                      >
                        <span className={`flex items-center gap-2 font-semibold ${statusColor(res.status)}`}>
                          <StatusIcon code={res.status} />{res.status}
                        </span>
                        <span className="text-slate-500 flex-1 mx-4">{res.description}</span>
                        <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${activeResponse === i ? 'rotate-180' : ''}`} />
                      </button>
                      {activeResponse === i && (
                        <div className="border-t border-slate-100 p-3">
                          <CodeTabs examples={[{ language: 'json', code: JSON.stringify(res.example, null, 2), title: 'Response' }]} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
            {/* Right: code examples */}
            <div className="p-5">
              <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-3">Code Examples</p>
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
