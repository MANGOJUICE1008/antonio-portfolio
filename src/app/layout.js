import "./globals.css";

export const metadata = {
  title: "Antonio Ristevski | Computer & Electrical Engineer",
  description: "Portfolio of Antonio Ristevski - Specializing in Controls, PCB Development, and Embedded Systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-800 overflow-x-hidden">

        {/* Navigation */}
        <header className="border-b border-slate-200 px-4 py-3 sticky top-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <a
              href="/"
              className="font-mono font-bold text-sm tracking-widest text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2"
            >
              <span className="text-slate-400">&lt;</span>
              <span>ANTONIO.R</span>
              <span className="text-slate-400">/&gt;</span>
            </a>

            <nav className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider">
              <a href="/" className="text-slate-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="/about" className="text-slate-600 hover:text-blue-600 transition-colors hidden sm:inline">About</a>
              <a href="/projects" className="text-slate-600 hover:text-blue-600 transition-colors">Projects</a>
              <a href="/gallery" className="text-slate-600 hover:text-blue-600 transition-colors hidden md:inline">Gallery</a>
              <a href="/newsletter" className="text-slate-600 hover:text-blue-600 transition-colors hidden md:inline">Newsletter</a>
              <a href="/contact" className="text-slate-600 hover:text-blue-600 transition-colors hidden sm:inline">Contact</a>
              <a
                href="/resume.pdf"
                target="_blank"
                className="hidden lg:inline-block bg-blue-50 hover:bg-blue-600 border border-blue-200 hover:border-blue-600 text-blue-600 hover:text-white px-3 py-1 rounded transition-all font-bold"
              >
                RESUME.SYS
              </a>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-grow max-w-5xl w-full mx-auto p-6 md:py-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 p-8 bg-white text-slate-500 text-xs font-mono">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">

              <div className="space-y-1">
                <p className="font-bold text-slate-800 tracking-wide">ANTONIO RISTEVSKI</p>
                <p className="text-[10px] text-slate-400">COMPUTER & ELECTRICAL ENGINEERING</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Navigation</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
                  <a href="/about" className="hover:text-blue-600 transition-colors">About</a>
                  <a href="/projects" className="hover:text-blue-600 transition-colors">Projects</a>
                  <a href="/gallery" className="hover:text-blue-600 transition-colors">Gallery</a>
                  <a href="/newsletter" className="hover:text-blue-600 transition-colors">Newsletter</a>
                  <a href="/contact" className="hover:text-blue-600 transition-colors">Contact</a>
                  <a href="/resume.pdf" target="_blank" className="hover:text-blue-600 transition-colors">Resume</a>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Connect</p>
                <a href="https://github.com/MANGOJUICE1008" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">GitHub</a>
                <a href="http://www.linkedin.com/in/antonio-ristevski-ece" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">LinkedIn</a>
                <a href="mailto:ristevski.antonio2@gmail.com" className="hover:text-blue-600 transition-colors">Email</a>
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-slate-400">
              <p>© {new Date().getFullYear()} Antonio Ristevski. All rights reserved.</p>
              <p className="text-blue-400/60">SYS_STATUS: ACTIVE</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
