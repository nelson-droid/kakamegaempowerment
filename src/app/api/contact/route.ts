import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all contact messages (for admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter") || "all";

    const where = filter === "unread" ? { isRead: false } : filter === "read" ? { isRead: true } : {};

    const [messages, total, unreadCount] = await Promise.all([
      prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
    ]);

    return NextResponse.json({ messages, total, unreadCount });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// POST - Submit a new contact message
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    const contactMessage = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    return NextResponse.json(contactMessage, { status: 201 });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

// PATCH - Mark message as read or delete
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, isRead, action } = body;

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    if (action === "delete") {
      await prisma.contactMessage.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    if (typeof isRead === "boolean") {
      await prisma.contactMessage.update({ where: { id }, data: { isRead } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating contact message:", error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}
