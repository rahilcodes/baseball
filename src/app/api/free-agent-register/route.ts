import { NextResponse } from "next/server";
import { resend, FROM, REPLY_TO, TEAM_EMAILS, freeAgentWelcomeHtml, newLeadHtml, type FreeAgentEmailData } from "@/lib/emails";

export async function POST(req: Request) {
  try {
    const data: FreeAgentEmailData = await req.json();

    if (!data.email || !data.fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Welcome email to the player
    const playerEmailResult = await resend.emails.send({
      from: FROM,
      to: data.email,
      replyTo: REPLY_TO,
      subject: `You're in the draft pool, ${data.fullName.split(" ")[0]}! ⚾`,
      html: freeAgentWelcomeHtml(data),
    });

    if (playerEmailResult.error) {
      console.error("Player welcome email failed:", playerEmailResult.error);
    }

    // 2. Lead alert to BPL team
    const teamEmailResult = await resend.emails.send({
      from: FROM,
      to: TEAM_EMAILS,
      replyTo: data.email,
      subject: `[BPL] New Free Agent — ${data.fullName}`,
      html: newLeadHtml({
        type: "free_agent",
        name: data.fullName,
        email: data.email,
        detail: `Position: ${data.primaryPosition} · Level: ${data.experienceLevel}`,
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
