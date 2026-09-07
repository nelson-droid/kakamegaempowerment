"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SESSION_KEY = "kakamega_admin_session";

type Volunteer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  community: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

const SAMPLE_VOLUNTEERS: Volunteer[] = [
  { id: 1, firstName: "John", lastName: "Mwangi", email: "john@example.com", phone: "+254 700 111 222", community: "Lurambi", status: "pending", createdAt: "2026-09-01" },
  { id: 2, firstName: "Sarah", lastName: "Otieno", email: "sarah@example.com", phone: "+254 700 222 333", community: "Malava", status: "approved", createdAt: "2026-08-30" },
  { id: 3, firstName: "David", lastName: "Kimani", email: "david@example.com", phone: "+254 700 333 444", community: "Shinyalu", status: "pending", createdAt: "2026-08-28" },
  { id: 4, firstName: "Mary", lastName: "Wanjala", email: "mary@example.com", phone: "+254 700 444 555", community: "Mahiakalo", status: "approved", createdAt: "2026-08-25" },
  { id: 5, firstName: "Peter", lastName: "Simiyu", email: "peter@example.com", phone: "+254 700 555 666", community: "Ikolomani", status: "pending", createdAt: "2026-08-20" },
];

export default function AdminVolunteersPage() {
  const router = useRouter();
  const [volunteers, setVolunteers] = useState<Volunteer[]>(SAMPLE_VOLUNTEERS);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (!session) router.push("/admin");
  }, [router]);

  const handleStatusChange = (id: number, status: Volunteer["status"]) => {
    setVolunteers(volunteers.map(v => v.id === id ? { ...v, status } : v));
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this volunteer?")) {
      setVolunteers(volunteers.filter(v => v.id !== id));
    }
  };

  const filteredVolunteers = volunteers.filter(v => {
    const matchesFilter = filter === "all" || v.status === filter;
    const matchesSearch = search === "" ||
      `${v.firstName} ${v.lastName} ${v.email} ${v.community}`.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: volunteers.length,
    pending: volunteers.filter(v => v.status === "pending").length,
    approved: volunteers.filter(v => v.status === "approved").length,
    rejected: volunteers.filter(v => v.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Dashboard
              </Link>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Volunteer Management</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total", value: stats.total, color: "bg-blue-500" },
            { label: "Pending", value: stats.pending, color: "bg-amber-500" },
            { label: "Approved", value: stats.approved, color: "bg-green-500" },
            { label: "Rejected", value: stats.rejected, color: "bg-red-500" },
          ].map((s, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-slate-700">
              <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center text-white text-xl mb-3`}>
                {s.label === "Total" ? "📊" : s.label === "Pending" ? "⏳" : s.label === "Approved" ? "✅" : "❌"}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{s.label} Volunteers</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name, email, or community..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
            />
            <div className="flex gap-2">
              {(["all", "pending", "approved", "rejected"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm capitalize transition-colors ${
                    filter === f
                      ? "bg-green-700 text-white"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
            <h2 className="font-bold text-gray-900 dark:text-white">Volunteers ({filteredVolunteers.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Community</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {filteredVolunteers.map((volunteer) => (
                  <tr key={volunteer.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                          {volunteer.firstName[0]}{volunteer.lastName[0]}
                        </div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {volunteer.firstName} {volunteer.lastName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">{volunteer.email}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{volunteer.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{volunteer.community}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        volunteer.status === "approved" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                        volunteer.status === "pending" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" :
                        "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                      }`}>
                        {volunteer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {volunteer.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(volunteer.id, "approved")}
                              className="text-green-600 hover:underline text-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusChange(volunteer.id, "rejected")}
                              className="text-red-600 hover:underline text-sm"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(volunteer.id)}
                          className="text-gray-500 hover:underline text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
