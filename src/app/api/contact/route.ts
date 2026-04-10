import { NextResponse } from "next/server";
import { resend, FROM, TEAM_EMAILS, REPLY_TO } from "@/lib/emails";

export async function POST(request: Request) {
  try {
    const { name, email, subject, body } = await request.json();

    if (!name || !email || !body) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const htmlContent = `
      <h2>New Contact Form Enquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
        ${body.replace(/\n/g, "<br>")}
      </blockquote>
    `;

    // Send to team
    await resend.emails.send({
      from: FROM,
      to: TEAM_EMAILS,
      replyTo: email, // Use the sender's email so the team can reply directly to them
      subject: `[BPL Contact] ${subject} from ${name}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: "Message sent securely!" });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message", details: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
