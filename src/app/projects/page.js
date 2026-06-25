"use client";
import { useState } from "react";

// ============================================================
// PROJECT DATA
// To add a project: copy one of the objects below and fill it in.
//
// status:   "current"  → Active / in progress
//           "previous" → Completed
//           "future"   → Planned / upcoming
//
// tagColor: "blue" | "green" | "purple" | "orange" | "yellow" | "red"
// ============================================================
const ALL_PROJECTS = [
  {
    id: 1,
    status: "current",
    title: "Formula SAE Electrical Technical Direction",
    tags: ["Altium", "Embedded C", "Simulink"],
    tagColor: "blue",
    date: "May 2024 – Present",
    category: "Formula SAE",
    description:
      "Directed a 20-person electrical engineering team through 40+ concurrent projects. Overseeing design process integration of critical low-voltage subsystems including battery management, telemetry, and power distribution.",
    highlights: [
      "Introduced design-for-manufacturability practices that improved overall reliability.",
      "Engineered real-time data acquisition tools — 104% increase in testing efficiency.",
    ],
  },
  {
    id: 2,
    status: "previous",
    title: "Vehicle Electrical Harness Optimization",
    tags: ["Hardware Systems", "Catia V5"],
    tagColor: "green",
    date: "Formula SAE Subsystem",
    category: "Formula SAE",
    description:
      "Designed and optimized a complete vehicle electrical harness utilizing proper wire gauge calculators and robust documentation structures.",
    highlights: [
      "Achieved a 44% reduction in overall harness weight profile.",
      "Mitigated electromagnetic interference (EMI) paths across cross-functional chassis subsystems.",
    ],
  },
  {
    id: 3,
    status: "previous",
    title: "Automated Press Line Control System",
    tags: ["Ladder Logic", "Node-RED", "HMI"],
    tagColor: "purple",
    date: "Industrial Automation",
    category: "Automation",
    description:
      "Designed an automated press line control schematic running on an Arduino Opta PLC platform. Engineered functional ladder logic architecture alongside an interactive Node-RED human-machine interface.",
    highlights: [],
  },
  {
    id: 4,
    status: "previous",
    title: "Autonomous AI Pac-Man RC Car",
    tags: ["ESP32", "Computer Vision"],
    tagColor: "orange",
    date: "Autonomous AI Lab",
    category: "Robotics",
    description:
      "Developed a fuzzy logic tracking controller enabling an RC vehicle to autonomously navigate obstacle fields while tracking target tags. Implemented an embedded computer vision neural network pipeline deployed directly on an ESP32 microcontroller.",
    highlights: [],
  },
  // ── ADD NEW PROJECTS BELOW THIS LINE ──────────────────────
  // {
  //   id: 5,
  //   status: "future",
  //   title: "Your Next Project Title",
  //   tags: ["Tool 1", "Tool 2"],
  //   tagColor: "yellow",
  //   date: "Planned: Q3 2025",
  //   category: "Category",
  //   description: "A short description of what this project will accomplish.",
  //   highlights: [],
  // },
];

// ── STATUS CONFIG ─────────────────────────────────────────────
const STATUS_CONFIG = {
  current: {
    label: "Current",
    description: "Active & in development",
    dot: "bg-green-400",
    border: "border-green-500/30",
    text: "text-green-400",
    badge: "bg-green-500/10",
  },
  previous: {
    label: "Previous",
    description: "Completed projects",
    dot: "bg-blue-400",
    border: "border-blue-500/30",
    text: "text-blue-400",
    badge: "bg-blue-500/10",
  },
  future: {
    label: "Future",
    description: "Planned & upcoming",
    dot: "bg-purple-400",
    border: "border-purple-500/30",
    text: "text-purple-400",
    badge: "bg-purple-500/10",
  },
};

