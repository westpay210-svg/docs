import React from 'react';

interface Property {
  name: string;
  type: string;
  required?: boolean;
  description: string;
  default?: string;
}

interface PropertyTableProps {
  properties: Property[];
  showRequired?: boolean;
  showDefault?: boolean;
}

export const PropertyTable: React.FC<PropertyTableProps> = ({
  properties,
  showRequired = true,
  showDefault = false,
}) => (
  <div className="overflow-hidden border border-slate-200 rounded text-sm my-4">
    <table className="min-w-full">
      <thead>
        <tr className="border-b border-slate-200 bg-slate-50">
          <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Parameter
          </th>
          <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Type
          </th>
          {showRequired && (
            <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Required
            </th>
          )}
          {showDefault && (
            <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Default
            </th>
          )}
          <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Description
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {properties.map((prop, i) => (
          <tr key={i} className="hover:bg-slate-50 transition-colors">
            <td className="px-4 py-3 font-mono text-[13px] text-slate-800 font-medium whitespace-nowrap">
              {prop.name}
            </td>
            <td className="px-4 py-3">
              <span className="inline-flex px-1.5 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 rounded">
                {prop.type}
              </span>
            </td>
            {showRequired && (
              <td className="px-4 py-3">
                <span className={`inline-flex px-1.5 py-0.5 text-[11px] font-medium rounded ${
                  prop.required
                    ? 'bg-red-50 text-red-600'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {prop.required ? 'required' : 'optional'}
                </span>
              </td>
            )}
            {showDefault && (
              <td className="px-4 py-3 font-mono text-[12px] text-slate-500">
                {prop.default ?? '—'}
              </td>
            )}
            <td className="px-4 py-3 text-[13px] text-slate-600 leading-relaxed">
              {prop.description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
