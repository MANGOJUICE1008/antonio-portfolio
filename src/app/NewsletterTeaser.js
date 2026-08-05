"use client";
import { useState } from "react";

// Same pattern (and same /api/newsletter contract) as the full signup form
// on the /newsletter page — kept in sync so this teaser and that page never
// drift apart.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterTeaser() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real visitors never see or fill this
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage("Enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong. Try again or email me directly.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setErrorMessage("Something went wrong. Try again or email me directly.");
      setStatus("error");
    }
  }

  return (
    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Stay in the Loop</h2>
          <p className="text-sm text-slate-400 font-mono mt-0.5">
            New issues on embedded systems, PCB design, and project updates
          </p>
        </div>
        <a href="/newsletter" className="text-xs font-mono text-blue-600 hover:text-blue-700">
          View archive →
        </a>
      </div>

      {status === "success" ? (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 max-w-md">
          <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
          <p className="text-green-700 text-sm font-mono">You&apos;re subscribed. First issue incoming.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2 max-w-md" noValidate>
          <div className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="home-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="home-newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              disabled={status === "loading"}
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "home-newsletter-error" : undefined}
              className="flex-grow p-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-mono disabled:opacity-60 disabled:cursor-not-allowed"
            />

            {/* Honeypot: invisible to real visitors, skipped by screen readers and
                tab order. The API route rejects silently if it's non-empty. */}
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] w-px h-px overflow-hidden"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm font-mono whitespace-nowrap shadow-sm"
            >
              {status === "loading" ? "SENDING..." : "SUBSCRIBE"}
            </button>
          </div>
          {status === "error" && (
            <p id="home-newsletter-error" className="text-red-600 text-xs font-mono">
              {errorMessage}
            </p>
          )}
          <p className="text-[10px] text-slate-400 font-mono">No spam. Unsubscribe any time.</p>
        </form>
      )}
    </section>
  );
}
