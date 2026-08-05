import Image from "next/image";
import ALL_PROJECTS from "./projects/manifest.json";

const TAG_COLORS = {
  blue:   "bg-blue-50   border-blue-200   text-blue-700",
  green:  "bg-green-50  border-green-200  text-green-700",
  purple: "bg-purple-50 border-purple-200 text-purple-700",
  orange: "bg-orange-50 border-orange-200 text-orange-700",
  yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
  red:    "bg-red-50    border-red-200    text-red-700",
};

export default function HomePage() {
  // Pulled straight from data/projects.csv — mark a row "Featured: Yes"
  // and it shows up here automatically next time the manifest regenerates.
  const featuredProjects = ALL_PROJECTS.filter((p) => p.featured);

  // Anything marked "Status: Present" in the CSV shows up here automatically.
  const currentProjects = ALL_PROJECTS.filter((p) => p.status === "current");

  return (
    <div className="space-y-12">

      {/* Hero */}
      <section className="py-6">
        {/* Photo comes first in the DOM and in reading order — stacks above
            the text on mobile (flex-col), sits to its left on desktop
            (md:flex-row). */}
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* Photo — drop a file at public/profile.jpg (or update the src
              below to match whatever you name it) */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="relative w-56 h-56 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
              <Image
                src="/profile.jpg"
                alt="Antonio Ristevski"
                fill
                sizes="(min-width: 768px) 320px, 224px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex-grow space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Antonio Ristevski
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl leading-relaxed">
              Controls & electrical engineer specializing in control systems, custom PCB design, and embedded hardware.
            </p>

            {/* Employment status */}
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
              Currently @ KUKA Robotics — Controls Project Engineer
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="/contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition-all"
              >
                Get in Touch
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-lg shadow-sm transition-all"
              >
                View My Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      {featuredProjects.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-bold text-slate-900">Featured Projects</h2>
            <a href="/projects" className="text-xs font-mono text-blue-600 hover:text-blue-700">
              View all →
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <a
                key={project.id}
                href="/projects"
                className="block p-5 border border-slate-200 rounded-2xl bg-white shadow-sm hover:border-slate-300 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 border rounded-md ${TAG_COLORS[project.tagColor]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{project.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mt-1.5 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Current project tracker */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Current Projects</h2>
            <p className="text-sm text-slate-400 font-mono mt-0.5">Live operational scope</p>
          </div>
          <a href="/projects" className="text-xs font-mono text-blue-600 hover:text-blue-700">
            View all →
          </a>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm font-medium mb-1.5">
              <span className="text-slate-700">Formula SAE Low-Voltage System Optimization</span>
              <span className="text-blue-600">85%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full w-[85%] rounded-full" />
            </div>
          </div>
        </div>

        {/* Current projects pulled from data/projects.csv (Status: Present) */}
        {currentProjects.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-100">
            {currentProjects.map((project) => (
              <a
                key={project.id}
                href="/projects"
                className="flex items-start justify-between gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50 hover:border-slate-300 hover:bg-white transition-all"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 border rounded-md ${TAG_COLORS[project.tagColor]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{project.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mt-1 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <span className="text-xs font-mono text-blue-600 flex-shrink-0 mt-0.5">
                  View →
                </span>
              </a>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
