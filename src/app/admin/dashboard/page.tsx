"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SESSION_KEY = "kakamega_admin_session";

type DashboardStats = {
  totalTrees: number;
  totalVolunteers: number;
  totalProjects: number;
  totalEvents: number;
  totalStories: number;
  pendingVolunteers: number;
  activeEvents: number;
  unreadMessages: number;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentVolunteers, setRecentVolunteers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (!session) {
      router.push("/admin");
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/dashboard");
        if (!response.ok) throw new Error("Failed to load dashboard data");
        const data = await response.json();
        setStats(data.stats);
        setRecentVolunteers(data.recentVolunteers || []);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-5xl mb-4">⚙️</div>
          <p className="text-gray-500 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xl">
                  🌱
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Kakamega Empowerment</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Admin Dashboard</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                View Site →
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back! Here&apos;s an overview of your platform.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4">
            <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
          {stats && [
            { label: "Trees Planted", value: stats.totalTrees.toLocaleString(), icon: "🌳", color: "bg-green-500" },
            { label: "Volunteers", value: stats.totalVolunteers.toLocaleString(), icon: "🙋", color: "bg-blue-500" },
            { label: "Projects", value: stats.totalProjects, icon: "📁", color: "bg-purple-500" },
            { label: "Events", value: stats.totalEvents, icon: "📅", color: "bg-amber-500" },
            { label: "Stories", value: stats.totalStories, icon: "📖", color: "bg-pink-500" },
            { label: "Unread", value: stats.unreadMessages, icon: "✉️", color: "bg-orange-500" },
            { label: "Pending", value: stats.pendingVolunteers, icon: "⏳", color: "bg-red-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-slate-700">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-xl mb-3`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          {[
            { href: "/admin/events", label: "Manage Events", icon: "📅", color: "bg-blue-500" },
            { href: "/admin/projects", label: "Manage Projects", icon: "📁", color: "bg-purple-500" },
            { href: "/admin/volunteers", label: "View Volunteers", icon: "🙋", color: "bg-green-500" },
            { href: "/admin/stories", label: "Manage Stories", icon: "📖", color: "bg-pink-500" },
            { href: "/admin/messages", label: "Contact Messages", icon: "✉️", color: "bg-orange-500" },
          ].map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-md transition-shadow group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">{action.label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage content →</p>
            </Link>
          ))}
        </div>

        {/* Recent Volunteers */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 dark:text-white">Recent Volunteer Applications</h2>
            <Link href="/admin/volunteers" className="text-sm text-green-600 dark:text-green-400 hover:underline">
              View All →
            </Link>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-slate-700">
            {recentVolunteers.length > 0 ? (
              recentVolunteers.map((volunteer) => (
                <div key={volunteer.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                      {volunteer.firstName?.[0]}
                      {volunteer.lastName?.[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {volunteer.firstName} {volunteer.lastName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {volunteer.email} · {volunteer.community}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      volunteer.status === "pending"
                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                        : volunteer.status === "approved"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    }`}>
                      {volunteer.status}
                    </span>
                    <Link
                      href="/admin/volunteers"
                      className="text-sm text-green-600 dark:text-green-400 hover:underline"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No volunteer applications yet
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
