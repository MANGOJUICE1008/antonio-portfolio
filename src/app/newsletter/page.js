"use client";
import { useState } from "react";

// ============================================================
// NEWSLETTER ARCHIVE
// To add a published issue: copy the object below, fill it in,
// and uncomment it. The archive renders newest-first automatically.
//
// link: path to PDF in /public/newsletters/ or an external URL
// ============================================================
const NEWSLETTERS = [
  // {
  //   id: 1,
  //   title: "Issue #001 — Getting Started with Embedded Systems",
  //   date: "January 2025",
  //   summary:
  //     "An introduction to embedded systems development: toolchain setup, first blink, and the debugging habits that save hours later.",
  //   tags: ["Embedded Systems", "Getting Started"],
  //   link: "/newsletters/issue-001.pdf",
  // },
];

// ── Signup form (wire to your email provider below) ──────────
// To make the form functional, replace the handleSubmit body
// with a POST to Formspree, ConvertKit, Mailchimp, etc.
// Example Formspree endpoint:
//   await fetch("https://formspree.io/f/YOUR_FORM_ID", { ... })

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"

  async function handleSubmit() {
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    try {
      // ── Replace this block with your actual form submission ──
      await new Promise((r) => setTimeout(r, 800)); // simulated delay
      // ─────────────────────────────────────────────────────────
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Newsletter</h1>
        <p className="text-sm text-slate-500 mt-1">
          Engineering insights, project updates, and technical deep-dives
        </p>
        <div className="h-1 w-12 bg-blue-500 rounded mt-4" />
      </div>

      {/* Signup section */}
      <section className="bg-slate-950 border border-slate-800 rounded-2xl p-8 space-y-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2">Subscribe</p>
          <h2 className="text-2xl font-bold text-white">Stay in the Loop</h2>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed max-w-xl">
            Get notified when I publish new issues covering embedded systems, PCB design, controls
            engineering, and lessons from real projects.
          </p>
        </div>

        {status === "success" ? (
          <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4 max-w-md">
            <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
            <p className="text-green-400 text-sm font-mono">
              You're subscribed. First issue incoming.
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-w-md">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="your@email.com"
                className="flex-grow p-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-mono"
              />
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] text-sm font-mono whitespace-nowrap"
              >
                {status === "loading" ? "SENDING..." : "SUBSCRIBE"}
              </button>
            </div>
            {status === "error" && (
              <p className="text-red-400 text-xs font-mono">
                Something went wrong. Try again or email me directly.
              </p>
            )}
            <p className="text-[10px] text-slate-600 font-mono">
              No spam. Unsubscribe any time.
            </p>
          </div>
        )}
      </section>

      {/* Archive section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Past Issues</h2>
          <p className="text-sm text-slate-500 mt-1">Browse the full archive</p>
        </div>

        {NEWSLETTERS.length === 0 ? (
          <div className="border border-slate-800 rounded-2xl p-12 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <p className="text-slate-400 font-semibold text-sm">First issue coming soon.</p>
            <p className="text-slate-600 text-xs mt-1 font-mono">
              Subscribe above to be the first to know.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {[...NEWSLETTERS].reverse().map((issue) => (
              <a
                key={issue.id}
                href={issue.link}
                target="_blank"
                rel="noreferrer"
                className="block p-6 border border-slate-800 rounded-2xl bg-slate-950 hover:border-slate-700 transition-all group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center gap-2 flex-wrap">
                      {issue.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                      {issue.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{issue.summary}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-slate-500 font-mono">{issue.date}</p>
                    <span className="text-blue-400 text-xs font-mono mt-2 block group-hover:translate-x-1 transition-transform">
                      READ →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
