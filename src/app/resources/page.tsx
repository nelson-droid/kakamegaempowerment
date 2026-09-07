import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Footer, SectionHeading } from "@/components/ui";
import { BLOG_POSTS, BLOG_CATEGORIES, getFeaturedPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Resources & Blog",
  description:
    "Educational resources, blog articles, guides, and publications on governance, climate, land rights, human rights, and gender equality in Kakamega County.",
};

export default function ResourcesPage() {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = BLOG_POSTS.slice(0, 6);

  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white overflow-hidden">
          {/* Background photo */}
          <div className="absolute inset-0 z-0 opacity-30">
            <Image
              src="https://images.unsplash.com/photo-1588072432836-e10032724340?w=1920&q=80&auto=format&fit=crop"
              alt="African students learning"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-green-900/80 via-green-800/70 to-emerald-700/80" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span>📚</span>
              <span className="text-white/90 text-sm font-medium">Community Knowledge Hub</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Resources & Blog
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
              Stories, guides, and insights from our work across Kakamega County — covering
              environmental restoration, rights advocacy, civic education, and community
              empowerment.
            </p>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Browse by Topic
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Explore articles by thematic area
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
              {BLOG_CATEGORIES.map((category) => (
                <div
                  key={category.name}
                  className="group p-5 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer text-center"
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 line-clamp-1">
                    {category.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {category.count} {category.count === 1 ? "post" : "posts"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED POSTS */}
        {featuredPosts.length > 0 && (
          <section className="py-20 md:py-28 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow="Featured Stories"
                title="Editor Picks"
                description="Long-form journalism on the issues shaping Kakamega County today."
              />

              <div className="grid lg:grid-cols-3 gap-8 mt-12">
                {/* First featured post: large */}
                <Link
                  href={`/resources/${featuredPosts[0].slug}`}
                  className="group lg:col-span-2 lg:row-span-2 relative rounded-3xl overflow-hidden shadow-xl h-[500px] lg:h-full min-h-[500px]"
                >
                  <Image
                    src={featuredPosts[0].heroImage}
                    alt={featuredPosts[0].heroImageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                      ⭐ FEATURED
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <span
                      className={`inline-block px-3 py-1 bg-gradient-to-r ${featuredPosts[0].categoryColor} text-white text-xs font-bold rounded-full mb-3`}
                    >
                      {featuredPosts[0].category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-green-300 transition-colors">
                      {featuredPosts[0].title}
                    </h3>
                    <p className="text-white/80 mb-4 line-clamp-2">{featuredPosts[0].excerpt}</p>
                    <div className="flex items-center gap-3 text-sm text-white/70">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={featuredPosts[0].authorImage}
                          alt={featuredPosts[0].author}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <span>{featuredPosts[0].author}</span>
                      <span>·</span>
                      <span>{featuredPosts[0].readTime} min</span>
                    </div>
                  </div>
                </Link>

                {/* Other featured posts */}
                {featuredPosts.slice(1, 3).map((post) => (
                  <Link
                    key={post.id}
                    href={`/resources/${post.slug}`}
                    className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={post.heroImage}
                        alt={post.heroImageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <span
                        className={`inline-block px-2 py-0.5 bg-gradient-to-r ${post.categoryColor} text-white text-xs font-bold rounded-full mb-2`}
                      >
                        {post.category}
                      </span>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {post.date} · {post.readTime} min read
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ALL RECENT POSTS */}
        <section className="py-20 md:py-28 bg-gray-50 dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Latest Articles"
              title="From Our Blog"
              description="News, analysis, and stories from across Kakamega County."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/resources/${post.slug}`}
                  className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-slate-700"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.heroImage}
                      alt={post.heroImageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-block px-3 py-1 bg-gradient-to-r ${post.categoryColor} text-white text-xs font-bold rounded-full shadow-lg`}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={post.authorImage}
                          alt={post.author}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                          {post.author}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {post.date} · {post.readTime} min
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold hover:gap-3 transition-all"
              >
                View all articles
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* PUBLICATIONS / DOWNLOADS */}
        <section className="py-20 md:py-28 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Downloads & Guides"
              title="Resource Library"
              description="Practical guides, toolkits, and reports for community members and partners."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { icon: "📄", title: "Land Rights Guide", desc: "12-page handbook on inheritance and tenure in Kenya", color: "from-amber-500 to-orange-600" },
                { icon: "📊", title: "2025 Impact Report", desc: "Our annual report: projects, beneficiaries, outcomes", color: "from-blue-500 to-cyan-600" },
                { icon: "📖", title: "Tree Planting Toolkit", desc: "How to organise community tree-planting events", color: "from-green-500 to-emerald-600" },
                { icon: "🎥", title: "Civic Education Curriculum", desc: "Facilitation guide for community sessions", color: "from-purple-500 to-pink-600" },
                { icon: "📜", title: "Constitution (Kenya 2010)", desc: "Simplified version for community education", color: "from-pink-500 to-rose-600" },
                { icon: "🌍", title: "Climate Adaptation Manual", desc: "For farmers adapting to changing rainfall", color: "from-emerald-500 to-green-600" },
                { icon: "⚧️", title: "Gender Inclusion Toolkit", desc: "Promoting equality in community programmes", color: "from-purple-500 to-indigo-600" },
                { icon: "🛡️", title: "Human Rights Defenders Guide", desc: "Documentation, advocacy, and security tips", color: "from-red-500 to-rose-600" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group p-6 bg-white dark:bg-slate-800 rounded-2xl border-2 border-gray-100 dark:border-slate-700 hover:border-green-400 dark:hover:border-green-600 hover:shadow-xl transition-all cursor-pointer"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-green-700 dark:text-green-400 font-semibold text-sm group-hover:gap-2 transition-all">
                    Download PDF
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REQUEST */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-emerald-600 to-green-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Need Specific Resources?
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              If you&apos;re looking for specific educational materials or guides, reach out and
              we&apos;ll do our best to support you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
            >
              📧 Request Resources
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
