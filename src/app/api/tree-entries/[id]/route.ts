import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// DELETE - Delete tree entry
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.treeEntry.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tree entry:", error);
    return NextResponse.json(
      { error: "Failed to delete tree entry" },
      { status: 500 }
    );
  }
}