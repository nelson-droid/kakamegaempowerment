"use client";

import { useMemo, useState } from "react";

export type ThematicArea = "Governance" | "Climate Action" | "Land Rights" | "Human Rights";

export type Project = {
  id: string;
  title: string;
  description: string;
  thematicArea: ThematicArea;
  projectType: string;
  location: string;
  status: string;
  progress: number;
  trees: number;
  volunteers: number;
  startDate: string;
  image: string;
};

type ProjectsGridProps = {
  projects: Project[];
};

const PROJECT_TYPE_ICONS: Record<string, string> = {
  "forest restoration": "🌲",
  "school greening": "🏫",
  "river protection": "💧",
  "agroforestry": "🌾",
  "community gardens": "🌱",
  "governance training": "🏛️",
  "rights awareness": "⚖️",
  "youth empowerment": "🧑‍🤝‍🧑",
};

const THEME_FILTERS: Array<{ key: "all" | ThematicArea; label: string }> = [
  { key: "all", label: "All Projects" },
  { key: "Climate Action", label: "Climate Action" },
  { key: "Governance", label: "Governance" },
  { key: "Land Rights", label: "Land Rights" },
  { key: "Human Rights", label: "Human Rights" },
];

const THEME_BADGE_COLORS: Record<ThematicArea, string> = {
  "Climate Action":
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  "Governance":
    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  "Land Rights":
    "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
  "Human Rights":
    "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400",
};

const STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-500",
  planning: "bg-amber-500",
  completed: "bg-slate-400",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [filter, setFilter] = useState<"all" | ThematicArea>("all");

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project) => project.thematicArea === filter);
  }, [projects, filter]);

  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = { all: projects.length };
    for (const project of projects) {
      counts[project.thematicArea] = (counts[project.thematicArea] ?? 0) + 1;
    }
    return counts;
  }, [projects]);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {THEME_FILTERS.map(({ key, label }) => {
          const isActive = filter === key;
          const count = filterCounts[key] ?? 0;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                isActive
                  ? "bg-green-700 text-white border-green-700 shadow-md"
                  : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-green-600 hover:text-green-700 dark:hover:text-green-400"
              }`}
              aria-pressed={isActive}
            >
              {label}
              <span
                className={`ml-2 inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-xs ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Project Count */}
      <div className="text-center mb-8 text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredProjects.length} of {projects.length} projects
        {filter !== "all" && (
          <span>
            {" "}
            in <strong>{filter}</strong>
          </span>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const typeIcon = PROJECT_TYPE_ICONS[project.projectType] ?? "📁";
            const badgeColor = THEME_BADGE_COLORS[project.thematicArea];
            const statusColor = STATUS_COLORS[project.status] ?? STATUS_COLORS.active;
            return (
              <article
                key={project.id}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-slate-700 flex flex-col"
              >
                {/* Image / Placeholder */}
                <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-green-100 to-emerald-200 dark:from-slate-700 dark:to-slate-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-50 group-hover:scale-110 transition-transform duration-500">
                    {typeIcon}
                  </div>
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-800 dark:text-gray-200`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${statusColor}`}
                        aria-hidden="true"
                      />
                      {project.status === "active" ? "Active" : project.status}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-800 dark:text-gray-200">
                      {typeIcon} {project.projectType}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <span
                    className={`inline-block self-start px-3 py-1 text-xs font-semibold rounded-full mb-3 ${badgeColor}`}
                  >
                    {project.thematicArea}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-4">
                    {project.description}
                  </p>

                  {/* Location & Date */}
                  <div className="flex flex-col gap-1 mb-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true">📍</span>
                      <span className="truncate">{project.location}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true">📅</span>
                      Started {formatDate(project.startDate)}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Progress
                      </span>
                      <span className="font-semibold text-green-700 dark:text-green-400">
                        {project.progress}%
                      </span>
                    </div>
                    <div
                      className="h-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={project.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mt-auto text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-slate-700">
                    {project.trees > 0 && (
                      <span className="inline-flex items-center gap-1" title="Trees planted">
                        🌳 {project.trees.toLocaleString()}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1" title="Volunteers">
                      🙋 {project.volunteers} volunteers
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            We don&apos;t have any active projects in this category right now. Try another
            thematic area or check back soon.
          </p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-colors"
          >
            View All Projects
          </button>
        </div>
      )}
    </div>
  );
}
