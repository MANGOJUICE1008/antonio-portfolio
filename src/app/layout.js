import "./globals.css";

export const metadata = {
  title: "Antonio Ristevski | Computer & Electrical Engineer",
  description: "Portfolio of Antonio Ristevski - Specializing in Controls, PCB Development, and Embedded Systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-blue-500/30 selection:text-blue-200 relative overflow-x-hidden">

        {/* Ambient background effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/5 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #3b82f6 1px, transparent 1px),
                linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Navigation */}
        <header className="border-b border-slate-900 p-4 sticky top-0 bg-slate-950/70 backdrop-blur-md z-50 transition-all">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <a
              href="/"
              className="font-mono font-bold text-sm tracking-widest text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
            >
              <span className="text-slate-600">&lt;</span>
              <span>ANTONIO.R</span>
              <span className="text-slate-600">/&gt;</span>
            </a>

            <nav className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider">
              <a href="/" className="text-slate-300 hover:text-blue-400 transition-colors">Home</a>
              <a href="/about" className="text-slate-300 hover:text-blue-400 transition-colors hidden sm:inline">About</a>
              <a href="/projects" className="text-slate-300 hover:text-blue-400 transition-colors">Projects</a>
              <a href="/gallery" className="text-slate-300 hover:text-blue-400 transition-colors hidden md:inline">Gallery</a>
              <a href="/newsletter" className="text-slate-300 hover:text-blue-400 transition-colors hidden md:inline">Newsletter</a>
              <a href="/contact" className="text-slate-300 hover:text-blue-400 transition-colors hidden sm:inline">Contact</a>
              <a
                href="/resume.pdf"
                target="_blank"
                className="hidden lg:inline-block bg-blue-600/10 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-400 text-blue-400 hover:text-white px-3 py-1 rounded transition-all font-bold"
              >
                RESUME.SYS
              </a>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-grow max-w-5xl w-full mx-auto p-6 md:py-16 z-10 relative">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 p-8 bg-slate-950 text-slate-500 text-xs z-10 relative font-mono">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">

              <div className="space-y-1">
                <p className="font-bold text-slate-300 tracking-wide">ANTONIO RISTEVSKI</p>
                <p className="text-[10px] text-slate-600">COMPUTER & ELECTRICAL ENGINEERING</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-slate-600 text-[10px] uppercase tracking-wider mb-1">Navigation</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
                  <a href="/about" className="hover:text-blue-400 transition-colors">About</a>
                  <a href="/projects" className="hover:text-blue-400 transition-colors">Projects</a>
                  <a href="/gallery" className="hover:text-blue-400 transition-colors">Gallery</a>
                  <a href="/newsletter" className="hover:text-blue-400 transition-colors">Newsletter</a>
                  <a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a>
                  <a href="/resume.pdf" target="_blank" className="hover:text-blue-400 transition-colors">Resume</a>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-slate-600 text-[10px] uppercase tracking-wider mb-1">Connect</p>
                <a href="https://github.com/MANGOJUICE1008" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">GitHub</a>
                <a href="http://www.linkedin.com/in/antonio-ristevski-ece" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn</a>
                <a href="mailto:ristevski.antonio2@gmail.com" className="hover:text-blue-400 transition-colors">Email</a>
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-slate-600">
              <p>© {new Date().getFullYear()} CORE_OS. ALL RIGHTS RESERVED.</p>
              <p className="text-blue-500/40">SYS_STATUS: ACTIVE // LOCALHOST_VERIFIED</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
