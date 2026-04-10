import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { resend, FROM, REPLY_TO } from "@/lib/emails";

// ---------------------------------------------------------------------------
// Stripe & Supabase (server-side only)
// ---------------------------------------------------------------------------
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

// Use the service-role key here so we can write to any table without RLS.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ---------------------------------------------------------------------------
// Stripe sends the raw body — we MUST NOT parse it as JSON first.
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
  } catch (err: any) {
    console.error("⚠️ Stripe webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // ---------------------------------------------------------------------------
  // Handle checkout.session.completed
  // ---------------------------------------------------------------------------
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const recordId = session.client_reference_id;
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;
    const amountPaid = (session.amount_total ?? 0) / 100; // Stripe stores in cents

    // Determine the payment type by the amount paid
    const amountMap: Record<number, string> = {
      40: "adult_player",
      20: "student_player",
      15000: "title_sponsor",
      5000: "gold_sponsor",
      2000: "silver_sponsor",
    };

    // Also check the line item name stored in metadata
    const paymentType = session.metadata?.payment_type ?? amountMap[amountPaid] ?? "unknown";

    console.log(`✅ Stripe payment confirmed: type=${paymentType}, recordId=${recordId}, amount=RM${amountPaid}`);

    if (!recordId) {
      console.error("❌ No client_reference_id in session — cannot match to Supabase row.");
      return NextResponse.json({ received: true });
    }

    try {
      // -----------------------------------------------------------------
      // 1. Update the correct Supabase table
      // -----------------------------------------------------------------
      let updateError = null;

      if (paymentType === "adult_player" || paymentType === "student_player") {
        const { error } = await supabaseAdmin
          .from("free_agents")
          .update({
            payment_status: "paid",
            stripe_session_id: session.id,
            paid_at: new Date().toISOString(),
          })
          .eq("id", recordId);
        updateError = error;
      } else if (
        paymentType === "title_sponsor" ||
        paymentType === "gold_sponsor" ||
        paymentType === "silver_sponsor"
      ) {
        const { error } = await supabaseAdmin
          .from("sponsorship_submissions")
          .update({
            payment_status: "paid",
            stripe_session_id: session.id,
            paid_at: new Date().toISOString(),
          })
          .eq("id", recordId);
        updateError = error;
      }

      if (updateError) {
        console.error("❌ Supabase update failed:", updateError);
      } else {
        console.log(`✅ Supabase record ${recordId} marked as paid.`);
      }

      // -----------------------------------------------------------------
      // 2. Send payment confirmation email to the customer
      // -----------------------------------------------------------------
      if (customerEmail) {
        const tierName =
          paymentType === "adult_player"
            ? "Adult Player Registration"
            : paymentType === "student_player"
            ? "Student Player Registration"
            : paymentType === "title_sponsor"
            ? "Title Sponsorship"
            : paymentType === "gold_sponsor"
            ? "Gold Sponsorship"
            : "Silver Sponsorship";

        await resend.emails.send({
          from: FROM,
          to: customerEmail,
          replyTo: REPLY_TO,
          subject: `✅ Payment Confirmed — BPL ${tierName}`,
          html: `
            <div style="font-family:Inter,sans-serif;background:#020B18;color:#F8FAFC;padding:40px;border-radius:16px;max-width:560px;margin:0 auto;">
              <h1 style="color:#F5A623;font-size:24px;margin-bottom:8px;">Payment Confirmed!</h1>
              <p style="color:#94A3B8;margin-bottom:16px;">Hi ${customerName ?? "there"},</p>
              <p style="color:#CBD5E1;">Your payment of <strong style="color:#F8FAFC;">RM ${amountPaid.toFixed(2)}</strong> for <strong style="color:#F8FAFC;">${tierName}</strong> has been received successfully.</p>
              <div style="background:#0A1628;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;margin:24px 0;">
                <p style="margin:0;font-size:13px;color:#64748B;">Transaction ID</p>
                <p style="margin:4px 0 0;font-family:monospace;font-size:13px;color:#94A3B8;">${session.id}</p>
              </div>
              <p style="color:#CBD5E1;">Commissioner Basit will be in touch shortly via WhatsApp with next steps.</p>
              <p style="margin-top:32px;font-size:12px;color:#334155;">BPL — Baseball Premier League &bull; bplbaseball.com</p>
            </div>
          `,
        });
        console.log(`✅ Payment confirmation email sent to ${customerEmail}`);
      }
    } catch (err) {
      console.error("❌ Webhook handler error:", err);
    }
  }

  return NextResponse.json({ received: true });
}
