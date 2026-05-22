export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Who Am I</h1>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          I am a motivated engineering graduate from Oakland University. My work focuses on bridging the gap between hardware architecture design and robust software validation loops.
        </p>
      </section>

      {/* Collaboration Registry Core Component */}
      <section className="space-y-6 pt-6">
        <h2 className="text-2xl font-bold">Excellent People I've Worked With</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-slate-300 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center font-bold text-sm">[IMG]</div>
            <div>
              <h4 className="font-bold">Formula SAE Teammates</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Motorsport Engineering Lab</p>
            </div>
          </div>
        </div>

        {/* Gallery Base Mount Placeholder */}
        <div className="mt-6 p-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-center text-sm text-slate-400">
          Engineering Operations Action Gallery Container [Awaiting Image Upload Assets]
        </div>
      </section>
    </div>
  );
}