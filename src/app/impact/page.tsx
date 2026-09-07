import type { Metadata } from "next";
import Link from "next/link";
import { Navigation, Footer, SectionHeading } from "@/components/ui";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "See the real impact of Kakamega Empowerment CBO's work across Kakamega County in governance, climate action, land rights, and human rights.",
};

async function getImpactData() {
  try {
    const [treeStats, volunteerCount, projectCount, eventCount] = await Promise.all([
      prisma.treeEntry.aggregate({ _sum: { trees: true } }),
      prisma.volunteer.count({ where: { status: "approved" } }),
      prisma.project.count(),
      prisma.event.count(),
    ]);

    return {
      treesPlanted: treeStats._sum.trees || 0,
      volunteers: volunteerCount,
      projects: projectCount,
      events: eventCount,
    };
  } catch {
    return { treesPlanted: 0, volunteers: 0, projects: 0, events: 0 };
  }
}

export default async function ImpactPage() {
  const stats = await getImpactData();

  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span>📊</span>
              <span className="text-white/90 text-sm font-medium">Real Impact, Real Change</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Our Impact
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              Every tree planted, every volunteer engaged, every community reached represents real
              people making real change across Kakamega County.
            </p>
          </div>
        </section>

        {/* DYNAMIC IMPACT STATS */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Impact Dashboard"
              title="Growing Together"
              description="Our impact is driven by real data from our programs and community activities."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🌳",
                  value: stats.treesPlanted > 0 ? stats.treesPlanted.toLocaleString() : "Data coming soon",
                  label: "Trees Planted",
                  color: "from-green-500 to-emerald-600",
                  available: stats.treesPlanted > 0,
                },
                {
                  icon: "🙋",
                  value: stats.volunteers > 0 ? stats.volunteers.toLocaleString() : "Data coming soon",
                  label: "Active Volunteers",
                  color: "from-blue-500 to-cyan-600",
                  available: stats.volunteers > 0,
                },
                {
                  icon: "📁",
                  value: stats.projects > 0 ? stats.projects.toString() : "Data coming soon",
                  label: "Active Projects",
                  color: "from-purple-500 to-pink-600",
                  available: stats.projects > 0,
                },
                {
                  icon: "📅",
                  value: stats.events > 0 ? stats.events.toString() : "Data coming soon",
                  label: "Events Hosted",
                  color: "from-amber-500 to-orange-600",
                  available: stats.events > 0,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="relative p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 text-center"
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.color} rounded-t-2xl`}
                  />
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                  {!stat.available && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      Data being compiled
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT AREAS */}
        <section className="py-20 md:py-32 bg-gray-50 dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Where We Make Change"
              title="Impact Across Four Areas"
              description="Our work spans four interconnected thematic areas, each contributing to a just, inclusive, and climate-resilient society."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🏛️",
                  title: "Governance",
                  color: "from-blue-500 to-cyan-600",
                  href: "/governance",
                  description: "Citizen participation, accountability, and civic engagement",
                },
                {
                  icon: "🌱",
                  title: "Climate",
                  color: "from-green-500 to-emerald-600",
                  href: "/climate-action",
                  description: "Tree planting, ecosystem restoration, climate resilience",
                },
                {
                  icon: "⚖️",
                  title: "Land Rights",
                  color: "from-amber-500 to-orange-600",
                  href: "/land-rights",
                  description: "Community land rights, property rights, dispute resolution",
                },
                {
                  icon: "🤝",
                  title: "Human Rights",
                  color: "from-pink-500 to-rose-600",
                  href: "/human-rights",
                  description: "Gender equality, social inclusion, access to justice",
                },
              ].map((area) => (
                <Link
                  key={area.title}
                  href={area.href}
                  className="group bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-slate-600"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {area.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* OUR IMPACT STORY */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionHeading
              eyebrow="Our Story"
              title="Building Impact Together"
              description="Our impact is measured not just in numbers, but in the lives changed and communities strengthened."
            />

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 md:p-12">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Since our founding, Kakamega Empowerment CBO has been working to build a more just,
                inclusive, and climate-resilient Kakamega County. Our impact is driven by the
                communities we serve — every tree planted, every civic forum held, every land rights
                dispute resolved represents real people taking action for their communities.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We are committed to transparency and accountability in measuring and reporting our
                impact. As our programs grow and evolve, so will our impact data.
              </p>
            </div>

            <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <strong>Our impact is growing</strong> — detailed impact metrics are being compiled.
                Connect with us to learn more about our programs and outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Be Part of Our Growing Impact
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Every contribution strengthens our ability to create lasting change in Kakamega County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                🙋 Volunteer
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-700 text-white font-bold rounded-full hover:bg-green-600 transition-colors border border-white/30"
              >
                📧 Partner With Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}