import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY || "";
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET || "";
const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE || "174379";
const MPESA_PASSKEY = process.env.MPESA_PASSKEY || "";
const MPESA_ENV = process.env.MPESA_ENV || "sandbox";

const MPESA_API_BASE =
  MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

async function getAccessToken() {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString("base64");
  const res = await fetch(
    `${MPESA_API_BASE}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` } }
  );
  const data = await res.json();
  return data.access_token;
}

// GET - Poll M-Pesa payment status
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const checkoutId = searchParams.get("checkoutId");

    if (!checkoutId) {
      return NextResponse.json({ error: "Checkout ID is required" }, { status: 400 });
    }

    // Simulated checkout (dev mode)
    if (checkoutId.startsWith("sim_")) {
      const donationId = checkoutId.replace("sim_", "");
      const donation = await prisma.donation.findUnique({ where: { id: donationId } });
      if (!donation) {
        return NextResponse.json({ error: "Donation not found" }, { status: 404 });
      }
      return NextResponse.json({
        status: "pending",
        message: "Simulated mode - M-Pesa not configured. Donation is pending.",
      });
    }

    if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET || !MPESA_PASSKEY) {
      return NextResponse.json({
        status: "pending",
        message: "M-Pesa not configured",
      });
    }

    // Query the transaction status
    const token = await getAccessToken();
    const timestamp = `${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${String(new Date().getHours()).padStart(2, "0")}${String(new Date().getMinutes()).padStart(2, "0")}${String(new Date().getSeconds()).padStart(2, "0")}`;
    const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString("base64");

    const res = await fetch(
      `${MPESA_API_BASE}/mpesa/stkpushquery/v1/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: MPESA_SHORTCODE,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: checkoutId,
        }),
      }
    );

    const data = await res.json();

    // ResultCode: 0 = Success, others = failure/cancel
    if (data.ResultCode === "0") {
      // Mark donation as completed
      const donation = await prisma.donation.findFirst({
        where: { mpesaCheckoutId: checkoutId },
      });
      if (donation) {
        await prisma.donation.update({
          where: { id: donation.id },
          data: {
            paymentStatus: "completed",
            mpesaReceipt: data.ResultCode || null,
          },
        });
      }
      return NextResponse.json({
        status: "completed",
        message: "Payment successful!",
      });
    } else if (data.ResultCode === "1037" || data.ResultCode === "1032") {
      return NextResponse.json({
        status: "pending",
        message: "Waiting for you to enter your M-Pesa PIN...",
      });
    } else {
      return NextResponse.json({
        status: "failed",
        message: data.ResultDesc || "Payment failed or was cancelled",
      });
    }
  } catch (error: any) {
    console.error("M-Pesa status error:", error);
    return NextResponse.json({
      status: "error",
      message: error.message || "Failed to check status",
    });
  }
}