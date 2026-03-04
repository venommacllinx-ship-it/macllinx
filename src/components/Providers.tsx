"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser, signInWithDemo, signOut as clientSignOut, User } from "@/lib/clientAuth";

interface AuthContextType {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within Providers");
  }
  return context;
}

export function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const handleSignIn = () => {
    const newUser = signInWithDemo();
    setUser(newUser);
  };

  const handleSignOut = () => {
    clientSignOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn: handleSignIn, signOut: handleSignOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
