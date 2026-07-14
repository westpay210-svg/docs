import React from 'react';
import { PageHeader } from '../components/docs/PageHeader';
import { Callout } from '../components/docs/Callout';

export const EndToEndTest: React.FC = () => {
  const testCards = [
    {
      number: "4012000033330026",
      expiry: "03/50",
      cvv: "111",
      pin: "NA",
      otp: "NA",
      description: "Visa card for successful transactions",
      type: "success",
    },
    {
      number: "4000000000002503",
      expiry: "03/50",
      cvv: "111",
      pin: "NA",
      otp: "NA",
      description: "Visa card for failed transactions.",
      type: "failed",
    },
    {
      number: "5555555555554444",
      expiry: "09/30",
      cvv: "111",
      pin: "NA",
      otp: "NA",
      description: "Mastercard for successful transactions.",
      type: "success",
    },
    {
      number: "2223000000000023",
      expiry: "12/34",
      cvv: "123",
      pin: "NA",
      otp: "",
      description: "Frictionless (2DS)",
      type: "frictionless",
    },
  ];

  const bankAccounts = [
    {
      bankCode: "033",
      accountNumber: "2215381176",
      phoneNumber: "0000000000",
      dob: "05-01-1990",
      bvn: "123456789",
      otp: "11315632",
      testCase: "OTP",
      description: "This account will always return successful payment",
    },
    {
      bankCode: "033",
      accountNumber: "2215381190",
      phoneNumber: "0000000000",
      dob: "05-01-1990",
      bvn: "123456789",
      otp: "11315632",
      testCase: "OTP",
      description: "This account will always return failure payment.",
    },
  ];

  const opayWallet = [
    {
      phoneNumber: "1259257649",
      otp: "315632",
      pin: "123456",
      description: "This the phone number will always return successful payment",
    },
    {
      phoneNumber: "1259257649",
      otp: "315633",
      pin: "123456",
      description: "This the phone number will always return failed payment",
    },
  ];

  const getResultBadge = (type: string) => {
    if (type === 'success') {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold bg-kiwi-50 text-kiwi-700 border border-kiwi-200 rounded">
          ✓ Success
        </span>
      );
    }
    if (type === 'failed') {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold bg-red-50 text-red-600 border border-red-200 rounded">
          ✗ Failure
        </span>
      );
    }
    if (type === 'frictionless') {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 rounded">
          2DS
        </span>
      );
    }
    return null;
  };

  return (
    <div className="max-w-4xl">
      <PageHeader
        label="Gateway Integration"
        title="End-to-End Test"
        description="Use the sandbox environment to test your integration end-to-end before going live. Test cards, bank accounts, and wallet numbers are provided below."
      />

      <Callout type="note" title="Sandbox Base URL">
        https://sandbox-api.westrapay.com
      </Callout>

      {/* Test Cards */}
      <h2 className="text-base font-semibold text-slate-900 mb-4 mt-8">Test Cards</h2>
      <div className="border border-slate-200 rounded overflow-hidden my-4">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Card Number</th>
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
              <tr key={i}>
                <td className="px-4 py-2.5 font-mono text-[12px] text-slate-800 whitespace-nowrap">{card.number}</td>
                <td className="px-4 py-2.5 text-[12px] text-slate-500 font-mono">{card.expiry}</td>
                <td className="px-4 py-2.5 text-[12px] text-slate-500 font-mono">{card.cvv}</td>
                <td className="px-4 py-2.5 text-[12px] text-slate-500 font-mono">{card.pin}</td>
                <td className="px-4 py-2.5 text-[12px] text-slate-500 font-mono">{card.otp}</td>
                <td className="px-4 py-2.5">{getResultBadge(card.type)}</td>
                <td className="px-4 py-2.5 text-[12px] text-slate-500">{card.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* OPay Bank Account */}
      <h2 className="text-base font-semibold text-slate-900 mb-4 mt-8">OPay Bank Account</h2>
      <div className="border border-slate-200 rounded overflow-hidden my-4">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Bank Code</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Account Number</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">DOB</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">BVN</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">OTP</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Test Case</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {bankAccounts.map((account, i) => (
              <tr key={i}>
                <td className="px-4 py-2.5 font-mono text-[12px] text-slate-800">{account.bankCode}</td>
                <td className="px-4 py-2.5 font-mono text-[12px] text-slate-500">{account.accountNumber}</td>
                <td className="px-4 py-2.5 font-mono text-[12px] text-slate-500">{account.phoneNumber}</td>
                <td className="px-4 py-2.5 font-mono text-[12px] text-slate-500">{account.dob}</td>
                <td className="px-4 py-2.5 font-mono text-[12px] text-slate-500">{account.bvn}</td>
                <td className="px-4 py-2.5 font-mono text-[12px] text-slate-500">{account.otp}</td>
                <td className="px-4 py-2.5 text-[12px] text-slate-500">{account.testCase}</td>
                <td className="px-4 py-2.5 text-[12px] text-slate-500">{account.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* OPay Wallet */}
      <h2 className="text-base font-semibold text-slate-900 mb-4 mt-8">OPay Wallet</h2>
      <div className="border border-slate-200 rounded overflow-hidden my-4">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">PIN</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">OTP</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {opayWallet.map((wallet, i) => (
              <tr key={i}>
                <td className="px-4 py-2.5 font-mono text-[12px] text-slate-800">{wallet.phoneNumber}</td>
                <td className="px-4 py-2.5 font-mono text-[12px] text-slate-500">{wallet.pin}</td>
                <td className="px-4 py-2.5 font-mono text-[12px] text-slate-500">{wallet.otp}</td>
                <td className="px-4 py-2.5 text-[12px] text-slate-500">{wallet.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
