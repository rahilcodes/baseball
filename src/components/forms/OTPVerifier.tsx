"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Mail, KeyRound, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface OTPVerifierProps {
  onVerified: (email: string) => void;
  title?: string;
  subtitle?: string;
  defaultEmail?: string;
}

export function OTPVerifier({ 
  onVerified, 
  title = "Identity Verification",
  subtitle = "We require legal email identity verification prior to signing league liability waivers and accessing BPL digital systems.",
  defaultEmail = ""
}: OTPVerifierProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true, // Auto-create shadow user for DB relations if needed
        }
      });
      
      if (authError) throw authError;

      setSuccessMsg("Verification code sent! Please check your inbox (and spam folder).");
      setStep("otp");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to send verification code. Ensure 'Confirm email' is enabled in Supabase.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError("Please enter the complete verification code.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data, error: authError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (authError) throw authError;

      if (data.session) {
        // Successfully verified! Let the parent form unlock.
        onVerified(email);
      } else {
        throw new Error("Failed to establish secure session.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Invalid or expired code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 sm:p-12 text-center max-w-lg mx-auto relative overflow-hidden">
      <div
        className="absolute -inset-10 blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--crimson-500)" }}
        aria-hidden="true"
      />
      
      <div className="relative z-10">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(227,27,35,0.1)", border: "1px solid rgba(227,27,35,0.2)" }}
        >
          {step === "email" ? (
            <Mail size={32} style={{ color: "var(--crimson-400)" }} />
          ) : (
            <KeyRound size={32} style={{ color: "var(--crimson-400)" }} />
          )}
        </div>
        
        <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-3" style={{ color: "var(--slate-50)" }}>
          {title}
        </h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--slate-400)" }}>
          {step === "email" ? subtitle : `Enter the verification code sent to ${email}`}
        </p>

        {error && (
          <div className="form-error justify-center mb-6 text-sm">
            <AlertCircle size={14} />
            {error}
          </div>
        )}
        {successMsg && step === "otp" && (
          <div className="flex items-center gap-2 justify-center text-green-500 text-sm mb-6 font-medium">
            <CheckCircle size={14} />
            {successMsg}
          </div>
        )}

        {step === "email" ? (
          <form onSubmit={handleSendOtp} className="space-y-4 text-left">
            <div>
              <label className="form-label" htmlFor="verify-email">Email Address</label>
              <input
                id="verify-email"
                type="email"
                className="form-field text-center text-lg tracking-wide"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full h-12" loading={loading}>
              {loading ? "Sending..." : "Send Verification Code"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-left">
            <div>
              <label className="form-label text-center block" htmlFor="verify-otp">Verification Code</label>
              <input
                id="verify-otp"
                type="text"
                maxLength={8}
                className="form-field text-center font-mono text-xl sm:text-2xl tracking-[0.3em] sm:tracking-[0.5em] h-14"
                placeholder="00000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.trim().toUpperCase())} // Allow letters if alphanumeric
                disabled={loading}
                autoComplete="one-time-code"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full h-12" loading={loading}>
              {loading ? "Verifying..." : "Verify & Unlock Form"} <ArrowRight size={18} />
            </Button>
            
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setOtp("");
                setError(null);
                setSuccessMsg(null);
              }}
              className="w-full text-xs text-slate-500 hover:text-slate-300 transition-colors mt-4 bg-transparent border-none cursor-pointer"
            >
              Didn&apos;t receive it? Try a different email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
