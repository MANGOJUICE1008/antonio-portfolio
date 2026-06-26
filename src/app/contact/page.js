export default function ContactPage() {
  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Contact</h1>
        <p className="text-sm text-slate-500 mt-1">Reach out — I'd love to connect.</p>
        <div className="h-1 w-12 bg-blue-600 rounded mt-4" />
      </div>

      <form className="space-y-5 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold">
            Full Name
          </label>
          <input
            type="text"
            className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="johndoe@gmail.com"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold">
            Message
          </label>
          <textarea
            rows="4"
            className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Tell me about your project..."
          />
        </div>

        <button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3.5 rounded-xl shadow-sm transition-all"
        >
          Send Message
        </button>
      </form>

      {/* Direct contact links */}
      <div className="flex flex-col gap-3 pt-2">
        <a
          href="mailto:ristevski.antonio2@gmail.com"
          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all text-sm font-mono text-slate-600"
        >
          <span>✉</span> ristevski.antonio2@gmail.com
        </a>
        <a
          href="http://www.linkedin.com/in/antonio-ristevski-ece"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all text-sm font-mono text-slate-600"
        >
          <span>↗</span> linkedin.com/in/antonio-ristevski-ece
        </a>
      </div>
    </div>
  );
}
