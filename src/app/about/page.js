export default function AboutPage() {
  return (
    <div className="space-y-12">

      {/* Bio */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">About Me</h1>
        <div className="h-1 w-12 bg-blue-500 rounded" />
        <p className="text-slate-300 leading-relaxed text-base md:text-lg max-w-3xl pt-2">
          I am a computer and electrical engineer focused on hardware optimization and control
          infrastructure development. With an educational background from{" "}
          <strong className="text-blue-400 font-medium">Oakland University</strong>, my career sits
          at the intersection of embedded code implementation and structural circuit validation.
        </p>
      </section>

      {/* People I've worked with */}
      <section className="space-y-6 border-t border-slate-800 pt-10">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">People I've Worked With</h2>
          <p className="text-sm text-slate-500 mt-1">
            Engineering mentors, cross-functional teammates, and project collaborators
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {/* Card — FSAE */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 text-blue-400 font-mono flex items-center justify-center text-xs font-bold flex-shrink-0">
              FSAE
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-200">Motorsport Engineering Team</h4>
              <p className="text-xs text-slate-500 font-mono">Formula SAE Controls Matrix</p>
            </div>
          </div>

          {/* Card — OU Lab */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 text-purple-400 font-mono flex items-center justify-center text-xs font-bold flex-shrink-0">
              OU
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-200">Academic Lab Teammates</h4>
              <p className="text-xs text-slate-500 font-mono">Autonomous AI Navigation Lab</p>
            </div>
          </div>

          {/* ── ADD NEW COLLABORATORS BELOW ───────────────────── */}
          {/* Example card:
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/20 text-green-400 font-mono flex items-center justify-center text-xs font-bold flex-shrink-0">
              INIT
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-200">Company or Team Name</h4>
              <p className="text-xs text-slate-500 font-mono">Role or context</p>
            </div>
          </div>
          */}
        </div>
      </section>

      {/* Quick links */}
      <section className="space-y-4 border-t border-slate-800 pt-10">
        <h2 className="text-2xl font-bold text-white tracking-tight">Find Me Elsewhere</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="http://www.linkedin.com/in/antonio-ristevski-ece"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:border-blue-500/40 hover:text-blue-400 transition-all text-sm font-mono text-slate-300"
          >
            ↗ LinkedIn
          </a>
          <a
            href="https://github.com/MANGOJUICE1008"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:border-blue-500/40 hover:text-blue-400 transition-all text-sm font-mono text-slate-300"
          >
            ↗ GitHub
          </a>
          <a
            href="/gallery"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:border-blue-500/40 hover:text-blue-400 transition-all text-sm font-mono text-slate-300"
          >
            → Photo Gallery
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:border-blue-500/40 hover:text-blue-400 transition-all text-sm font-mono text-slate-300"
          >
            ↓ Resume
          </a>
        </div>
      </section>

    </div>
  );
}
