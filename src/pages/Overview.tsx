import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Zap,
  CreditCard,
  Webhook,
  Server,
  Key,
  Globe,
  CheckCircle,
} from 'lucide-react';
import { Callout } from '../components/docs/Callout';

const apiSections = [
  {
    icon: CreditCard,
    title: 'Gateway Integration',
    description: 'Embed a hosted checkout into your app with a single API call. Supports card, bank transfer, and more.',
    href: '/gateway-integration',
    badge: null,
  },
  {
    icon: Server,
    title: 'Server to Server',
    description: 'Full control over the payment flow directly from your backend. Charge cards, verify status, and issue refunds.',
    href: '/server-to-server',
    badge: null,
  },
  {
    icon: Webhook,
    title: 'Webhooks',
    description: 'Receive real-time event notifications for payment completions, failures, and refunds.',
    href: '/webhook',
    badge: null,
  },
  {
    icon: Shield,
    title: 'Authentication',
    description: 'Public key for frontend gateway calls, private key for secure server-to-server operations.',
    href: '/authentication',
    badge: null,
  },
];

const quickStart = [
  {
    step: '01',
    title: 'Get your API keys',
    description: 'Create an account and copy your public and private keys from the dashboard.',
    href: 'https://app.westrapay.com/auth/register',
    external: true,
  },
  {
    step: '02',
    title: 'Read the authentication guide',
    description: 'Understand when to use each key before making your first request.',
    href: '/authentication',
    external: false,
  },
  {
    step: '03',
    title: 'Make your first API call',
    description: 'Initialize a payment via Gateway Integration or go direct with Server to Server.',
    href: '/getting-started',
    external: false,
  },
];

const baseUrls = [
  { label: 'Sandbox', url: 'https://sandbox-api.westrapay.com', tag: 'Testing', tagClass: 'text-amber-600 bg-amber-50 border-amber-200' },
  { label: 'Production', url: 'https://api.westrapay.com', tag: 'Live', tagClass: 'text-kiwi-700 bg-kiwi-50 border-kiwi-200' },
];

