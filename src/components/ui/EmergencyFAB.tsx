"use client";

import { useState } from "react";
import { Phone, X, AlertTriangle, MapPin, ChevronDown } from "lucide-react";

const QUICK_CONTACTS = [
  { label: "Emergency (Police / Ambulance / Fire)", number: "999", primary: true },
  { label: "Ambulance (no credit needed)", number: "112", primary: true },
  { label: "Hospital Serdang", number: "03-89475555", primary: false },
  { label: "Commissioner Basit", number: "1022763014", primary: false },
];

export function EmergencyFAB() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        className={`fixed bottom-20 right-4 z-50 w-72 transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Emergency contacts"
        id="emergency-panel"
      >
        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: "rgba(10,25,47,0.97)", border: "1px solid rgba(183,28,28,0.35)", backdropFilter: "blur(24px)" }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ background: "rgba(183,28,28,0.15)", borderBottom: "1px solid rgba(183,28,28,0.2)" }}
          >
            <AlertTriangle size={16} style={{ color: "var(--crimson-400)" }} aria-hidden="true" />
            <span className="font-heading font-bold text-sm" style={{ color: "var(--crimson-300)" }}>
              Field Emergency Contacts
            </span>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto p-1 rounded-lg transition-colors hover:bg-white/10"
              aria-label="Close emergency panel"
            >
              <X size={14} style={{ color: "var(--slate-400)" }} />
            </button>
          </div>

          {/* Contacts */}
          <div className="p-3 space-y-2">
            {QUICK_CONTACTS.map(({ label, number, primary }) => (
              <a
                key={number}
                href={`tel:${number}`}
                className="flex items-center gap-3 p-3 rounded-xl transition-all group"
                style={
                  primary
                    ? { background: "rgba(183,28,28,0.12)", border: "1px solid rgba(183,28,28,0.25)" }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }
                }
                aria-label={`Call ${label}: ${number}`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: primary ? "rgba(183,28,28,0.2)" : "rgba(255,255,255,0.06)" }}
                  aria-hidden="true"
                >
                  <Phone size={13} style={{ color: primary ? "var(--crimson-400)" : "var(--slate-400)" }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs leading-tight mb-0.5" style={{ color: "var(--slate-400)" }}>
                    {label}
                  </p>
                  <p
                    className="font-heading font-bold text-base group-hover:text-white transition-colors"
                    style={{ color: primary ? "white" : "var(--slate-200)" }}
                  >
                    {number}
                  </p>
                </div>
              </a>
            ))}

            {/* Maps link */}
            <a
              href="https://maps.google.com/?q=Hospital+Serdang+Selangor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              aria-label="Get directions to Hospital Serdang"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,0.06)" }}
                aria-hidden="true"
              >
                <MapPin size={13} style={{ color: "var(--slate-400)" }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: "var(--slate-400)" }}>Directions to</p>
                <p className="text-sm font-semibold" style={{ color: "var(--slate-200)" }}>
                  Hospital Serdang (10 min)
                </p>
              </div>
            </a>
          </div>

          {/* Footer */}
          <div
            className="px-4 py-2 text-xs text-center"
            style={{ color: "var(--slate-600)", borderTop: "1px solid rgba(255,255,255,0.04)" }}
          >
            BPL Safety Protocol · First aid kit with Shinji
          </div>
        </div>
      </div>

      {/* FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 h-12 rounded-full shadow-2xl transition-all duration-200 active:scale-95 lg:hidden"
        style={{
          background: open ? "var(--navy-800)" : "var(--crimson-500)",
          border: `1px solid ${open ? "rgba(255,255,255,0.1)" : "rgba(183,28,28,0.5)"}`,
          boxShadow: open ? "none" : "0 4px 24px rgba(227,27,35,0.5)",
        }}
        aria-label={open ? "Close emergency contacts" : "Open emergency contacts"}
        aria-expanded={open}
        aria-controls="emergency-panel"
      >
        {open ? (
          <ChevronDown size={18} style={{ color: "white" }} aria-hidden="true" />
        ) : (
          <Phone size={18} style={{ color: "white" }} aria-hidden="true" />
        )}
        <span className="text-sm font-semibold text-white">
          {open ? "Close" : "Emergency"}
        </span>
      </button>
    </>
  );
}
