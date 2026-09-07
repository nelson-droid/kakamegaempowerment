import type { Metadata } from "next";
import { Navigation, Footer, SectionHeading, ValueCard } from "@/components/ui";
import { ORGANIZATION, CORE_VALUES, KAKAMEGA_SUB_COUNTIES } from "@/lib/organization";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Kakamega Empowerment CBO - a community-based organization empowering communities across Kakamega County through advocacy, climate action, land rights protection, and social justice.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span>🇰🇪</span>
              <span className="text-white/90 text-sm font-medium">About Kakamega Empowerment CBO</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering Communities. Advancing Rights. Transforming Lives.
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              Kakamega Empowerment CBO works across Kakamega County to promote social justice,
              accountable governance, environmental sustainability, community rights, and inclusive
              development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#our-story"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-colors shadow-lg"
              >
                Our Story
              </a>
              <a
                href="/get-involved"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full transition-colors border border-white/30"
              >
                Get Involved
              </a>
            </div>
          </div>
        </section>

        {/* OUR STORY */}
        <section id="our-story" className="py-20 md:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
                  Our Story
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Empowering Marginalized & Vulnerable Communities
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>
                    Kakamega Empowerment CBO is a community-based organization that works across
                    Kakamega County in Western Kenya. We exist to empower marginalized and
                    vulnerable communities to participate in shaping their own development and to
                    claim their rights.
                  </p>
                  <p>
                    Our work focuses on five strategic objectives: governance and accountability,
                    climate resilience, land rights and justice, human rights and inclusion, and
                    social cohesion. Through these areas, we address the root causes of inequality
                    and exclusion.
                  </p>
                  <p>
                    We believe that lasting change happens when communities are empowered to take
                    ownership of their development journey. That is why we prioritize community
                    participation, capacity building, and grassroots engagement in all our
                    programs.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "👥", title: "Community", color: "from-green-500 to-emerald-600" },
                  { icon: "🌍", title: "Environment", color: "from-blue-500 to-cyan-600" },
                  { icon: "⚖️", title: "Justice", color: "from-amber-500 to-orange-600" },
                  { icon: "💪", title: "Empowerment", color: "from-pink-500 to-rose-600" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`p-8 bg-gradient-to-br ${item.color} rounded-2xl text-white text-center hover:scale-105 transition-transform`}
                  >
                    <div className="text-5xl mb-3">{item.icon}</div>
                    <p className="font-bold">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="py-20 md:py-32 bg-gray-50 dark:bg-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="What Drives Us"
              title="Vision & Mission"
              description="The guiding principles that shape our work and impact across Kakamega County."
            />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative group p-10 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 border-2 border-green-200 dark:border-slate-500 hover:shadow-xl transition-all">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-2xl" />
                <div className="text-6xl mb-4">🌟</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">
                  {ORGANIZATION.vision}
                </p>
              </div>

              <div className="relative group p-10 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-700 dark:to-slate-600 border-2 border-amber-200 dark:border-slate-500 hover:shadow-xl transition-all">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-t-2xl" />
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">
                  {ORGANIZATION.mission}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section id="values" className="py-20 md:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Our Core Values"
              title="What We Stand For"
              description="The values that guide our actions, decisions, and relationships with the communities we serve."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {CORE_VALUES.map((value) => (
                <ValueCard
                  key={value.title}
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* WHERE WE WORK */}
        <section id="where-we-work" className="py-20 md:py-32 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Our Reach"
              title="Where We Work"
              description="Kakamega Empowerment CBO operates across all twelve sub-counties of Kakamega County, prioritizing rural and underserved communities."
            />

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">📍</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  All Twelve Sub-Counties
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Kakamega County, Western Kenya
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {KAKAMEGA_SUB_COUNTIES.map((subcounty) => (
                  <div
                    key={subcounty}
                    className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded-lg text-center hover:shadow-md transition-shadow border border-green-100 dark:border-slate-600"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {subcounty}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
                <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                  <strong>Priority:</strong> Rural and underserved communities across all twelve
                  sub-counties
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Join Our Movement
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Together, we can build a just, inclusive, climate-resilient, and empowered society in
              Kakamega County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/our-work"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                Our Work
              </a>
              <a
                href="/get-involved"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-700 text-white font-bold rounded-full hover:bg-green-600 transition-colors border border-white/30"
              >
                Get Involved
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}