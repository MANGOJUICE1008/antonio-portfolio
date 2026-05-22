export default function AboutPage() {
  return (
    <div className="space-y-12">
      
      {/* Bio Element Block */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Who Am I</h1>
        <div className="h-1 w-12 bg-blue-500 rounded"></div>
        <p className="text-slate-300 leading-relaxed text-base md:text-lg max-w-3xl pt-2">
          I am a computer and electrical engineer focused on hardware optimization and control infrastructure development. With an education background from <strong className="text-blue-400 font-medium">Oakland University</strong>, my career target sits on the intersection of embedded code implementation and structural circuit validation routines.
        </p>
      </section>

      {/* Collaboration Core Directory Grid */}
      <section className="space-y-6 border-t border-slate-800 pt-10">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Excellent People I've Worked With</h2>
          <p className="text-sm text-slate-500 mt-1">Engineering mentors, cross-functional teammates, and project collaborators</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {/* Card Component Item 1 */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 text-blue-400 font-mono flex items-center justify-center text-xs font-bold flex-shrink-0">
              FSAE
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-200">Motorsport Engineering Team</h4>
              <p className="text-xs text-slate-500 font-mono">Formula SAE Controls Matrix</p>
            </div>
          </div>

          {/* Card Component Item 2 */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 text-purple-400 font-mono flex items-center justify-center text-xs font-bold flex-shrink-0">
              OU
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-200">Academic Lab Teammates</h4>
              <p className="text-xs text-slate-500 font-mono">Autonomous AI Navigation Lab</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Mount System Layout */}
      <section className="space-y-4 border-t border-slate-800 pt-10">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Action Gallery</h2>
          <p className="text-sm text-slate-500 mt-1">Engineering operations snapshots, workbench debugging, and system assembly records</p>
        </div>
        
        {/* Gallery responsive structure slots */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 pt-2">
          <div className="aspect-video rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col items-center justify-center text-xs text-slate-600 p-4 text-center font-mono group hover:border-blue-500/40 transition-all cursor-pointer">
            <span className="text-slate-400 font-bold group_hover:text-blue-400">[ IMG SLOT 1 ]</span>
            <span className="text-[10px] mt-1 text-slate-600">Oscilloscope Diagnostics / Embedded Debugging</span>
          </div>
          <div className="aspect-video rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col items-center justify-center text-xs text-slate-600 p-4 text-center font-mono group hover:border-blue-500/40 transition-all cursor-pointer">
            <span className="text-slate-400 font-bold group_hover:text-blue-400">[ IMG SLOT 2 ]</span>
            <span className="text-[10px] mt-1 text-slate-600">Formula SAE Low Voltage Power Assembly</span>
          </div>
          <div className="aspect-video rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col items-center justify-center text-xs text-slate-600 p-4 text-center font-mono group hover:border-blue-500/40 transition-all cursor-pointer col-span-2 md:col-span-1">
            <span className="text-slate-400 font-bold group_hover:text-blue-400">[ IMG SLOT 3 ]</span>
            <span className="text-[10px] mt-1 text-slate-600">PCB Altium Design Routing Workspace</span>
          </div>
        </div>
      </section>
      
    </div>
  );
}