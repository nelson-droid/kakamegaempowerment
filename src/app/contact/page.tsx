import type { Metadata } from "next";
import { Navigation, Footer, SectionHeading, ContactSection, ContactForm } from "@/components/ui";
import { ORGANIZATION } from "@/lib/organization";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Kakamega Empowerment CBO. Phone, email, and physical address for our offices in Kakamega, Kenya.",
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span>📧</span>
              <span className="text-white/90 text-sm font-medium">Get in Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
              Have questions or want to connect? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* CONTACT INFO + FORM */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Reach Out"
              title="Let's Connect"
              description="Whether you have questions, partnership inquiries, or want to support our work, we're here to listen."
            />

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
              <ContactSection>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Send Us a Message
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                  <ContactForm />
                </div>
              </ContactSection>
            </div>
          </div>
        </section>

        {/* ADDITIONAL INFO */}
        <section className="py-20 md:py-32 bg-gray-50 dark:bg-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Working With Us"
              title="How to Engage With Kakamega Empowerment CBO"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Partner With Us
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We welcome partnerships with government, NGOs, civil society, and the private
                  sector.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-3">📰</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Media Inquiries
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  For media inquiries and interviews, please reach out via email.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Research Collaboration
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We collaborate with researchers working on community empowerment in Kenya.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}