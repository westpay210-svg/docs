import React from 'react';

interface StepItem {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

interface StepListProps {
  steps: StepItem[];
}

export const StepList: React.FC<StepListProps> = ({ steps }) => (
  <ol className="space-y-0 my-6">
    {steps.map((step, i) => (
      <li key={i} className="flex gap-4">
        {/* Timeline */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-kiwi-600 text-white text-[11px] font-bold z-10">
            {i + 1}
          </div>
          {i < steps.length - 1 && (
            <div className="w-px flex-1 bg-slate-200 my-1" style={{ minHeight: '1.5rem' }} />
          )}
        </div>

        {/* Content */}
        <div className={`flex-1 ${i < steps.length - 1 ? 'pb-6' : ''}`}>
          <h4 className="text-sm font-semibold text-slate-900 leading-6">{step.title}</h4>
          {step.description && (
            <p className="text-sm text-slate-500 leading-relaxed mt-1">{step.description}</p>
          )}
          {step.children && <div className="mt-3">{step.children}</div>}
        </div>
      </li>
    ))}
  </ol>
);
