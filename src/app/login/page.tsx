"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { user, isAuthenticated, login, loginWithProvider, guestLogin, logout } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please provide all required credentials");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await login(email, password, mode === "signup" ? name : undefined);
      router.push("/projects");
    } catch (err: unknown) {
      setError((err as Error)?.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocial(provider: "github" | "google") {
    try {
      setLoading(true);
      setError(null);
      await loginWithProvider(provider);
      router.push("/projects");
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
      await guestLogin();
      router.push("/projects");
    } catch (err: unknown) {
      setError((err as Error)?.message || "Guest entry failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-lg">
            🦦
          </div>
          <span className="font-bold text-white group-hover:text-blue-400 transition-colors">
            OtterBit
          </span>
        </Link>

        <Link
          href="/projects"
          className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>Go to Projects</span>
          <span>→</span>
        </Link>
      </header>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-8">
        {isAuthenticated && user ? (
          /* Already Logged In Card */
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-blue-500/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                You&apos;re logged in as {user.name}
              </h2>
              <p className="text-xs text-gray-400 mt-1">{user.email}</p>
            </div>

            <div className="space-y-3">
              <Link
                href="/projects"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-lg shadow-blue-500/20 transition-all"
              >
                <span>🚀 Go to Projects Catalog</span>
              </Link>

              <button
                type="button"
                onClick={logout}
                className="w-full py-2.5 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-gray-300 hover:text-red-400 text-xs font-semibold transition-colors cursor-pointer"
              >
                Log Out / Switch Account
              </button>
            </div>
          </div>
        ) : (
          /* Login / Signup Form */
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-7 sm:p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-2xl mb-1">
                🔑
              </div>
              <h1 className="text-2xl font-bold text-white">
                {mode === "signin" ? "Sign In to OtterBit" : "Create an Account"}
              </h1>
              <p className="text-xs text-gray-400">
                Unlock your interactive developer sandboxes and track task completion.
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex bg-[#0d1117] p-1 rounded-xl border border-[#21262d]">
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

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
                {error}
              </div>
            )}

            {/* Social Authentication */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleSocial("github")}
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
                onClick={() => handleSocial("google")}
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

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-[#30363d] w-full" />
              <span className="bg-[#161b22] px-3 text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                Or with Email
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              {mode === "signup" && (
                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Alan Turing"
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
                  "Sign In & Go to Workspace →"
                ) : (
                  "Create Account & Get Started →"
                )}
              </button>
            </form>

            {/* Quick Guest Pass */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleGuest}
                disabled={loading}
                className="text-xs text-gray-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>⚡ Instant Guest Access (No sign-up required)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer info */}
      <footer className="text-center text-xs text-gray-500 py-4">
        © OtterBit Developer Platform. Built with WebContainer & Next.js.
      </footer>
    </div>
  );
}
