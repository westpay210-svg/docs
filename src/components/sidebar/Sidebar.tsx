import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronRight,
  Home,
  Zap,
  Shield,
  Server,
  ShoppingBag,
  Sparkles,
  Webhook,
  CreditCard
} from 'lucide-react';

interface NavItem {
  id: string;
  title: string;
  href: string;
  icon?: React.ComponentType<any>;
  badge?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    id: 'overview',
    title: 'Overview',
    href: '/',
    icon: Home,
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    href: '/getting-started',
    icon: Zap,
    badge: 'Start here'
  },
  {
    id: 'authentication',
    title: 'Authentication',
    href: '/authentication',
    icon: Shield,
  },
  {
    id: 'gateway-checkout',
    title: 'Gateway Checkout',
    href: '/gateway-checkout',
    icon: CreditCard,
  },
  {
    id: 'webhook',
    title: 'Webhook',
    href: '/webhook',
    icon: Webhook,
  },
  {
    id: 'server-to-server',
    title: 'Server to Server',
    href: '/server-to-server',
    icon: Server,
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
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  // Only one item can be expanded at a time (accordion behavior)
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  const toggleExpanded = (itemId: string) => {
    // If clicking the same item, collapse it. Otherwise, expand the new one (closing any other)
    setExpandedItem(prev => prev === itemId ? null : itemId);
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleSubItemClick = (item: NavItem, _event: React.MouseEvent) => {
    if (item.href.includes('/')) {
      const pathParts = item.href.split('/');
      const sidebarPath = pathParts[pathParts.length - 1];
      const parentPath = pathParts[pathParts.length - 2];

      const getEndpointId = (parent: string, path: string): string => {
        const mappings: Record<string, Record<string, string>> = {
          'server-to-server': {
            'environments': 'environments',
            'charge-card-3ds': 'charge-card-3ds',
            'charge-card-2ds': 'charge-card-2ds',
            'charge-card-otp': 'charge-card-otp',
            'authorize-card-transaction': 'authorize-card-transaction',
            'verify-transaction-status': 'verify-transaction-status',
            'refund': 'refund',
            'status-code': 'status-code',
            'transaction-history': 'transaction-history',
          },
        };

        return mappings[parent]?.[path] || path;
      };

      const endpointId = getEndpointId(parentPath, sidebarPath);

      setTimeout(() => {
        const element = document.getElementById(endpointId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItem === item.id;
    const active = isActive(item.href);

    // For items WITH children at top level: clicking toggles expand
    // For items WITHOUT children or child items: clicking navigates
    const isParentWithChildren = hasChildren && level === 0;

    const itemClasses = `flex items-center gap-3 px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 cursor-pointer ${
      active
        ? level > 0
          ? 'text-kiwi-400 bg-kiwi-500/10'
          : 'text-white bg-gradient-to-r from-kiwi-500/20 to-accent-500/10 shadow-sm border border-kiwi-500/20'
        : 'text-white/60 hover:text-white hover:bg-white/5'
    } ${level > 0 ? 'ml-3 pl-6 relative before:absolute before:left-3 before:top-0 before:bottom-0 before:w-px before:bg-white/10' : ''}`;

    const iconContent = (
      <>
        {/* Left side: Icon + Text grouped together */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Icon for top-level items */}
          {item.icon && level === 0 && (
            <div className={`flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0 ${
              active
                ? 'bg-kiwi-500/20 text-kiwi-400'
                : 'bg-white/5 text-white/50 group-hover:text-white/70'
            } transition-colors`}>
              <item.icon className="h-4 w-4" />
            </div>
          )}

          {/* Dot indicator for nested items */}
          {level > 0 && (
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 ${
              active
                ? 'bg-kiwi-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                : 'bg-white/20 group-hover:bg-white/40'
            }`} />
          )}

          <span className="truncate">{item.title}</span>
        </div>

        {/* Right side: Badge and/or Chevron */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Badge */}
          {item.badge && (
            <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold text-kiwi-400 bg-kiwi-500/10 rounded-full border border-kiwi-500/20">
              <Sparkles className="h-2.5 w-2.5" />
              {item.badge}
            </span>
          )}

          {/* Chevron for expandable items - at the far right */}
          {hasChildren && (
            <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            } ${active ? 'text-kiwi-400' : 'text-white/40'}`} />
          )}
        </div>
      </>
    );

    return (
      <div key={item.id} className="relative">
        {isParentWithChildren ? (
          // Parent items with children: button that toggles expand
          <button
            type="button"
            onClick={() => toggleExpanded(item.id)}
            className={`${itemClasses} w-full group`}
          >
            {iconContent}
          </button>
        ) : (
          // Items without children or child items: Link that navigates
          <Link
            to={item.href}
            onClick={(e) => level > 0 && handleSubItemClick(item, e)}
            className={`${itemClasses} group`}
          >
            {iconContent}
          </Link>
        )}

        {/* Children items */}
        {hasChildren && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? 'max-h-[1000px] opacity-100 mt-1' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="space-y-0.5 pb-2">
              {item.children!.map(child => renderNavItem(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="p-4 space-y-6 relative z-10">
      {/* Section header */}
      <div className="px-3 py-2">
        <p className="text-[10px] font-bold tracking-widest uppercase text-white/30">
          API Reference
        </p>
      </div>

      {/* Navigation items */}
      <div className="space-y-1">
        {navItems.map(item => renderNavItem(item))}
      </div>

      {/* Quick links section */}
      <div className="pt-4 border-t border-white/5">
        <div className="px-3 py-2 mb-2">
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/30">
            Resources
          </p>
        </div>
        <div className="space-y-1">
          <a
            href="https://kiwifinance.tech/contact-sales"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 text-white/50">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>Help & Support</span>
          </a>
        </div>
      </div>
    </nav>
  );
};
