import { NextResponse } from "next/server";
import { sponsorSchema } from "@/lib/schemas";
import { resend, FROM, REPLY_TO, TEAM_EMAILS, sponsorWelcomeHtml, newLeadHtml } from "@/lib/emails";
import { SPONSOR_PACKAGES } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = sponsorSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { companyName, contactName, email, phone, packageTier, packagePrice } = validated.data;
    const packageName = SPONSOR_PACKAGES.find(p => p.tier === packageTier)?.name ?? packageTier;

    // 1. Welcome email to the sponsor
    const sponsorEmailResult = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: `Welcome to BPL Season 1, ${companyName}! 🏆`,
      html: sponsorWelcomeHtml({ companyName, contactName, email, packageTier, packagePrice, packageName }),
    });

    if (sponsorEmailResult.error) {
      console.error("Sponsor welcome email failed:", sponsorEmailResult.error);
    }

    // 2. Lead alert to the BPL team (Basit)
    const teamEmailResult = await resend.emails.send({
      from: FROM,
      to: TEAM_EMAILS,
      replyTo: email,
      subject: `[BPL] New ${packageName} Lead — ${companyName}`,
      html: newLeadHtml({
        type: "sponsor",
        name: `${contactName} (${companyName})`,
        email,
        phone,
        detail: `${packageName} · RM ${packagePrice.toLocaleString()}`,
      }),
    });

    if (teamEmailResult.error) {
      console.error("Team lead email failed:", teamEmailResult.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
