import type { Metadata } from "next";
import { Navigation, Footer, SectionHeading } from "@/components/ui";
import TreePlantingTracker from "@/components/TreePlantingTracker";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Climate Action",
  description:
    "Growing a greener, more resilient Kakamega. Join Kakamega Empowerment CBO's climate action initiatives including tree planting, ecosystem restoration, and watershed protection.",
};

export default function ClimateActionPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span>🌱</span>
              <span className="text-white/90 text-sm font-medium">Climate Action Initiative</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Growing a Greener, More Resilient Kakamega
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              Building climate resilience through tree planting, ecosystem restoration, climate
              awareness, climate-smart agriculture, water conservation, and watershed protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#tracker"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-colors shadow-lg"
              >
                🌳 Plant a Tree
              </a>
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full transition-colors border border-white/30"
              >
                Join a Community Activity
              </Link>
            </div>
          </div>
        </section>

        {/* KEY AREAS */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Our Climate Work"
              title="Building Climate Resilience"
              description="Through targeted climate action initiatives, we empower communities to adapt to and mitigate the impacts of climate change."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🌳",
                  title: "Tree Planting",
                  description:
                    "Restoring degraded landscapes through community-driven tree planting and native species conservation.",
                  color: "from-green-500 to-emerald-600",
                },
                {
                  icon: "🌍",
                  title: "Ecosystem Restoration",
                  description:
                    "Protecting and restoring watersheds, forests, and other vital ecosystems.",
                  color: "from-emerald-500 to-teal-600",
                },
                {
                  icon: "📚",
                  title: "Climate Awareness",
                  description:
                    "Educating communities on climate change, adaptation, and sustainable practices.",
                  color: "from-blue-500 to-cyan-600",
                },
                {
                  icon: "🌾",
                  title: "Climate-Smart Agriculture",
                  description:
                    "Supporting smallholder farmers with sustainable agricultural practices.",
                  color: "from-amber-500 to-orange-600",
                },
                {
                  icon: "💧",
                  title: "Water Conservation",
                  description:
                    "Protecting water resources through conservation, harvesting, and management.",
                  color: "from-cyan-500 to-blue-600",
                },
                {
                  icon: "🏞️",
                  title: "Watershed Protection",
                  description:
                    "Safeguarding critical watersheds that supply water to our communities.",
                  color: "from-teal-500 to-green-600",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group relative p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-slate-700"
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.color} rounded-t-2xl`}
                  />
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TREE TRACKER */}
        <section id="tracker" className="py-20 md:py-32 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
                Tree Planting Tracker
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Track Your Climate Action
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Log your tree planting sessions, see your environmental impact, and join thousands
                of others making a difference across Kakamega County.
              </p>
            </div>

            <TreePlantingTracker />
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Plant With Us
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Every tree you plant contributes to a greener, more climate-resilient Kakamega.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                🙋 Join a Planting Event
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-700 text-white font-bold rounded-full hover:bg-green-600 transition-colors border border-white/30"
              >
                📅 View Upcoming Events
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}