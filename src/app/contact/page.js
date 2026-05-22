export default function ContactPage() {
  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Inquiry Hub</h1>
        <p className="text-sm text-slate-500 mt-1">Initiate a system connection routing communication protocol</p>
        <div className="h-1 w-12 bg-blue-500 rounded mt-4"></div>
      </div>
      
      <form className="space-y-5 bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">Sender ID / Full Name</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
            placeholder="John Doe" 
          />
        </div>
        
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">Return Email Channel</label>
          <input 
            type="email" 
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
            placeholder="johndoe@gmail.com" 
          />
        </div>
        
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">Message Payload Body</label>
          <textarea 
            rows="4" 
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
            placeholder="Type your project inquiry metrics here..."
          ></textarea>
        </div>
        
        <button 
          type="button" 
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-3.5 rounded-xl shadow-lg shadow-blue-900/40 transition-all hover:scale-[1.01]"
        >
          Transmit Message Protocol
        </button>
      </form>
    </div>
  );
}