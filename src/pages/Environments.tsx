import React from 'react';
import { Link } from 'react-router-dom';
import { TestTube, Server, CreditCard, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/docs/PageHeader';
import { Callout } from '../components/docs/Callout';

const testCards = [
  { number: '5060990580000217499', expiry: '03/50', cvv: '111', pin: '1111',  otp: '123456', description: 'Verve — successful transaction',           type: 'success'     },
  { number: '4012000033330026',    expiry: '03/50', cvv: '111', pin: 'NA',    otp: 'NA',     description: 'Visa — successful transaction',            type: 'success'     },
  { number: '4000000000002503',    expiry: '03/50', cvv: '111', pin: 'NA',    otp: 'NA',     description: 'Visa — failed transaction',                type: 'failed'      },
  { number: '5555555555554444',    expiry: '09/25', cvv: '111', pin: 'NA',    otp: 'NA',     description: 'Mastercard — successful transaction',      type: 'success'     },
  { number: '5060990580000000390', expiry: '10/40', cvv: '111', pin: '1111',  otp: '123456', description: 'Verve — failed (insufficient funds)',      type: 'failed'      },
  { number: '2223000000000023',    expiry: '12/34', cvv: '123', pin: 'NA',    otp: '—',      description: 'Mastercard — frictionless (2DS)',          type: 'frictionless'},
];

const StatusBadge: React.FC<{ type: string }> = ({ type }) => {
  if (type === 'success')     return <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold bg-kiwi-50 text-kiwi-700 border border-kiwi-200 rounded"><CheckCircle className="h-2.5 w-2.5" />Success</span>;
  if (type === 'failed')      return <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold bg-red-50 text-red-600 border border-red-200 rounded"><XCircle className="h-2.5 w-2.5" />Failure</span>;
  if (type === 'frictionless') return <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 rounded"><AlertCircle className="h-2.5 w-2.5" />2DS</span>;
  return null;
};

export const Environments: React.FC = () => (
  <div className="max-w-4xl">
    <PageHeader
      label="Server to Server"
      title="Environments"
      description="Configure your integration for sandbox testing or live production. Always test thoroughly in the sandbox before switching to production."
    />

    {/* ── Environment URLs ─────────────────────────────────── */}
    <section className="mb-10">
      <h2 className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-4">Base URLs</h2>
      <div className="border border-slate-200 rounded overflow-hidden divide-y divide-slate-100">

        {/* Sandbox */}
        <div className="p-5 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-1.5 bg-amber-50 rounded">
              <TestTube className="h-4 w-4 text-amber-500" />
            </div>
            <span className="text-sm font-semibold text-slate-900">Sandbox</span>
            <span className="ml-auto px-2 py-0.5 text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded">
              Testing
            </span>
          </div>
          <p className="text-[13px] text-slate-500 mb-3 leading-relaxed">
            Simulates transactions without processing real payments. Use test cards listed below.
          </p>
          <code className="block text-[12px] font-mono text-slate-700 bg-slate-50 px-4 py-2.5 rounded border border-slate-200 break-all">
            https://sandbox-api.westrapay.com
          </code>
        </div>

        {/* Production */}
        <div className="p-5 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-1.5 bg-kiwi-50 rounded">
              <Server className="h-4 w-4 text-kiwi-600" />
            </div>
            <span className="text-sm font-semibold text-slate-900">Production</span>
            <span className="ml-auto px-2 py-0.5 text-[10px] font-semibold text-kiwi-700 bg-kiwi-50 border border-kiwi-200 rounded">
              Live
            </span>
          </div>
          <p className="text-[13px] text-slate-500 mb-3 leading-relaxed">
            Processes real transactions and customer data. Ensure full testing before going live.
          </p>
          <code className="block text-[12px] font-mono text-slate-700 bg-slate-50 px-4 py-2.5 rounded border border-slate-200 break-all">
            https://api.westrapay.com
          </code>
        </div>
      </div>
    </section>

    <Callout type="warning" title="Never use production keys in sandbox">
      Keep sandbox and production credentials completely separate. Switching environments
      only requires changing the base URL and the corresponding API key.
    </Callout>

    {/* ── Test Cards ───────────────────────────────────────── */}
    <section className="mt-10 mb-10">
      <div className="flex items-center gap-3 mb-4">
        <CreditCard className="h-4 w-4 text-slate-400" />
        <h2 className="text-[11px] font-bold tracking-widest uppercase text-slate-400">Test Cards</h2>
      </div>

      <div className="border border-slate-200 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Card Number</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Expiry</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">CVV</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">PIN</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">OTP</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Result</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {testCards.map((card, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-[12px] text-slate-800 whitespace-nowrap">{card.number}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-slate-500">{card.expiry}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-slate-500">{card.cvv}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-slate-500">{card.pin}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-slate-500">{card.otp}</td>
                  <td className="px-4 py-3"><StatusBadge type={card.type} /></td>
                  <td className="px-4 py-3 text-[12px] text-slate-500">{card.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Callout type="note">
        Use any valid future date for expiry and any 3-digit number for CVV unless specified otherwise.
        PIN and OTP fields are only required for Verve cards.
      </Callout>
    </section>

    {/* ── Next step ────────────────────────────────────────── */}
    <div className="flex items-center justify-between pt-6 border-t border-slate-200">
      <span className="text-[13px] text-slate-500">Next in Server to Server</span>
      <Link
        to="/server-to-server/charge-card-3ds"
        className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-kiwi-700 bg-kiwi-50 border border-kiwi-200 rounded hover:bg-kiwi-100 transition-colors"
      >
        Charge Card (3DS)
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  </div>
);
