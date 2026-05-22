export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Intro Hero Section */}
      <section className="space-y-4 py-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Hi, I'm <span className="text-blue-600 dark:text-blue-400">Antonio Ristevski</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Computer & Electrical Engineer specializing in controls, PCB development, and embedded systems.
        </p>
        <div className="pt-4">
          <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all">
            Let's Work Together
          </a>
        </div>
      </section>

      {/* Dynamic Project Dashboard Mock */}
      <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Current Projects & Lifespan Tracker</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Live operational scope metrics</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>Formula SAE Low-Voltage System Optimization</span>
              <span className="text-blue-500">85% Lifecycle Progress</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 dark:bg-blue-500 h-full w-[85%] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Log Updates */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Latest System Updates</h2>
        <ul className="space-y-3 border-l-2 border-slate-200 dark:border-slate-800 pl-4">
          <li className="relative">
            <span className="font-semibold block text-sm text-blue-500">August 2025</span>
            <p className="text-slate-600 dark:text-slate-400">Successfully wrapped engineering verification routines at validation internship.</p>
          </li>
        </ul>
      </section>
    </div>
  );
}