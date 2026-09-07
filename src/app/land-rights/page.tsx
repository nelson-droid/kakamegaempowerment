import type { Metadata } from "next";
import Link from "next/link";
import { Navigation, Footer, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Land Rights & Justice",
  description:
    "Protecting land rights and defending community justice. Learn about Kakamega Empowerment CBO's work on land rights, property rights, and dispute resolution.",
};

export default function LandRightsPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-amber-800 via-amber-700 to-orange-700 text-white overflow-hidden">
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
              <span>⚖️</span>
              <span className="text-white/90 text-sm font-medium">Land Rights & Justice</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Protecting Land Rights. Defending Community Justice.
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              We work to promote community land rights, property rights, inheritance rights, and
              transparent land administration for vulnerable groups across Kakamega County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#know-your-rights"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-colors shadow-lg"
              >
                Know Your Rights
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full transition-colors border border-white/30"
              >
                Get Support
              </Link>
            </div>
          </div>
        </section>

        {/* KEY AREAS */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Our Land Rights Work"
              title="Building a Just Land System"
              description="Through awareness, education, and support, we help communities understand and defend their land rights."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🌍",
                  title: "Community Land Rights",
                  description: "Supporting communities to understand and claim their collective land rights.",
                },
                {
                  icon: "🏡",
                  title: "Property Rights",
                  description: "Helping individuals understand and protect their property rights.",
                },
                {
                  icon: "📜",
                  title: "Inheritance Rights",
                  description: "Promoting awareness of inheritance rights, especially for widows and children.",
                },
                {
                  icon: "👩‍⚖️",
                  title: "Support for Widows",
                  description: "Protecting the land rights of widows and other vulnerable groups.",
                },
                {
                  icon: "📚",
                  title: "Land Law Awareness",
                  description: "Educating communities on land laws, policies, and procedures.",
                },
                {
                  icon: "🤝",
                  title: "Dispute Resolution",
                  description: "Facilitating peaceful resolution of land-related disputes.",
                },
                {
                  icon: "🏛️",
                  title: "Transparent Administration",
                  description: "Promoting transparency in land administration processes.",
                },
                {
                  icon: "💼",
                  title: "Equitable Access",
                  description: "Advocating for equitable access to land and natural resources.",
                },
                {
                  icon: "📢",
                  title: "Reporting Pathways",
                  description: "Connecting communities to channels for reporting rights violations.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-slate-700"
                >
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-2xl mb-4">
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

        {/* KNOW YOUR RIGHTS */}
        <section
          id="know-your-rights"
          className="py-20 md:py-32 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold mb-4">
                Know Your Rights
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Understanding Your Land Rights
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Key resources and information to help you understand your land rights under Kenyan
                law.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Land Rights Awareness",
                  description:
                    "Know your rights as a landowner, tenant, or community member under the Constitution of Kenya and the Land Act.",
                  icon: "📘",
                },
                {
                  title: "Legal Information",
                  description:
                    "Access information on land registration, titling, transfers, and other legal processes.",
                  icon: "⚖️",
                },
                {
                  title: "Community Forums",
                  description:
                    "Join community forums and dialogues on land rights, dispute resolution, and equitable access.",
                  icon: "🤝",
                },
                {
                  title: "Reporting Pathways",
                  description:
                    "Learn about the formal and informal channels for reporting land rights violations.",
                  icon: "📢",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">ℹ️</div>
                <div>
                  <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 mb-2">
                    Important Note
                  </h3>
                  <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                    Kakamega Empowerment CBO is a community-based organization, not a law firm.
                    We provide education, awareness, and support on land rights, but we do not
                    provide legal representation. For complex legal matters, please consult a
                    qualified legal professional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Need Support on Land Rights?
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Reach out to learn more about our land rights awareness programs and community
              forums.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-amber-800 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-700 text-white font-bold rounded-full hover:bg-amber-600 transition-colors border border-white/30"
              >
                Access Resources
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}