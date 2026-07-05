"use client";

import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX_LENGTH = 500;

function validate(fields) {
  const errors = {};

  if (!fields.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!fields.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_REGEX.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (fields.message.length > MESSAGE_MAX_LENGTH) {
    errors.message = `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`;
  }

  return errors;
}

export default function ContactPage() {
  const [fields, setFields] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [statusMessage, setStatusMessage] = useState("");

  const isSubmitting = status === "submitting";

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user starts fixing it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Honeypot: this field is invisible and unreachable for real visitors.
    // Only a bot filling out every field blindly would populate it. Bail out
    // quietly and pretend it worked, rather than telling the bot what tripped it.
    if (fields.website.trim() !== "") {
      setStatus("success");
      setStatusMessage("Thanks for reaching out — I'll get back to you soon.");
      setFields({ name: "", email: "", message: "", website: "" });
      return;
    }

    const validationErrors = validate(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setStatusMessage("Thanks for reaching out — I'll get back to you soon.");
      setFields({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      setStatus("error");
      setStatusMessage(err.message || "Something went wrong. Please try again later.");
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Contact</h1>
        <p className="text-sm text-slate-500 mt-1">Reach out — I'd love to connect.</p>
        <div className="h-1 w-12 bg-blue-600 rounded mt-4" />
      </div>

      <form
        className="space-y-5 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Honeypot — hidden from real visitors (off-screen + unreachable by
            tab/screen reader), but a bot filling every field blindly will
            fill this too, tipping us off in handleSubmit. */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={fields.website}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={fields.name}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full p-3 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-50 disabled:text-slate-400 ${
              errors.name ? "border-red-400" : "border-slate-300"
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={fields.email}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full p-3 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-50 disabled:text-slate-400 ${
              errors.email ? "border-red-400" : "border-slate-300"
            }`}
            placeholder="johndoe@gmail.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="message"
              className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold"
            >
              Message
            </label>
            <span
              className={`text-[10px] font-mono ${
                fields.message.length >= MESSAGE_MAX_LENGTH ? "text-red-500" : "text-slate-400"
              }`}
            >
              {fields.message.length} / {MESSAGE_MAX_LENGTH}
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            rows="4"
            maxLength={MESSAGE_MAX_LENGTH}
            value={fields.message}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`w-full p-3 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-50 disabled:text-slate-400 ${
              errors.message ? "border-red-400" : "border-slate-300"
            }`}
            placeholder="Tell me about your project..."
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold p-3.5 rounded-xl shadow-sm transition-all"
        >
          {isSubmitting ? "Sending…" : "Send Message"}
        </button>

        {statusMessage && (
          <p
            role="status"
            aria-live="polite"
            className={`text-sm text-center font-mono ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {statusMessage}
          </p>
        )}
      </form>

      {/* Direct contact links */}
      <div className="flex flex-col gap-3 pt-2">
        <a
          href="https://github.com/MANGOJUICE1008"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all text-sm font-mono text-slate-600"
        >
          <span>↗</span> github.com/MANGOJUICE1008
        </a>
        <a
          href="http://www.linkedin.com/in/antonio-ristevski-ece"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all text-sm font-mono text-slate-600"
        >
          <span>↗</span> linkedin.com/in/antonio-ristevski-ece
        </a>
        <a
          href="mailto:ristevski.antonio2@gmail.com"
          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all text-sm font-mono text-slate-600"
        >
          <span>✉</span> ristevski.antonio2@gmail.com
        </a>
      </div>
    </div>
  );
}
