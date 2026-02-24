import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Lock,
  Cpu,
  HeadphonesIcon,
  Code2,
  CreditCard,
  Webhook,
  Server,
} from "lucide-react";

export const Overview: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Authentication",
      description:
        "Public and private key authentication for gateway and server-to-server access",
      href: "/authentication",
      gradient: "from-kiwi-500/20 to-kiwi-600/10",
      iconBg: "bg-kiwi-500/20",
      iconColor: "text-kiwi-400",
    },
    {
      icon: CreditCard,
      title: "Gateway Integration",
      description:
        "Embed a secure payment checkout experience directly into your application",
      href: "/collections",
      gradient: "from-accent-500/20 to-accent-600/10",
      iconBg: "bg-accent-500/20",
      iconColor: "text-accent-400",
    },
    {
      icon: Server,
      title: "Server to Server",
      description:
        "Direct API integration for secure backend-to-backend transactions",
      href: "/account",
      gradient: "from-orange-500/20 to-orange-600/10",
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-400",
    },
    {
      icon: Webhook,
      title: "Webhook",
      description:
        "Receive real-time notifications for payment events and transaction updates",
      href: "/payouts",
      gradient: "from-highlight-500/20 to-highlight-600/10",
      iconBg: "bg-highlight-500/20",
      iconColor: "text-highlight-400",
    },
  ];

  const benefits = [
    {
      icon: Lock,
      title: "Secure & Compliant",
      description: "Bank-grade security with full regulatory compliance",
      color: "text-kiwi-400",
    },
    {
      icon: Code2,
      title: "Developer Friendly",
      description: "RESTful APIs with comprehensive documentation",
      color: "text-accent-400",
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Instant transfers and real-time status updates",
      color: "text-highlight-400",
    },
    {
      icon: Globe,
      title: "Comprehensive Coverage",
      description: "Extensive connectivity with global banks",
      color: "text-blue-400",
    },
    {
      icon: Cpu,
      title: "Scalable Infrastructure",
      description: "Built to handle high-volume transactions",
      color: "text-pink-400",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Dedicated technical support team",
      color: "text-orange-400",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-20 relative">
        {/* Badge */}
        {/* Title with gradient */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-white">Build with </span>
          <span className="gradient-text">Kiwi Finance</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          Complete financial infrastructure for global businesses. Collect
          payments, send money, and manage accounts with powerful APIs.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/getting-started"
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-kiwi-500 to-accent-500 text-white font-semibold rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/authentication"
            className="inline-flex items-center justify-center px-8 py-4 glass rounded-xl text-white font-semibold hover:bg-white/10 transition-all duration-200"
          >
            View API Reference
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-2 gap-4">
          {[
            // { value: '10+', label: 'API Endpoints' },
            // { value: "100+", label: "Banks Supported" },
            { value: "<200ms", label: "Response Time" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat, index) => (
            <div key={index} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Explore Our APIs
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Everything you need to build financial products for the global
            market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <Link key={index} to={feature.href} className="group relative">
              <div
                className={`p-6 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-card`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${feature.iconBg}`}>
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      {feature.title}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-20">
        <div className="glass rounded-2xl p-8 sm:p-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">Kiwi Finance</span>?
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Built for developers, trusted by businesses across the globe
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className={`p-2 rounded-lg bg-white/5 ${benefit.color}`}>
                  <benefit.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-white/50">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Code Preview Section */}
      <div className="mb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Simple Integration
          </h2>
          <p className="text-white/50">
            Get up and running with just a few lines of code
          </p>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-white/40 ml-2 font-mono">
              example.js
            </span>
          </div>
          <pre className="p-6 overflow-x-auto text-sm">
            <code className="text-white/80">
              <span className="text-highlight-400">const</span>{" "}
              <span className="text-white">response</span>{" "}
              <span className="text-white/50">=</span>{" "}
              <span className="text-highlight-400">await</span>{" "}
              <span className="text-accent-400">fetch</span>
              <span className="text-white/50">(</span>
              <span className="text-kiwi-400">
                'https://api.kiwifinance.tech/transaction/initialize'
              </span>
              <span className="text-white/50">,</span>{" "}
              <span className="text-white/50">{"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-white">method</span>
              <span className="text-white/50">:</span>{" "}
              <span className="text-kiwi-400">'POST'</span>
              <span className="text-white/50">,</span>
              {"\n"}
              {"  "}
              <span className="text-white">headers</span>
              <span className="text-white/50">:</span>{" "}
              <span className="text-white/50">{"{"}</span>
              {"\n"}
              {"    "}
              <span className="text-kiwi-400">'x-public-key'</span>
              <span className="text-white/50">:</span>{" "}
              <span className="text-kiwi-400">'your_public_key'</span>
              <span className="text-white/50">,</span>
              {"\n"}
              {"    "}
              <span className="text-kiwi-400">'Content-Type'</span>
              <span className="text-white/50">:</span>{" "}
              <span className="text-kiwi-400">'application/json'</span>
              {"\n"}
              {"  "}
              <span className="text-white/50">{"}"},</span>
              {"\n"}
              {"  "}
              <span className="text-white">body</span>
              <span className="text-white/50">:</span>{" "}
              <span className="text-accent-400">JSON</span>
              <span className="text-white/50">.</span>
              <span className="text-accent-400">stringify</span>
              <span className="text-white/50">({"{"}</span>
              {"\n"}
              {"    "}
              <span className="text-white">amount</span>
              <span className="text-white/50">:</span>{" "}
              <span className="text-orange-400">100000</span>
              <span className="text-white/50">,</span>
              {"\n"}
              {"    "}
              <span className="text-white">email</span>
              <span className="text-white/50">:</span>{" "}
              <span className="text-kiwi-400">'customer@example.com'</span>
              <span className="text-white/50">,</span>
              {"\n"}
              {"    "}
              <span className="text-white">currency</span>
              <span className="text-white/50">:</span>{" "}
              <span className="text-kiwi-400">'USD'</span>
              <span className="text-white/50">,</span>
              {"\n"}
              {"    "}
              <span className="text-white">channels</span>
              <span className="text-white/50">:</span>{" "}
              <span className="text-white/50">[</span>
              <span className="text-kiwi-400">'card'</span>
              <span className="text-white/50">,</span>{" "}
              <span className="text-kiwi-400">'bank'</span>
              <span className="text-white/50">]</span>
              {"\n"}
              {"  "}
              <span className="text-white/50">{"}"})</span>
              {"\n"}
              <span className="text-white/50">{"}"});</span>
            </code>
          </pre>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-kiwi-500 to-accent-500 opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

        <div className="relative p-10 sm:p-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
            Join hundreds of businesses already using Kiwi Finance to power
            their payments
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/getting-started"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark font-semibold rounded-xl hover:bg-white/90 shadow-lg transition-all duration-200"
            >
              View Quick Start Guide
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="https://kiwifinance.tech/auth/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
