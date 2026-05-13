import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Home, Zap, Shield, Server, Webhook, CreditCard } from 'lucide-react';

interface NavItem {
  id: string; title: string; href: string;
  icon?: React.ComponentType<any>; badge?: string; children?: NavItem[];
}

const navItems: NavItem[] = [
  { id: 'overview', title: 'Overview', href: '/', icon: Home },
  { id: 'getting-started', title: 'Getting Started', href: '/getting-started', icon: Zap, badge: 'Start here' },
  { id: 'authentication', title: 'Authentication', href: '/authentication', icon: Shield },
  {
    id: 'gateway-integration', title: 'Gateway Integration', href: '/gateway-integration', icon: CreditCard,
    children: [
      { id: 'payment-channel', title: 'Payment Channel', href: '/gateway-integration/payment-channel' },
      { id: 'end-to-end-test', title: 'End-to-End Test', href: '/gateway-integration/end-to-end-test' },
    ],
  },
  {
    id: 'server-to-server', title: 'Server to Server', href: '/server-to-server', icon: Server,
    children: [
      { id: 'environments', title: 'Environments', href: '/server-to-server/environments' },
      { id: 'charge-card-3ds', title: 'Charge Card (3DS)', href: '/server-to-server/charge-card-3ds' },
      { id: 'charge-card-2ds', title: 'Charge Card (2DS)', href: '/server-to-server/charge-card-2ds' },
      { id: 'charge-card-otp', title: 'Charge Card (OTP)', href: '/server-to-server/charge-card-otp' },
      { id: 'authorize-card-transaction', title: 'Authorize Transaction', href: '/server-to-server/authorize-card-transaction' },
      { id: 'verify-transaction-status', title: 'Verify Status', href: '/server-to-server/verify-transaction-status' },
      { id: 'refund', title: 'Refund', href: '/server-to-server/refund' },
      { id: 'status-code', title: 'Status Codes', href: '/server-to-server/status-code' },
      { id: 'transaction-history', title: 'Transaction History', href: '/server-to-server/transaction-history' },
    ],
  },
  { id: 'webhook', title: 'Webhook', href: '/webhook', icon: Webhook },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  const isActive = (href: string) => href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  const handleParentClick = (item: NavItem) => {
    navigate(item.href);
    setExpandedItem(prev => prev === item.id ? prev : item.id);
  };

  const handleSubItemClick = (item: NavItem) => {
    if (!item.href.includes('/')) return;
    const parts = item.href.split('/');
    const path = parts[parts.length - 1];
    const parent = parts[parts.length - 2];
    const map: Record<string, Record<string, string>> = {
      'server-to-server': {
        environments: 'environments', 'charge-card-3ds': 'charge-card-3ds',
        'charge-card-2ds': 'charge-card-2ds', 'charge-card-otp': 'charge-card-otp',
        'authorize-card-transaction': 'authorize-card-transaction',
        'verify-transaction-status': 'verify-transaction-status',
        refund: 'refund', 'status-code': 'status-code', 'transaction-history': 'transaction-history',
      },
    };
    const id = map[parent]?.[path] || path;
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const renderItem = (item: NavItem, level = 0) => {
    const hasChildren = !!item.children?.length;
    const active = isActive(item.href);
    const cls = [
      'flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] rounded transition-colors duration-150 cursor-pointer w-full',
      active
        ? level > 0 ? 'text-kiwi-700 font-medium' : 'text-kiwi-700 font-semibold bg-kiwi-50'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
      level > 0 ? 'ml-5 pl-3 border-l-2 border-slate-100' : '',
    ].join(' ');

    const inner = (
      <>
        <span className="flex items-center gap-2 flex-1 min-w-0">
          {item.icon && level === 0 && (
            <item.icon className={`h-3.5 w-3.5 flex-shrink-0 ${active ? 'text-kiwi-600' : 'text-slate-400'}`} />
          )}
          {level > 0 && <span className={`w-1 h-1 rounded-full flex-shrink-0 ${active ? 'bg-kiwi-500' : 'bg-slate-300'}`} />}
          <span className="truncate">{item.title}</span>
        </span>
        <span className="flex items-center gap-1 flex-shrink-0">
          {item.badge && (
            <span className="px-1.5 py-0.5 text-[10px] font-semibold text-kiwi-600 bg-kiwi-50 rounded border border-kiwi-100">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <ChevronRight className={`h-3 w-3 text-slate-400 transition-transform duration-150 ${expandedItem === item.id ? 'rotate-90' : ''}`} />
          )}
        </span>
      </>
    );

    return (
      <div key={item.id}>
        {hasChildren && level === 0 ? (
          <button type="button" onClick={() => handleParentClick(item)} className={cls}>{inner}</button>
        ) : (
          <Link to={item.href} onClick={() => level > 0 && handleSubItemClick(item)} className={cls}>{inner}</Link>
        )}
        {hasChildren && (
          <div className={`overflow-hidden transition-all duration-200 ${expandedItem === item.id ? 'max-h-[1000px] opacity-100 mt-0.5' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-0.5 pb-1">
              {item.children!.map(child => renderItem(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="px-3 py-4 space-y-5">
      <p className="px-2.5 text-[10px] font-bold tracking-widest uppercase text-slate-400">API Reference</p>
      <div className="space-y-0.5">{navItems.map(item => renderItem(item))}</div>
      {/*<div className="pt-3 border-t border-slate-100 space-y-1">*/}
      {/*  <p className="px-2.5 text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">Resources</p>*/}
      {/*  <a href="https://westrapay.com/contact-sales" target="_blank" rel="noopener noreferrer"*/}
      {/*    className="flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors">*/}
      {/*    <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
      {/*      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />*/}
      {/*    </svg>*/}
      {/*    Help & Support*/}
      {/*  </a>*/}
      {/*</div>*/}
    </nav>
  );
};
