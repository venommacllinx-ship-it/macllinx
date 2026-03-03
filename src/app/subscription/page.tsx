"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VenomAI from "@/components/VenomAI";
import {
  Zap,
  Music,
  Mic2,
  Users,
  Crown,
  Check,
  Sparkles,
  Headphones,
  Radio,
  Globe,
  Shield,
  Star,
  CreditCard,
  Receipt,
} from "lucide-react";

interface PricingTier {
  name: string;
  price: number;
  description: string;
  icon: React.ReactNode;
  features: string[];
  highlighted?: boolean;
  color: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: 20,
    description: "Perfect for beginners exploring music production",
    icon: <Zap className="w-6 h-6" />,
    color: "#00ff88",
    features: [
      "10 AI music generations/month",
      "Basic beat library access",
      "MP3 exports only",
      "Community chat access",
      "Email support",
    ],
  },
  {
    name: "Producer",
    price: 50,
    description: "For serious producers ready to level up",
    icon: <Music className="w-6 h-6" />,
    color: "#00ccff",
    features: [
      "50 AI music generations/month",
      "Full beat & sample library",
      "WAV + MP3 exports",
      "Priority chat support",
      "Basic publishing tools",
      "2 collaborative projects",
    ],
  },
  {
    name: "Artist",
    price: 100,
    description: "Everything you need to release your music",
    icon: <Mic2 className="w-6 h-6" />,
    color: "#ff0066",
    highlighted: true,
    features: [
      "Unlimited AI generations",
      "Premium sound library",
      "Studio-quality exports (WAV, FLAC)",
      "Distribution to Spotify, Apple Music, etc.",
      "Royalty tracking dashboard",
      "10 collaborative projects",
      "Custom branding",
      "Priority support",
    ],
  },
  {
    name: "Label",
    price: 300,
    description: "For independent labels managing multiple artists",
    icon: <Users className="w-6 h-6" />,
    color: "#ffaa00",
    features: [
      "Everything in Artist",
      "5 artist sub-accounts",
      "Advanced analytics & reporting",
      "White-label distribution",
      "Contract templates",
      "Revenue splitting tools",
      "50 collaborative projects",
      "Dedicated account manager",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    price: 900,
    description: "Custom solutions for major operations",
    icon: <Crown className="w-6 h-6" />,
    color: "#aa00ff",
    features: [
      "Everything in Label",
      "Unlimited artist accounts",
      "Custom AI model training",
      "White-label platform",
      "24/7 phone support",
      "Custom integrations",
      "Unlimited collaborations",
      "SLA guarantee",
      "Onboarding specialist",
      "Quarterly business reviews",
    ],
  },
];

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  const getYearlyPrice = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * 10); // 2 months free
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 mb-6">
              <Sparkles className="w-4 h-4 text-[#00ff88]" />
              <span className="text-[#00ff88] text-sm font-medium">
                Choose Your Plan
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Unlock Your{" "}
              <span className="text-[#00ff88]">Full Potential</span>
            </h1>

            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
              From your first beat to global distribution, we have a plan that
              fits your journey. Start free and upgrade as you grow.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-white/5 border border-white/10">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingCycle === "monthly"
                    ? "bg-[#00ff88] text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  billingCycle === "yearly"
                    ? "bg-[#00ff88] text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Yearly
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#ff0066] text-white">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  onMouseEnter={() => setHoveredTier(tier.name)}
                  onMouseLeave={() => setHoveredTier(null)}
                  className={`relative rounded-2xl p-6 transition-all duration-500 ${
                    tier.highlighted
                      ? "bg-gradient-to-b from-[#00ff88]/20 to-transparent border-2 border-[#00ff88] scale-105 z-10"
                      : "bg-white/5 border border-white/10 hover:border-white/30"
                  } ${hoveredTier === tier.name ? "transform -translate-y-2" : ""}`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00ff88] text-black text-xs font-bold">
                      MOST POPULAR
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${tier.color}20`, color: tier.color }}
                  >
                    {tier.icon}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tier.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/50 mb-4 min-h-[40px]">
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">
                        ${billingCycle === "monthly" ? tier.price : getYearlyPrice(tier.price)}
                      </span>
                      <span className="text-white/40">
                        /{billingCycle === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                    {billingCycle === "yearly" && (
                      <p className="text-sm text-[#00ff88] mt-1">
                        ${tier.price}/mo when billed yearly
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 mb-6 ${
                      tier.highlighted
                        ? "bg-[#00ff88] text-black hover:bg-[#00ff88]/90"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    }`}
                    onClick={() => alert("Coming soon! Subscribe functionality will be available shortly.")}
                  >
                    Get Started
                  </button>

                  {/* Features */}
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: tier.color }}
                        />
                        <span className="text-sm text-white/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Compare <span className="text-[#00ff88]">Features</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-white/60 font-medium">Feature</th>
                    {pricingTiers.map((tier) => (
                      <th key={tier.name} className="text-center py-4 px-4 text-white font-semibold">
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-white">AI Generations</td>
                    <td className="text-center py-4 px-4 text-white/70">10/mo</td>
                    <td className="text-center py-4 px-4 text-white/70">50/mo</td>
                    <td className="text-center py-4 px-4 text-[#00ff88]">Unlimited</td>
                    <td className="text-center py-4 px-4 text-[#00ff88]">Unlimited</td>
                    <td className="text-center py-4 px-4 text-[#00ff88]">Unlimited</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-white">Export Quality</td>
                    <td className="text-center py-4 px-4 text-white/70">MP3</td>
                    <td className="text-center py-4 px-4 text-white/70">WAV + MP3</td>
                    <td className="text-center py-4 px-4 text-[#00ff88]">Studio</td>
                    <td className="text-center py-4 px-4 text-[#00ff88]">Studio</td>
                    <td className="text-center py-4 px-4 text-[#00ff88]">Studio</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-white">Distribution</td>
                    <td className="text-center py-4 px-4 text-white/30">-</td>
                    <td className="text-center py-4 px-4 text-white/30">-</td>
                    <td className="text-center py-4 px-4 text-[#00ff88]">
                      <Check className="w-5 h-5 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4 text-[#00ff88]">
                      <Check className="w-5 h-5 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4 text-[#00ff88]">
                      <Check className="w-5 h-5 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <VenomAI />
    </div>
  );
}
