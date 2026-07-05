import "./globals.css";
import Navbar from "./Navbar";

export const metadata = {
  title: "Antonio Ristevski | Computer & Electrical Engineer",
  description: "Portfolio of Antonio Ristevski - Specializing in Controls, PCB Development, and Embedded Systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-800 overflow-x-hidden">

        <Navbar />

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
