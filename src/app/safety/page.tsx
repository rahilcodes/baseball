import type { Metadata } from "next";
import { Phone, AlertTriangle, Thermometer, Brain, Bone, Heart, Zap, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Safety & Emergency Protocols — BPL",
  description: "BPL field-side safety dashboard. Emergency contacts, injury scenario protocols, weather policies, and pre-game requirements for all game days.",
};

const EMERGENCY_CONTACTS = [
  { name: "Malaysian Emergency Services", number: "999", detail: "Police, Ambulance, Fire — works without credit", priority: true },
  { name: "Ambulance (direct)", number: "112", detail: "Works on any mobile phone, even without credit", priority: true },
  { name: "Hospital Serdang", number: "03-8947 5555", detail: "Nearest hospital. 10 min from UPM via Jalan Puchong." },
  { name: "Hospital Putrajaya", number: "03-8312 4200", detail: "Backup hospital. 15 minutes from UPM." },
  { name: "KPJ Kajang Specialist", number: "03-8769 2999", detail: "Private hospital. 12 min drive. Faster triage." },
  { name: "Poison Control (MY)", number: "03-2615 5555", detail: "National Poison Centre (USM)" },
  { name: "Commissioner Basit", number: "10-227 6014", detail: "League emergency contact" },
  { name: "Deputy Commissioner Shinji Konishi", number: "11-2790 4034", detail: "Field operations & first aid kit" },
];

const SCENARIOS = [
  {
    icon: Zap,
    severity: "emergency" as const,
    title: "Head/Face Impact by Ball",
    subtitle: "TREAT AS EMERGENCY UNTIL PROVEN OTHERWISE",
    steps: [
      "STOP the game immediately",
      "Do NOT move the player if unconscious",
      "Call 999 immediately",
      "Check: consciousness, pupil dilation, bleeding, vomiting, confusion",
      "If conscious but dazed — DO NOT allow return to play",
      "Accompany player to hospital",
    ],
  },
  {
    icon: Heart,
    severity: "emergency" as const,
    title: "Cardiac Event",
    subtitle: "Chest pain, shortness of breath, collapse",
    steps: [
      "Call 999 immediately",
      "Begin CPR if player is unresponsive and not breathing",
      "Use AED if available — do not wait",
      "Every second counts",
    ],
  },
  {
    icon: Thermometer,
    severity: "urgent" as const,
    title: "Heat Exhaustion / Heat Stroke",
    subtitle: "Heavy sweating, dizziness, confusion, high temp",
    steps: [
      "Move player to shade immediately",
      "Remove excess clothing",
      "Apply cold water and ice to neck, armpits, groin",
      "If heat stroke suspected (no sweating + confusion): Call 999",
      "Give fluids if player is conscious and alert",
      "Heat stroke is life-threatening — do not delay",
    ],
  },
  {
    icon: Brain,
    severity: "urgent" as const,
    title: "Suspected Concussion",
    subtitle: "Any head impact — dazed, confused, headache",
    steps: [
      "Remove player from game immediately",
      "Do NOT allow return to play the same day",
      "Monitor: consciousness, vomiting, confusion, pupils",
      "If symptoms worsen — call 999 and transport to hospital",
      "Player requires medical clearance before next game",
    ],
  },
  {
    icon: AlertTriangle,
    severity: "standard" as const,
    title: "Sprains, Strains & Soft Tissue",
    subtitle: "Ankle, knee, shoulder, hamstring",
    steps: [
      "Apply RICE: Rest, Ice, Compression, Elevation",
      "Remove player from game",
      "Do not allow return to play same day",
      "Advise medical attention if swelling persists 24+ hours",
    ],
  },
  {
    icon: Bone,
    severity: "urgent" as const,
    title: "Suspected Fracture",
    subtitle: "Deformity, extreme pain, inability to move",
    steps: [
      "Immobilise the injury — do NOT attempt to set it",
      "Apply ice around (not on) the area",
      "Call 999 or transport to nearest hospital",
      "Do NOT allow player to walk on suspected leg/ankle fracture",
    ],
  },
];

const severityStyle = {
  emergency: {
    bg: "rgba(183,28,28,0.08)",
    border: "rgba(183,28,28,0.3)",
    badgeBg: "rgba(183,28,28,0.15)",
    badgeColor: "var(--crimson-300)",
    badgeText: "Emergency",
    iconColor: "var(--crimson-400)",
  },
  urgent: {
    bg: "rgba(245,166,35,0.05)",
    border: "rgba(245,166,35,0.2)",
    badgeBg: "rgba(245,166,35,0.12)",
    badgeColor: "var(--gold-400)",
    badgeText: "Urgent",
    iconColor: "var(--gold-400)",
  },
  standard: {
    bg: "rgba(255,255,255,0.02)",
    border: "var(--glass-border)",
    badgeBg: "rgba(255,255,255,0.06)",
    badgeColor: "var(--slate-400)",
    badgeText: "Standard",
    iconColor: "var(--slate-400)",
  },
};

