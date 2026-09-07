import type { Metadata } from "next";
import Link from "next/link";
import { Navigation, Footer, SectionHeading } from "@/components/ui";
import ProjectsGrid, { type Project } from "@/components/ui/ProjectsGrid";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore the active projects and initiatives of Kakamega Empowerment CBO across governance, climate action, land rights, and human rights.",
};

// Hardcoded project data representing 14 projects across 4 thematic areas
const projects: Project[] = [
  {
    id: "1",
    title: "Kakamega Forest Restoration Initiative",
    description:
      "Restoring degraded sections of the Kakamega Forest through native tree planting, invasive species removal, and community-based conservation patrols. Partnering with Kenya Forest Service and local community forest associations.",
    thematicArea: "Climate Action",
    projectType: "forest restoration",
    location: "Kakamega Forest, Lurambi Sub-County",
    status: "active",
    progress: 78,
    trees: 45000,
    volunteers: 320,
    startDate: "2023-06-01",
    image: "/images/projects/forest-restoration.jpg",
  },
  {
    id: "2",
    title: "Green Schools Program",
    description:
      "Establishing tree nurseries and school gardens in 45 primary schools across Kakamega County. Students learn about environmental stewardship while contributing to county-wide greening efforts.",
    thematicArea: "Climate Action",
    projectType: "school greening",
    location: "Matungu, Navakholo, Mumias West Sub-Counties",
    status: "active",
    progress: 65,
    trees: 12000,
    volunteers: 180,
    startDate: "2024-01-15",
    image: "/images/projects/green-schools.jpg",
  },
  {
    id: "3",
    title: "River Kipkaren Conservation",
    description:
      "Protecting the Kipkaren River and its tributaries through riparian restoration, pollution monitoring, and engaging local farming communities in sustainable land practices.",
    thematicArea: "Climate Action",
    projectType: "river protection",
    location: "Lurambi Sub-County",
    status: "active",
    progress: 55,
    trees: 8500,
    volunteers: 95,
    startDate: "2023-09-01",
    image: "/images/projects/river-protection.jpg",
  },
  {
    id: "4",
    title: "Small-Scale Farmer Agroforestry Project",
    description:
      "Training 200 farmers in integrating trees into agricultural landscapes for soil conservation, microclimate improvement, and additional income through fruit and timber trees.",
    thematicArea: "Climate Action",
    projectType: "agroforestry",
    location: "Malava, Lugari Sub-Counties",
    status: "active",
    progress: 82,
    trees: 22000,
    volunteers: 210,
    startDate: "2023-03-01",
    image: "/images/projects/agroforestry.jpg",
  },
  {
    id: "5",
    title: "Urban Community Gardens Network",
    description:
      "Converting idle urban spaces in Kakamega town into productive community gardens, providing fresh produce access and green spaces for 15 neighborhood groups.",
    thematicArea: "Climate Action",
    projectType: "community gardens",
    location: "Kakamega Central Sub-County",
    status: "active",
    progress: 70,
    trees: 1200,
    volunteers: 145,
    startDate: "2024-02-01",
    image: "/images/projects/urban-gardens.jpg",
  },
  {
    id: "6",
    title: "Civic Leadership Academy",
    description:
      "A 6-month intensive program training 60 young leaders annually in governance, public participation, budget tracking, and community organizing skills for effective civic engagement.",
    thematicArea: "Governance",
    projectType: "governance training",
    location: "County-wide",
    status: "active",
    progress: 90,
    trees: 0,
    volunteers: 60,
    startDate: "2023-08-01",
    image: "/images/projects/civic-academy.jpg",
  },
  {
    id: "7",
    title: "Village Savings and Lending Oversight",
    description:
      "Building transparency and accountability mechanisms for 35 community savings groups through digital record-keeping training and regular community audit meetings.",
    thematicArea: "Governance",
    projectType: "governance training",
    location: "Khwisero, Matungu Sub-Counties",
    status: "active",
    progress: 60,
    trees: 0,
    volunteers: 85,
    startDate: "2024-03-01",
    image: "/images/projects/vsla.jpg",
  },
  {
    id: "8",
    title: "Public Participation Monitoring",
    description:
      "Documenting and reporting on government-led public participation forums to ensure community voices are heard in development planning and budget allocation processes.",
    thematicArea: "Governance",
    projectType: "governance training",
    location: "County-wide",
    status: "active",
    progress: 45,
    trees: 0,
    volunteers: 42,
    startDate: "2024-05-01",
    image: "/images/projects/public-participation.jpg",
  },
  {
    id: "9",
    title: "Community Land Rights Awareness",
    description:
      "Conducting 80 community barazas across all 12 sub-counties to educate residents about their land rights, the Community Land Act, and how to secure documentation for ancestral lands.",
    thematicArea: "Land Rights",
    projectType: "rights awareness",
    location: "County-wide",
    status: "active",
    progress: 75,
    trees: 0,
    volunteers: 55,
    startDate: "2023-11-01",
    image: "/images/projects/land-rights.jpg",
  },
  {
    id: "10",
    title: "Women Land Defenders Network",
    description:
      "Supporting and protecting women activists defending community land rights through legal aid referrals, security training, and a rapid-response support network.",
    thematicArea: "Land Rights",
    projectType: "rights awareness",
    location: "County-wide",
    status: "active",
    progress: 50,
    trees: 0,
    volunteers: 38,
    startDate: "2024-01-01",
    image: "/images/projects/women-defenders.jpg",
  },
  {
    id: "11",
    title: "Youth Rights Champions",
    description:
      "Empowering 120 youth advocates with knowledge of constitutional rights, police relations, and peaceful assembly through workshops and mentorship from human rights lawyers.",
    thematicArea: "Human Rights",
    projectType: "youth empowerment",
    location: "County-wide",
    status: "active",
    progress: 68,
    trees: 0,
    volunteers: 120,
    startDate: "2023-07-01",
    image: "/images/projects/youth-champions.jpg",
  },
  {
    id: "12",
    title: "Gender-Based Violence Response",
    description:
      "Operating a GBV hotline, coordinating with police victim protection units, and providing psychosocial support referrals for survivors of gender-based violence in Kakamega County.",
    thematicArea: "Human Rights",
    projectType: "youth empowerment",
    location: "County-wide",
    status: "active",
    progress: 85,
    trees: 0,
    volunteers: 65,
    startDate: "2023-05-01",
    image: "/images/projects/gbv-response.jpg",
  },
  {
    id: "13",
    title: "Inclusive Governance for PWDs",
    description:
      "Ensuring persons with disabilities can participate meaningfully in governance processes through accessibility audits of public buildings and civic education in accessible formats.",
    thematicArea: "Human Rights",
    projectType: "rights awareness",
    location: "County-wide",
    status: "active",
    progress: 40,
    trees: 0,
    volunteers: 48,
    startDate: "2024-04-01",
    image: "/images/projects/pwd-governance.jpg",
  },
  {
    id: "14",
    title: "Climate Justice School Curriculum",
    description:
      "Developing and piloting a climate justice curriculum for secondary schools, integrating local ecological knowledge with climate science and advocacy skills.",
    thematicArea: "Climate Action",
    projectType: "school greening",
    location: "Ikolomani, Shinyalu Sub-Counties",
    status: "active",
    progress: 35,
    trees: 500,
    volunteers: 28,
    startDate: "2024-06-01",
    image: "/images/projects/climate-curriculum.jpg",
  },
];

