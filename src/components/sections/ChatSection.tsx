"use client";

import { useState } from "react";
import Link from "next/link";

const onlineUsers = [
  { name: "Luna", country: "Brazil", genre: "Hip-Hop", status: "online" },
  { name: "Kai", country: "Japan", genre: "Trap", status: "online" },
  { name: "Zara", country: "Nigeria", genre: "Afrobeats", status: "online" },
  { name: "Mateo", country: "Spain", genre: "Reggaeton", status: "away" },
  { name: "Aisha", country: "Morocco", genre: "R&B", status: "online" },
  { name: "Leo", country: "France", genre: "Electronic", status: "online" },
];

const chatFeatures = [
  {
    title: "Connect Globally",
    description: "Chat with music lovers from 150+ countries and discover new sounds.",
    icon: "🌍",
  },
  {
    title: "Share Advice",
    description: "Get feedback on your tracks and learn production tips from pros.",
    icon: "💡",
  },
  {
    title: "Collab Finder",
    description: "Find producers, vocalists, and musicians to create with worldwide.",
    icon: "🤝",
  },
];

export default function ChatSection() {
  const [hoveredUser, setHoveredUser] = useState<number | null>(null);

  return (
    <section id="chat" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff0066]/10 border border-[#ff0066]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#ff0066] animate-pulse" />
            <span className="text-sm font-medium text-[#ff0066]">Live Community</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Venomous <span className="gradient-text-pink">Chat</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Connect with music lovers worldwide. Chat with foreigners, share your beats, 
            get advice, and find your next collaborator.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {chatFeatures.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] hover:border-[#ff0066]/50 transition-all duration-300 group"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ff0066] transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Live Users Preview */}
        <div className="rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {onlineUsers.slice(0, 4).map((user, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff0066] to-[#ff3366] flex items-center justify-center text-white font-bold text-sm border-2 border-[#1a1a1a]"
                  >
                    {user.name[0]}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-semibold">{onlineUsers.length} users online now</p>
                <p className="text-gray-500 text-xs">From 6 different countries</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-500 text-sm font-medium">Live</span>
            </div>
          </div>

          {/* User Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {onlineUsers.map((user, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[#0f0f0f] border border-[#2a2a2a] hover:border-[#ff0066]/50 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredUser(index)}
                onMouseLeave={() => setHoveredUser(null)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff0066] to-[#ff3366] flex items-center justify-center text-white font-bold text-sm">
                    {user.name[0]}
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      user.status === "online" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  />
                </div>
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-gray-500 text-xs">{user.country}</p>
                {hoveredUser === index && (
                  <p className="text-[#ff0066] text-xs mt-2 animate-pulse">Click to chat →</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/chat"
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#ff0066] to-[#ff3366] rounded-xl hover:opacity-90 transition-all duration-300 glow-pink"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Enter Venomous Chat
          </Link>
          <p className="text-gray-500 text-sm mt-4">Free to join • No registration required</p>
        </div>
      </div>

      <style jsx>{`
        .gradient-text-pink {
          background: linear-gradient(135deg, #ff0066 0%, #ff3366 50%, #ff6688 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glow-pink {
          box-shadow: 0 0 30px rgba(255, 0, 102, 0.3);
        }
      `}</style>
    </section>
  );
}
