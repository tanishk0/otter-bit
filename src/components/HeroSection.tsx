"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface HeroSectionProps {
  onOpenLogin: () => void;
}

export default function HeroSection({ onOpenLogin }: HeroSectionProps) {
  const { user, isAuthenticated } = useAuth();
  const [activeCodeTab, setActiveCodeTab] = useState<"board" | "list" | "terminal">("board");

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/15 to-purple-600/10 blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute top-0 right-10 w-72 h-72 bg-cyan-500/10 blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold shadow-inner backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Browser-Native Node.js WebContainer Runtime</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-300">No Setup Required</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Master Real-World Code. <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Build, Run & Preview in Real-Time.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl font-normal leading-relaxed">
            OtterBit provides an in-browser development environment powered by WebContainers.
            Solve structured guided tasks, edit real codebases, and test full-stack web apps instantly.
          </p>

          {/* Main Action Section: GO & LOGIN Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
            {/* Primary GO button */}
            <Link
              href="/projects"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
            >
              <span>🚀</span>
              <span>Go to Projects Catalog</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>

            {/* LOGIN / User Action button */}
            {isAuthenticated && user ? (
              <Link
                href="/projects/trello-react-tribute"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#161b22] hover:bg-[#21262d] border border-emerald-500/40 text-emerald-300 font-semibold text-sm transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>⚡</span>
                <span>Continue as {user.name}</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={onOpenLogin}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-gray-500 text-gray-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <span>🔑</span>
                <span>Log In / Sign Up</span>
              </button>
            )}
          </div>

          {/* Social Proof / Stats Ticker */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 border-t border-[#21262d] w-full max-w-3xl mt-4">
            <div className="space-y-0.5">
              <div className="text-xl font-bold text-white">0s</div>
              <div className="text-xs text-gray-400">Environment Setup</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xl font-bold text-blue-400">100%</div>
              <div className="text-xs text-gray-400">In-Browser Node.js</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xl font-bold text-indigo-400">3-Tier</div>
              <div className="text-xs text-gray-400">Task Curriculum</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xl font-bold text-emerald-400">Live</div>
              <div className="text-xs text-gray-400">Hot Module Reload</div>
            </div>
          </div>
        </div>

        {/* Hero Interactive Workspace Mockup Card */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-[#161b22] border border-[#30363d] shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d1117] border-b border-[#21262d]">
            {/* Traffic Lights */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs text-gray-400 font-mono ml-2 hidden sm:inline">
                otterbit-ide://workspace/trello-react-tribute
              </span>
            </div>

            {/* Quick Interactive Tabs */}
            <div className="flex items-center gap-1.5 bg-[#161b22] p-1 rounded-lg border border-[#30363d]">
              <button
                type="button"
                onClick={() => setActiveCodeTab("board")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                  activeCodeTab === "board"
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Board.js
              </button>
              <button
                type="button"
                onClick={() => setActiveCodeTab("list")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                  activeCodeTab === "list"
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                List.js
              </button>
              <button
                type="button"
                onClick={() => setActiveCodeTab("terminal")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                  activeCodeTab === "terminal"
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Terminal
              </button>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Server Live (Port 3000)</span>
            </div>
          </div>

          {/* IDE Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] bg-[#0d1117]">
            {/* Left Code Editor View */}
            <div className="lg:col-span-7 p-4 font-mono text-xs text-gray-300 border-r border-[#21262d] overflow-x-auto select-none bg-[#090d13]">
              {activeCodeTab === "board" && (
                <div className="space-y-1">
                  <p className="text-gray-500">{"// 🎯 Task 1: Complete state handlers & board composition"}</p>
                  <p>
                    <span className="text-purple-400">import</span> &#123; useState &#125;{" "}
                    <span className="text-purple-400">from</span>{" "}
                    <span className="text-emerald-300">&apos;react&apos;</span>;
                  </p>
                  <p>
                    <span className="text-purple-400">import</span> List{" "}
                    <span className="text-purple-400">from</span>{" "}
                    <span className="text-emerald-300">&apos;./List&apos;</span>;
                  </p>
                  <br />
                  <p>
                    <span className="text-blue-400">export default function</span>{" "}
                    <span className="text-yellow-300">Board</span>() &#123;
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-400">const</span> [board, setBoard] ={" "}
                    <span className="text-yellow-300">useState</span>(initialData);
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-400">function</span>{" "}
                    <span className="text-yellow-300">handleAddCard</span>(listId, title) &#123;
                  </p>
                  <p className="pl-8 text-emerald-400">
                    {"// Real-time state updates in WebContainer"}
                  </p>
                  <p className="pl-8">
                    setBoard(prev =&gt; (&#123; ...prev, lists: updateLists(prev.lists) &#125;));
                  </p>
                  <p className="pl-4">&#125;</p>
                  <br />
                  <p className="pl-4">
                    <span className="text-purple-400">return</span> (
                  </p>
                  <p className="pl-8 text-blue-300">
                    &lt;<span className="text-red-400">div</span> className=
                    <span className="text-emerald-300">&quot;board-container&quot;</span>&gt;
                  </p>
                  <p className="pl-12 text-blue-300">
                    &#123;board.lists.<span className="text-yellow-300">map</span>(l =&gt; &lt;
                    <span className="text-yellow-400">List</span> key=&#123;l.id&#125; list=&#123;l&#125; /&gt;)&#125;
                  </p>
                  <p className="pl-8 text-blue-300">&lt;/<span className="text-red-400">div</span>&gt;</p>
                  <p className="pl-4">);</p>
                  <p>&#125;</p>
                </div>
              )}

              {activeCodeTab === "list" && (
                <div className="space-y-1">
                  <p className="text-gray-500">{"// 🎯 Task 2: Individual Column List Component"}</p>
                  <p>
                    <span className="text-blue-400">export default function</span>{" "}
                    <span className="text-yellow-300">List</span>(&#123; list, onAddCard &#125;) &#123;
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-400">const</span> [isAdding, setIsAdding] ={" "}
                    <span className="text-yellow-300">useState</span>(false);
                  </p>
                  <p className="pl-4">
                    <span className="text-purple-400">return</span> (
                  </p>
                  <p className="pl-8 text-blue-300">
                    &lt;<span className="text-red-400">div</span> className=
                    <span className="text-emerald-300">&quot;list-wrapper&quot;</span>&gt;
                  </p>
                  <p className="pl-12 text-blue-300">
                    &lt;<span className="text-red-400">h3</span>&gt;&#123;list.title&#125;&lt;/<span className="text-red-400">h3</span>&gt;
                  </p>
                  <p className="pl-12 text-blue-300">
                    &#123;list.cards.map(c =&gt; &lt;<span className="text-yellow-400">Card</span> key=&#123;c.id&#125; card=&#123;c&#125; /&gt;)&#125;
                  </p>
                  <p className="pl-8 text-blue-300">&lt;/<span className="text-red-400">div</span>&gt;</p>
                  <p className="pl-4">);</p>
                  <p>&#125;</p>
                </div>
              )}

              {activeCodeTab === "terminal" && (
                <div className="space-y-1.5 text-gray-300">
                  <p className="text-emerald-400 font-semibold">[WebContainer] Initializing Node v18 runtime...</p>
                  <p className="text-gray-400">$ npm install</p>
                  <p className="text-gray-500">added 45 packages in 0.42s</p>
                  <p className="text-gray-400">$ npm run dev</p>
                  <p className="text-cyan-400">&gt; vite dev server running at http://localhost:3000</p>
                  <p className="text-emerald-400">✓ Compiled successfully in 128ms</p>
                  <div className="flex items-center gap-2 pt-2 text-gray-400">
                    <span className="text-blue-400">➜</span>
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Live Preview Simulation */}
            <div className="lg:col-span-5 p-5 bg-[#161b22] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#21262d]">
                  <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                    <span>🌐</span> Live Preview Output
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">localhost:3000</span>
                </div>

                {/* Mini Kanban Simulator */}
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-3 text-white space-y-2.5 shadow-inner">
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>📋 Sprint Board</span>
                    <span className="text-[10px] opacity-80 bg-black/20 px-1.5 py-0.5 rounded">
                      React 18
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-gray-100 text-gray-800 p-2 rounded-lg space-y-1.5 shadow-sm">
                      <div className="font-semibold text-[10px] uppercase text-gray-500">To Do (2)</div>
                      <div className="bg-white p-1.5 rounded shadow-xs text-[10px] font-medium border border-gray-200">
                        Setup WebContainer API
                      </div>
                      <div className="bg-white p-1.5 rounded shadow-xs text-[10px] font-medium border border-gray-200">
                        Render Kanban Cards
                      </div>
                    </div>

                    <div className="bg-gray-100 text-gray-800 p-2 rounded-lg space-y-1.5 shadow-sm">
                      <div className="font-semibold text-[10px] uppercase text-emerald-600">Done (1)</div>
                      <div className="bg-white p-1.5 rounded shadow-xs text-[10px] font-medium border border-emerald-200 text-emerald-800">
                        ✓ In-Browser Workspace
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Launch CTA card */}
              <div className="mt-4 pt-3 border-t border-[#21262d] flex items-center justify-between">
                <span className="text-xs text-gray-400">Ready to code this?</span>
                <Link
                  href="/projects/trello-react-tribute"
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
                >
                  <span>Launch Workspace</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
