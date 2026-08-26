"use client";

import { useState, useEffect, useCallback } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider?: "email" | "github" | "google" | "guest";
  role?: string;
}

const STORAGE_KEY = "otterbit_user_session";

function getInitialUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("Failed to read user session:", err);
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [loading, setLoading] = useState(false);

  // Sync auth state on storage and custom events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        if (e.newValue) {
          try {
            setUser(JSON.parse(e.newValue));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    const handleCustomAuthChange = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        setUser(stored ? JSON.parse(stored) : null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-change", handleCustomAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleCustomAuthChange);
    };
  }, []);

  const saveUserSession = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    window.dispatchEvent(new Event("auth-change"));
  }, []);

  const login = useCallback(
    async (email: string, _password?: string, name?: string) => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const userName = name || email.split("@")[0] || "Developer";
      const userData: User = {
        id: `user-${Date.now()}`,
        name: userName.charAt(0).toUpperCase() + userName.slice(1),
        email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
          userName
        )}`,
        provider: "email",
        role: "Full-Stack Engineer",
      };

      saveUserSession(userData);
      setLoading(false);
      return userData;
    },
    [saveUserSession]
  );

  const loginWithProvider = useCallback(
    async (provider: "github" | "google") => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 450));

      const isGithub = provider === "github";
      const userData: User = {
        id: `${provider}-${Date.now()}`,
        name: isGithub ? "GitHub Developer" : "Google Developer",
        email: isGithub ? "developer@github.com" : "developer@gmail.com",
        avatar: isGithub
          ? "https://avatars.githubusercontent.com/u/9919?v=4"
          : "https://api.dicebear.com/7.x/identicon/svg?seed=google-dev",
        provider,
        role: "Pro Learner",
      };

      saveUserSession(userData);
      setLoading(false);
      return userData;
    },
    [saveUserSession]
  );

  const guestLogin = useCallback(async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const userData: User = {
      id: `guest-${randomId}`,
      name: `Guest Otter #${randomId}`,
      email: `guest${randomId}@otterbit.dev`,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=guest-${randomId}`,
      provider: "guest",
      role: "Guest Sandbox User",
    };

    saveUserSession(userData);
    setLoading(false);
    return userData;
  }, [saveUserSession]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("auth-change"));
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    loginWithProvider,
    guestLogin,
    logout,
  };
}
