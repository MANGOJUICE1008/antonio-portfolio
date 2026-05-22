export default function ContactPage() {
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inquiry Hub</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Initiate a system connection routing protocol</p>
      </div>
      
      <form className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Sender ID / Name</label>
          <input type="text" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-inherit focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Return Email Channel</label>
          <input type="email" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-inherit focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="johndoe@gmail.com" />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Message Body</label>
          <textarea rows="4" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-inherit focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type your inquiry metrics here..."></textarea>
        </div>
        <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-xl shadow transition-all">
          Transmit Message
        </button>
      </form>
    </div>
  );
}