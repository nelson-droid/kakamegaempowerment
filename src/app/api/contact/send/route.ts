import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

// Email configuration - using Gmail SMTP
// In production, use environment variables for these
const EMAIL_USER = process.env.EMAIL_USER || "Kakamegaempowerment1@gmail.com";
const EMAIL_PASS = process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "Kakamegaempowerment1@gmail.com";

async function sendEmail(to: string, subject: string, html: string, text: string) {
  if (!EMAIL_PASS) {
    console.warn("EMAIL_APP_PASSWORD not configured - email not sent");
    return { success: false, error: "Email not configured" };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Kakamega Empowerment" <${EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: String(error) };
  }
}

// POST - Send contact form to database AND email
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, sendToAdmin, sendToGmail } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    // 1. Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    // 2. Send emails in parallel
    const emailResults: any = { admin: { success: false }, gmail: { success: false } };

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #065f46 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🌱 New Contact Message</h1>
        </div>
        <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;"><strong>From:</strong> ${name} (${email})</p>
          <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;"><strong>Subject:</strong> ${subject}</p>
          <div style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #d1d5db;">
            <p style="margin: 0; white-space: pre-wrap; color: #374151;">${message}</p>
          </div>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            Message ID: ${contactMessage.id}<br>
            Received: ${new Date().toLocaleString()}<br>
            This message was submitted via the Kakamega Empowerment website contact form.
          </p>
        </div>
      </div>
    `;

    const emailText = `
New Contact Message from Kakamega Empowerment Website

From: ${name} (${email})
Subject: ${subject}

Message:
${message}

---
Message ID: ${contactMessage.id}
Received: ${new Date().toLocaleString()}
This message was submitted via the Kakamega Empowerment website contact form.
    `;

    const emailPromises = [];

    if (sendToAdmin) {
      emailPromises.push(
        sendEmail(ADMIN_EMAIL, `[Contact Form] ${subject}`, emailHtml, emailText).then(
          (result) => (emailResults.admin = result)
        )
      );
    }

    if (sendToGmail) {
      emailPromises.push(
        sendEmail("Kakamegaempowerment1@gmail.com", `[Contact Form] ${subject}`, emailHtml, emailText).then(
          (result) => (emailResults.gmail = result)
        )
      );
    }

    await Promise.all(emailPromises);

    return NextResponse.json({
      success: true,
      message: contactMessage,
      emails: emailResults,
    });
  } catch (error) {
    console.error("Error sending contact message:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}