"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      body: formData.get("body"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-slate-400">We'll get back to you as soon as possible.</p>
        <Button variant="outline" className="mt-6" onClick={() => setSuccess(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Contact enquiry form" className="space-y-5">
      {errorMsg && (
        <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {errorMsg}
        </div>
      )}
      <div>
        <label className="form-label" htmlFor="contact-name">Your Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          className="form-field"
          placeholder="Full name"
          required
          autoComplete="name"
          disabled={loading}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="contact-email">Email Address</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className="form-field"
          placeholder="you@email.com"
          required
          autoComplete="email"
          disabled={loading}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="contact-subject">Subject</label>
        <select id="contact-subject" name="subject" className="form-field" disabled={loading}>
          <option value="registration">Registration Enquiry</option>
          <option value="sponsorship">Sponsorship Enquiry</option>
          <option value="rules">Rules Question</option>
          <option value="media">Media / Press</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="form-label" htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="body"
          rows={4}
          className="form-field resize-none"
          placeholder="How can we help?"
          required
          disabled={loading}
        />
      </div>
      <Button
        type="submit"
        className="w-full h-12"
        loading={loading}
      >
        Send Message securely
      </Button>
    </form>
  );
}
