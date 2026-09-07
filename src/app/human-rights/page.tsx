import type { Metadata } from "next";
import Link from "next/link";
import { Navigation, Footer, SectionHeading } from "@/components/ui";
import { TARGET_BENEFICIARIES } from "@/lib/organization";

export const metadata: Metadata = {
  title: "Human Rights & Social Justice",
  description:
    "Every person deserves dignity, equality and justice. Learn about Kakamega Empowerment CBO's work on human rights, gender equality, and social inclusion.",
};

export default function HumanRightsPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-pink-900 via-pink-800 to-rose-700 text-white overflow-hidden">
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
              <span>🤝</span>
              <span className="text-white/90 text-sm font-medium">Human Rights & Social Justice</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Every Person Deserves Dignity, Equality and Justice.
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              We advance human rights, gender equality, social inclusion, access to justice, and
              peaceful coexistence across Kakamega County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#rights-inclusion"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-colors shadow-lg"
              >
                Learn Your Rights
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full transition-colors border border-white/30"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </section>

        {/* RIGHTS & INCLUSION */}
        <section id="rights-inclusion" className="py-20 md:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Rights & Inclusion"
              title="What We Work On"
              description="Our human rights initiatives promote dignity, equality, and justice for all community members."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🛡️",
                  title: "Human Rights",
                  description:
                    "Promoting and protecting the fundamental rights and freedoms of all community members.",
                },
                {
                  icon: "⚧️",
                  title: "Gender Equality",
                  description:
                    "Advancing equal rights, opportunities, and participation for all genders.",
                },
                {
                  icon: "🤝",
                  title: "Social Inclusion",
                  description:
                    "Ensuring marginalized and vulnerable groups are included in development processes.",
                },
                {
                  icon: "👩",
                  title: "Women's Rights",
                  description:
                    "Empowering women to claim their rights and participate in leadership.",
                },
                {
                  icon: "♿",
                  title: "Vulnerable Groups",
                  description:
                    "Protecting the rights of persons with disabilities, widows, and other vulnerable groups.",
                },
                {
                  icon: "⚖️",
                  title: "Access to Justice",
                  description:
                    "Supporting communities to access fair and timely justice systems.",
                },
                {
                  icon: "💬",
                  title: "Community Dialogue",
                  description:
                    "Facilitating dialogue to resolve conflicts and promote understanding.",
                },
                {
                  icon: "🕊️",
                  title: "Peaceful Coexistence",
                  description:
                    "Building cultures of peace and non-violence in our communities.",
                },
                {
                  icon: "📢",
                  title: "Reporting Violations",
                  description:
                    "Providing pathways for reporting human rights violations and seeking redress.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-slate-700"
                >
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-2xl mb-4">
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

        {/* TARGET BENEFICIARIES */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-slate-800 dark:to-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Who We Serve"
              title="Target Beneficiaries"
              description="Our human rights work centers communities that are often left behind or excluded."
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {TARGET_BENEFICIARIES.map((item) => (
                <div
                  key={item.label}
                  className="bg-white dark:bg-slate-700 rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-100 dark:border-slate-600"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <p className="font-semibold text-gray-900 dark:text-white">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REPORTING */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-4 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 rounded-full text-sm font-semibold mb-4">
              Report a Violation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Your Voice Counts
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              If you or someone you know has experienced a human rights violation, we can help
              connect you with the right support and reporting channels.
            </p>
            <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-700 rounded-2xl p-8">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Contact Us</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Reach out to us at:
              </p>
              <div className="space-y-2">
                <p className="text-gray-900 dark:text-white">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:Kakamegaempowerment1@gmail.com" className="text-green-700 dark:text-green-400 hover:underline">
                    Kakamegaempowerment1@gmail.com
                  </a>
                </p>
                <p className="text-gray-900 dark:text-white">
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+254703456604" className="text-green-700 dark:text-green-400 hover:underline">
                    +254 703 456 604
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-pink-600 to-rose-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Stand for Human Rights
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Join us in building a just and inclusive Kakamega County where every person can
              thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-pink-800 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                🙋 Volunteer
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-pink-700 text-white font-bold rounded-full hover:bg-pink-600 transition-colors border border-white/30"
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