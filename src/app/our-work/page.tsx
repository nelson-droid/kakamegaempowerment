import type { Metadata } from "next";
import Link from "next/link";
import { Navigation, Footer, SectionHeading } from "@/components/ui";
import { THEMATIC_AREAS } from "@/lib/organization";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore Kakamega Empowerment CBO's four strategic thematic areas: Governance & Advocacy, Climate Action, Land Rights, and Human Rights.",
};

export default function OurWorkPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span>🇰🇪</span>
              <span className="text-white/90 text-sm font-medium">Kakamega County, Kenya</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Our Work
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              We work across four strategic thematic areas to build empowered, just, and
              climate-resilient communities in Kakamega County.
            </p>
          </div>
        </section>

        {/* THEMATIC AREAS */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Strategic Thematic Areas"
              title="Four Pillars of Change"
              description="Our work is organized around four interconnected thematic areas that address the root causes of inequality and exclusion in Kakamega County."
            />

            <div className="space-y-16">
              {THEMATIC_AREAS.map((area, index) => (
                <div
                  key={area.title}
                  id={area.title.toLowerCase().replace(/\s+/g, "-")}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center text-3xl shadow-lg`}
                      >
                        {area.icon}
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {area.title}
                      </h2>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {area.description}
                    </p>

                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                        Key Activities
                      </h3>
                      <ul className="space-y-2">
                        {area.activities.map((activity) => (
                          <li
                            key={activity}
                            className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                          >
                            <svg
                              className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={area.href}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors shadow-lg"
                    >
                      Learn More
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>

                  <div
                    className={`bg-gradient-to-br ${area.color} rounded-3xl p-12 text-white flex items-center justify-center min-h-[300px] ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-8xl mb-4">{area.icon}</div>
                      <p className="text-xl font-bold">{area.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TARGET BENEFICIARIES */}
        <section className="py-20 md:py-32 bg-gray-50 dark:bg-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Who We Serve"
              title="Our Target Beneficiaries"
              description="We work with and for communities across Kakamega County, with a focus on marginalized and vulnerable groups."
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "👩", title: "Women & Girls" },
                { icon: "🧑‍🎓", title: "Youth" },
                { icon: "🤱", title: "Widows" },
                { icon: "♿", title: "Persons with Disabilities" },
                { icon: "🌾", title: "Smallholder Farmers" },
                { icon: "🧑‍🤝‍🧑", title: "Community Leaders" },
                { icon: "🤲", title: "Marginalized Communities" },
                { icon: "🏘️", title: "Civil Society Groups" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white dark:bg-slate-700 rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-100 dark:border-slate-600"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Get Involved in Our Work
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Whether you want to volunteer, partner, or simply learn more, there are many ways to
              support our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                🙋 Volunteer With Us
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-700 text-white font-bold rounded-full hover:bg-green-600 transition-colors border border-white/30"
              >
                📧 Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}