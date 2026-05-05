import React from 'react';
import { Info, AlertTriangle, Lightbulb, XCircle, StickyNote } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'tip' | 'danger' | 'note';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const styles: Record<CalloutType, {
  border: string; bg: string; icon: React.ComponentType<any>;
  iconClass: string; titleClass: string; bodyClass: string;
}> = {
  info: {
    border: 'border-l-kiwi-500', bg: 'bg-kiwi-50',
    icon: Info, iconClass: 'text-kiwi-600',
    titleClass: 'text-kiwi-900', bodyClass: 'text-kiwi-800',
  },
  warning: {
    border: 'border-l-amber-400', bg: 'bg-amber-50',
    icon: AlertTriangle, iconClass: 'text-amber-500',
    titleClass: 'text-amber-900', bodyClass: 'text-amber-800',
  },
  tip: {
    border: 'border-l-teal-400', bg: 'bg-teal-50',
    icon: Lightbulb, iconClass: 'text-teal-600',
    titleClass: 'text-teal-900', bodyClass: 'text-teal-800',
  },
  danger: {
    border: 'border-l-red-400', bg: 'bg-red-50',
    icon: XCircle, iconClass: 'text-red-600',
    titleClass: 'text-red-900', bodyClass: 'text-red-800',
  },
  note: {
    border: 'border-l-slate-300', bg: 'bg-slate-50',
    icon: StickyNote, iconClass: 'text-slate-400',
    titleClass: 'text-slate-800', bodyClass: 'text-slate-600',
  },
};

export const Callout: React.FC<CalloutProps> = ({ type = 'info', title, children }) => {
  const s = styles[type];
  const Icon = s.icon;

  return (
    <div className={`flex gap-3 px-4 py-3.5 my-4 rounded border-l-[3px] ${s.border} ${s.bg}`}>
      <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${s.iconClass}`} />
      <div className="text-sm leading-relaxed">
        {title && <p className={`font-semibold mb-0.5 ${s.titleClass}`}>{title}</p>}
        <div className={s.bodyClass}>{children}</div>
      </div>
    </div>
  );
};
