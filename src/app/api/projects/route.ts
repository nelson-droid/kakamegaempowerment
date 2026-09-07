import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        type: body.type,
        status: body.status || "planning",
        progress: body.progress || 0,
        trees: body.trees || 0,
        volunteers: body.volunteers || 0,
        latitude: body.latitude,
        longitude: body.longitude,
        image: body.image,
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
