export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Engineering Projects</h1>
        <p className="text-sm text-slate-500 mt-1">Core architectural tracks and technical engineering executions</p>
        <div className="h-1 w-12 bg-blue-500 rounded mt-4"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Project Module 1 */}
        <div className="p-6 border border-slate-800 rounded-2xl bg-slate-950 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-md">Altium | Embedded C | Simulink</span>
              <span className="text-xs text-slate-500 font-mono">May 2024 - Present</span>
            </div>
            <h3 className="font-bold text-xl text-white">Formula SAE Electrical Technical Direction</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Directed a 20-person electrical engineering team through 40+ concurrent projects. Overseeing design process integration of critical low-voltage subsystems, including battery management, telemetry, and power distribution.
            </p>
            <ul className="text-xs text-slate-500 list-disc list-inside space-y-1.5 pt-1">
              <li>Introduced design-for-manufacturability practices that improved reliability.</li>
              <li>Engineered real-time data acquisition tools resulting in a <strong className="text-blue-400 font-bold">104% increase in testing efficiency</strong>.</li>
            </ul>
          </div>
        </div>

        {/* Project Module 2 */}
        <div className="p-6 border border-slate-800 rounded-2xl bg-slate-950 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-md">Hardware Systems | Catia V5</span>
              <span className="text-xs text-slate-500 font-mono">Formula SAE Subsystem</span>
            </div>
            <h3 className="font-bold text-xl text-white">Vehicle Electrical Harness Optimization</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Designed and optimized a complete vehicle electrical harness utilizing proper wire gauge calculators and robust documentation structures.
            </p>
            <ul className="text-xs text-slate-500 list-disc list-inside space-y-1.5 pt-1">
              <li>Achieved a <strong className="text-green-400 font-bold">44% reduction in overall harness weight</strong> profile.</li>
              <li>Mitigated electromagnetic interference (EMI) paths across cross-functional chassis subsystems.</li>
            </ul>
          </div>
        </div>

        {/* Project Module 3 */}
        <div className="p-6 border border-slate-800 rounded-2xl bg-slate-950 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-md">Ladder Logic | Node-RED | HMI</span>
              <span className="text-xs text-slate-500 font-mono">Industrial Automation</span>
            </div>
            <h3 className="font-bold text-xl text-white">Automated Press Line Control System</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Designed an automated press line control schematic running on an Arduino Opta PLC platform. Engineered functional ladder logic architecture alongside an interactive Node-RED human-machine interface.
            </p>
          </div>
        </div>

        {/* Project Module 4 */}
        <div className="p-6 border border-slate-800 rounded-2xl bg-slate-950 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-md">ESP32 | Computer Vision</span>
              <span className="text-xs text-slate-500 font-mono">Autonomous AI Lab</span>
            </div>
            <h3 className="font-bold text-xl text-white">Autonomous AI Pac-Man RC Car</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Developed a fuzzy logic tracking controller enabling an RC vehicle platform to autonomously navigate obstacle fields while tracking target tags. Implemented an embedded computer vision neural network pipeline deployed directly on an ESP32 microcontroller core.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}