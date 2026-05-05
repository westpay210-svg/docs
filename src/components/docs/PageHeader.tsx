import React from 'react';

interface PageHeaderProps {
  label?: string;
  title: string;
  description: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ label, title, description }) => (
  <div className="mb-8 pb-6 border-b border-slate-200">
    {label && (
      <p className="text-[11px] font-bold tracking-widest uppercase text-kiwi-600 mb-2">
        {label}
      </p>
    )}
    <h1 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{title}</h1>
    <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{description}</p>
  </div>
);
