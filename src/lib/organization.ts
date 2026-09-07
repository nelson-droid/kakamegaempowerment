// Centralized organization data
// Use this file as the single source of truth for organization information

export const ORGANIZATION = {
  name: "Kakamega Empowerment CBO",
  shortName: "Kakamega Empowerment",
  tagline: "Empowering Communities, Advancing Rights, Transforming Lives",
  description:
    "Kakamega Empowerment CBO is a community-based organization that works across Kakamega County to empower communities through advocacy, civic engagement, climate action, land rights protection, and social accountability initiatives that promote sustainable development and social cohesion.",
  vision:
    "A just, inclusive, climate-resilient, and empowered society where all citizens enjoy equal rights, access to resources, and meaningful participation in governance.",
  mission:
    "To empower communities through advocacy, civic engagement, climate action, land rights protection, and social accountability initiatives that promote sustainable development and social cohesion.",
  contact: {
    address: "P.O. Box 1495 - 50100, Kakamega, Kenya",
    phone: "+254 703 456 604",
    email: "Kakamegaempowerment1@gmail.com",
  },
  logo: "/kakamega-empowerment-logo-transparent.png",
} as const;

export const CORE_VALUES = [
  {
    icon: "🤝",
    title: "Integrity and Accountability",
    description:
      "Upholding honesty, transparency, and responsibility in all our actions and decisions.",
  },
  {
    icon: "⚖️",
    title: "Equity and Social Justice",
    description:
      "Promoting fairness, equal treatment, and access to opportunities for all community members.",
  },
  {
    icon: "👥",
    title: "Participation and Inclusion",
    description:
      "Ensuring all voices, especially those of marginalized groups, are heard and included in our work.",
  },
  {
    icon: "🌍",
    title: "Environmental Stewardship",
    description:
      "Protecting and restoring our natural environment for current and future generations.",
  },
  {
    icon: "👁️",
    title: "Transparency",
    description:
      "Operating with openness and clarity in our processes, decisions, and use of resources.",
  },
  {
    icon: "💪",
    title: "Community Empowerment",
    description:
      "Building the capacity of communities to take ownership of their development journey.",
  },
  {
    icon: "⚧️",
    title: "Gender Equality",
    description:
      "Promoting equal rights, opportunities, and participation for all genders.",
  },
] as const;

export const STRATEGIC_OBJECTIVES = [
  {
    number: 1,
    title: "Governance & Accountability",
    description:
      "Strengthen citizen participation in governance and public accountability processes.",
    impact: "Increased citizen engagement in governance and improved accountability in public institutions.",
    color: "from-blue-500 to-cyan-600",
    icon: "🏛️",
    href: "/governance",
  },
  {
    number: 2,
    title: "Climate Resilience",
    description:
      "Enhance community resilience to climate change and environmental degradation.",
    impact: "Enhanced climate resilience and improved environmental conservation.",
    color: "from-green-500 to-emerald-600",
    icon: "🌱",
    href: "/climate-action",
  },
  {
    number: 3,
    title: "Land Rights & Justice",
    description:
      "Promote protection of land rights and access to justice for vulnerable groups.",
    impact: "Reduced land rights violations and injustices in our communities.",
    color: "from-amber-500 to-orange-600",
    icon: "⚖️",
    href: "/land-rights",
  },
  {
    number: 4,
    title: "Human Rights & Inclusion",
    description:
      "Advance human rights, gender equality, and social inclusion.",
    impact: "Improved protection of human rights for marginalized groups and stronger community empowerment.",
    color: "from-pink-500 to-rose-600",
    icon: "🤝",
    href: "/human-rights",
  },
  {
    number: 5,
    title: "Social Cohesion",
    description: "Foster peaceful coexistence and social cohesion within communities.",
    impact: "Stronger social cohesion across all twelve sub-counties of Kakamega County.",
    color: "from-purple-500 to-violet-600",
    icon: "🕊️",
    href: "/our-work",
  },
] as const;

export const THEMATIC_AREAS = [
  {
    icon: "🏛️",
    title: "Governance & Advocacy",
    description:
      "Promoting citizen participation, public participation, budget advocacy, and transparent governance across Kakamega County.",
    color: "from-blue-500 to-cyan-600",
    href: "/governance",
    activities: [
      "Citizen participation in governance",
      "Public participation in budgeting",
      "Budget advocacy and monitoring",
      "County service delivery monitoring",
      "Government accountability",
      "Youth and women leadership development",
    ],
  },
  {
    icon: "🌱",
    title: "Climate & Environment",
    description:
      "Building climate resilience through tree planting, ecosystem restoration, climate-smart agriculture, and watershed protection.",
    color: "from-green-500 to-emerald-600",
    href: "/climate-action",
    activities: [
      "Climate awareness and education",
      "Tree planting and ecosystem restoration",
      "Climate-smart agriculture",
      "Water conservation and watershed protection",
      "Climate governance and financing",
    ],
  },
  {
    icon: "⚖️",
    title: "Land Rights & Natural Resource Governance",
    description:
      "Promoting community land rights, property rights, inheritance rights, and transparent land administration for vulnerable groups.",
    color: "from-amber-500 to-orange-600",
    href: "/land-rights",
    activities: [
      "Community land rights awareness",
      "Property and inheritance rights",
      "Support for widows and vulnerable groups",
      "Land law awareness and education",
      "Dispute resolution support",
      "Transparent land administration",
    ],
  },
  {
    icon: "🤝",
    title: "Human Rights & Social Justice",
    description:
      "Advancing human rights, gender equality, social inclusion, access to justice, and peaceful coexistence.",
    color: "from-pink-500 to-rose-600",
    href: "/human-rights",
    activities: [
      "Fighting discrimination",
      "Inclusion of vulnerable groups",
      "Access to justice and legal empowerment",
      "Gender equality and women's rights",
      "Community dialogue and peaceful coexistence",
      "Reporting rights violations",
    ],
  },
] as const;

export const TARGET_BENEFICIARIES = [
  { label: "Women and Girls", icon: "👩" },
  { label: "Youth", icon: "🧑‍🎓" },
  { label: "Widows", icon: "🤱" },
  { label: "Persons with Disabilities", icon: "♿" },
  { label: "Smallholder Farmers", icon: "🌾" },
  { label: "Community Leaders", icon: "🧑‍🤝‍🧑" },
  { label: "Marginalized Communities", icon: "🤲" },
  { label: "Civil Society Groups", icon: "🏘️" },
] as const;

export const KAKAMEGA_SUB_COUNTIES = [
  "Lugari",
  "Likuyani",
  "Malava",
  "Lurambi",
  "Navakholo",
  "Mumias West",
  "Mumias East",
  "Matungu",
  "Butere",
  "Khwisero",
  "Shinyalu",
  "Ikolomani",
] as const;