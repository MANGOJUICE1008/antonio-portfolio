import "./globals.css";

export const metadata = {
  title: "Antonio Ristevski | Portfolio",
  description: "Computer and Electrical Engineer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 min-h-screen flex flex-col transition-colors duration-200">
        
        {/* Navigation Bar */}
        <header className="border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <a href="/" className="font-bold text-xl tracking-tight hover:text-blue-500">Antonio R.</a>
            <nav className="space-x-6 font-medium">
              <a href="/" className="hover:text-blue-500 transition-colors">Home</a>
              <a href="/about" className="hover:text-blue-500 transition-colors">About</a>
              <a href="/projects" className="hover:text-blue-500 transition-colors">Projects</a>
              <a href="/contact" className="hover:text-blue-500 transition-colors">Contact</a>
            </nav>
          </div>
        </header>

        {/* Page Content Injection Target */}
        <main className="flex-grow max-w-5xl w-full mx-auto p-6 md:py-12">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 p-6 text-center text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950">
          <div className="max-w-5xl mx-auto space-y-2">
            <div className="space-x-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">LinkedIn</a>
            </div>
            <p>© {new Date().getFullYear()} Antonio Ristevski. All Rights Reserved.</p>
            <p className="text-xs text-slate-400">Last edited: May 2026</p>
          </div>
        </footer>

      </body>
    </html>
  );
}