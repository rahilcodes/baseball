import { NextResponse } from "next/server";
import { resend, FROM, REPLY_TO, TEAM_EMAILS, teamWelcomeHtml, newLeadHtml, type TeamEmailData } from "@/lib/emails";

export async function POST(req: Request) {
  try {
    const data: TeamEmailData = await req.json();

    if (!data.managerEmail || !data.teamName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Welcome email to the team manager
    const managerEmailResult = await resend.emails.send({
      from: FROM,
      to: data.managerEmail,
      replyTo: REPLY_TO,
      subject: `${data.teamName} is officially in BPL Season 1! 🏆`,
      html: teamWelcomeHtml(data),
    });

    if (managerEmailResult.error) {
      console.error("Team welcome email failed:", managerEmailResult.error);
    }

    // 2. Lead alert to BPL team
    const teamAlertResult = await resend.emails.send({
      from: FROM,
      to: TEAM_EMAILS,
      replyTo: data.managerEmail,
      subject: `[BPL] New Team Registration — ${data.teamName}`,
      html: newLeadHtml({
        type: "team",
        name: `${data.teamName} (Manager: ${data.managerName})`,
        email: data.managerEmail,
        detail: `Home: ${data.uniformColorHome} · Away: ${data.uniformColorAway}`,
      }),
    });

    if (teamAlertResult.error) {
      console.error("Team alert email failed:", teamAlertResult.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
