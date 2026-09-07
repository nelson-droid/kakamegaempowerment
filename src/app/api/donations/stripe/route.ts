import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";

let stripe: Stripe | null = null;
function getStripe() {
  if (!stripe && STRIPE_SECRET_KEY) {
    stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2024-12-18.acacia" as any,
    });
  }
  return stripe;
}

// POST - Create Stripe PaymentIntent
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = "usd", donorName, donorEmail, isAnonymous, message } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (!donorEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const stripeClient = getStripe();
    if (!stripeClient) {
      return NextResponse.json(
        { error: "Stripe is not configured. Please set STRIPE_SECRET_KEY." },
        { status: 503 }
      );
    }

    // Create a donation record first (status: pending)
    const donation = await prisma.donation.create({
      data: {
        amount,
        currency,
        paymentMethod: "stripe",
        paymentStatus: "pending",
        donorName: isAnonymous ? "Anonymous" : donorName || "Anonymous",
        donorEmail,
        isAnonymous: !!isAnonymous,
        message: message || null,
      },
    });

    // Create PaymentIntent
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency: currency.toLowerCase(),
      receipt_email: donorEmail,
      metadata: {
        donationId: donation.id,
        donorName: isAnonymous ? "Anonymous" : donorName || "Anonymous",
        isAnonymous: isAnonymous ? "true" : "false",
      },
    });

    // Update donation with payment intent ID
    await prisma.donation.update({
      where: { id: donation.id },
      data: { stripePaymentId: paymentIntent.id },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      donationId: donation.id,
    });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment" },
      { status: 500 }
    );
  }
}

// GET - Fetch donation status (for polling or admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const donationId = searchParams.get("id");

    if (donationId) {
      const donation = await prisma.donation.findUnique({
        where: { id: donationId },
      });
      if (!donation) {
        return NextResponse.json({ error: "Donation not found" }, { status: 404 });
      }
      return NextResponse.json(donation);
    }

    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
  }
}