import type { Metadata } from "next";
import Link from "next/link";
import { Navigation, Footer, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Be Part of the Change. Volunteer, plant a tree, partner with us, or join a community activity with Kakamega Empowerment CBO.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6">
              <img
                src="/kakamega-empowerment-logo-transparent.png"
                alt="Kakamega Empowerment"
                className="w-32 h-32 mx-auto object-contain"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Be Part of the Change.
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              There are many ways to get involved with our work — from volunteering your time to
              planting trees to partnering with us on programs.
            </p>
          </div>
        </section>

        {/* OPTIONS */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="How to Get Involved"
              title="Choose Your Way to Make a Difference"
              description="Every form of engagement strengthens our work and our communities."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🙋",
                  title: "Volunteer",
                  description:
                    "Join our volunteer team and contribute your time and skills to our programs.",
                  href: "/volunteer",
                  cta: "Sign Up",
                  color: "from-green-500 to-emerald-600",
                },
                {
                  icon: "📅",
                  title: "Join a Community Activity",
                  description:
                    "Attend our events, trainings, and community forums to engage with our work.",
                  href: "/events",
                  cta: "View Events",
                  color: "from-blue-500 to-cyan-600",
                },
                {
                  icon: "🌳",
                  title: "Plant a Tree",
                  description:
                    "Contribute to our climate action by logging and tracking trees you plant.",
                  href: "/trees",
                  cta: "Start Tracking",
                  color: "from-green-500 to-teal-600",
                },
                {
                  icon: "🤝",
                  title: "Partner With Us",
                  description:
                    "Collaborate with us on programs, research, or community initiatives.",
                  href: "#partner",
                  cta: "Inquire",
                  color: "from-amber-500 to-orange-600",
                },
                {
                  icon: "📚",
                  title: "Access Resources",
                  description:
                    "Use our educational materials and toolkits in your community work.",
                  href: "/resources",
                  cta: "Browse",
                  color: "from-purple-500 to-pink-600",
                },
                {
                  icon: "📢",
                  title: "Spread the Word",
                  description:
                    "Share our work with your networks and amplify our community impact.",
                  href: "/contact",
                  cta: "Contact Us",
                  color: "from-pink-500 to-rose-600",
                },
                {
                  icon: "💚",
                  title: "Donate",
                  description:
                    "Support our programs with a secure donation via card or M-Pesa.",
                  href: "/donations",
                  cta: "Donate Now",
                  color: "from-green-600 to-emerald-700",
                },
              ].map((option) => (
                <Link
                  key={option.title}
                  href={option.href}
                  className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 border border-gray-100 dark:border-slate-700"
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${option.color} rounded-t-2xl`}
                  />
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 text-sm">
                    {option.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold text-sm">
                    {option.cta}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNERSHIP INQUIRY */}
        <section id="partner" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold mb-4">
                Partner With Us
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Let's Build Together
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Interested in partnering with Kakamega Empowerment CBO? We'd love to hear from you.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-xl p-8 md:p-12">
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
                Reach out to us at{" "}
                <a
                  href="mailto:Kakamegaempowerment1@gmail.com"
                  className="text-green-700 dark:text-green-400 font-semibold hover:underline"
                >
                  Kakamegaempowerment1@gmail.com
                </a>{" "}
                or call{" "}
                <a
                  href="tel:+254703456604"
                  className="text-green-700 dark:text-green-400 font-semibold hover:underline"
                >
                  +254 703 456 604
                </a>{" "}
                to discuss partnership opportunities.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                {[
                  { title: "Government", icon: "🏛️" },
                  { title: "NGOs & CSOs", icon: "🤝" },
                  { title: "Private Sector", icon: "💼" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-4 bg-green-50 dark:bg-slate-600 rounded-xl"
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Your Engagement Matters
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Whether as a volunteer, partner, or supporter, your contribution makes our work
              possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                🙋 Volunteer Now
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