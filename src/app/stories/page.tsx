import type { Metadata } from "next";
import Link from "next/link";
import { Navigation, Footer, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Real stories from communities across Kakamega County — voices of change, resilience, and empowerment.",
};

interface Story {
  id: string;
  title: string;
  authorName: string;
  authorRole: string;
  subCounty: string;
  content: string;
  category: string;
  isFeatured: boolean;
  emoji: string;
}

const stories: Story[] = [
  {
    id: "1",
    title: "Reclaiming Our Forests: The Lurambi Green Initiative",
    authorName: "Wanjiku Mwangi",
    authorRole: "Community Leader",
    subCounty: "Lurambi",
    content:
      "Three years ago, the forests around Lurambi were bare. Erosion was washing away our topsoil, and the streams that once flowed year-round had become seasonal. We decided to act. With support from the county government, we organized monthly tree-planting drives. Today, over 50,000 seedlings have taken root. Our children now play under the shade of trees that were once just bare stems in the ground. The streams have returned, and with them, the birds and butterflies our grandparents used to tell stories about.",
    category: "Environment",
    isFeatured: true,
    emoji: "🌳",
  },
  {
    id: "2",
    title: "From the Sidelines to the Ballot: My First Time Voting",
    authorName: "Otieno Ochieng",
    authorRole: "Youth Activist",
    subCounty: "Malava",
    content:
      "I always thought politics was for older people, for people with connections. When the 2022 elections approached, a local CBO organized voter education sessions in our village. They explained not just how to vote, but why it matters. I learned about devolved government and how county representatives make decisions that directly affect our roads, schools, and clinics. I registered and voted for the first time at 23. My vote counted. The ward representative who won has since fixed the bridge that cuts our village off during rainy season.",
    category: "Civic Participation",
    isFeatured: false,
    emoji: "🗳️",
  },
  {
    id: "3",
    title: "When the Land Was Almost Lost",
    authorName: "Kamau Muiruri",
    authorRole: "Farmer",
    subCounty: "Shinyalu",
    content:
      "My grandfather worked this land. My father worked this land. When a dispute arose over our boundary, a neighboring family tried to claim half our shamba through forged documents. We didn't know where to turn. The empowerment office connected us with legal aid. A land surveyor was appointed by the court, and the truth came out. The judge ruled in our favor. Now I understand that land rights are not just about having a title deed — they are about protecting your family's legacy for the next generation.",
    category: "Land Rights",
    isFeatured: false,
    emoji: "🏡",
  },
  {
    id: "4",
    title: "Sewing a Path to Independence",
    authorName: "Akinyi Ouma",
    authorRole: "Women's Champion",
    subCounty: "Lurambi",
    content:
      "After my husband passed away, I had no income and three children to feed. Society expected me to depend on relatives, but I wanted to stand on my own feet. I joined a women's self-help group that was receiving tailoring training. For six months, I sat at the sewing machine every morning. Now I have my own small workshop. I make school uniforms for four nearby schools. My children are in school. My income is my own. Other widows in my village have since joined the group. We are proving that a woman with skills and support can build her own future.",
    category: "Women's Empowerment",
    isFeatured: true,
    emoji: "🪡",
  },
  {
    id: "5",
    title: "Leading at 19: A Young Voice in County Planning",
    authorName: "Brian Odiwuor",
    authorRole: "Youth Leader",
    subCounty: "Kabras",
    content:
      "At 19, I was elected secretary of our village youth council. I thought it would be a ceremonial role. I was wrong. When the county began drafting its annual development plan, the youth council was invited to submit priorities. I spent two weeks walking around our sub-county, talking to young people about what they needed. Sports facilities, vocational training, and better internet access. We compiled a youth manifesto and presented it to the planning committee. Three of our proposals made it into the final budget. Youth participation is not just a right — it is how we shape the future we will inherit.",
    category: "Youth Leadership",
    isFeatured: false,
    emoji: "🎤",
  },
  {
    id: "6",
    title: "Three Sub-Counties, One Water Project",
    authorName: "Fatuma Ibrahim",
    authorRole: "Volunteer",
    subCounty: "Khwisero",
    content:
      "Water scarcity does not respect administrative boundaries. Communities in Khwisero, Shinyalu, and Lurambi were all struggling with the same problem — dry boreholes and contaminated shallow wells. Instead of each sub-county solving the problem alone, we formed a joint water committee with representatives from all three. We wrote a joint proposal, lobbied together, and secured funding for a solar-powered piped water system that serves all three areas. The project took two years. It required compromise, shared costs, and trust. Today, over 8,000 households have clean water. Collaboration turned a fragmented problem into a shared solution.",
    category: "Community Collaboration",
    isFeatured: true,
    emoji: "💧",
  },
];

const categoryColors: Record<string, string> = {
  Environment:
    "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
  "Civic Participation":
    "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  "Land Rights":
    "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  "Women's Empowerment":
    "bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-800",
  "Youth Leadership":
    "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  "Community Collaboration":
    "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
};

export default function StoriesPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span>✨</span>
              <span className="text-white/90 text-sm font-medium">Voices of Change</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Stories
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              Real stories from communities across Kakamega County — voices of resilience, empowerment,
              and transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#stories"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-800 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                Read Stories
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full transition-colors border border-white/30"
              >
                Share Your Story
              </Link>
            </div>
          </div>
        </section>

        {/* STORIES GRID */}
        <section id="stories" className="py-20 md:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Community Voices"
              title="Stories of Change"
              description="Every story represents a community member taking action, overcoming challenges, and building a better Kakamega County."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <article
                  key={story.id}
                  className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-slate-700"
                >
                  {/* Emoji header */}
                  <div className="h-40 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center relative overflow-hidden">
                    <div className="text-7xl">{story.emoji}</div>
                    {story.isFeatured && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full shadow-sm">
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Category & Location */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${categoryColors[story.category] || "bg-gray-100 text-gray-700 border-gray-200"}`}
                      >
                        {story.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {story.subCounty}
                      </span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-lg">
                        👤
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">
                          {story.authorName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {story.authorRole}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-5">
                      {story.content}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SHARE YOUR STORY CTA */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-6">💬</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Share Your Story
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Has your community experienced positive change? Do you have a story of resilience,
              empowerment, or transformation to share?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-full hover:bg-gray-100 transition-colors"
            >
              📧 Contact Us to Share
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
