// Simple client-side auth simulation for Venom
// No external APIs or databases required

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

const USER_KEY = "venom-user";

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  
  try {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore localStorage errors
  }
  return null;
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === "undefined") return;
  
  try {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  } catch {
    // Ignore localStorage errors
  }
}

export function signInWithDemo(): User {
  const user: User = {
    id: "demo-user-" + Date.now(),
    name: "Demo User",
    email: "demo@venom.com",
    image: undefined,
  };
  setCurrentUser(user);
  return user;
}

export function signOut(): void {
  setCurrentUser(null);
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
