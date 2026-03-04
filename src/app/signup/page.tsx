"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Music, ArrowLeft, Sparkles, Zap, Globe, UserPlus } from "lucide-react";
import { useAuth } from "@/components/Providers";

export default function SignupPage() {
  const { user, signIn, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-green-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/"
          className="absolute -top-16 left-0 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to home</span>
        </Link>

        {/* Card */}
        <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Venom</h1>
                <p className="text-xs text-neutral-400 uppercase tracking-wider">Music Platform</p>
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create account</h2>
            <p className="text-neutral-400">
              Join thousands of artists creating with AI-powered tools
            </p>
          </div>

          {/* Demo Sign Up */}
          <button
            onClick={signIn}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 mb-6"
          >
            <UserPlus className="w-5 h-5" />
            Create Demo Account
          </button>

          <p className="text-center text-neutral-500 text-sm mb-6">
            No external authentication required. Your session is stored locally.
          </p>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-900/80 text-neutral-500">already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center">
            <Link
              href="/login"
              className="text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              Sign in instead
            </Link>
          </p>

          {/* Features Preview */}
          <div className="mt-8 pt-8 border-t border-neutral-800">
            <p className="text-center text-sm text-neutral-500 mb-4">What you get:</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <Sparkles className="w-4 h-4 text-green-500" />
                <span>AI Music Gen</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <Zap className="w-4 h-4 text-green-500" />
                <span>Instant Export</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <Globe className="w-4 h-4 text-green-500" />
                <span>Global Publishing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <Music className="w-4 h-4 text-green-500" />
                <span>All Platforms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-neutral-500 text-sm mt-8">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-neutral-400 hover:text-white transition-colors">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
