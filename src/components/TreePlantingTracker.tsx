"use client";

import { useState, useEffect } from "react";

/**
 * Tree Planting Tracker
 * Allows users to:
 * - Log trees planted
 * - View running totals
 * - See per-community breakdown
 * - Track species planted
 * - View their personal contribution
 *
 * Connected to the Prisma database via /api/tree-entries
 */

type TreeEntry = {
  id: string;
  trees: number;
  species: string;
  community: string;
  location: string | null;
  notes: string | null;
  createdAt: string;
};

type SpeciesStat = {
  name: string;
  count: number;
  icon: string;
  color: string;
};

const COMMUNITIES = [
  "Lurambi",
  "Kakamega Central",
  "Kakamega North",
  "Kakamega South",
  "Mahiakalo",
  "Shinyalu",
  "Ikolomani",
  "Malava",
  "Lugari",
  "Matete",
];

const TREE_SPECIES = [
  { name: "Indigenous Mixed", icon: "🌳", color: "from-green-500 to-emerald-600" },
  { name: "Mukima (Warbugia)", icon: "🌲", color: "from-green-600 to-green-700" },
  { name: "Muringa (Moringa)", icon: "🌴", color: "from-lime-500 to-green-600" },
  { name: "Avocado", icon: "🥑", color: "from-emerald-500 to-green-700" },
  { name: "Mango", icon: "🥭", color: "from-yellow-500 to-orange-600" },
  { name: "Pride of Barbados", icon: "🌺", color: "from-orange-400 to-red-500" },
  { name: "Other", icon: "🌱", color: "from-teal-500 to-cyan-600" },
];

// Helper: Format number with commas
const formatNumber = (n: number) => n.toLocaleString("en-KE");

