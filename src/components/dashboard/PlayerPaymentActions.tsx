"use client";

import { CreditCard, CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { buildStripeUrl } from "@/lib/stripe";

interface PlayerPaymentActionsProps {
  player: {
    id: string;
    payment_status: string | null;
    registrant_type: "adult" | "student" | string;
    full_name: string;
    phone?: string;
  };
  isFreeAgent?: boolean;
}

export function PlayerPaymentActions({ player, isFreeAgent = false }: PlayerPaymentActionsProps) {
  const isPaid = player.payment_status === "paid";

  if (isPaid) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-bold tracking-wider uppercase">
        <CheckCircle2 size={12} />
        Paid
      </div>
    );
  }

  // Determine Stripe link
  const paymentType = player.registrant_type === "student" ? "student_player" : "adult_player";
  const stripeUrl = buildStripeUrl(paymentType, player.id);

  // Auto-format phone number for WhatsApp and build dynamic message
  const getWhatsAppLink = () => {
    let cleaned = "";
    if (player.phone) {
      // Strip everything except numbers
      cleaned = player.phone.replace(/\D/g, "");
      
      // If it starts with 0 (e.g. 0167777955), replace it with 60
      if (cleaned.startsWith("0")) {
        cleaned = "60" + cleaned.substring(1);
      }
    }

    const firstName = player.full_name.split(' ')[0] || "Player";
    
    // Customize message based on free agent status
    const message = isFreeAgent
      ? `Hey ${firstName}, your registration as a Free Agent for the BPL league is 90% completed! ⚾\n\nPlease pay the registration fee using this link to finalize your roster eligibility:\n${stripeUrl}`
      : `Hey ${firstName}, your registration for the BPL league is 90% completed! ⚾\n\nPlease pay the registration fee using the link below to finalize your spot on the roster:\n${stripeUrl}`;

    return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-500 font-bold tracking-wider uppercase mr-2">
        <Clock size={12} />
        Pending
      </div>
      
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        title="Send WhatsApp Reminder"
        className="px-2 py-1 rounded-md bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366] hover:border-[#25D366] text-[#25D366] hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-sm"
      >
        <MessageCircle size={12} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Chat</span>
      </a>

      <a
        href={stripeUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Pay Now using your card to clear this player's balance"
        className="px-2 py-1 rounded-md bg-crimson-500/10 border border-crimson-500/20 hover:bg-crimson-500 hover:border-crimson-500 text-crimson-400 hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-sm"
      >
        <CreditCard size={12} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Pay</span>
      </a>
    </div>
  );
}