// ── TAG COLOR MAP ─────────────────────────────────────────────
const TAG_COLORS = {
  blue:   "bg-blue-500/10   border-blue-500/20   text-blue-400",
  green:  "bg-green-500/10  border-green-500/20  text-green-400",
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  orange: "bg-orange-500/10 border-orange-500/20 text-orange-400",
  yellow: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
  red:    "bg-red-500/10    border-red-500/20    text-red-400",
};

// ── HIGHLIGHT RENDERER ────────────────────────────────────────
// Automatically bolds any metric containing a number + % (e.g. "104% increase")
function renderHighlight(text) {
  const parts = text.split(/(\d+%[^.]*)/);
  return parts.map((part, i) =>
    /\d+%/.test(part) ? (
      <strong key={i} className="text-blue-400 font-bold">{part}</strong>
    ) : part
  );
}

// ── PAGE ──────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.status === activeFilter);

  const counts = {
    all:      ALL_PROJECTS.length,
    current:  ALL_PROJECTS.filter((p) => p.status === "current").length,
    previous: ALL_PROJECTS.filter((p) => p.status === "previous").length,
    future:   ALL_PROJECTS.filter((p) => p.status === "future").length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Engineering Projects
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Core architectural tracks and technical engineering executions
        </p>
        <div className="h-1 w-12 bg-blue-500 rounded mt-4" />
      </div>

      {/* Layout: sidebar + cards */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* ── Sidebar ── */}
        <aside className="md:w-52 flex-shrink-0 space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-3">
            Filter by Status
          </p>

          {/* All */}
          <button
            onClick={() => setActiveFilter("all")}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-mono transition-all flex justify-between items-center ${
              activeFilter === "all"
                ? "bg-slate-800 border-slate-600 text-white"
                : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
            }`}
          >
            <span>All Projects</span>
            <span className="text-xs bg-slate-700/50 px-1.5 py-0.5 rounded">
              {counts.all}
            </span>
          </button>

          {/* Current / Previous / Future */}
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-mono transition-all flex justify-between items-center ${
                activeFilter === key
                  ? "bg-slate-800 border-slate-600 text-white"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                <span>{cfg.label}</span>
              </div>
              <span className="text-xs bg-slate-700/50 px-1.5 py-0.5 rounded">
                {counts[key]}
              </span>
            </button>
          ))}

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600">
              Status Key
            </p>
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <div key={key} className="flex items-start gap-2">
                <span className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${cfg.dot}`} />
                <div>
                  <p className={`text-xs font-mono font-bold ${cfg.text}`}>
                    {cfg.label}
                  </p>
                  <p className="text-[10px] text-slate-600">{cfg.description}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* ── Project Cards ── */}
        <div className="flex-grow space-y-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border border-slate-800 rounded-2xl">
              <p className="text-slate-500 font-mono text-sm">
                No projects in this category yet.
              </p>
              <p className="text-slate-700 text-xs mt-1">Check back soon.</p>
            </div>
          ) : (
            filtered.map((project) => {
              const cfg = STATUS_CONFIG[project.status];
              return (
                <div
                  key={project.id}
                  className="p-6 border border-slate-800 rounded-2xl bg-slate-950 shadow-xl hover:border-slate-700 transition-all space-y-4"
                >
                  {/* Top row: tags + date + status badge */}
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs font-mono font-bold px-2.5 py-1 border rounded-md ${TAG_COLORS[project.tagColor]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-slate-500 font-mono">
                        {project.date}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border flex items-center gap-1.5 ${cfg.badge} ${cfg.border} ${cfg.text}`}
                      >
                        <span className={`w-1 h-1 rounded-full ${cfg.dot}`} />
                        {cfg.label.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Title + description */}
                  <div>
                    <h3 className="font-bold text-xl text-white">{project.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mt-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  {project.highlights.length > 0 && (
                    <ul className="text-xs text-slate-500 list-disc list-inside space-y-1.5">
                      {project.highlights.map((h, i) => (
                        <li key={i}>{renderHighlight(h)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
