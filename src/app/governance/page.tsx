import type { Metadata } from "next";
import Link from "next/link";
import { Navigation, Footer, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Governance & Civic Engagement",
  description:
    "Your voice matters. Learn how Kakamega Empowerment CBO promotes governance, civic engagement, public participation, and accountability across Kakamega County.",
};

export default function GovernancePage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white overflow-hidden">
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
              <span>🏛️</span>
              <span className="text-white/90 text-sm font-medium">Governance & Advocacy</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Voice Matters. Your Participation Matters.
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              We promote citizen participation, civic education, budget advocacy, and government
              accountability to strengthen democratic governance in Kakamega County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-colors shadow-lg"
              >
                Join a Civic Forum
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full transition-colors border border-white/30"
              >
                Learn Your Rights
              </Link>
            </div>
          </div>
        </section>

        {/* CIVIC PARTICIPATION JOURNEY */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Civic Participation Journey"
              title="From Awareness to Action"
              description="A citizen's path to meaningful participation in governance."
            />

            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 -translate-y-1/2" />

              <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  { step: 1, icon: "📚", title: "Learn", description: "Civic education on rights and responsibilities" },
                  { step: 2, icon: "🤝", title: "Participate", description: "Engage in public forums and consultations" },
                  { step: 3, icon: "👁️", title: "Monitor", description: "Track government service delivery" },
                  { step: 4, icon: "📢", title: "Advocate", description: "Raise community voices on key issues" },
                  { step: 5, icon: "⚖️", title: "Accountability", description: "Hold institutions accountable" },
                ].map((item) => (
                  <div key={item.step} className="relative">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow text-center relative z-10">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-3xl mb-4">
                        {item.icon}
                      </div>
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {item.step}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* KEY FOCUS AREAS */}
        <section className="py-20 md:py-32 bg-gray-50 dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Our Governance Work"
              title="What We Focus On"
              description="Our governance and advocacy initiatives aim to strengthen citizen participation and promote transparent, accountable governance."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "👥",
                  title: "Citizen Participation",
                  description:
                    "Ensuring citizens actively participate in governance decisions that affect their lives.",
                },
                {
                  icon: "📊",
                  title: "Budget Advocacy",
                  description:
                    "Promoting transparent and accountable use of public resources through budget monitoring.",
                },
                {
                  icon: "🏢",
                  title: "Service Delivery Monitoring",
                  description:
                    "Tracking government services to ensure they meet community needs.",
                },
                {
                  icon: "📋",
                  title: "Public Participation",
                  description:
                    "Facilitating meaningful participation in planning, budgeting, and policy processes.",
                },
                {
                  icon: "👩‍💼",
                  title: "Youth Leadership",
                  description:
                    "Building the next generation of civic leaders through training and mentorship.",
                },
                {
                  icon: "👩‍💼",
                  title: "Women's Leadership",
                  description:
                    "Empowering women to participate in governance and leadership positions.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-slate-600"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-2xl mb-4">
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

        {/* CTA */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Make Your Voice Heard
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Active citizenship is the foundation of good governance. Learn your rights and get
              involved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-800 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-600 transition-colors border border-white/30"
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