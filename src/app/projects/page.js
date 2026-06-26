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
    dot: "bg-green-500",
    border: "border-green-200",
    text: "text-green-700",
    badge: "bg-green-50",
  },
  previous: {
    label: "Previous",
    description: "Completed projects",
    dot: "bg-blue-500",
    border: "border-blue-200",
    text: "text-blue-700",
    badge: "bg-blue-50",
  },
  future: {
    label: "Future",
    description: "Planned & upcoming",
    dot: "bg-purple-500",
    border: "border-purple-200",
    text: "text-purple-700",
    badge: "bg-purple-50",
  },
};

// ── TAG COLOR MAP ─────────────────────────────────────────────
const TAG_COLORS = {
  blue:   "bg-blue-50   border-blue-200   text-blue-700",
  green:  "bg-green-50  border-green-200  text-green-700",
  purple: "bg-purple-50 border-purple-200 text-purple-700",
  orange: "bg-orange-50 border-orange-200 text-orange-700",
  yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
  red:    "bg-red-50    border-red-200    text-red-700",
};

// ── HIGHLIGHT RENDERER ────────────────────────────────────────
// Automatically bolds any metric containing a number + %
function renderHighlight(text) {
  const parts = text.split(/(\d+%[^.]*)/);
  return parts.map((part, i) =>
    /\d+%/.test(part) ? (
      <strong key={i} className="text-blue-700 font-bold">{part}</strong>
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
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Engineering Projects
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-mono">
          Core architectural tracks and technical engineering executions
        </p>
        <div className="h-1 w-12 bg-blue-600 rounded mt-4" />
      </div>

      {/* Layout: sidebar + cards */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* ── Sidebar ── */}
        <aside className="md:w-52 flex-shrink-0 space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-3">
            Filter by Status
          </p>

          {/* All */}
          <button
            onClick={() => setActiveFilter("all")}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-mono transition-all flex justify-between items-center ${
              activeFilter === "all"
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
            }`}
          >
            <span>All Projects</span>
            <span className={`text-xs px-1.5 py-0.5 rounded ${activeFilter === "all" ? "bg-blue-500" : "bg-slate-100"}`}>
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
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                <span>{cfg.label}</span>
              </div>
              <span className={`text-xs px-1.5 py-0.5 rounded ${activeFilter === key ? "bg-blue-500" : "bg-slate-100"}`}>
                {counts[key]}
              </span>
            </button>
          ))}

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-slate-200 space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Status Key
            </p>
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <div key={key} className="flex items-start gap-2">
                <span className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${cfg.dot}`} />
                <div>
                  <p className={`text-xs font-mono font-bold ${cfg.text}`}>{cfg.label}</p>
                  <p className="text-[10px] text-slate-400">{cfg.description}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* ── Project Cards ── */}
        <div className="flex-grow space-y-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border border-slate-200 rounded-2xl bg-white">
              <p className="text-slate-400 font-mono text-sm">No projects in this category yet.</p>
              <p className="text-slate-300 text-xs mt-1">Check back soon.</p>
            </div>
          ) : (
            filtered.map((project) => {
              const cfg = STATUS_CONFIG[project.status];
              return (
                <div
                  key={project.id}
                  className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm hover:border-slate-300 hover:shadow-md transition-all space-y-4"
                >
                  {/* Top row */}
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
                      <span className="text-xs text-slate-400 font-mono">{project.date}</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border flex items-center gap-1.5 ${cfg.badge} ${cfg.border} ${cfg.text}`}>
                        <span className={`w-1 h-1 rounded-full ${cfg.dot}`} />
                        {cfg.label.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Title + description */}
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">{project.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mt-2">{project.description}</p>
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
