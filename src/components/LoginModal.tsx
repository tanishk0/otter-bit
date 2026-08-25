"use client";

import { useState } from "react";
import { useAuth, User } from "@/hooks/useAuth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: User) => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const { login, loginWithProvider, guestLogin } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const user = await login(email, password, mode === "signup" ? name : undefined);
      if (onSuccess) onSuccess(user);
      onClose();
    } catch (err: unknown) {
      setError((err as Error)?.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialAuth(provider: "github" | "google") {
    try {
      setLoading(true);
      setError(null);
      const user = await loginWithProvider(provider);
      if (onSuccess) onSuccess(user);
      onClose();
    } catch (err: unknown) {
      setError((err as Error)?.message || "Social login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGuest() {
    try {
      setLoading(true);
      setError(null);
      const user = await guestLogin();
      if (onSuccess) onSuccess(user);
      onClose();
    } catch (err: unknown) {
      setError((err as Error)?.message || "Guest login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark blur backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl p-7 shadow-2xl text-gray-100 z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-[#21262d] transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Header Branding */}
        <div className="text-center space-y-1.5 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-2xl mb-1 shadow-inner">
            🦦
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            {mode === "signin" ? "Welcome back to OtterBit" : "Start Learning on OtterBit"}
          </h2>
          <p className="text-xs text-gray-400">
            {mode === "signin"
              ? "Log in to track your WebContainer learning progress"
              : "Create an account to save workspace challenges & tasks"}
          </p>
        </div>

        {/* Auth Mode Toggle Tabs */}
        <div className="flex bg-[#0d1117] p-1 rounded-xl border border-[#21262d] mb-5">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setError(null);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === "signin"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError(null);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === "signup"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Social / 1-Click Providers */}
        <div className="space-y-2.5 mb-5">
          <button
            type="button"
            onClick={() => handleSocialAuth("github")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white py-2.5 px-4 rounded-xl text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>Continue with GitHub</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialAuth("google")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white py-2.5 px-4 rounded-xl text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-3.1c0-.4 0-.8 0-1.2v-3.8z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-[#30363d] w-full" />
          <span className="bg-[#161b22] px-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">
            Or with email
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3.5">
          {mode === "signup" && (
            <div>
              <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Ada Lovelace"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 outline-none transition-colors"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="developer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs shadow-lg shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : mode === "signin" ? (
              "Sign In to OtterBit →"
            ) : (
              "Create My Account →"
            )}
          </button>
        </form>

        {/* Guest 1-Click Sandbox Entry */}
        <div className="mt-4 pt-4 border-t border-[#21262d] text-center">
          <button
            type="button"
            onClick={handleGuest}
            disabled={loading}
            className="text-xs text-gray-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>⚡ Instant Guest Access (No password required)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