// Calculate aggregate statistics
const statistics = {
  totalProjects: projects.length,
  totalTrees: projects.reduce((sum, p) => sum + p.trees, 0),
  totalVolunteers: projects.reduce((sum, p) => sum + p.volunteers, 0),
  climateProjects: projects.filter((p) => p.thematicArea === "Climate Action").length,
  governanceProjects: projects.filter((p) => p.thematicArea === "Governance").length,
  landRightsProjects: projects.filter((p) => p.thematicArea === "Land Rights").length,
  humanRightsProjects: projects.filter((p) => p.thematicArea === "Human Rights").length,
  averageProgress: Math.round(
    projects.reduce((sum, p) => sum + p.progress, 0) / projects.length
  ),
};

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span>📁</span>
              <span className="text-white/90 text-sm font-medium">Our Initiatives</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Our Projects
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              Explore the active projects and initiatives driving positive change across Kakamega County
              in governance, climate action, land rights, and human rights.
            </p>

            {/* Statistics Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">{statistics.totalProjects}</div>
                <div className="text-white/70 text-sm">Active Projects</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">
                  {statistics.totalTrees.toLocaleString()}
                </div>
                <div className="text-white/70 text-sm">Trees Planted</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">
                  {statistics.totalVolunteers.toLocaleString()}
                </div>
                <div className="text-white/70 text-sm">Volunteers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">{statistics.averageProgress}%</div>
                <div className="text-white/70 text-sm">Avg. Progress</div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS LIST */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Active Initiatives"
              title="Projects Making Impact"
              description="Our work spans four interconnected thematic areas, each contributing to a just, inclusive, and climate-resilient Kakamega County."
            />

            <ProjectsGrid projects={projects} />
          </div>
        </section>

        {/* THEMATIC AREAS */}
        <section className="py-20 md:py-32 bg-gray-50 dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Where We Work"
              title="Our Four Focus Areas"
              description="Every project falls within one of our four interconnected thematic areas."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🏛️",
                  title: "Governance",
                  color: "from-blue-500 to-cyan-600",
                  href: "/governance",
                  description: "Civic participation, accountability, and transparency",
                  count: statistics.governanceProjects,
                },
                {
                  icon: "🌍",
                  title: "Climate Action",
                  color: "from-green-500 to-emerald-600",
                  href: "/climate-action",
                  description: "Tree planting, conservation, and climate resilience",
                  count: statistics.climateProjects,
                },
                {
                  icon: "⚖️",
                  title: "Land Rights",
                  color: "from-amber-500 to-orange-600",
                  href: "/land-rights",
                  description: "Community land rights and dispute resolution",
                  count: statistics.landRightsProjects,
                },
                {
                  icon: "🛡️",
                  title: "Human Rights",
                  color: "from-pink-500 to-rose-600",
                  href: "/human-rights",
                  description: "Gender equality, inclusion, and justice",
                  count: statistics.humanRightsProjects,
                },
              ].map((area) => (
                <Link
                  key={area.title}
                  href={area.href}
                  className="group bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-slate-600 text-center"
                >
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {area.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {area.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-full">
                    {area.count} project{area.count !== 1 ? "s" : ""}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Partner With Us
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Interested in collaborating on a project? We welcome partnerships with government,
              NGOs, civil society, and the private sector.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                📧 Get in Touch
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-700 text-white font-bold rounded-full hover:bg-green-600 transition-colors border border-white/30"
              >
                🤝 Volunteer
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
