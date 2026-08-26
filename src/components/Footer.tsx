"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#21262d] bg-[#090d13] text-gray-400 text-xs py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-base">
            🦦
          </div>
          <div>
            <span className="font-bold text-white text-sm">OtterBit</span>
            <p className="text-[11px] text-gray-500">
              Interactive WebContainer-Powered Developer Workspace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-gray-400">
          <Link href="/projects" className="hover:text-white transition-colors">
            Projects Catalog
          </Link>
          <Link href="/login" className="hover:text-white transition-colors">
            Sign In
          </Link>
          <a
            href="https://webcontainers.io"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            WebContainers Engine
          </a>
        </div>

        <div className="text-[11px] text-gray-500">
          Built with Next.js, WebContainer API & Monaco Editor
        </div>
      </div>
    </footer>
  );
}
