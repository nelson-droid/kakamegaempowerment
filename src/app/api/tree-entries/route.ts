import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all tree entries
export async function GET() {
  try {
    const entries = await prisma.treeEntry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching tree entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch tree entries" },
      { status: 500 }
    );
  }
}

// POST - Create new tree entry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const entry = await prisma.treeEntry.create({
      data: {
        trees: parseInt(body.trees, 10),
        species: body.species,
        community: body.community,
        location: body.location || null,
        notes: body.notes || null,
        latitude: body.latitude ? parseFloat(body.latitude) : null,
        longitude: body.longitude ? parseFloat(body.longitude) : null,
      },
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("Error creating tree entry:", error);
    return NextResponse.json(
      { error: "Failed to create tree entry" },
      { status: 500 }
    );
  }
}