export default function SafetyPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 relative" aria-labelledby="safety-heading">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(183,28,28,0.06) 0%, transparent 60%)" }}
          aria-hidden="true"
        />
        <div className="section-container">
          <div className="max-w-2xl">
            <span className="badge badge-crimson mb-4" aria-hidden="true">Field-Side Dashboard</span>
            <h1
              id="safety-heading"
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl mb-4"
              style={{ color: "var(--slate-50)" }}
            >
              Safety &{" "}
              <span className="gradient-text">Emergency</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--slate-400)" }}>
              Player safety is the league&apos;s highest priority. All protocols below are mandatory for every game day. 
              Shinji (Deputy Commissioner) maintains the first aid kit at all times.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency contacts */}
      <section className="py-8" aria-labelledby="emergency-contacts-heading">
        <div className="section-container">
          <h2
            id="emergency-contacts-heading"
            className="font-heading font-bold text-2xl sm:text-3xl mb-6"
            style={{ color: "var(--slate-50)" }}
          >
            Emergency Contacts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EMERGENCY_CONTACTS.map(({ name, number, detail, priority }) => (
              <a
                key={name}
                href={`tel:${number.replace(/[-\s]/g, "")}`}
                className="glass-card glass-card-hover p-5 flex flex-col group"
                style={priority ? { border: "1px solid rgba(183,28,28,0.25)", background: "rgba(183,28,28,0.04)" } : {}}
                aria-label={`Call ${name}: ${number}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: priority ? "rgba(183,28,28,0.15)" : "rgba(255,255,255,0.06)" }}
                    aria-hidden="true"
                  >
                    <Phone size={14} style={{ color: priority ? "var(--crimson-400)" : "var(--slate-400)" }} />
                  </div>
                  <span
                    className="font-heading font-bold text-lg sm:text-xl group-hover:text-white transition-colors"
                    style={{ color: priority ? "var(--crimson-300)" : "var(--slate-200)" }}
                  >
                    {number}
                  </span>
                </div>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--slate-200)" }}>{name}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--slate-500)" }}>{detail}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick location */}
      <section className="py-6" aria-label="Hospital directions">
        <div className="section-container">
          <a
            href="https://maps.google.com/?q=Hospital+Serdang+Selangor"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-5 flex items-center gap-4 hover:border-crimson-400/30 transition-colors group"
            style={{ borderColor: "rgba(227,27,35,0.15)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(227,27,35,0.1)", border: "1px solid rgba(227,27,35,0.2)" }}
              aria-hidden="true"
            >
              <MapPin size={22} style={{ color: "var(--crimson-400)" }} />
            </div>
            <div>
              <p className="font-heading font-semibold" style={{ color: "var(--slate-50)" }}>
                Hospital Serdang — 10 minutes from UPM
              </p>
              <p className="text-sm" style={{ color: "var(--slate-500)" }}>
                Jalan Puchong, Serdang. Tap to open in Google Maps.
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* Scenario cards */}
      <section className="py-12" aria-labelledby="scenarios-heading">
        <div className="section-container">
          <h2
            id="scenarios-heading"
            className="font-heading font-bold text-2xl sm:text-3xl mb-8"
            style={{ color: "var(--slate-50)" }}
          >
            Injury Response Protocols
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SCENARIOS.map(({ icon: Icon, severity, title, subtitle, steps }) => {
              const s = severityStyle[severity];
              return (
                <div
                  key={title}
                  className="rounded-xl p-6 sm:p-8"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}
                  role="article"
                  aria-label={`Protocol: ${title}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: s.badgeBg, border: `1px solid ${s.border}` }}
                      aria-hidden="true"
                    >
                      <Icon size={22} style={{ color: s.iconColor }} />
                    </div>
                    <div>
                      <div
                        className="badge mb-2"
                        style={{ background: s.badgeBg, color: s.badgeColor, border: `1px solid ${s.border}`, fontSize: "0.65rem" }}
                      >
                        {s.badgeText}
                      </div>
                      <h3 className="font-heading font-bold text-lg" style={{ color: "var(--slate-50)" }}>
                        {title}
                      </h3>
                      <p className="text-sm" style={{ color: s.iconColor }}>{subtitle}</p>
                    </div>
                  </div>
                  <ol className="space-y-2" aria-label={`Steps for ${title}`}>
                    {steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--slate-300)" }}>
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                          style={{ background: s.badgeBg, color: s.iconColor }}
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Weather protocols */}
      <section className="py-12" aria-labelledby="weather-heading">
        <div className="section-container">
          <h2
            id="weather-heading"
            className="font-heading font-bold text-2xl sm:text-3xl mb-6"
            style={{ color: "var(--slate-50)" }}
          >
            Weather Protocols
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Lightning", rule: "If lightning is seen OR thunder is heard — stop play IMMEDIATELY. Move to enclosed vehicles or permanent structures. Resume only 30 minutes after last observed lightning or thunder." },
              { title: "Heavy Rain", rule: "The umpire may suspend play if the field becomes unsafe. If the game has completed 5 innings (4.5 if home team leads), it is a regulation game and the score stands." },
              { title: "Extreme Heat (37°C+)", rule: "Mandatory water breaks every 2 innings. The Commissioner may cancel games in extreme heat advisories. Keep the cooler stocked with ice and cold water at all times." },
            ].map(({ title, rule }) => (
              <div key={title} className="glass-card p-6">
                <h3 className="font-heading font-semibold text-base mb-3" style={{ color: "var(--slate-50)" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate-400)" }}>{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-game requirements */}
      <section className="py-12" aria-labelledby="pregame-heading">
        <div className="section-container">
          <h2
            id="pregame-heading"
            className="font-heading font-bold text-2xl sm:text-3xl mb-6"
            style={{ color: "var(--slate-50)" }}
          >
            Pre-Game Requirements
          </h2>
          <div className="glass-card p-6 sm:p-8">
            <ul className="space-y-3" role="list">
              {[
                "First aid kit present (maintained by Shinji): min 6 ice packs, elastic bandages, antiseptic wipes, gauze, sterile gloves, CPR face shield, emergency blanket, scissors",
                "Cooler with ice and cold water available at all times",
                "Location of nearest hospital posted visibly at the field",
                "Emergency number 999 (and 112 as backup) must be known by all managers",
                "All registered players must have a signed BPL Liability Waiver on file",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base" style={{ color: "var(--slate-300)" }}>
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                    style={{ background: "rgba(227,27,35,0.15)", color: "var(--crimson-400)" }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
