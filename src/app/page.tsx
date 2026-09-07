/**
 * KAKAMEGA EMPOWERMENT CBO — HOME PAGE
 * "Empowering Communities, Advancing Rights, Transforming Lives"
 *
 * Animations: scroll-triggered fade-ins, animated counters, parallax hero
 * Photos: Unsplash stock images throughout for visual diversity
 */

import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AnimateIn } from "@/components/ScrollAnimationProvider";
import { Navigation, Footer } from "@/components/ui";
import { STOCK_IMAGES, StockImage } from "@/components/ui/StockImage";
import { ORGANIZATION, THEMATIC_AREAS, STRATEGIC_OBJECTIVES } from "@/lib/organization";
import { BLOG_POSTS } from "@/lib/blog-posts";
import prisma from "@/lib/prisma";

// ============================================================
// DATA FETCHING
// ============================================================

async function getHomeData() {
  try {
    const [events, projects, stories] = await Promise.all([
      prisma.event.findMany({
        where: { date: { gte: new Date() }, isActive: true },
        orderBy: { date: "asc" },
        take: 3,
      }),
      prisma.project.findMany({
        where: { status: "active" },
        orderBy: { progress: "desc" },
        take: 3,
      }),
      prisma.story.findMany({
        where: { isFeatured: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
    ]);
    return {
      events: events.map((e) => ({
        id: e.id,
        title: e.title,
        date: e.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        time: e.time,
        location: e.location,
        spots: e.spots,
        registered: e.registered,
        type: e.type,
      })),
      projects: projects.map((p) => ({
        id: p.id,
        title: p.title,
        location: p.location,
        description: p.description,
        progress: p.progress,
        trees: p.trees,
        volunteers: p.volunteers,
        type: p.type,
      })),
      stories: stories.map((s) => ({
        id: s.id,
        title: s.title,
        content: s.content,
        authorName: s.authorName,
        authorRole: s.authorRole,
      })),
    };
  } catch {
    return { events: [], projects: [], stories: [] };
  }
}

// ============================================================
// DECORATIVE SVG LEAF
// ============================================================
function LeafSVG({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor">
      <path d="M50 5 C20 15 10 40 15 65 C18 78 28 90 40 95 C30 85 22 70 20 55 C18 35 30 20 50 15 C65 12 80 18 88 30 C96 42 97 60 90 75 C83 88 70 97 55 98 C70 92 82 78 87 62 C92 46 88 28 78 18 C65 5 45 0 30 5 C38 3 44 4 50 5Z" />
    </svg>
  );
}

// ============================================================
// STATS BAR
// ============================================================
const STATS = [
  { value: 48000, label: "Trees Planted", suffix: "+", icon: "🌱" },
  { value: 48, label: "Active Projects", suffix: "", icon: "📍" },
  { value: 1200, label: "Community Members", suffix: "+", icon: "👥" },
  { value: 12, label: "Sub-Counties", suffix: "", icon: "🗺️" },
];

// ============================================================
// PAGE
// ============================================================

export default async function Home() {
  const data = await getHomeData();

  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">

        {/* ══════════════════════════════════════════════════════
            HERO — animated, full-viewport with stock photo + overlay
        ══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
          {/* Background photo */}
          <div className="absolute inset-0 z-0">
            <Image
              src={STOCK_IMAGES.kenya}
              alt="Kakamega County landscape"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              style={{ opacity: 0.45 }}
            />
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-green-950/80 via-green-900/60 to-emerald-800/70" />
          {/* Animated floating leaves */}
          <LeafSVG className="leaf-decoration animate-float-slow w-32 h-32 text-green-300 top-16 left-8 md:top-24 md:left-16 opacity-20" />
          <LeafSVG className="leaf-decoration animate-float w-24 h-24 text-green-200 bottom-24 right-12 md:bottom-32 md:right-24 opacity-15" />
          <LeafSVG className="leaf-decoration animate-float-slow w-20 h-20 text-emerald-300 top-32 right-1/4 opacity-10" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/25 animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              <span className="text-yellow-300 text-lg">🇰🇪</span>
              <span className="text-white/90 text-sm font-medium">
                Kakamega County, Kenya — Serving 12 Sub-Counties
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-up"
              style={{ animationDelay: "400ms" }}
            >
              <span className="block">Empowering Communities.</span>
              <span className="block text-green-300">Advancing Rights.</span>
              <span className="block text-yellow-300">Transforming Lives.</span>
            </h1>

            <p
              className="text-lg sm:text-xl md:text-2xl text-white/85 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-up"
              style={{ animationDelay: "600ms" }}
            >
              {ORGANIZATION.description}
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up"
              style={{ animationDelay: "800ms" }}
            >
              <Link
                href="/our-work"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-lg rounded-full transition-all hover:scale-105 shadow-2xl animate-pulse-glow"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Our Work
              </Link>
              <Link
                href="/get-involved"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-lg rounded-full transition-all hover:scale-105 border border-white/30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Get Involved
              </Link>
              <Link
                href="/map"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-lg rounded-full transition-all hover:scale-105 border border-white/30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                View Map
              </Link>
            </div>

            {/* Animated scroll indicator */}
            <div
              className="animate-fade-up"
              style={{ animationDelay: "1200ms" }}
            >
              <a
                href="#stats"
                className="inline-flex flex-col items-center text-white/60 hover:text-white transition-colors gap-1 group"
              >
                <span className="text-sm font-medium">Scroll to explore</span>
                <svg
                  className="w-6 h-6 animate-bounce group-hover:animate-none transition-transform group-hover:translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white dark:from-slate-900 to-transparent z-10" />
        </section>

        {/* ══════════════════════════════════════════════════════
            STATS BAR — animated counters
        ══════════════════════════════════════════════════════ */}
        <section id="stats" className="relative -mt-4 z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-slate-700">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="py-8 px-6 text-center group hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-3xl md:text-4xl font-black text-green-700 dark:text-green-400 font-mono tracking-tight">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            MISSION & VISION — with photo
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateIn className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
                Our Mission & Vision
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Why We Exist
              </h2>
            </AnimateIn>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Photo side */}
              <AnimateIn direction="left" className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Image
                    src={STOCK_IMAGES.community}
                    alt="Community members working together"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-green-700 text-white rounded-2xl px-6 py-4 shadow-xl animate-float">
                  <div className="text-2xl font-black">Since 2019</div>
                  <div className="text-sm text-green-200">Serving Kakamega County</div>
                </div>
              </AnimateIn>

              {/* Text side */}
              <div className="space-y-8">
                <AnimateIn direction="right" delay={100}>
                  <div className="relative group p-10 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 border-2 border-green-200 dark:border-green-800 hover:shadow-xl transition-all">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-2xl" />
                    <div className="text-5xl mb-4">🎯</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {ORGANIZATION.mission}
                    </p>
                  </div>
                </AnimateIn>

                <AnimateIn direction="right" delay={200}>
                  <div className="relative group p-10 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 border-2 border-amber-200 dark:border-amber-800 hover:shadow-xl transition-all">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-t-2xl" />
                    <div className="text-5xl mb-4">🌟</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {ORGANIZATION.vision}
                    </p>
                  </div>
                </AnimateIn>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            THEMATIC AREAS — with photos + animated cards
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-32 bg-gray-50 dark:bg-slate-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateIn className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold mb-4">
                What We Do
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Our Thematic Areas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Four strategic pillars driving lasting change in Kakamega County.
              </p>
            </AnimateIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {THEMATIC_AREAS.map((area, i) => (
                <AnimateIn key={area.title} direction="up" delay={i * 100}>
                  <Link
                    href={area.href}
                    className="group block bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-slate-700"
                  >
                    {/* Area photo */}
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={
                          area.href === "/climate-action" ? STOCK_IMAGES.climate :
                          area.href === "/human-rights" ? STOCK_IMAGES.humanRights :
                          area.href === "/land-rights" ? STOCK_IMAGES.landRights :
                          STOCK_IMAGES.governance2
                        }
                        alt={area.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="text-4xl">{area.icon}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                        {area.description}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-700 dark:text-green-400 group-hover:gap-2 transition-all">
                        Learn more
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            STRATEGIC OBJECTIVES
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateIn className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
                Our Goals
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Strategic Objectives
              </h2>
            </AnimateIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STRATEGIC_OBJECTIVES.map((objective, i) => (
                <AnimateIn key={objective.number} direction="up" delay={i * 80}>
                  <div className="relative group p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700 hover:-translate-y-1">
                    <div
                      className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${objective.color} rounded-t-2xl`}
                    />
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${objective.color} flex items-center justify-center text-2xl flex-shrink-0`}
                      >
                        {objective.icon}
                      </div>
                      <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                        OBJECTIVE {objective.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {objective.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                      {objective.description}
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-400 italic">
                      <strong>Impact:</strong> {objective.impact}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            GET INVOLVED CTA — with animated background
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-emerald-600 to-green-700 text-white relative overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-float-slow" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl animate-float" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimateIn>
              <div className="text-7xl mb-8 animate-float inline-block">🌟</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Be Part of the Change
              </h2>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                Whether you volunteer, plant trees, attend events, or partner with us, your contribution
                strengthens communities across all 12 sub-counties of Kakamega.
              </p>
            </AnimateIn>

            <AnimateIn delay={200}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                <Link
                  href="/volunteer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
                >
                  🙋 Volunteer With Us
                </Link>
                <Link
                  href="/trees"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl border border-white/20"
                >
                  🌱 Plant a Tree
                </Link>
                <Link
                  href="/events"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-full transition-all hover:scale-105 border border-white/30"
                >
                  📅 Attend an Event
                </Link>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            UPCOMING EVENTS — with photo header
        ══════════════════════════════════════════════════════ */}
        {data.events.length > 0 && (
          <section id="events" className="py-20 md:py-32 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section header with photo */}
              <AnimateIn className="flex flex-col lg:flex-row gap-8 items-center mb-16">
                <div className="flex-1">
                  <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
                    Upcoming Events
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    Join Our Next Event
                  </h2>
                </div>
                <div className="relative w-full lg:w-80 h-40 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                  <Image
                    src={STOCK_IMAGES.volunteers}
                    alt="Community events"
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/60 to-transparent" />
                </div>
              </AnimateIn>

              <div className="grid md:grid-cols-3 gap-8">
                {data.events.map((event, i) => (
                  <AnimateIn key={event.id} direction="up" delay={i * 100}>
                    <article className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700 group">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {event.date}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                        {event.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-gray-600 dark:text-gray-400">Registered</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {event.registered}/{event.spots}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                            style={{ width: `${(event.registered / event.spots) * 100}%` }}
                          />
                        </div>
                      </div>

                      <Link
                        href={`mailto:Kakamegaempowerment1@gmail.com?subject=Event Registration: ${encodeURIComponent(event.title)}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors"
                      >
                        Register Now →
                      </Link>
                    </article>
                  </AnimateIn>
                ))}
              </div>

              <AnimateIn className="text-center mt-12">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold hover:gap-3 transition-all"
                >
                  View all upcoming events
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </AnimateIn>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════
            FEATURED PROJECTS — with photos
        ══════════════════════════════════════════════════════ */}
        {data.projects.length > 0 && (
          <section id="projects" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-800 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimateIn className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
                  Active Projects
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Where We Are Making Change
                </h2>
              </AnimateIn>

              <div className="grid md:grid-cols-3 gap-8">
                {data.projects.map((project, i) => {
                  const projectImages = [STOCK_IMAGES.forest, STOCK_IMAGES.river, STOCK_IMAGES.farm];
                  const img = projectImages[i % projectImages.length];
                  return (
                    <AnimateIn key={project.id} direction="up" delay={i * 100}>
                      <article className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group border border-gray-100 dark:border-slate-700">
                        {/* Project photo */}
                        <div className="relative h-52 overflow-hidden">
                          <Image
                            src={img}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
                            {project.type === "forest" ? "🌲" : project.type === "school" ? "🏫" : "🌊"} {project.type}
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {project.location}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                            {project.description}
                          </p>

                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1.5">
                              <span className="text-gray-600 dark:text-gray-400">Progress</span>
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                {project.progress}%
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-700"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex gap-4 text-sm">
                            <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                              🌳 {project.trees?.toLocaleString() || 0} trees
                            </span>
                            <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                              👥 {project.volunteers || 0} volunteers
                            </span>
                          </div>
                        </div>
                      </article>
                    </AnimateIn>
                  );
                })}
              </div>

              <AnimateIn className="text-center mt-12">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold hover:gap-3 transition-all"
                >
                  View all projects
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </AnimateIn>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════
            STORIES — with background photo
        ══════════════════════════════════════════════════════ */}
        {data.stories.length > 0 && (
          <section id="stories" className="py-20 md:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
              <Image
                src={STOCK_IMAGES.forest}
                alt="Kakamega forest"
                fill
                sizes="100vw"
                className="object-cover opacity-10"
              />
              <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimateIn className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-4 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 rounded-full text-sm font-semibold mb-4">
                  Community Stories
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Stories of Change
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Real voices from the communities we serve.
                </p>
              </AnimateIn>

              <div className="grid md:grid-cols-3 gap-8">
                {data.stories.map((story, i) => (
                  <AnimateIn key={story.id} direction="up" delay={i * 120}>
                    <blockquote className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl relative border border-gray-100 dark:border-slate-700">
                      <div className="absolute -top-5 left-8 text-7xl text-green-300 dark:text-green-700 font-serif leading-none opacity-60">
                        &ldquo;
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic line-clamp-5 text-base">
                        {story.content}
                      </p>
                      <footer className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                          {story.authorName?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <cite className="not-italic font-bold text-gray-900 dark:text-white block">
                            {story.authorName}
                          </cite>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {story.authorRole || "Community Member"}
                          </p>
                        </div>
                      </footer>
                    </blockquote>
                  </AnimateIn>
                ))}
              </div>

              <AnimateIn className="text-center mt-12">
                <Link
                  href="/stories"
                  className="inline-flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold hover:gap-3 transition-all"
                >
                  Read more stories
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </AnimateIn>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════
            LATEST NEWS / BLOG — 3 recent articles
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateIn className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
                From Our Blog
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Latest Stories & Insights
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                News, analysis, and on-the-ground stories from our work across Kakamega County.
              </p>
            </AnimateIn>

            <div className="grid md:grid-cols-3 gap-8">
              {BLOG_POSTS.slice(0, 3).map((post, i) => (
                <AnimateIn key={post.id} direction="up" delay={i * 100}>
                  <Link
                    href={`/resources/${post.slug}`}
                    className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-slate-700"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.heroImage}
                        alt={post.heroImageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`inline-block px-3 py-1 bg-gradient-to-r ${post.categoryColor} text-white text-xs font-bold rounded-full shadow`}>
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors line-clamp-2 text-base">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <div className="relative w-7 h-7 rounded-full overflow-hidden">
                            <Image src={post.authorImage} alt={post.author} fill sizes="28px" className="object-cover" />
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{post.author.split(" ")[0]}</span>
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {post.date} · {post.readTime} min
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>

            <AnimateIn className="text-center mt-12">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 px-8 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg"
              >
                📚 Read All Articles
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </AnimateIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PARTNERS & SUPPORTERS
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 bg-gray-50 dark:bg-slate-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateIn className="text-center mb-12">
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
                Our Partners & Supporters
              </p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Working Together for Impact
              </h2>
            </AnimateIn>

            <AnimateIn delay={100}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {[
                  { name: "County Government of Kakamega", abbr: "CGK", color: "from-green-600 to-emerald-500" },
                  { name: "Kenya Land Alliance", abbr: "KLA", color: "from-amber-600 to-yellow-500" },
                  { name: "Water Resources Authority", abbr: "WRA", color: "from-blue-600 to-cyan-500" },
                  { name: "Kenya National Commission on Human Rights", abbr: "KNCHR", color: "from-red-600 to-pink-500" },
                  { name: "Ford Foundation East Africa", abbr: "FF", color: "from-purple-600 to-indigo-500" },
                  { name: "Ministry of Environment", abbr: "MOE", color: "from-teal-600 to-green-500" },
                  { name: "Community Forest Association", abbr: "CFA", color: "from-lime-600 to-emerald-500" },
                  { name: "Kenya Power & Lighting", abbr: "KPLC", color: "from-yellow-600 to-amber-500" },
                ].map((partner) => (
                  <div
                    key={partner.name}
                    className="group bg-white dark:bg-slate-900 rounded-xl p-5 flex flex-col items-center justify-center text-center border border-gray-100 dark:border-slate-700 hover:shadow-lg hover:border-green-300 dark:hover:border-green-700 transition-all cursor-default min-h-[100px]"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center text-white font-black text-xs mb-3 shadow-md`}>
                      {partner.abbr}
                    </div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-tight">
                      {partner.name}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PHOTO GALLERY — impactful moments
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateIn className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-semibold mb-4">
                Photo Gallery
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Moments That Matter
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                A glimpse into the communities, landscapes, and people behind our work.
              </p>
            </AnimateIn>

            <AnimateIn delay={100}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
                {/* Photo data */}
                {[
                  { src: STOCK_IMAGES.community, alt: "Community tree planting day", span: "md:col-span-2 md:row-span-2" },
                  { src: STOCK_IMAGES.forest, alt: "Kakamega forest restoration site", span: "" },
                  { src: STOCK_IMAGES.river, alt: "River restoration project", span: "" },
                  { src: STOCK_IMAGES.treePlanting, alt: "Volunteers planting trees", span: "" },
                  { src: STOCK_IMAGES.children, alt: "School children in green initiative", span: "" },
                  { src: STOCK_IMAGES.farm, alt: "Farmer in agroforestry plot", span: "md:col-span-2" },
                  { src: STOCK_IMAGES.kenya, alt: "Aerial view of Kakamega landscape", span: "md:col-span-2" },
                  { src: STOCK_IMAGES.youth, alt: "Youth green skills training", span: "" },
                ].map((photo, i) => (
                  <div
                    key={i}
                    className={`relative rounded-2xl overflow-hidden shadow-md group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${photo.span || ""}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-sm font-medium">{photo.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            NEWSLETTER
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
          {/* Animated ring decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 border border-green-700/20 rounded-full animate-spin-slow" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 border border-green-700/15 rounded-full animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
          </div>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimateIn>
              <div className="text-6xl mb-8 inline-block animate-float">📬</div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Connected</h2>
              <p className="text-lg text-gray-300 mb-8">
                Get updates on our work, events, and ways to get involved delivered to your inbox.
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterForm />
              </div>
              <p className="text-sm text-gray-500 mt-4">
                No spam — only meaningful updates about our work in Kakamega County.
              </p>
            </AnimateIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
