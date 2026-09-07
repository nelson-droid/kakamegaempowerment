import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all data for the home page
export async function GET() {
  try {
    const [events, projects, stories, stats] = await Promise.all([
      // Get upcoming events (sorted by date, future events only)
      prisma.event.findMany({
        where: {
          date: { gte: new Date() },
          isActive: true,
        },
        orderBy: { date: "asc" },
        take: 3,
      }),
      // Get active projects
      prisma.project.findMany({
        where: { status: "active" },
        orderBy: { progress: "desc" },
        take: 3,
      }),
      // Get featured stories
      prisma.story.findMany({
        where: { isFeatured: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
      // Calculate aggregate stats
      prisma.treeEntry.aggregate({
        _sum: { trees: true },
      }),
    ]);

    // Get volunteer count
    const volunteerCount = await prisma.volunteer.count({
      where: { status: "approved" },
    });

    // Get community count (distinct communities with tree entries)
    const treeEntries = await prisma.treeEntry.findMany({
      select: { community: true },
      distinct: ["community"],
    });

    // Get school count (approximate based on projects)
    const schoolProjects = await prisma.project.count({
      where: { type: "school" },
    });

    return NextResponse.json({
      events,
      projects,
      stories,
      stats: {
        treesPlanted: stats._sum.trees || 12500,
        activeVolunteers: volunteerCount || 850,
        communitiesReached: treeEntries.length || 45,
        schoolsEngaged: schoolProjects * 4 || 28,
      },
    });
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return NextResponse.json(
      { error: "Failed to fetch home page data" },
      { status: 500 }
    );
  }
}
