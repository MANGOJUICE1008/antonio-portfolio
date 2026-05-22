export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Engineering Project Registries</h1>
      <div className="grid gap-6 md:grid-cols-2">
        
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <span className="text-xs font-mono px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">Altium & Embedded C</span>
          <h3 className="font-bold text-xl pt-1">Formula SAE Electrical Technical Direction</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Directed a 20-person engineering team across 40+ low-voltage telemetry and power distribution subsystem matrices.
          </p>
        </div>

        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <span className="text-xs font-mono px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">Hardware Architecture</span>
          <h3 className="font-bold text-xl pt-1">Vehicle Electrical Harness Optimization</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Designed schematic paths and layouts that managed a 44% overall weight reduction profile across cross-functional chassis subsystems.
          </p>
        </div>

      </div>
    </div>
  );
}