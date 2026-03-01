"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { WifiOff, RefreshCw } from "lucide-react";

// Subscribe to online/offline events
function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

// Get the current online status
function getSnapshot() {
  return navigator.onLine;
}

// Server snapshot - assume online during SSR
function getServerSnapshot() {
  return true;
}

export function NetworkStatus({ children }: { children: React.ReactNode }) {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = () => {
    setIsChecking(true);
    setTimeout(() => setIsChecking(false), 1000);
  };

  if (isOnline) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center">
            <WifiOff className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-white mb-4">You&apos;re offline</h1>
        <p className="text-neutral-400 mb-8">
          Venom requires an internet connection to work. Please check your connection and try again.
        </p>

        {/* Retry Button */}
        <button
          onClick={checkConnection}
          disabled={isChecking}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-neutral-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200"
        >
          <RefreshCw className={`w-5 h-5 ${isChecking ? "animate-spin" : ""}`} />
          {isChecking ? "Checking..." : "Try Again"}
        </button>

        {/* Features that require internet */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <p className="text-sm text-neutral-500 mb-4">Features requiring connection:</p>
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              AI Music Generation
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              Global Publishing
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              Venomous Chat
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              Cloud Storage
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
