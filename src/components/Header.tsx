"use client";

import Link from "next/link";
import { useState } from "react";
import { User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/components/Providers";

const navLinks = [
  { href: "/search", label: "Search" },
  { href: "#generate", label: "Generate" },
  { href: "#publish", label: "Publish" },
  { href: "#games", label: "Games" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/studio", label: "Studio" },
  { href: "/logo-music", label: "Logo Music" },
  { href: "/browser", label: "Browser" },
  { href: "#builder", label: "Web Builder" },
  { href: "/chat", label: "Chat" },
  { href: "/code", label: "Code" },
  { href: "/subscription", label: "Pricing" },
  { href: "#about", label: "About" },
  { href: "#inspired-by", label: "X" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut, isLoading } = useAuth();
  const isAuthenticated = !!user;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Signature black emblem */}
            <div className="w-11 h-11 rounded-xl bg-black border border-white/10 flex items-center justify-center shadow-lg group-hover:border-white/30 transition-colors duration-300">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* V-shaped lightning bolt signature mark */}
                <path d="M4 4 L14 22 L24 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M9 4 L14 13 L19 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/>
                <circle cx="14" cy="24" r="1.5" fill="white" opacity="0.8"/>
              </svg>
            </div>
            {/* Signature wordmark */}
            <div className="flex flex-col leading-none gap-[2px]">
              <span
                className="text-[22px] font-black tracking-[0.12em] text-white uppercase"
                style={{ fontStretch: "condensed", letterSpacing: "0.1em" }}
              >
                VENOM
              </span>
              <span className="text-[9px] font-semibold tracking-[0.45em] text-white/40 uppercase">
                DLS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons / User Profile */}
          <div className="hidden md:flex items-center gap-3">
            {/* Settings Button */}
            <Link
              href="/settings"
              className="p-2 text-gray-400 hover:text-[#00ff88] transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </Link>

            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse" />
            ) : isAuthenticated ? (
              <>
                {/* User Profile */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                    <User className="w-4 h-4 text-neutral-400" />
                  </div>
                  <span className="text-sm text-gray-300 hidden lg:block">
                    {user?.name?.split(" ")[0] || "User"}
                  </span>
                  <button
                    onClick={signOut}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Sign out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Login / Sign Up */}
                <Link
                  href="/login"
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200 font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold text-black bg-[#00ff88] rounded-lg hover:bg-[#00cc6e] transition-colors duration-200 glow-green"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-[#1a1a1a]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-400 hover:text-[#00ff88] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Settings Link */}
            <Link
              href="/settings"
              className="block py-2 text-gray-400 hover:text-[#00ff88] transition-colors border-t border-[#1a1a1a] mt-4 pt-2"
              onClick={() => setMenuOpen(false)}
            >
              Settings
            </Link>
            
            {/* Mobile Auth */}
            <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                      <User className="w-4 h-4 text-neutral-400" />
                    </div>
                    <span className="text-sm text-gray-300">
                      {user?.name || "User"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    className="block text-center py-2 text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="block text-center px-4 py-2 text-sm font-semibold text-black bg-[#00ff88] rounded-lg"
                    onClick={() => setMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
