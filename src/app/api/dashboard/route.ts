import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [treeStats, volunteerCount, projectCount, eventCount, storyCount, pendingVolunteers, unreadMessages, recentVolunteers] = await Promise.all([
      prisma.treeEntry.aggregate({ _sum: { trees: true } }),
      prisma.volunteer.count({ where: { status: "approved" } }),
      prisma.project.count(),
      prisma.event.count({ where: { isActive: true } }),
      prisma.story.count(),
      prisma.volunteer.count({ where: { status: "pending" } }),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.volunteer.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          community: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalTrees: treeStats._sum.trees || 0,
        totalVolunteers: volunteerCount,
        totalProjects: projectCount,
        totalEvents: eventCount,
        totalStories: storyCount,
        pendingVolunteers: pendingVolunteers,
        activeEvents: eventCount,
        unreadMessages: unreadMessages,
      },
      recentVolunteers,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
