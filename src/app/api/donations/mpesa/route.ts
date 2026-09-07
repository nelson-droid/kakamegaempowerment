import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// M-Pesa Daraja API STK Push
// Docs: https://developer.safaricom.co.ke/APIs/STKPush

const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY || "";
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET || "";
const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE || "174379";
const MPESA_PASSKEY = process.env.MPESA_PASSKEY || "";
const MPESA_ENV = process.env.MPESA_ENV || "sandbox";
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL || "https://example.com/callback";

const MPESA_API_BASE =
  MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

async function getAccessToken() {
  if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET) {
    throw new Error("M-Pesa credentials not configured");
  }

  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString("base64");

  const res = await fetch(
    `${MPESA_API_BASE}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  const data = await res.json();
  if (!data.access_token) {
    throw new Error("Failed to get M-Pesa access token");
  }
  return data.access_token;
}

function generateTimestamp() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function generatePassword(timestamp: string) {
  if (!MPESA_PASSKEY) throw new Error("M-Pesa passkey not configured");
  const str = `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`;
  return Buffer.from(str).toString("base64");
}

function normalizePhone(phone: string) {
  // Accept 2547XXXXXXXX, 07XXXXXXXX, 7XXXXXXXX, +2547XXXXXXXX
  const cleaned = phone.replace(/[^\d+]/g, "");
  let p = cleaned.replace(/^\+/, "");
  if (p.startsWith("0")) p = "254" + p.slice(1);
  if (p.length === 9 && p.startsWith("7")) p = "254" + p;
  if (!p.startsWith("254") || p.length !== 12) {
    throw new Error("Phone number must be in format 2547XXXXXXXX or 07XXXXXXXX");
  }
  return p;
}

// POST - Initiate M-Pesa STK Push
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, donorName, donorEmail, donorPhone, isAnonymous, message } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (!donorEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!donorPhone) {
      return NextResponse.json({ error: "Phone number is required for M-Pesa" }, { status: 400 });
    }

    const phone = normalizePhone(donorPhone);

    // M-Pesa amount must be a positive integer (whole number) in KES
    const mpesaAmount = Math.ceil(amount);

    if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET || !MPESA_PASSKEY) {
      // For demo/dev without M-Pesa credentials, simulate a successful push
      // Create a pending donation
      const donation = await prisma.donation.create({
        data: {
          amount: mpesaAmount,
          currency: "KES",
          paymentMethod: "mpesa",
          paymentStatus: "pending",
          donorName: isAnonymous ? "Anonymous" : donorName || "Anonymous",
          donorEmail,
          donorPhone: phone,
          isAnonymous: !!isAnonymous,
          message: message || null,
        },
      });

      return NextResponse.json({
        checkoutRequestId: `sim_${donation.id}`,
        donationId: donation.id,
        message: "M-Pesa credentials not configured. In production, an STK push would be sent to your phone. Donate to M-Pesa number 0703456604 directly to complete the donation.",
        isSimulated: true,
      });
    }

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        amount: mpesaAmount,
        currency: "KES",
        paymentMethod: "mpesa",
        paymentStatus: "pending",
        donorName: isAnonymous ? "Anonymous" : donorName || "Anonymous",
        donorEmail,
        donorPhone: phone,
        isAnonymous: !!isAnonymous,
        message: message || null,
      },
    });

    // Get access token
    const accessToken = await getAccessToken();

    // Generate timestamp and password
    const timestamp = generateTimestamp();
    const password = generatePassword(timestamp);

    // Initiate STK Push
    const stkRes = await fetch(
      `${MPESA_API_BASE}/mpesa/stkpush/v1/processrequest`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: MPESA_SHORTCODE,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: mpesaAmount,
          PartyA: phone,
          PartyB: MPESA_SHORTCODE,
          PhoneNumber: phone,
          CallBackURL: CALLBACK_URL,
          AccountReference: `KakamegaDonation`,
          TransactionDesc: `Donation to Kakamega Empowerment CBO - ${donation.id}`,
        }),
      }
    );

    const stkData = await stkRes.json();

    if (stkData.ResponseCode !== "0") {
      // Mark donation as failed
      await prisma.donation.update({
        where: { id: donation.id },
        data: { paymentStatus: "failed" },
      });
      return NextResponse.json(
        { error: stkData.ResponseDescription || stkData.errorMessage || "M-Pesa request failed" },
        { status: 400 }
      );
    }

    // Save checkout request ID
    await prisma.donation.update({
      where: { id: donation.id },
      data: { mpesaCheckoutId: stkData.CheckoutRequestID },
    });

    return NextResponse.json({
      checkoutRequestId: stkData.CheckoutRequestID,
      donationId: donation.id,
      message: "M-Pesa payment request sent. Please check your phone and enter your PIN.",
    });
  } catch (error: any) {
    console.error("M-Pesa error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to initiate M-Pesa payment" },
      { status: 500 }
    );
  }
}