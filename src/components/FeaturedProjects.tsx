"use client";

import Link from "next/link";

const FEATURED_PROJECTS = [
  {
    id: "trello-react-tribute",
    title: "Trello Tribute (React Kanban Board)",
    category: "Frontend Development",
    difficulty: "intermediate",
    framework: "React",
    language: "JavaScript",
    tasksCount: 3,
    icon: "📋",
    description:
      "Build a complete Trello-like Kanban board in React with drag-and-drop cards, dynamic column management, and live task verification.",
    tags: ["React", "State Management", "UI/UX"],
  },
  {
    id: "advanced-express-backend",
    title: "Advanced Express Backend",
    category: "Backend Development",
    difficulty: "advanced",
    framework: "Express",
    language: "JavaScript",
    tasksCount: 2,
    icon: "⚡",
    description:
      "Master modular Express routing, JWT authentication controller validation, and HTTP status code discipline inside an in-browser Node runtime.",
    tags: ["Express", "API Design", "Node.js"],
  },
  {
    id: "react-sandbox",
    title: "React Component Sandbox",
    category: "Frontend Development",
    difficulty: "beginner",
    framework: "React",
    language: "TypeScript",
    tasksCount: 1,
    icon: "⚛️",
    description:
      "Learn stateful component development, React hooks, and interactive user event handling with TypeScript in a fast isolated environment.",
    tags: ["React", "TypeScript", "Hooks"],
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-16 bg-[#0d1117]/60 border-t border-[#21262d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>🚀 Featured Workspaces</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Pick a Project & Start Coding Instantly
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
              Each environment comes pre-loaded with initial boilerplates, real-time file tree, and interactive task requirements.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors group self-start md:self-auto"
          >
            <span>View All Projects in Catalog</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-[#161b22] border border-[#21262d] hover:border-blue-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 group"
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl">
                    {project.icon}
                  </div>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                      project.difficulty === "beginner"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : project.difficulty === "intermediate"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    }`}
                  >
                    {project.difficulty}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-[#0d1117] text-gray-400 px-2 py-0.5 rounded-md border border-[#30363d]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions: GO Button */}
              <div className="mt-6 pt-4 border-t border-[#21262d] flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-400 font-mono">
                  {project.tasksCount} Guided Tasks
                </span>

                <Link
                  href={`/projects/${project.id}`}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 font-semibold text-xs transition-all flex items-center gap-1.5 group-hover:bg-blue-600 group-hover:text-white"
                >
                  <span>Go to Workspace</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
