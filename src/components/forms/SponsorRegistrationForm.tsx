"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, Building2, User, Package, CreditCard } from "lucide-react";
import { sponsorSchema, type SponsorFormData } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { SPONSOR_PACKAGES } from "@/lib/data";
import { buildStripeUrl, type StripePaymentType } from "@/lib/stripe";

const STEPS = [
  { id: 1, title: "Company Details", icon: Building2, fields: ["companyName", "contactName", "email", "phone", "address"] },
  { id: 2, title: "Package Selection", icon: Package, fields: ["packageTier", "packagePrice"] },
  { id: 3, title: "Review & Confirm", icon: CheckCircle, fields: [] },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="form-error" role="alert">
      <AlertCircle size={12} aria-hidden="true" />
      {message}
    </p>
  );
}

interface SponsorRegistrationFormProps {
  initialTier?: string;
}

export function SponsorRegistrationForm({ initialTier = "silver" }: SponsorRegistrationFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Map initialTier to pricing
  const defaultPrice = SPONSOR_PACKAGES.find(p => p.tier === initialTier)?.priceRange.replace(/[^0-9]/g, "") || "2000";

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorSchema) as any,
    mode: "onBlur",
    defaultValues: {
      packageTier: initialTier as any,
      packagePrice: parseInt(defaultPrice),
    },
  });

  const selectedTier = watch("packageTier");
  const packageDetails = SPONSOR_PACKAGES.find(p => p.tier === selectedTier);

  // Sync price when tier changes via dropdown
  useEffect(() => {
    if (packageDetails) {
      const price = parseInt(packageDetails.priceRange.replace(/[^0-9]/g, ""));
      setValue("packagePrice", price);
    }
  }, [selectedTier, packageDetails, setValue]);

  const currentStep = STEPS[step - 1];

  const handleNext = async () => {
    const fieldsToValidate = currentStep.fields as (keyof SponsorFormData)[];
    const valid = await trigger(fieldsToValidate);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const onSubmit: SubmitHandler<SponsorFormData> = async (data) => {
    try {
      const { data: insertedData, error } = await supabase.from('sponsorship_submissions').insert([
        {
          company_name: data.companyName,
          contact_name: data.contactName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          package_tier: data.packageTier,
          package_price: data.packagePrice,
          payment_status: 'pending'
        }
      ]).select('id').single();

      if (error) throw error;
      
      // Execute API route to send Welcome & Lead emails via Resend
      const res = await fetch('/api/sponsor-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.error("Failed to send emails:", await res.text());
      }

      // Map sponsor tier to the Stripe payment link key
      const tierToStripe: Record<string, StripePaymentType> = {
        title: 'title',
        gold: 'gold',
        silver: 'silver',
      };
      const stripeType = tierToStripe[data.packageTier] ?? 'silver';
      const stripeUrl = buildStripeUrl(stripeType, insertedData.id);
      window.location.href = stripeUrl;
    } catch (err) {
      console.error("Submission error:", err);
      alert("Submission failed. Please try again or contact support.");
    }
  };

  if (submitted) {
    return (
      <div className="glass-card p-10 sm:p-16 text-center max-w-xl mx-auto">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.25)" }}
        >
          <CheckCircle size={36} style={{ color: "var(--gold-400)" }} />
        </div>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4" style={{ color: "var(--slate-50)" }}>
          Interest Registered!
        </h2>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--slate-400)" }}>
          Thank you, <strong style={{ color: "var(--slate-200)" }}>{watch("contactName")}</strong>.
        </p>
        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--slate-400)" }}>
          We have received your interest in becoming a <span className="gradient-text font-bold">{packageDetails?.name}</span>. 
          A sponsorship coordinator will reach out to <span style={{ color: "var(--slate-200)" }}>{watch("email")}</span> within 24 hours 
          with the onboarding kit and formal contract.
        </p>
        <div className="glass-card p-6 border-gold-400/20" style={{ background: "rgba(245,166,35,0.03)" }}>
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--gold-400)" }}>Welcome Email Sent</p>
          <p className="text-xs" style={{ color: "var(--slate-500)" }}>
            Please check your inbox (and spam folder) for a welcome message from BPL HQ.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-2xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-10">
        {STEPS.map(({ id, title, icon: Icon }) => {
          const isActive = id === step;
          const isComplete = id < step;
          return (
            <div key={id} className="flex flex-col items-center flex-1 relative">
              {id > 1 && <div className="absolute left-0 right-1/2 top-5 h-px bg-glass-border" style={{ background: isComplete ? "var(--gold-400)" : "" }} />}
              {id < STEPS.length && <div className="absolute left-1/2 right-0 top-5 h-px bg-glass-border" style={{ background: id < step - 1 ? "var(--gold-400)" : "" }} />}
              <div
                className={cn("w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all border-2",
                  isComplete ? "bg-gold-400 border-gold-400" : isActive ? "border-gold-400 bg-navy-800" : "border-glass-border bg-navy-800"
                )}
              >
                {isComplete ? <CheckCircle size={16} className="text-navy-950" /> : <Icon size={16} className={isActive ? "text-gold-400" : "text-slate-500"} />}
              </div>
              <span className={cn("text-xs font-medium mt-2 hidden sm:block", isActive ? "text-slate-200" : "text-slate-600")}>{title}</span>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-8 sm:p-10 mb-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Building2 size={120} />
        </div>

        <h2 className="font-heading font-bold text-2xl mb-8" style={{ color: "var(--slate-50)" }}>
          {currentStep.title}
        </h2>

        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="form-label">Company Name *</label>
              <input className={cn("form-field", errors.companyName && "form-field-error")} {...register("companyName")} placeholder="e.g. Acme Corp" />
              <FieldError message={errors.companyName?.message} />
            </div>
            <div>
              <label className="form-label">Contact Person *</label>
              <input className={cn("form-field", errors.contactName && "form-field-error")} {...register("contactName")} placeholder="Full Name" />
              <FieldError message={errors.contactName?.message} />
            </div>
            <div>
              <label className="form-label">WhatsApp / Phone *</label>
              <input className={cn("form-field", errors.phone && "form-field-error")} {...register("phone")} placeholder="e.g. 012-345 6789" />
              <FieldError message={errors.phone?.message} />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Company Email *</label>
              <input type="email" className={cn("form-field", errors.email && "form-field-error")} {...register("email")} placeholder="contact@company.com" />
              <FieldError message={errors.email?.message} />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Full Office Address *</label>
              <textarea rows={3} className={cn("form-field resize-none", errors.address && "form-field-error")} {...register("address")} placeholder="HQ or Billing Address" />
              <FieldError message={errors.address?.message} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="form-label">Select Sponsorship Tier</label>
              <select className="form-field appearance-none cursor-pointer" {...register("packageTier")}>
                {SPONSOR_PACKAGES.map(p => (
                  <option key={p.tier} value={p.tier}>{p.name} ({p.priceRange})</option>
                ))}
              </select>
            </div>

            <div className="glass-card p-6 border-gold-400/20" style={{ background: "rgba(245,166,35,0.03)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gold-400/10 flex items-center justify-center border border-gold-400/20">
                  <Package size={16} className="text-gold-400" />
                </div>
                <h3 className="font-heading font-bold text-lg" style={{ color: "var(--slate-50)" }}>Included Benefits</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packageDetails?.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2 text-xs" style={{ color: "var(--slate-400)" }}>
                    <CheckCircle size={14} className="text-gold-400 shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="glass-card p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-glass-border">
                <span className="text-sm text-slate-500">Selected Package</span>
                <span className="font-heading font-bold text-lg text-gold-400">{packageDetails?.name}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-glass-border">
                <span className="text-sm text-slate-500">Commitment Amount</span>
                <span className="font-heading font-bold text-xl text-slate-50">{packageDetails?.priceRange}</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-500 uppercase tracking-widest">Company Details</p>
                <p className="text-sm text-slate-300 font-medium">{watch("companyName")}</p>
                <p className="text-xs text-slate-500">{watch("email")} • {watch("phone")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl border border-gold-400/10 bg-gold-400/5">
              <AlertCircle size={18} className="text-gold-400 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed text-slate-400">
                By completing this registration, you are formally expressing interest in a BPL Season 1 sponsorship. 
                Our team will verify availability and send a digital contract via Docusign to your provided email.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        {step > 1 ? (
          <Button type="button" variant="ghost" size="lg" onClick={() => setStep(s => s - 1)}>
            <ChevronLeft size={18} />
            Back
          </Button>
        ) : <div />}

        {step < STEPS.length ? (
          <Button type="button" variant="primary" size="lg" onClick={handleNext} style={{ background: "var(--gold-400)", color: "var(--navy-950)" }}>
            Review Package
            <ChevronRight size={18} />
          </Button>
        ) : (
          <Button type="submit" variant="primary" size="lg" loading={isSubmitting} style={{ background: "var(--gold-400)", color: "var(--navy-950)" }}>
            {isSubmitting ? "Processing..." : "Claim Sponsorship"}
            <CheckCircle size={18} />
          </Button>
        )}
      </div>
    </form>
  );
}
