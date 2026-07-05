import Image from "next/image";

export default function HomePage() {
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
              Computer & Electrical Engineer specializing in controls, PCB development, and embedded systems.
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

      {/* Current project tracker */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Current Projects</h2>
          <p className="text-sm text-slate-400 font-mono mt-0.5">Live operational scope</p>
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
      </section>

      {/* Latest updates */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Latest Updates</h2>
        <ul className="space-y-4 border-l-2 border-slate-200 pl-5">
          <li>
            <span className="font-semibold block text-sm text-blue-600 font-mono">August 2025</span>
            <p className="text-slate-600 mt-0.5">
              Successfully wrapped engineering verification routines at validation internship.
            </p>
          </li>
        </ul>
      </section>

    </div>
  );
}
