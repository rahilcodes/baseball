"use client";

import { MessageCircle } from "lucide-react";

export function EmergencyFAB() {
  return (
    <a
      href="https://wa.me/601022763014"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 h-12 rounded-full shadow-2xl transition-all duration-200 hover:-translate-y-1 active:scale-95 lg:hidden group"
      style={{
        background: "#25D366", // Official WhatsApp green
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 8px 32px rgba(37, 211, 102, 0.4)",
      }}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={18} style={{ color: "white" }} aria-hidden="true" className="transition-transform group-hover:scale-110" />
      <span className="text-sm font-semibold text-white">
        WhatsApp
      </span>
    </a>
  );
}
