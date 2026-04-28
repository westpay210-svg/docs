import React from "react";
import { Link } from "react-router-dom";
import {
  TestTube,
  Globe,
  CreditCard,
  AlertCircle,
  CheckCircle,
  XCircle,
  Landmark,
  Wallet,
} from "lucide-react";

export const EndToEndTest: React.FC = () => {
  const testCards = [
    {
      number: "5060990580000217499",
      expiry: "03/50",
      cvv: "111",
      pin: "1111",
      otp: "123456",
      description: "Verve card for successful transactions.",
      type: "success",
    },
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
      number: "5060990580000000390",
      expiry: "10/40",
      cvv: "111",
      pin: "1111",
      otp: "123456",
      description: "Verve card for failed transactions (insufficient funds).",
      type: "failed",
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

  const getStatusIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "frictionless":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">End-to-end Test</h1>

        {/* Sandbox Environment */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <TestTube className="h-6 w-6 text-yellow-500 mr-3" />
            <h2 className="text-xl font-semibold text-white">
              Sandbox Environment
            </h2>
          </div>
          <p className="text-white-muted mb-6 leading-relaxed">
            The Sandbox environment is used for testing and development. It
            simulates transactions without processing actual payments, allowing
            you to refine your integration before going live.
          </p>
          <p className="text-white-muted mb-6">
            Here you can use a variety of test cards to simulate different
            payment scenarios and ensure your integration handles them
            effectively.
          </p>

          {/* Sandbox URL */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-500 mb-3">
              Sandbox URL
            </h3>
            <div className="bg-dark/50 rounded-lg p-4 border border-yellow-500/20">
              <code className="text-yellow-400 font-mono text-sm break-all">
                https://sandbox-api.kiwifinance.tech/
              </code>
            </div>
          </div>

          {/* Test Cards Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <CreditCard className="h-5 w-5 text-lime mr-2" />
              <h3 className="text-lg font-semibold text-white">Test Cards</h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        Card Number
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        Expiry Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        CVV
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        PIN
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        OTP
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {testCards.map((card, index) => (
                      <tr key={index} className="hover:bg-white/5">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-lime">
                          {card.number}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">
                          {card.expiry}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">
                          {card.cvv}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">
                          {card.pin}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">
                          {card.otp}
                        </td>
                        <td className="px-4 py-4 text-sm text-white-muted">
                          <div className="flex items-center">
                            {getStatusIcon(card.type)}
                            <span className="ml-2">{card.description}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* OPay Bank Account Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Landmark className="h-5 w-5 text-lime mr-2" />
              <h3 className="text-lg font-semibold text-white">OPay Bank Account</h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        Bank Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        Account Number
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        Phone Number
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        DOB
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        BVN
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        OTP
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        Test Case
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {bankAccounts.map((account, index) => (
                      <tr key={index} className="hover:bg-white/5">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-lime">
                          {account?.bankCode}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">
                          {account?.accountNumber}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">
                          {account?.phoneNumber}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">
                          {account?.dob}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">
                          {account?.bvn}
                        </td>
                        <td className="px-4 py-4 text-sm text-white-muted">
                          {account?.otp}
                        </td>
                        <td className="px-4 py-4 text-sm text-white-muted">
                          {account?.testCase}
                        </td>
                        <td className="px-4 py-4 text-sm text-white-muted">
                          {account?.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* OPay Wallet Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Wallet className="h-5 w-5 text-lime mr-2" />
              <h3 className="text-lg font-semibold text-white">OPay Wallet</h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        Phone Number
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        Pin
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        OTP
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white-muted uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {opayWallet.map((wallet, index) => (
                      <tr key={index} className="hover:bg-white/5">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-lime">
                          {wallet?.phoneNumber}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">
                          {wallet?.pin}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">
                          {wallet?.otp}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-white-muted">
                          {wallet?.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-lime text-dark rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <Globe className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-bold">What's Next</h2>
          </div>
          <p className="text-dark/90 mb-4">
            Learn about webhook notifications for real-time payment updates
          </p>
          <Link
            to="/webhook"
            className="inline-flex items-center px-6 py-2 bg-dark text-white font-medium rounded-lg hover:bg-dark/90 transition-colors"
          >
            Webhook
          </Link>
        </div>
      </div>
    </div>
  );
};
