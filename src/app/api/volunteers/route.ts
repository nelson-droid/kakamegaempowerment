import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

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

// GET - Fetch all volunteers
export async function GET() {
  try {
    const volunteers = await prisma.volunteer.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    return NextResponse.json(
      { error: "Failed to fetch volunteers" },
      { status: 500 }
    );
  }
}

// POST - Create new volunteer
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName, lastName, email, phone,
      location, community, interests, availability,
      motivation, experience, howDidYouHear,
    } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !community || !motivation) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const volunteer = await prisma.volunteer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        location: location || null,
        community,
        interests: JSON.stringify(interests || []),
        availability: JSON.stringify(availability || []),
        motivation,
        experience: experience || null,
        howDidYouHear: howDidYouHear || null,
        status: "pending",
      },
    });

    // Send admin notification email
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #065f46 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🌱 New Volunteer Application</h1>
        </div>
        <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
          <h2 style="color: #111827; margin-top: 0;">${firstName} ${lastName}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;"><strong>Email:</strong></td><td style="padding: 8px 0; color: #111827;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Phone:</strong></td><td style="padding: 8px 0; color: #111827;">${phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Location:</strong></td><td style="padding: 8px 0; color: #111827;">${location || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Community:</strong></td><td style="padding: 8px 0; color: #111827;">${community}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Interests:</strong></td><td style="padding: 8px 0; color: #111827;">${(interests || []).join(", ") || "None selected"}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Availability:</strong></td><td style="padding: 8px 0; color: #111827;">${(availability || []).join(", ") || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Status:</strong></td><td style="padding: 8px 0;"><span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 9999px; font-size: 12px;">Pending Review</span></td></tr>
          </table>
          <div style="margin-top: 16px; background: white; padding: 16px; border-radius: 6px; border: 1px solid #d1d5db;">
            <h3 style="margin: 0 0 8px 0; color: #374151; font-size: 14px;">Why they want to volunteer:</h3>
            <p style="margin: 0; white-space: pre-wrap; color: #111827;">${motivation}</p>
          </div>
          ${experience ? `
          <div style="margin-top: 12px; background: white; padding: 16px; border-radius: 6px; border: 1px solid #d1d5db;">
            <h3 style="margin: 0 0 8px 0; color: #374151; font-size: 14px;">Previous experience:</h3>
            <p style="margin: 0; white-space: pre-wrap; color: #111827;">${experience}</p>
          </div>` : ""}
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            Application ID: ${volunteer.id}<br>
            Submitted: ${new Date().toLocaleString()}<br>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admin/volunteers" style="color: #059669;">View in admin dashboard →</a>
          </p>
        </div>
      </div>
    `;

    const adminText = `New Volunteer Application

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Location: ${location || "Not specified"}
Community: ${community}
Interests: ${(interests || []).join(", ") || "None selected"}
Availability: ${(availability || []).join(", ") || "Not specified"}
Status: Pending Review

Why they want to volunteer:
${motivation}
${experience ? `\nPrevious experience:\n${experience}` : ""}

Application ID: ${volunteer.id}
Submitted: ${new Date().toLocaleString()}
View in admin: ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admin/volunteers
    `;

    // Send email to admin asynchronously (don't block response)
    sendEmail(ADMIN_EMAIL, `[Volunteer Application] ${firstName} ${lastName} wants to join!`, adminHtml, adminText)
      .catch(console.error);

    return NextResponse.json(volunteer, { status: 201 });
  } catch (error) {
    console.error("Error creating volunteer:", error);
    return NextResponse.json(
      { error: "Failed to create volunteer" },
      { status: 500 }
    );
  }
}
