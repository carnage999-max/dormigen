import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

const rateLimit = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const now = Date.now();
    const lastRequest = rateLimit.get(ip) || 0;

    if (now - lastRequest < 60000) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // HTML Email Template matching website style
    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #080c20; color: #ffffff; padding: 40px; border-radius: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4698da; margin: 0; font-size: 28px; letter-spacing: -1px;">DORMIGEN®</h1>
          <p style="color: #c7ced9; font-size: 14px; margin-top: 5px;">New Inquiry Received</p>
        </div>
        
        <div style="background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(199, 206, 217, 0.18); padding: 30px; border-radius: 24px;">
          <div style="margin-bottom: 20px;">
            <label style="color: rgba(199, 206, 217, 0.4); font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">From</label>
            <p style="font-size: 18px; margin: 5px 0 0 0; font-weight: bold;">${name}</p>
            <p style="color: #4698da; margin: 2px 0 0 0;">${email}</p>
          </div>
          
          <div style="margin-bottom: 0;">
            <label style="color: rgba(199, 206, 217, 0.4); font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Message</label>
            <p style="color: #c7ced9; line-height: 1.6; margin: 10px 0 0 0; font-size: 16px;">${message}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: rgba(199, 206, 217, 0.3); font-size: 11px;">
          <p>© 2024 Dormigen®. Educational content only. Not medical advice.</p>
        </div>
      </div>
    `;

    if (!resend) {
      console.error("Resend API key is missing.");
      return NextResponse.json({ error: "Email service unconfigured." }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: "Dormigen <info@se7eninc.com>",
      to: ["info@dormigen.com", "nathan@membershipauto.com", "jamesezekiel039@gmail.com"],
      subject: `Dormigen Inquiry from ${name}`,
      html: htmlContent,
      replyTo: email,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    rateLimit.set(ip, now);
    return NextResponse.json({ success: true, id: data?.id });

  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
