import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation, Footer } from "@/components/ui";
import {
  BLOG_POSTS,
  getPostBySlug,
  getRelatedPosts,
  BLOG_CATEGORIES,
} from "@/lib/blog-posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.heroImage, alt: post.heroImageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post, 3);

  // Parse content: **bold**, ""> blockquote, paragraphs
  const contentLines = post.content.split("\n");
  const paragraphs = contentLines.map((line, i) => {
    if (line.startsWith("> ")) {
      return (
        <blockquote
          key={i}
          className="border-l-4 border-green-500 pl-6 py-4 my-8 bg-green-50 dark:bg-green-900/20 rounded-r-xl italic text-gray-700 dark:text-gray-300 text-lg"
        >
          {line.slice(2)}
        </blockquote>
      );
    }
    if (line.startsWith("**") && line.endsWith("**")) {
      return (
        <h3 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          {line.replace(/\*\*/g, "")}
        </h3>
      );
    }
    if (line.trim() === "") return null;
    // Replace **bold** with <strong>
    const html = line
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
    return (
      <p
        key={i}
        className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });

  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <Image
            src={post.heroImage}
            alt={post.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-block px-3 py-1 bg-gradient-to-r ${post.categoryColor} text-white text-xs font-bold rounded-full`}
              >
                {post.category}
              </span>
              <span className="text-white/70 text-sm">{post.readTime} min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">{post.excerpt}</p>
          </div>
        </div>

        {/* ARTICLE BODY */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Author card */}
          <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-200 dark:border-slate-700">
            <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={post.authorImage}
                alt={post.author}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{post.author}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{post.authorRole}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
                {post.date}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {paragraphs}
          </article>

          {/* Share / CTA */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Found this useful?</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Share it with someone who should read it.</p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-colors shadow-lg"
                >
                  Contact Us
                </Link>
                <Link
                  href="/resources"
                  className="px-6 py-3 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 font-semibold rounded-full transition-colors"
                >
                  ← All Resources
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED POSTS */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-50 dark:bg-slate-800 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/resources/${related.slug}`}
                    className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={related.heroImage}
                        alt={related.heroImageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <span
                        className={`inline-block px-2 py-0.5 bg-gradient-to-r ${related.categoryColor} text-white text-xs font-bold rounded-full mb-3`}
                      >
                        {related.category}
                      </span>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {related.excerpt}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                        {related.date} · {related.readTime} min read
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