export default function TreePlantingTracker() {
  const [entries, setEntries] = useState<TreeEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    trees: "",
    species: TREE_SPECIES[0].name,
    community: COMMUNITIES[0],
    location: "",
    notes: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load entries from API on mount
  useEffect(() => {
    setMounted(true);
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      setLoading(true);
      const response = await fetch("/api/tree-entries");
      if (!response.ok) throw new Error("Failed to load entries");
      const data = await response.json();
      setEntries(data);
    } catch (err) {
      console.error("Error loading entries:", err);
      setError("Failed to load tree entries");
    } finally {
      setLoading(false);
    }
  }

  // Calculate stats
  const totalTrees = entries.reduce((sum, e) => sum + e.trees, 0);
  const totalSessions = entries.length;

  // Community stats
  const communityStats: Record<string, number> = {};
  entries.forEach((e) => {
    communityStats[e.community] = (communityStats[e.community] || 0) + e.trees;
  });
  const topCommunities = Object.entries(communityStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Species stats
  const speciesStats: Record<string, number> = {};
  entries.forEach((e) => {
    speciesStats[e.species] = (speciesStats[e.species] || 0) + e.trees;
  });
  const speciesBreakdown: SpeciesStat[] = TREE_SPECIES
    .map((s) => ({ ...s, count: speciesStats[s.name] || 0 }))
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count);

  // Environmental impact
  const co2Offset = totalTrees * 22; // ~22kg CO2/year per tree (mature)
  const oxygenPerYear = totalTrees * 118; // kg O2/year per tree

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const treeCount = parseInt(formData.trees, 10);
    if (isNaN(treeCount) || treeCount <= 0) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/tree-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trees: treeCount,
          species: formData.species,
          community: formData.community,
          location: formData.location,
          notes: formData.notes,
        }),
      });

      if (!response.ok) throw new Error("Failed to save entry");

      const newEntry = await response.json();
      setEntries([newEntry, ...entries]);
      setFormData({
        trees: "",
        species: TREE_SPECIES[0].name,
        community: COMMUNITIES[0],
        location: "",
        notes: "",
      });
      setShowForm(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving entry:", err);
      setError("Failed to save tree entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete entry
  const handleDelete = async (id: string) => {
    if (!confirm("Remove this tree planting record?")) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/tree-entries/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete entry");

      setEntries(entries.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Error deleting entry:", err);
      setError("Failed to delete tree entry");
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!mounted) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading tracker...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-24 right-4 z-50 animate-slide-in">
          <div className="bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
            <span className="text-2xl">🌳</span>
            <div>
              <p className="font-bold">Trees logged successfully!</p>
              <p className="text-sm text-white/90">Thank you for growing Kakamega.</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4 text-sm text-red-800 dark:text-red-300">
          <p className="flex items-center gap-2">
            <span>⚠️</span> {error}
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="text-3xl mb-2">🌳</div>
          <div className="text-3xl font-bold">{formatNumber(totalTrees)}</div>
          <div className="text-sm text-white/80">Trees You Logged</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-3xl font-bold">{totalSessions}</div>
          <div className="text-sm text-white/80">Planting Sessions</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="text-3xl mb-2">💨</div>
          <div className="text-3xl font-bold">{formatNumber(co2Offset)}</div>
          <div className="text-sm text-white/80">kg CO₂/Year Offset</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="text-3xl mb-2">🌬️</div>
          <div className="text-3xl font-bold">{formatNumber(oxygenPerYear)}</div>
          <div className="text-sm text-white/80">kg O₂/Year Produced</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => setShowForm(!showForm)}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg disabled:opacity-50"
        >
          {showForm ? "✕ Close Form" : "🌱 Log Trees Planted"}
        </button>
        {entries.length > 0 && (
          <button
            onClick={loadEntries}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-full transition-colors disabled:opacity-50"
          >
            🔄 Refresh
          </button>
        )}
      </div>

      {/* Entry Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🌱</span>
            Log Your Trees
          </h3>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Number of Trees *
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.trees}
                onChange={(e) => setFormData({ ...formData, trees: e.target.value })}
                placeholder="e.g. 10"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Tree Species *
              </label>
              <select
                required
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {TREE_SPECIES.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.icon} {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Community *
              </label>
              <select
                required
                value={formData.community}
                onChange={(e) => setFormData({ ...formData, community: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {COMMUNITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Specific Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Near Lurambi Primary"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any details about this planting session..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg transition-colors shadow-lg disabled:opacity-50"
            >
              {loading ? "Saving..." : "🌳 Save Record"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Breakdown Charts */}
      {entries.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Species Breakdown */}
          {speciesBreakdown.length > 0 && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span>🌳</span> Species Breakdown
              </h3>
              <div className="space-y-3">
                {speciesBreakdown.map((s) => {
                  const percent = totalTrees > 0 ? (s.count / totalTrees) * 100 : 0;
                  return (
                    <div key={s.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <span>{s.icon}</span> {s.name}
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {formatNumber(s.count)} ({percent.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${s.color} rounded-full transition-all duration-500`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Community Breakdown */}
          {topCommunities.length > 0 && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span>🏘️</span> Top Communities
              </h3>
              <div className="space-y-3">
                {topCommunities.map(([community, count], idx) => {
                  const percent = totalTrees > 0 ? (count / totalTrees) * 100 : 0;
                  return (
                    <div key={community}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <span className="text-xs font-bold text-green-700 dark:text-green-400">
                            #{idx + 1}
                          </span>{" "}
                          {community}
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {formatNumber(count)} ({percent.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent Entries */}
      {entries.length > 0 ? (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>📋</span> Your Planting History
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {entries.map((entry) => {
              const speciesInfo = TREE_SPECIES.find((s) => s.name === entry.species);
              return (
                <div
                  key={entry.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-900 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                      speciesInfo?.color || "from-green-500 to-emerald-600"
                    } flex items-center justify-center text-white text-xl flex-shrink-0`}
                  >
                    {speciesInfo?.icon || "🌱"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {formatNumber(entry.trees)} {entry.trees === 1 ? "tree" : "trees"}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {formatDate(entry.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                      <span className="font-medium">{entry.species}</span> ·{" "}
                      {entry.community}
                      {entry.location && ` · ${entry.location}`}
                    </p>
                    {entry.notes && (
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 italic">
                        "{entry.notes}"
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    disabled={loading}
                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 disabled:opacity-50"
                    aria-label="Delete entry"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 p-12 rounded-2xl shadow-lg border-2 border-dashed border-gray-300 dark:border-slate-600 text-center">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No trees planted yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start tracking your environmental impact. Log your first tree planting session above.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-all hover:scale-105"
          >
            🌳 Plant Your First Tree
          </button>
        </div>
      )}

      {/* Info Note */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-300">
        <p className="flex items-start gap-2">
          <span>ℹ️</span>
          <span>
            <strong>Live data:</strong> Your tree planting records are stored in our database and accessible from any device. The impact stats update in real time.
          </span>
        </p>
      </div>
    </div>
  );
}