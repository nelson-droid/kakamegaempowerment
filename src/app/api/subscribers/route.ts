import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST - Subscribe to newsletter
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (!existing.isActive) {
        // Re-activate subscription
        const subscriber = await prisma.subscriber.update({
          where: { email },
          data: { isActive: true },
        });
        return NextResponse.json(subscriber);
      }
      return NextResponse.json(
        { message: "Already subscribed" },
        { status: 200 }
      );
    }

    const subscriber = await prisma.subscriber.create({
      data: { email },
    });

    return NextResponse.json(subscriber, { status: 201 });
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}