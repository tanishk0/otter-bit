"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  onOpenLogin?: () => void;
}

export default function Navbar({ onOpenLogin }: NavbarProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#21262d] bg-[#0d1117]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0d1117] rounded-[11px] flex items-center justify-center text-xl">
              🦦
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                OtterBit
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                WebContainer
              </span>
            </div>
            <span className="text-[11px] text-gray-400 -mt-0.5">
              AI-Guided Dev Workspace
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-gray-300">
          <Link
            href="/projects"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>📚</span>
            <span>Projects Catalog</span>
          </Link>
          <a
            href="#features"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>⚡</span>
            <span>Features</span>
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>🎯</span>
            <span>How it Works</span>
          </a>
          <a
            href="https://webcontainers.io"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5 text-gray-400"
          >
            <span>Runtime</span>
            <span className="text-[10px]">↗</span>
          </a>
        </nav>

        {/* Right Action Section: Go & Login */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            /* Authenticated User Menu */
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 p-1.5 pl-3 rounded-full bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] transition-all cursor-pointer"
              >
                <span className="text-xs font-medium text-gray-200 hidden sm:inline">
                  {user.name}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full bg-blue-900/30 border border-blue-400/40 object-cover"
                />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl p-2 text-xs text-gray-200 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-[#21262d] mb-1">
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                    <span className="mt-1 inline-block text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                      {user.role || "Active Session"}
                    </span>
                  </div>

                  <Link
                    href="/projects"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600/10 hover:text-blue-400 transition-colors"
                  >
                    <span>🚀</span>
                    <span>Go to Projects</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
                  >
                    <span>🚪</span>
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Unauthenticated: Login Button */
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-[#161b22] border border-transparent hover:border-[#30363d] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>🔑</span>
              <span>Log In</span>
            </button>
          )}

          {/* Primary "Go" Action CTA */}
          <Link
            href="/projects"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
          >
            <span>Go to Projects</span>
            <span className="font-mono">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
