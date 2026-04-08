import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { LEAGUE_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us — BPL",
  description: "Get in touch with the Baseball Premier League. Contact Commissioner Basit for registration, sponsorship enquiries, and general information.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <section className="py-16" aria-labelledby="contact-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <span className="badge badge-crimson mb-4" aria-hidden="true">Get in Touch</span>
              <h1
                id="contact-heading"
                className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl mb-6"
                style={{ color: "var(--slate-50)" }}
              >
                We&apos;re here
                <br />
                <span className="gradient-text">to help.</span>
              </h1>
              <p className="text-base sm:text-lg leading-relaxed mb-10" style={{ color: "var(--slate-400)" }}>
                Questions about registration, sponsorship, the rules, or anything else?
                Reach out directly to Commissioner Basit or Deputy Commissioner Syed.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: Phone,
                    label: "Commissioner Basit",
                    value: `${LEAGUE_INFO.commissioner.phone} (WhatsApp preferred)`,
                    href: `https://wa.me/601022763014`,
                  },
                  {
                    icon: Phone,
                    label: "Deputy Commissioner Syed",
                    value: `${LEAGUE_INFO.deputyCommissioner.phone}`,
                    href: `tel:+60193822176`,
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "info@bplbaseball.com",
                    href: "mailto:info@bplbaseball.com",
                  },
                  {
                    icon: MessageCircle,
                    label: "WhatsApp (Quick)",
                    value: "Message Commissioner directly",
                    href: "https://wa.me/601022763014",
                  },
                  {
                    icon: MapPin,
                    label: "Venue",
                    value: "Universiti Putra Malaysia (UPM), Selangor",
                    href: "https://maps.google.com/?q=UPM+Serdang+Selangor",
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="glass-card glass-card-hover p-5 flex items-start gap-4 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(227,27,35,0.1)", border: "1px solid rgba(227,27,35,0.2)" }}
                      aria-hidden="true"
                    >
                      <Icon size={18} style={{ color: "var(--crimson-400)" }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "var(--slate-500)" }}>
                        {label}
                      </p>
                      <p className="text-sm sm:text-base font-medium group-hover:text-white transition-colors" style={{ color: "var(--slate-200)" }}>
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — Quick enquiry */}
            <div className="glass-card p-8 sm:p-10">
              <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: "var(--slate-50)" }}>
                Send a Quick Enquiry
              </h2>
              <form
                action="mailto:info@bplbaseball.com"
                method="get"
                encType="text/plain"
                aria-label="Contact enquiry form"
                className="space-y-5"
              >
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
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="contact-subject">Subject</label>
                  <select id="contact-subject" name="subject" className="form-field">
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
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-12 px-6 text-sm font-semibold rounded-xl transition-all duration-150"
                  style={{
                    background: "var(--crimson-400)",
                    color: "white",
                    boxShadow: "0 0 24px rgba(227,27,35,0.35)",
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
