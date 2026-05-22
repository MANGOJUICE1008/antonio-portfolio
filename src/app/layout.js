import "./globals.css";

export const metadata = {
  title: "Antonio Ristevski | Computer & Electrical Engineer",
  description: "Portfolio of Antonio Ristevski - Specializing in Controls, PCB Development, and Embedded Systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-blue-500/30 selection:text-blue-200 relative overflow-x-hidden">
        
        {/* PREMIUM COMPONENT: The Interactive Vector Engineering Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Subtle ambient light emissions */}
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/5 blur-[120px]" />
          
          {/* The Technical Grid Overlay (Simulating an overlay mapping schematic sheet) */}
          <div 
            className="absolute inset-0 opacity-[0.07]" 
            style={{
              backgroundImage: `
                linear-gradient(to right, #3b82f6 1px, transparent 1px),
                linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
          {/* Finer cross-dot indicators mapping background array fields */}
          <div 
            className="absolute inset-0 opacity-[0.15]" 
            style={{
              backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
        </div>

        {/* Global Structural Header Frame */}
        <header className="border-b border-slate-900 p-4 sticky top-0 bg-slate-950/70 backdrop-blur-md z-50 transition-all">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <a href="/" className="font-mono font-bold text-sm tracking-widest text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
              <span className="text-slate-600">&lt;</span>
              <span>ANTONIO.R</span>
              <span className="text-slate-600">/&gt;</span>
            </a>
            
            <nav className="flex items-center space-x-6 text-xs font-mono uppercase tracking-wider">
              <a href="/" className="text-slate-300 hover:text-blue-400 transition-colors">Home</a>
              <a href="/about" className="text-slate-300 hover:text-blue-400 transition-colors">About</a>
              <a href="/projects" className="text-slate-300 hover:text-blue-400 transition-colors">Projects</a>
              <a href="/contact" className="text-slate-300 hover:text-blue-400 transition-colors">Contact</a>
              
              <a 
                href="/resume.pdf" 
                target="_blank"
                className="hidden sm:inline-block bg-blue-600/10 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-400 text-blue-400 hover:text-white px-3 py-1 rounded transition-all font-bold"
              >
                RESUME.SYS
              </a>
            </nav>
          </div>
        </header>

        {/* Core Canvas Target Frame */}
        <main className="flex-grow max-w-5xl w-full mx-auto p-6 md:py-16 z-10 relative">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-900 p-8 bg-slate-950 text-slate-500 text-xs z-10 relative font-mono">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center md:text-left">
              <p className="font-bold text-slate-300 tracking-wide">ANTONIO RISTEVSKI</p>
              <p className="text-[10px] text-slate-600">COMPUTER & ELECTRICAL ENGINEERING ARCHITECTURE</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="https://github.com/MANGOJUICE1008" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">GITHUB</a>
              <a href="http://www.linkedin.com/in/antonio-ristevski-ece" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">LINKEDIN</a>
              <a href="mailto:ristevski.antonio2@gmail.com" className="hover:text-blue-400 transition-colors">EMAIL</a>
            </div>

            <div className="text-center md:text-right text-[10px] text-slate-600 space-y-0.5">
              <p>© {new Date().getFullYear()} CORE_OS. ALL RIGHTS RESERVED.</p>
              <p className="text-blue-500/40">SYS_STATUS: ACTIVE // LOCALHOST_VERIFIED</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}