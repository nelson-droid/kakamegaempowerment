import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// M-Pesa STK Push Callback
// This is called by Safaricom after the customer completes or cancels the transaction.
// Docs: https://developer.safaricom.co.ke/docs?shell#callback-url

// POST - Handle M-Pesa callback
export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("M-Pesa callback received:", JSON.stringify(body, null, 2));

    // Parse the callback
    const stkCallback = body?.Body?.stkCallback;
    if (!stkCallback) {
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    const checkoutRequestId = stkCallback.CheckoutRequestID;
    const resultCode = stkCallback.ResultCode;
    const resultDesc = stkCallback.ResultDesc;
    const callbackMetadata = stkCallback.CallbackMetadata?.Item || [];

    // Extract M-Pesa receipt number
    let mpesaReceipt: string | null = null;
    for (const item of callbackMetadata) {
      if (item.Name === "MpesaReceiptNumber" || item.Name === "ReceiptNo") {
        mpesaReceipt = String(item.Value);
        break;
      }
    }

    // Find the donation by checkout ID
    const donation = await prisma.donation.findFirst({
      where: { mpesaCheckoutId: checkoutRequestId },
    });

    if (donation) {
      const newStatus = resultCode === 0 ? "completed" : "failed";
      await prisma.donation.update({
        where: { id: donation.id },
        data: {
          paymentStatus: newStatus,
          mpesaReceipt,
        },
      });
      console.log(`Donation ${donation.id} updated to ${newStatus}`);
    } else {
      console.warn(`No donation found for CheckoutRequestID: ${checkoutRequestId}`);
    }

    // Always return success to M-Pesa
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error) {
    console.error("M-Pesa callback error:", error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
}

// GET - For testing
export async function GET() {
  return NextResponse.json({
    message: "M-Pesa callback endpoint. Use POST to receive callbacks from Safaricom.",
  });
}