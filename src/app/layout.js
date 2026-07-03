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
              <span>ANTONIO R</span>
              <span className="text-slate-400">&gt;</span>
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
                className="text-slate-600 hover:text-blue-600 transition-colors hidden lg:inline"
              >
                RESUME
              </a>

              {/* Divider */}
              <span className="hidden sm:inline-block w-px h-4 bg-slate-200" />

              {/* Social icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/MANGOJUICE1008"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="text-slate-500 hover:text-blue-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.103.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.696.825.577C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="http://www.linkedin.com/in/antonio-ristevski-ece"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-slate-500 hover:text-blue-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="mailto:ristevski.antonio2@gmail.com"
                  aria-label="Email"
                  className="text-slate-500 hover:text-blue-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </a>
              </div>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-grow max-w-5xl w-full mx-auto p-6 md:py-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 p-6 bg-white text-slate-500 text-xs font-mono">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-slate-400">
            <p>© 2026 Antonio Ristevski. All rights reserved.</p>
            <p className="text-blue-400/60">SYS_STATUS: ACTIVE</p>
          </div>
        </footer>

      </body>
    </html>
  );
}
