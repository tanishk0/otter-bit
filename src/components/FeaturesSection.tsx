"use client";

import Link from "next/link";

interface FeaturesSectionProps {
  onOpenLogin: () => void;
}

export default function FeaturesSection({ onOpenLogin }: FeaturesSectionProps) {
  const features = [
    {
      icon: "⚡",
      title: "In-Browser WebContainers",
      description:
        "Run real Node.js runtimes, package managers, and local dev servers entirely within your browser via WebAssembly. Zero cloud containers to provision.",
    },
    {
      icon: "🎯",
      title: "Task-Based AI Curriculum",
      description:
        "Every project is partitioned into sequential learning milestones with clear goals, target file indicators, and evaluation criteria.",
    },
    {
      icon: "📑",
      title: "Integrated Monaco Editor",
      description:
        "Experience full IDE functionality with Monaco code editor, syntax highlighting, multi-file navigation, and split-view live preview.",
    },
    {
      icon: "🌐",
      title: "Instant Live Previews",
      description:
        "Preview frontend UI and test backend APIs instantly as you code with zero compilation latency or external port forwarding.",
    },
    {
      icon: "💻",
      title: "Interactive Terminal Logs",
      description:
        "Inspect build processes, npm installation events, server logs, and error stack traces in real time with an embedded terminal log viewer.",
    },
    {
      icon: "🔄",
      title: "One-Click State Resets",
      description:
        "Experiment freely. If you break anything, reset any project back to its pristine seed baseline with a single click.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Select your project",
      desc: "Choose from React apps, Express backend APIs, or TypeScript sandboxes from the catalog.",
    },
    {
      step: "02",
      title: "Follow Guided Tasks",
      desc: "Complete focused tasks step-by-step with direct pointers to the relevant code files.",
    },
    {
      step: "03",
      title: "Test Live in Real Time",
      desc: "Verify your implementation against live preview outputs and interactive server logs.",
    },
  ];

  return (
    <div className="space-y-24 py-16">
      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Engineered for Modern Learning
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Everything You Need to Master Full-Stack Dev
          </h2>
          <p className="text-sm text-gray-400">
            A frictionless developer experience designed to teach real code patterns through hands-on practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#161b22] border border-[#21262d] rounded-2xl p-6 hover:border-[#30363d] transition-all hover:bg-[#1c2128]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-2xl mb-4 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Step-by-Step */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#21262d] rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Simple 3-Step Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How OtterBit Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((s, idx) => (
              <div key={idx} className="relative space-y-3 text-center md:text-left">
                <div className="text-4xl font-extrabold text-blue-500/20 font-mono">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Call to Action Section with Go & Login options */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Upgrade Your Developer Skills?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
              Launch into hands-on code sandboxes right away or log in to sync your progress.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/projects"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span>🚀 Go to Projects Catalog</span>
              <span>→</span>
            </Link>

            <button
              type="button"
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-gray-200 hover:text-white font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🔑 Log In to Account</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