export const Overview: React.FC = () => (
  <div className="max-w-4xl">

    {/* ── Page header ─────────────────────────────────────── */}
    <div className="mb-10 pb-8 border-b border-slate-200">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-semibold text-kiwi-700 bg-kiwi-50 border border-kiwi-200 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-kiwi-500 animate-pulse" />
          API Online
        </span>
        <span className="text-[11px] text-slate-400">v1</span>
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Westrapay API Reference</h1>
      <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
        Complete payment infrastructure for your application. Collect payments, verify
        transactions, and receive real-time events with a single consistent API.
      </p>
    </div>

    {/* ── Quick start ──────────────────────────────────────── */}
    <section className="mb-10">
      <h2 className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-5">
        Quick Start
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {quickStart.map((item) => (
          <a
            key={item.step}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className="group flex flex-col gap-3 p-4 bg-white border border-slate-200 rounded hover:border-kiwi-300 hover:shadow-card transition-all duration-200"
          >
            <span className="text-[11px] font-bold font-mono text-kiwi-500">{item.step}</span>
            <div>
              <p className="text-[13px] font-semibold text-slate-900 mb-1 group-hover:text-kiwi-700 transition-colors">
                {item.title}
              </p>
              <p className="text-[12px] text-slate-500 leading-relaxed">{item.description}</p>
            </div>
            <span className="flex items-center gap-1 text-[12px] font-medium text-kiwi-600 mt-auto">
              {item.external ? 'Sign up' : 'Read more'}
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>
        ))}
      </div>
    </section>

    {/* ── API Sections ─────────────────────────────────────── */}
    <section className="mb-10">
      <h2 className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-5">
        API Reference
      </h2>
      <div className="border border-slate-200 rounded overflow-hidden divide-y divide-slate-100">
        {apiSections.map((section, i) => (
          <Link
            key={i}
            to={section.href}
            className="group flex items-center gap-4 px-5 py-4 bg-white hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded bg-slate-100 group-hover:bg-kiwi-50 group-hover:text-kiwi-600 text-slate-500 transition-colors flex-shrink-0">
              <section.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-slate-900 mb-0.5">{section.title}</p>
              <p className="text-[12px] text-slate-500 leading-relaxed truncate">{section.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-kiwi-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>

    {/* ── Base URLs ────────────────────────────────────────── */}
    <section className="mb-10">
      <h2 className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-5">
        Base URLs
      </h2>
      <div className="border border-slate-200 rounded overflow-hidden divide-y divide-slate-100">
        {baseUrls.map((env) => (
          <div key={env.label} className="flex items-center gap-4 px-5 py-3.5 bg-white">
            <span className="text-[12px] font-medium text-slate-700 w-20 flex-shrink-0">{env.label}</span>
            <code className="flex-1 text-[12px] font-mono text-slate-700">{env.url}</code>
            <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded border ${env.tagClass}`}>
              {env.tag}
            </span>
          </div>
        ))}
      </div>
    </section>

    {/* ── Code sample ──────────────────────────────────────── */}
    <section className="mb-10">
      <h2 className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-5">
        Example Request
      </h2>
      <div className="border border-slate-200 rounded overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-kiwi-500/70" />
          </div>
          <span className="text-[11px] font-mono text-slate-400">Initialize a payment</span>
        </div>
        <pre className="bg-slate-900 p-5 overflow-x-auto text-[13px] leading-6">
          <code>
            <span className="text-slate-500">POST </span>
            <span className="text-kiwi-400">https://api.westrapay.com/transaction/initialize</span>
            {'\n\n'}
            <span className="text-slate-500">{'{'}</span>
            {'\n'}
            {'  '}<span className="text-kiwi-300">"amount"</span>
            <span className="text-slate-500">: </span>
            <span className="text-amber-400">100000</span>
            <span className="text-slate-500">,</span>
            {'\n'}
            {'  '}<span className="text-kiwi-300">"email"</span>
            <span className="text-slate-500">: </span>
            <span className="text-kiwi-400">"customer@example.com"</span>
            <span className="text-slate-500">,</span>
            {'\n'}
            {'  '}<span className="text-kiwi-300">"currency"</span>
            <span className="text-slate-500">: </span>
            <span className="text-kiwi-400">"USD"</span>
            <span className="text-slate-500">,</span>
            {'\n'}
            {'  '}<span className="text-kiwi-300">"channels"</span>
            <span className="text-slate-500">: [</span>
            <span className="text-kiwi-400">"card"</span>
            <span className="text-slate-500">, </span>
            <span className="text-kiwi-400">"bank"</span>
            <span className="text-slate-500">]</span>
            {'\n'}
            <span className="text-slate-500">{'}'}</span>
          </code>
        </pre>
        <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-800 border-t border-slate-700">
          <CheckCircle className="h-3.5 w-3.5 text-kiwi-400" />
          <span className="text-[11px] font-mono text-slate-400">
            Returns <span className="text-kiwi-400">checkoutUrl</span> and <span className="text-kiwi-400">reference</span>
          </span>
        </div>
      </div>
    </section>

    {/* ── Auth callout ─────────────────────────────────────── */}
    <Callout type="info" title="Two keys, two purposes">
      Use your <strong>public key</strong> for Gateway Integration.
      Use your <strong>private key</strong> for Server-to-Server calls and
      all transaction verification. Never expose the private key in frontend code.
    </Callout>

    {/* ── Explore ──────────────────────────────────────────── */}
    <section className="mt-10 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[11px] font-bold tracking-widest uppercase text-slate-400">Explore</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Zap, label: 'Getting Started', href: '/getting-started' },
          { icon: Key, label: 'Authentication', href: '/authentication' },
          { icon: Globe, label: 'Environments', href: '/server-to-server/environments' },
          { icon: Webhook, label: 'Webhooks', href: '/webhook' },
        ].map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="group flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium text-slate-700 bg-white border border-slate-200 rounded hover:border-kiwi-300 hover:text-kiwi-700 transition-colors"
          >
            <link.icon className="h-4 w-4 text-slate-400 group-hover:text-kiwi-500 flex-shrink-0 transition-colors" />
            {link.label}
          </Link>
        ))}
      </div>
    </section>

  </div>
);
