/**
 * Blog posts data for the Resources / Blog section
 * Each post has a hero image from Unsplash, author, date, category, excerpt, and full content.
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  dateISO: string;
  category: string;
  categoryColor: string;
  heroImage: string;
  heroImageAlt: string;
  tags: string[];
  readTime: number;
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "community-forest-governance-kakamega",
    title: "How Community Forest Governance is Protecting Kakamega's Last Indigenous Trees",
    excerpt:
      "In the highlands of Kakamega County, a grassroots movement is proving that communities — not corporations or government agencies — are the most effective guardians of forest ecosystems.",
    content: `
In the highlands of Kakamega County, a grassroots movement is proving that communities — not corporations or government agencies — are the most effective guardians of forest ecosystems.

For generations, the people of Shinyalu sub-county lived alongside the Kakamega tropical rainforest — one of the last remaining rainforests in Kenya. But as population pressure mounted and illegal logging intensified in the early 2000s, entire stretches of indigenous forest disappeared almost overnight. Streams that once ran year-round began to dry up. Soil erosion on farmlands intensified. The rains grew unpredictable.

**The Community Forest Association Solution**

In response, a group of 12 village elders came together in 2019 to form the Shinyalu Community Forest Association (CFA). Drawing on both traditional ecological knowledge and modern conservation science, the CFA established a community-managed forest patrol system. Volunteer monitors — locally called *bahati* — rotate through forest boundaries daily, documenting illegal activities and reporting to a community conservation committee.

The results have been striking. Within three years, forest cover in the Shinyalu managed area increased by 23%. Sixteen illegal charcoal kilns were dismantled through community negotiations rather than confrontations. And the CFA has planted over 8,000 indigenous trees in previously degraded areas.

**Why Community Governance Works**

The success of community forest management rests on three pillars. First, **local accountability**: when community members themselves are responsible for protecting a forest, they have direct incentive to ensure its survival. Second, **traditional knowledge**: elders who remember what the forest looked like 40 years ago can identify degradation patterns that satellite data might miss. Third, **economic alignment**: the CFA has developed sustainable income streams — bee-keeping, butterfly farming, and eco-tours — that give community members a financial stake in the forest's health.

**Challenges and the Road Ahead**

The movement is not without challenges. Climate change is bringing longer dry seasons, increasing fire risk. Some community members continue to argue that forest exclusion denies them livelihood opportunities. And youth engagement remains inconsistent — many young people see conservation as a concern for older generations.

Nevertheless, the Kakamega Empowerment CBO is working with six other sub-counties to replicate the Shinyalu model. A county-wide community forest network is now being formalised, with the County Government of Kakamega providing legal recognition and partial funding.

> "We are not protecting the forest for ourselves," says Joseph Namisi, chair of the Shinyalu CFA. "We are protecting it for the generations who will come after us — and for the entire county that depends on the water this forest gives."

The story of Shinyalu is a reminder that conservation cannot be imposed from outside. When communities lead, nature responds.
    `.trim(),
    author: "Joseph Namisi",
    authorRole: "Chair, Shinyalu Community Forest Association",
    authorImage: "https://images.unsplash.com/photo-1506792006437-256b665541e2?w=200&q=80&auto=format&fit=crop", // African man portrait
    date: "August 18, 2026",
    dateISO: "2026-08-18",
    category: "Climate & Environment",
    categoryColor: "from-green-500 to-emerald-600",
    heroImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80&auto=format&fit=crop",
    heroImageAlt: "Dense Kakamega rainforest canopy",
    tags: ["forestry", "governance", "conservation", "community"],
    readTime: 6,
    featured: true,
  },
  {
    id: "2",
    slug: "women-land-rights-kakamega",
    title: "Securing Women's Land Rights: The Widows Fighting Back in Butere",
    excerpt:
      "In rural Butere sub-county, customary land law has long dispossessed widows of their rightful inheritance. A new legal awareness campaign is changing that — one community at a time.",
    content: `
In rural Butere sub-county, customary land law has long dispossessed widows of their rightful inheritance. A new legal awareness campaign is changing that — one community at a time.

When Beatrice Anyango's husband died in 2021, she expected to continue farming the three acres their family had cultivated for decades. Instead, her late husband's brothers arrived at her door with a traditional gathering, informing her that the land — under customary law — now belonged to the extended family. She and her four children would have to leave.

Beatrice's story is not unique. Across Kakamega County, and across Kenya more broadly, widows face systematic dispossession of land through customary inheritance practices that prioritise male relatives. According to a 2024 survey by the Kenya Land Alliance, over 60% of widows in rural Western Kenya have experienced some form of land grabbing after their husband's death.

**The Legal Awareness Campaign**

Since 2023, Kakamega Empowerment CBO has been running a community legal awareness campaign targeting women's land rights in Butere, Khwisero, and Ikolomani sub-counties. Working with legal aid partners, the programme conducts monthly community sensitisation meetings, distributes illustrated guides in Luhya (the local language), and provides direct legal support to women facing dispossession.

The campaign has three components. First, **knowing your rights**: many women simply do not know that the Constitution of Kenya, 2010, and the Land Registration Act guarantee their right to inherit land regardless of customary practice. Second, **documentation**: helping widows obtain land title deeds, succession certificates, and birth certificates for their children — documents that are prerequisites for legal protection. Third, **accompanying women through the process**: the CBO provides paralegal support to help women navigate a complex and often hostile legal system.

**Beatrice's Victory**

After attending a CBO legal awareness session in Butere town, Beatrice decided to seek help. With support from a CBO paralegal, she filed for a succession certificate and successfully claimed her rights to the family land. She has since become one of the programme's most passionate community advocates.

"At first I was ashamed," she says. "I thought it was normal that a woman should leave her husband's land after he dies. Now I know that the law protects me. I want every widow in Butere to know this."

To date, the campaign has reached over 2,000 women across three sub-counties, and has directly supported 47 widows in securing or defending their land rights.

**Changing Social Norms**

Beyond legal support, the programme also works to change the social norms that perpetuate land dispossession. Community dialogue sessions bring together elders, religious leaders, local administrators, and women to discuss how customary practices can be reconciled with constitutional protections.

The response has been mixed — some elders are resistant, arguing that changing tradition is tantamount to cultural erasure. But others have begun to shift. "I have seen what happens when a widow is thrown off her land," says one elder from Khwisero. "She suffers. The children suffer. This is not what our ancestors would have wanted."
    `.trim(),
    author: "Mary Wanjala",
    authorRole: "Paralegal Coordinator, Kakamega Empowerment CBO",
    authorImage: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=200&q=80&auto=format&fit=crop", // African woman portrait
    date: "July 29, 2026",
    dateISO: "2026-07-29",
    category: "Land Rights",
    categoryColor: "from-amber-500 to-orange-600",
    heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop",
    heroImageAlt: "Agricultural farmland in Kakamega County",
    tags: ["women's rights", "land rights", "legal aid", "customary law"],
    readTime: 7,
    featured: true,
  },
  {
    id: "3",
    slug: "youth-green-skills-likuyani",
    title: "From the Classroom to Conservation: How Green Skills Training is Transforming Youth in Likuyani",
    excerpt:
      "Unemployment among young people in Likuyani sub-county was once a ticking time bomb. A pioneering green skills programme is turning environmental work into dignified, gainful employment.",
    content: `
Unemployment among young people in Likuyani sub-county was once a ticking time bomb. A pioneering green skills programme is turning environmental work into dignified, gainful employment.

In Kakamega County, over 65% of the population is under 35. The formal employment sector absorbs only a fraction of these young people. For the rest, the options are informal trading, subsistence farming, or migration to Nairobi or Mombasa in search of work that often proves elusive.

Kakamega Empowerment CBO's Green Skills Hub, launched in 2022 in Lurambi sub-county and expanded to Likuyani in 2025, offers a different path. The programme recruits young people aged 18-35 who have dropped out of or never completed formal education, and trains them in skills that are simultaneously environmentally valuable and economically viable.

**What the Programme Teaches**

Participants spend six months in intensive training across three tracks:

- **Nursery Management & Tree Propagation**: Participants learn to operate commercial tree nurseries, from seed selection and germination to hardening-off and marketing. The programme has established six community nurseries that collectively produce over 50,000 tree seedlings per year.

- **Sustainable Construction**: Using bamboo, compressed earth blocks, and reclaimed timber, trainees learn to build low-cost, climate-resilient structures. Several graduates have gone on to build community halls, schools, and homes using these techniques.

- **Renewable Energy Installation**: Solar PV installation, biogas digesters, and improved cookstove construction are taught in partnership with Kenya Power and the Ministry of Energy. Twenty graduates have been certified by the Energy Regulatory Commission.

**A Graduate's Story**

Pauline Nafula, 24, dropped out of secondary school after her family couldn't afford fees. For three years she did casual farm labour. In 2024, she enrolled in the Green Skills Hub's nursery management track.

"Before, I had nothing," Pauline says. "Now I run my own nursery. I produce 3,000 seedlings a season. I have income, I have dignity, and I am helping my community fight climate change."

Pauline's nursery now supplies trees to schools, churches, and individual farmers across Likuyani. She employs two other young women part-time.

**Measuring Impact**

The Green Skills Hub has trained 312 young people since 2022. Of these, 68% are in gainful employment or self-employment within 12 months of graduation. The programme has contributed to the planting of over 28,000 trees across Kakamega County, and has built or renovated 14 community structures using sustainable techniques.

The CBO is now seeking partnerships to expand the programme to Matungu and Mumias West sub-counties in 2027.
    `.trim(),
    author: "David Musungu",
    authorRole: "Youth Programme Officer, Kakamega Empowerment CBO",
    authorImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80&auto=format&fit=crop", // African man portrait
    date: "July 10, 2026",
    dateISO: "2026-07-10",
    category: "Community Empowerment",
    categoryColor: "from-teal-500 to-cyan-600",
    heroImage: "https://images.unsplash.com/photo-1531546678013-23b3010c9a84?w=1200&q=80&auto=format&fit=crop", // African youth in environmental work
    heroImageAlt: "Young Africans engaged in environmental work",
    tags: ["youth", "employment", "green skills", "training"],
    readTime: 6,
    featured: false,
  },
  {
    id: "4",
    slug: "climate-change-kakamega-rains",
    title: "The Rains Are Changing: How Climate Change is Reshaping Life in Kakamega County",
    excerpt:
      "Farmers in Kakamega County are reporting that the rains are no longer reliable. Scientists confirm what communities have long observed: climate change is accelerating in Western Kenya.",
    content: `
Farmers in Kakamega County are reporting that the rains are no longer reliable. Scientists confirm what communities have long observed: climate change is accelerating in Western Kenya.

Ask any farmer in Lurambi or Malava how the rains have changed in the past 20 years, and you will hear a consistent story: the long rains (March–May) are arriving later and ending earlier. The short rains (October–December) are increasingly erratic — sometimes failing entirely, sometimes arriving in violent deluges that wash away topsoil and seedlings alike.

The Kenya Meteorological Department confirms these observations. Data from the Kakamega weather station shows a 15% decline in total annual rainfall since 2000, alongside increased variability. Extreme rainfall events — defined as days receiving more than 50mm — have increased by 40% in the same period.

**Impact on Agriculture**

Kakamega County's economy is built on rain-fed agriculture. Maize, sugarcane, beans, cassava, and bananas are the staple crops that feed families and generate income. Climate variability is destabilising all of them.

The Malava Dam catchment — a key irrigation source for over 3,000 households — saw its water levels drop to 22% of capacity in 2024, the lowest in recorded history. Crop failures have become more frequent: the 2024 long rains season saw a 40% decline in maize yields across Malava, Navakholo, and Lurambi sub-counties.

**What Communities Are Doing**

In response, Kakamega Empowerment CBO is working with farming communities to build climate resilience. The approach is practical and community-driven:

**Agroforestry** is being promoted as an alternative to monoculture cropping. Integrating nitrogen-fixing trees — particularly *Calliandra* and *Gliricidia* — with food crops improves soil moisture retention, reduces erosion, and provides fodder for livestock. Over 400 farmers in Khwisero and Matungu have adopted agroforestry practices since 2023.

**Water harvesting** infrastructure is being constructed at community level. This includes rooftop catchment systems for schools and health centres, as well as small dams and check-dams in seasonal riverbeds. The CBO has facilitated the construction of 12 community water pans serving over 1,500 households.

**Early warning systems** link meteorological data to community radio broadcasts. Farmers receive SMS alerts when rainfall forecasts indicate a high probability of dry spells or extreme events, allowing them to adjust planting schedules accordingly.

**The Road Ahead**

Climate change is not a future threat for Kakamega County — it is a present reality. But community resilience, grounded in local knowledge and supported by appropriate technology, can reduce vulnerability and build adaptive capacity.

> "We cannot control the rain," says Mercy Kavata, a farmer from Navakholo. "But we can make sure our soil holds more of it when it comes, and that our trees protect our crops when the wind blows."
    `.trim(),
    author: "Dr. Anne Wanjala",
    authorRole: "Climate Programme Coordinator, Kakamega Empowerment CBO",
    authorImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80&auto=format&fit=crop", // African woman portrait
    date: "June 22, 2026",
    dateISO: "2026-06-22",
    category: "Climate & Environment",
    categoryColor: "from-green-500 to-emerald-600",
    heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop",
    heroImageAlt: "Drought-affected agricultural landscape",
    tags: ["climate change", "agriculture", "resilience", "water"],
    readTime: 7,
    featured: false,
  },
  {
    id: "5",
    slug: "civic-education-lurambi",
    title: "Understanding Your Rights: How Civic Education is Transforming Participation in Lurambi",
    excerpt:
      "In a county where voter turnout has historically lagged national averages, a civic education programme is empowering citizens to demand accountability from their leaders.",
    content: `
In a county where voter turnout has historically lagged national averages, a civic education programme is empowering citizens to demand accountability from their leaders.

In the 2022 general elections, Kakamega County recorded a voter turnout of 62% — below the national average of 65%. In some wards, fewer than half of registered voters cast their ballots. Analysts attribute this partly to voter apathy, but community members offer a different explanation: many people do not believe their vote will translate into change, because they have never seen elected leaders respond to community needs.

Kakamega Empowerment CBO's Civic Education Programme, launched in 2023, takes a different approach from traditional voter education. Rather than simply telling people to vote, it equips them with the knowledge and tools to participate meaningfully in governance at every level — not just during elections.

**What Citizens Learn**

The programme covers five key areas:

1. **Constitutional Rights**: Participants learn about their rights under the 2010 Constitution — including the right to health, education, clean water, and a clean environment — and how to claim them.

2. **County Government Structure**: Most citizens are unfamiliar with the roles of the governor, county assembly, sub-county administrators, and ward representatives. The programme uses role-plays and case studies to make these structures tangible.

3. **Budget Tracking**: Citizens learn how to access county budget documents, interpret them, and identify discrepancies between budget allocations and actual expenditure. In Lurambi, this led to the discovery that KSh 2.3 million allocated for road maintenance in 2023 had never been spent.

4. **Public Participation**: The County Government Act requires public participation in major decisions. The programme trains citizens to participate effectively in budget hearings, spatial planning consultations, and environmental impact assessments.

5. **Petitioning and Advocacy**: Participants learn how to draft petitions, engage with county officials, and use the media and social platforms to amplify community concerns.

**A Community Wins Change**

When residents of the Lurambi estate noticed that a garbage collection service contracted by the county government had not operated for six months, a group trained under the civic education programme mobilised. They documented the non-delivery of services, held a public meeting with the ward representative, and submitted a formal petition to the County Environment Committee.

Within three weeks, the contractor was replaced and garbage collection resumed. It was a small victory — but it demonstrated to community members that collective action can produce results.

> "For the first time, I understand how county government works," says Agnes Khisa, a Lurambi resident and programme graduate. "And more importantly, I know what to do when it doesn't work for us."
    `.trim(),
    author: "Samuel Ochieng",
    authorRole: "Civic Education Lead, Kakamega Empowerment CBO",
    authorImage: "https://images.unsplash.com/photo-1542178243-bc20204b769f?w=200&q=80&auto=format&fit=crop", // African man portrait
    date: "June 5, 2026",
    dateISO: "2026-06-05",
    category: "Civic Education",
    categoryColor: "from-blue-500 to-cyan-600",
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&auto=format&fit=crop",
    heroImageAlt: "Community meeting in progress",
    tags: ["civic education", "governance", "accountability", "participation"],
    readTime: 6,
    featured: false,
  },
  {
    id: "6",
    slug: "menstrual-health-school-girls",
    title: "Breaking the Silence: How Menstrual Health Education is Keeping Girls in School",
    excerpt:
      "In many parts of Kakamega County, girls miss up to a week of school every month due to menstrual stigma and lack of access to sanitary products. A targeted programme is changing that.",
    content: `
In many parts of Kakamega County, girls miss up to a week of school every month due to menstrual stigma and lack of access to sanitary products. A targeted programme is changing that.

The statistics are striking. A study by the Ministry of Education found that girls in rural Western Kenya miss an average of 4.3 school days per month during menstruation — roughly 48 school days per year. This translates to a significant learning gap that compounds across years, contributing to higher dropout rates among girls.

The causes are well-documented: stigma surrounding menstruation, lack of affordable sanitary products, inadequate water and sanitation facilities in schools, and insufficient menstrual health education. For girls from poor families, buying sanitary pads is often a choice between menstruation supplies and food.

**The Menstrual Health Programme**

Since 2024, Kakamega Empowerment CBO has been running a comprehensive menstrual health programme in 16 primary and secondary schools across Butere, Lurambi, and Ikolomani sub-counties. The programme has four components:

**Dignity Kit Distribution**: Every girl in the programme receives four reusable menstrual cups or cloth sanitary pad kits per year, along with two pairs of waterproof underwear. Reusable products are preferred because they are more cost-effective and sustainable — a single menstrual cup can last up to 10 years.

**Education and Sensitisation**: A six-session curriculum covers menstrual biology, hygiene management, managing menstrual pain, and debunking myths and stigma. Importantly, boys are included — because changing the culture around menstruation requires engaging men and boys as allies.

**Infrastructure Support**: The programme has rehabilitated water, sanitation, and hygiene (WASH) facilities in 12 schools, including the installation of private changing rooms and disposal units.

**Income Generation for Mothers**: In partnership with local women's groups, the programme supports the local production of reusable sanitary pads, creating both supply chain self-sufficiency and income opportunities for women.

**Results After Two Years**

In schools participating in the programme for two years, girls' attendance has improved by an average of 31%. Teacher reports indicate that girls are more confident and participatory in class. And perhaps most significantly, 78% of boys surveyed say they now understand menstruation and treat girls with more respect during their periods.

> "Before this programme, I used to stay home every month," says 14-year-old Sharon Atieno, a Standard 8 student in Butere. "I was afraid of staining my uniform and being laughed at. Now I come to school every day. I can now focus on my exams."
    `.trim(),
    author: "Fatuma Ibrahim",
    authorRole: "Gender & Inclusion Officer, Kakamega Empowerment CBO",
    authorImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80&auto=format&fit=crop", // African woman portrait
    date: "May 15, 2026",
    dateISO: "2026-05-15",
    category: "Gender Equality",
    categoryColor: "from-purple-500 to-pink-600",
    heroImage: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&q=80&auto=format&fit=crop", // African school children
    heroImageAlt: "African school girls in classroom",
    tags: ["gender equality", "education", "health", "women's rights"],
    readTime: 7,
    featured: false,
  },
  {
    id: "7",
    slug: "river-restoration-mumias",
    title: "Reviving the Lushewa: A Community-Driven River Restoration Story",
    excerpt:
      "Once a source of drinking water and fish for thousands, the Lushewa River had become an open sewer. A three-year restoration effort shows what communities can achieve when they take back their waterways.",
    content: `
Once a source of drinking water and fish for thousands, the Lushewa River had become an open sewer. A three-year restoration effort shows what communities can achieve when they take back their waterways.

The Lushewa River winds through Shinyalu and Mumias East sub-counties, draining into the Yala Swamp. For generations, local communities depended on it for drinking water, irrigation, and fish — *Lushewa* in Luhya means "the good water." But by 2020, the river had become a shadow of itself.

Deforestation of the riverbanks had accelerated soil erosion, turning the water brown during rains and drastically reducing dry-season flow. Informal settlements upstream were discharging untreated sewage directly into the river. Sugar factories in Mumias were discharging effluent with minimal treatment. The fish population had collapsed, depriving local fishermen of their livelihoods.

**The Restoration Plan**

In 2023, Kakamega Empowerment CBO, in partnership with the Water Resources Authority and the County Department of Water, launched the Lushewa River Restoration Project. The approach was explicitly community-led: the CBO facilitated a River User Committee comprising farmers, fishermen, traders, women's groups, and schools along the river's 18-kilometre stretch.

The Committee developed a restoration action plan with four priorities:

1. **Riparian zone rehabilitation**: Community members planted over 12,000 native trees and grasses along the riverbanks to stabilise soil, provide shade, and filter agricultural runoff. Schools along the river were engaged as "river guardians" — students monitor specific river stretches and report illegal activities.

2. **Sewage and waste management**: The CBO lobbied the county government to extend sewerage services to informal settlements, and worked with community groups to construct community latrines where services were unavailable. A river clean-up campaign mobilised over 800 volunteers and removed three tonnes of solid waste.

3. **Agricultural runoff reduction**: Farmers received training on integrated pest management and agroforestry techniques to reduce the volume of fertilisers and pesticides reaching the river. The CBO also negotiated with sugar factories to improve their effluent treatment.

4. **Livelihood restoration**: As water quality improved, the CBO supported the re-establishment of fishing livelihoods by restocking the river with indigenous fish species and providing fishermen with sustainable harvesting training.

**The Turnaround**

By mid-2026, water quality tests at three monitoring points showed a 65% reduction in biological oxygen demand — a key indicator of organic pollution. Fish catches along the river have doubled since 2023. And for the first time in five years, the river is flowing clear during the dry season.

> "My grandfather used to tell me stories about how clean this river was," says James Makori, a fisherman from Shinyalu. "I never believed him. Now I am seeing it with my own eyes. This river can be that clean again."
    `.trim(),
    author: "Grace Nabiswa",
    authorRole: "Environmental Programme Officer, Kakamega Empowerment CBO",
    authorImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&q=80&auto=format&fit=crop", // African woman portrait
    date: "April 28, 2026",
    dateISO: "2026-04-28",
    category: "Climate & Environment",
    categoryColor: "from-green-500 to-emerald-600",
    heroImage: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&q=80&auto=format&fit=crop",
    heroImageAlt: "Restored river flowing through green landscape",
    tags: ["river restoration", "water", "environment", "community"],
    readTime: 7,
    featured: true,
  },
  {
    id: "8",
    slug: "human-rights-defenders-kakamega",
    title: "Standing Up for Rights: The Human Rights Defenders Protecting Kakamega's Marginalised",
    excerpt:
      "In a county where land grabbing, police brutality, and environmental destruction often go unchallenged, a network of community human rights defenders is making a difference.",
    content: `
In a county where land grabbing, police brutality, and environmental destruction often go unchallenged, a network of community human rights defenders is making a difference.

Kenya has a troubled relationship with human rights. While the 2010 Constitution elevated rights protections to the highest level, enforcement remains inconsistent — particularly for rural communities with limited access to legal support and justice mechanisms.

In Kakamega County, human rights violations take many forms. Land is grabbed from widows and orphans under the guise of customary law. Environmental polluters discharge waste into rivers and air with impunity. Police officers extract bribes or use excessive force with little accountability. And those who speak out face intimidation, threats, and in extreme cases, violence.

**The Human Rights Defenders Network**

In response, Kakamega Empowerment CBO helped establish the Kakamega Human Rights Defenders Network in 2024 — a community-based network of 34 trained defenders operating across all 12 sub-counties. Defenders are community members — farmers, teachers, youth leaders, and religious leaders — who have received training in human rights documentation, peaceful advocacy, and legal referral.

The Network operates on three principles: **non-violence**, **independence**, and **community accountability**. Defenders do not take sides in political contests, do not receive funding from political parties, and answer to the communities they serve.

**Documenting Violations**

A key function of the Network is documenting human rights violations. Defenders use a standardised incident reporting form — adapted from methodologies developed by the Kenya National Commission on Human Rights — to record cases. Cases are then categorised and referred to appropriate mechanisms: the police's Independent Policing Oversight Authority (IPOA), the Ethics and Anti-Corruption Commission (EACC), or civil society legal partners.

In its first year, the Network documented 127 cases of alleged human rights violations across Kakamega County. Of these, 34 were referred for legal action, 22 were resolved through community mediation, and 11 were escalated to national institutions.

**Supporting the Defenders**

Human rights work is not without personal risk. Several defenders in the Network have faced intimidation — anonymous phone calls, property damage, and social media harassment. The CBO provides defenders with security support, including legal aid for defenders facing litigation, psychosocial support, and temporary relocation assistance when necessary.

> "When you stand up for someone else's rights, you risk your own," says one defender who asked to remain anonymous. "But silence is complicity. I would rather face threats than live knowing I did nothing."
    `.trim(),
    author: "Advocate Teresa Mwanga",
    authorRole: "Human Rights Programme Lead, Kakamega Empowerment CBO",
    authorImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80&auto=format&fit=crop", // African woman portrait
    date: "April 10, 2026",
    dateISO: "2026-04-10",
    category: "Human Rights",
    categoryColor: "from-pink-500 to-rose-600",
    heroImage: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=1200&q=80&auto=format&fit=crop", // African community gathering
    heroImageAlt: "African community members gathered for human rights awareness",
    tags: ["human rights", "defenders", "accountability", "justice"],
    readTime: 7,
    featured: false,
  },
];

export const BLOG_CATEGORIES = [
  { name: "All Posts", icon: "📚", count: BLOG_POSTS.length },
  { name: "Climate & Environment", icon: "🌍", color: "from-green-500 to-emerald-600", count: BLOG_POSTS.filter(p => p.category === "Climate & Environment").length },
  { name: "Civic Education", icon: "🏛️", color: "from-blue-500 to-cyan-600", count: BLOG_POSTS.filter(p => p.category === "Civic Education").length },
  { name: "Land Rights", icon: "⚖️", color: "from-amber-500 to-orange-600", count: BLOG_POSTS.filter(p => p.category === "Land Rights").length },
  { name: "Human Rights", icon: "🛡️", color: "from-pink-500 to-rose-600", count: BLOG_POSTS.filter(p => p.category === "Human Rights").length },
  { name: "Gender Equality", icon: "⚧️", color: "from-purple-500 to-pink-600", count: BLOG_POSTS.filter(p => p.category === "Gender Equality").length },
  { name: "Community Empowerment", icon: "💪", color: "from-teal-500 to-cyan-600", count: BLOG_POSTS.filter(p => p.category === "Community Empowerment").length },
];

export function getFeaturedPosts(): BlogPost[] {
  return BLOG_POSTS.filter(p => p.featured);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "All Posts") return BLOG_POSTS;
  return BLOG_POSTS.filter(p => p.category === category);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return BLOG_POSTS
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t))))
    .slice(0, limit);
}
