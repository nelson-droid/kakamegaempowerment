/**
 * Tree Planting Tracker Page
 * Interactive tree planting logging and tracking system
 */

import type { Metadata } from "next";
import TreePlantingTracker from "@/components/TreePlantingTracker";
import Link from "next/link";
import { Navigation, Footer } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tree Planting Tracker",
  description:
    "Track your trees planted in Kakamega County. Log your environmental impact and watch your contribution grow.",
};

export default function TreesPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span>🌳</span>
              <span className="text-white/90 text-sm font-medium">Tree Planting</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Tree Planting Tracker
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Every tree you plant makes a difference. Log your trees, track your impact,
              and watch your contribution to Kakamega grow.
            </p>
          </div>
        </section>

      {/* Tracker Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <TreePlantingTracker />
      </section>

      {/* Environmental Info */}
      <section className="bg-green-50 dark:bg-green-900/20 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Trees Matter
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
              <div className="text-3xl mb-3">💨</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Clean Air
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                One mature tree absorbs ~22kg of CO₂ per year and releases enough oxygen
                for 2 people to breathe.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
              <div className="text-3xl mb-3">💧</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Water Conservation
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Trees help recharge groundwater, prevent soil erosion, and protect our rivers
                and streams.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Wildlife Habitat
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Every tree provides food and shelter for birds, insects, and other wildlife
                that call Kakamega home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Join our community tree planting events and help us reach our goal of
            planting thousands of trees in Kakamega County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-all hover:scale-105"
            >
              📅 View Upcoming Events
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-semibold rounded-full transition-colors"
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
