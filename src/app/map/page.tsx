"use client";

import { useEffect, useState } from "react";
import { Navigation, Footer } from "@/components/ui";

// ============================================================
// KAKAMEGA COUNTY BOUNDARY (simplified GeoJSON polygon)
// Roughly matches the actual county outline
// ============================================================
const KAKAMEGA_GEOJSON = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: { name: "Kakamega County" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [34.350, -0.050],
            [34.520, -0.060],
            [34.700, -0.080],
            [34.880, 0.100],
            [35.000, 0.250],
            [35.100, 0.400],
            [35.050, 0.520],
            [34.950, 0.580],
            [34.800, 0.620],
            [34.620, 0.640],
            [34.450, 0.620],
            [34.300, 0.540],
            [34.180, 0.420],
            [34.080, 0.300],
            [34.000, 0.150],
            [33.950, 0.000],
            [34.000, -0.100],
            [34.200, -0.080],
            [34.350, -0.050],
          ],
        ],
      },
    },
  ],
};

// Map data — 48 projects across all 12 Kakamega sub-counties
const PROJECT_LOCATIONS = [
  // --- Lugari (0.1892, 34.6234) — 4 projects ---
  {
    id: 1,
    name: "Lugari Forest Corridor",
    type: "forest",
    lat: 0.1892,
    lng: 34.6234,
    description: "Establishing a continuous forest corridor connecting isolated woodland fragments for wildlife migration and watershed protection.",
    status: "active",
    trees: 4200,
  },
  {
    id: 2,
    name: "Lugari Secondary Greening",
    type: "school",
    lat: 0.1934,
    lng: 34.6312,
    description: "Planting indigenous trees on school grounds and training students in nursery management and environmental monitoring.",
    status: "active",
    trees: 850,
  },
  {
    id: 3,
    name: "Lugari River Safeguard",
    type: "river",
    lat: 0.1823,
    lng: 34.6156,
    description: "Riparian zone restoration along the Lukususi River to prevent soil erosion and filter agricultural runoff.",
    status: "active",
    trees: 1100,
  },
  {
    id: 4,
    name: "Lugari Small-Scale Farmers Agroforestry",
    type: "farm",
    lat: 0.2012,
    lng: 34.6412,
    description: "Training 120 smallholder farmers to integrate nitrogen-fixing trees with maize and bean cultivation for improved soil health.",
    status: "planning",
    trees: 0,
  },

  // --- Likuyani (0.2567, 34.5234) — 4 projects ---
  {
    id: 5,
    name: "Likuyani Hillside Forest",
    type: "forest",
    lat: 0.2567,
    lng: 34.5234,
    description: "Revegetating eroding hillside terrain with a mix of indigenous hardwoods and fruit trees to stabilise soil and support livelihoods.",
    status: "active",
    trees: 3650,
  },
  {
    id: 6,
    name: "Likuyani Girls STEM & Environment Club",
    type: "school",
    lat: 0.2612,
    lng: 34.5301,
    description: "Empowering girls through environmental science curriculum, tree-nursery hands-on training, and leadership workshops.",
    status: "active",
    trees: 620,
  },
  {
    id: 7,
    name: "Likuyani Wetland Sanctuary",
    type: "wetland",
    lat: 0.2434,
    lng: 34.5112,
    description: "Protecting a seasonal wetland that provides habitat for over 40 bird species and recharges local boreholes.",
    status: "planning",
    trees: 300,
  },
  {
    id: 8,
    name: "Likuyani Youth Green Skills Hub",
    type: "youth",
    lat: 0.2501,
    lng: 34.5189,
    description: "Equipping young people with vocational skills in sustainable construction, renewable energy, and nursery enterprise development.",
    status: "active",
    trees: 480,
  },

  // --- Malava (0.4723, 34.8567) — 4 projects ---
  {
    id: 9,
    name: "Malava Forest Reserve Expansion",
    type: "forest",
    lat: 0.4723,
    lng: 34.8567,
    description: "Expanding the existing Malava Forest Reserve by 80 hectares through community nursery programs and guided planting events.",
    status: "active",
    trees: 5000,
  },
  {
    id: 10,
    name: "Malava Technical Training Centre",
    type: "school",
    lat: 0.4801,
    lng: 34.8634,
    description: "Integrating environmental restoration modules into technical training with a focus on afforestation and ecosystem monitoring.",
    status: "active",
    trees: 920,
  },
  {
    id: 11,
    name: "Malava Dam Catchment Restoration",
    type: "river",
    lat: 0.4656,
    lng: 34.8490,
    description: "Revegetating the catchment area of the Malava Dam to reduce sedimentation and maintain water quality for surrounding communities.",
    status: "active",
    trees: 2800,
  },
  {
    id: 12,
    name: "Malava Heritage Tree Nursery",
    type: "garden",
    lat: 0.4789,
    lng: 34.8701,
    description: "A community-run nursery specialising in indigenous and culturally significant tree species for conservation and community planting.",
    status: "active",
    trees: 740,
  },

  // --- Lurambi (0.2827, 34.752) — 4 projects ---
  {
    id: 13,
    name: "Lurambi Urban Green Belt",
    type: "park",
    lat: 0.2827,
    lng: 34.752,
    description: "Creating a linear urban green corridor along the main highway that connects parks, schools, and residential areas.",
    status: "active",
    trees: 3100,
  },
  {
    id: 14,
    name: "Kakamega Central Secondary",
    type: "school",
    lat: 0.2878,
    lng: 34.7601,
    description: "Establishing food forests and a permaculture learning garden at the county's largest secondary school.",
    status: "active",
    trees: 1650,
  },
  {
    id: 15,
    name: "Lurambi Environmental Governance Forum",
    type: "governance",
    lat: 0.2845,
    lng: 34.7567,
    description: "A sub-county forum bringing together community leaders, government agencies, and NGOs to coordinate environmental policy.",
    status: "active",
    trees: 0,
  },
  {
    id: 16,
    name: "Lurambi Residents Against Deforestation",
    type: "rights",
    lat: 0.2901,
    lng: 34.7645,
    description: "A community-led rights initiative defending indigenous forest communities' land tenure and opposing illegal land allocations.",
    status: "active",
    trees: 250,
  },

  // --- Navakholo (0.3123, 34.6234) — 4 projects ---
  {
    id: 17,
    name: "Navakholo Community Forest",
    type: "forest",
    lat: 0.3123,
    lng: 34.6234,
    description: "A communal forest managed by 8 village elders' groups, combining timber production with biodiversity conservation.",
    status: "active",
    trees: 3900,
  },
  {
    id: 18,
    name: "Navakholo Primary School Garden",
    type: "school",
    lat: 0.3201,
    lng: 34.6301,
    description: "School garden project where pupils learn composting, seed saving, and organic vegetable production alongside tree planting.",
    status: "active",
    trees: 430,
  },
  {
    id: 19,
    name: "Navakholo Yam Growers Agroforestry",
    type: "farm",
    lat: 0.3067,
    lng: 34.6112,
    description: "Integrating fertiliser trees into yam and cassava farms to restore soil organic matter and boost crop yields for 85 households.",
    status: "active",
    trees: 1200,
  },
  {
    id: 20,
    name: "Navakholo Wetland & Bird Sanctuary",
    type: "wetland",
    lat: 0.3256,
    lng: 34.6401,
    description: "Restoring a 15-hectare seasonal wetland that provides critical habitat for the Papyrus Gonolek and other endemic species.",
    status: "planning",
    trees: 600,
  },

  // --- Mumias West (0.3423, 34.5234) — 4 projects ---
  {
    id: 21,
    name: "Mumias West Sugarcane Farmers Transition",
    type: "farm",
    lat: 0.3423,
    lng: 34.5234,
    description: "Supporting sugarcane outgrowers to diversify into fruit orchards and tree crops, reducing dependence on a single cash crop.",
    status: "planning",
    trees: 0,
  },
  {
    id: 22,
    name: "Mumias West Reforestation Belt",
    type: "forest",
    lat: 0.3512,
    lng: 34.5301,
    description: "Establishing a 3-km tree belt along the Mumias–Kakamega road to restore degraded former sugarcane lands.",
    status: "active",
    trees: 2750,
  },
  {
    id: 23,
    name: "Mumias West Youth Environmental Action",
    type: "youth",
    lat: 0.3378,
    lng: 34.5178,
    description: "A youth-led initiative organising community clean-ups, tree planting days, and environmental awareness campaigns.",
    status: "active",
    trees: 560,
  },
  {
    id: 24,
    name: "Mumias West Land Rights Advocacy",
    type: "rights",
    lat: 0.3456,
    lng: 34.5267,
    description: "Supporting community members to secure land titles and protect customary land from speculative land-grabbing.",
    status: "active",
    trees: 0,
  },

  // --- Mumias East (0.3823, 34.6234) — 4 projects ---
  {
    id: 25,
    name: "Mumias East Bamboo Corridor",
    type: "forest",
    lat: 0.3823,
    lng: 34.6234,
    description: "Planting bamboo along degraded hillsides and road reserves to provide fast-growing erosion control and craft-material income.",
    status: "active",
    trees: 3300,
  },
  {
    id: 26,
    name: "Mumias East Girls Conservation Fellowship",
    type: "school",
    lat: 0.3890,
    lng: 34.6301,
    description: "A fellowship program for secondary school girls combining conservation leadership training with community project placements.",
    status: "active",
    trees: 310,
  },
  {
    id: 27,
    name: "Mumias East River Basin Project",
    type: "river",
    lat: 0.3767,
    lng: 34.6112,
    description: "Comprehensive restoration of a 6-km river reach including native vegetation planting, weir construction, and fish habitat enhancement.",
    status: "active",
    trees: 1950,
  },
  {
    id: 28,
    name: "Mumias East Community Orchard Park",
    type: "park",
    lat: 0.3856,
    lng: 34.6378,
    description: "A public park planted with over 30 varieties of indigenous and exotic fruit trees, serving as an educational and recreational space.",
    status: "active",
    trees: 1100,
  },

  // --- Matungu (0.4223, 34.5234) — 4 projects ---
  {
    id: 29,
    name: "Matungu Forest Edge Restoration",
    type: "forest",
    lat: 0.4223,
    lng: 34.5234,
    description: "Restoring the transition zone between farmland and remnant forest patches to create ecological corridors for pollinators.",
    status: "active",
    trees: 2100,
  },
  {
    id: 30,
    name: "Matungu Mixed Farm Agroforestry",
    type: "farm",
    lat: 0.4178,
    lng: 34.5101,
    description: "Teaching intercropping of Grevillea shade trees with food crops, improving microclimate and soil fertility on small farms.",
    status: "active",
    trees: 890,
  },
  {
    id: 31,
    name: "Matungu Community Kitchen Garden",
    type: "garden",
    lat: 0.4289,
    lng: 34.5312,
    description: "Over 200 household kitchen gardens growing vegetables and medicinal plants, supported by a community seed bank.",
    status: "active",
    trees: 150,
  },
  {
    id: 32,
    name: "Matungu Wetland Buffer Zone",
    type: "wetland",
    lat: 0.4156,
    lng: 34.5178,
    description: "Establishing a buffer of native grasses and shrubs around a critical wetland to filter farm runoff and protect water quality.",
    status: "planning",
    trees: 700,
  },

  // --- Butere (0.4523, 34.6234) — 4 projects ---
  {
    id: 33,
    name: "Butere Hills Forest Restoration",
    type: "forest",
    lat: 0.4523,
    lng: 34.6234,
    description: "Restoring steep hillside forests on community land to prevent landslides and protect the Ikuywa River downstream.",
    status: "active",
    trees: 4500,
  },
  {
    id: 34,
    name: "Butere Girls Conservation Academy",
    type: "school",
    lat: 0.4601,
    lng: 34.6312,
    description: "A residential academy for 60 girls offering environmental education, leadership skills, and conservation career pathways.",
    status: "active",
    trees: 680,
  },
  {
    id: 35,
    name: "Butere Community Forest Governance",
    type: "governance",
    lat: 0.4489,
    lng: 34.6156,
    description: "Developing a community forest management plan with elected forest monitors, transparent benefit-sharing, and sustainable harvest rules.",
    status: "active",
    trees: 0,
  },
  {
    id: 36,
    name: "Butere Water Rights & Access Campaign",
    type: "rights",
    lat: 0.4567,
    lng: 34.6289,
    description: "Advocating for equitable water access and opposing industrial pollution of rivers serving rural communities in Butere sub-county.",
    status: "planning",
    trees: 0,
  },

  // --- Khwisero (0.4923, 34.7234) — 4 projects ---
  {
    id: 37,
    name: "Khwisero Mountain Forest Project",
    type: "forest",
    lat: 0.4923,
    lng: 34.7234,
    description: "Large-scale reforestation of denuded mountain slopes above Khwisero trading centre, targeting 5,000 trees in the first phase.",
    status: "active",
    trees: 3800,
  },
  {
    id: 38,
    name: "Khwisero Youth Tree Enterprise",
    type: "youth",
    lat: 0.4989,
    lng: 34.7301,
    description: "A youth enterprise group running a commercial tree nursery that supplies planting stock to the sub-county and generates income.",
    status: "active",
    trees: 520,
  },
  {
    id: 39,
    name: "Khwisero Wetland Conservation",
    type: "wetland",
    lat: 0.4834,
    lng: 34.7101,
    description: "Community-based management of a highland wetland that sustains livestock grazing and provides dry-season water for 300 households.",
    status: "active",
    trees: 950,
  },
  {
    id: 40,
    name: "Khwisero Schools Greening Network",
    type: "school",
    lat: 0.4878,
    lng: 34.7189,
    description: "A network of 8 primary schools participating in coordinated tree planting, environmental clubs, and tree-nursery competitions.",
    status: "active",
    trees: 1250,
  },

  // --- Shinyalu (0.4123, 34.6891) — 4 projects ---
  {
    id: 41,
    name: "Shinyalu Indigenous Forest Guard",
    type: "forest",
    lat: 0.4123,
    lng: 34.6891,
    description: "Deploying community forest monitors to patrol and protect remaining indigenous forest fragments from illegal logging and charcoal production.",
    status: "active",
    trees: 2600,
  },
  {
    id: 42,
    name: "Shinyalu Youth Advocacy Network",
    type: "youth",
    lat: 0.4189,
    lng: 34.6956,
    description: "A youth-led advocacy network raising awareness about deforestation, water pollution, and mining impacts on Kakamega's ecosystems.",
    status: "active",
    trees: 0,
  },
  {
    id: 43,
    name: "Shinyalu Community Food Forest",
    type: "garden",
    lat: 0.4056,
    lng: 34.6812,
    description: "A multi-strata food forest maintained by the community, providing fresh fruit and nuts while demonstrating agroecological principles.",
    status: "active",
    trees: 1400,
  },
  {
    id: 44,
    name: "Shinyalu River Restoration",
    type: "river",
    lat: 0.4223,
    lng: 34.7012,
    description: "Restoring riverbank vegetation along a 4-km stretch of the Lushewa River, including riverbank stabilisation and native tree planting.",
    status: "active",
    trees: 1700,
  },

  // --- Ikolomani (0.3523, 34.7891) — 4 projects ---
  {
    id: 45,
    name: "Ikolomani Hilltop Forest",
    type: "forest",
    lat: 0.3523,
    lng: 34.7891,
    description: "Revegetating a degraded hilltop with a mix of indigenous trees, medicinal plants, and bee-friendly species for apiculture.",
    status: "active",
    trees: 2900,
  },
  {
    id: 46,
    name: "Ikolomani Governance & Accountability Hub",
    type: "governance",
    lat: 0.3601,
    lng: 34.7956,
    description: "A community hub providing resources, training, and legal support to help citizens engage with county government on environmental decisions.",
    status: "active",
    trees: 0,
  },
  {
    id: 47,
    name: "Ikolomani Community Vegetable Garden",
    type: "garden",
    lat: 0.3467,
    lng: 34.7823,
    description: "A communal vegetable garden project supporting 80 women farmers with irrigation infrastructure, seeds, and organic farming training.",
    status: "active",
    trees: 200,
  },
  {
    id: 48,
    name: "Ikolomani Community Land Rights",
    type: "rights",
    lat: 0.3556,
    lng: 34.8012,
    description: "A community-led initiative to document and protect customary land rights, preventing displacement from speculative development.",
    status: "planning",
    trees: 0,
  },
];

const LEGEND_ITEMS = [
  { type: "forest", label: "Forest Restoration", color: "bg-green-600" },
  { type: "school", label: "School Program", color: "bg-blue-600" },
  { type: "river", label: "Water Protection", color: "bg-cyan-600" },
  { type: "farm", label: "Agroforestry", color: "bg-amber-600" },
  { type: "garden", label: "Community Garden", color: "bg-emerald-600" },
  { type: "wetland", label: "Wetland Restoration", color: "bg-teal-600" },
  { type: "park", label: "Urban Park", color: "bg-lime-600" },
  { type: "youth", label: "Youth Initiative", color: "bg-purple-600" },
  { type: "governance", label: "Governance", color: "bg-indigo-600" },
  { type: "rights", label: "Rights & Advocacy", color: "bg-rose-600" },
];

const TYPE_ICONS: Record<string, string> = {
  forest: "🌲",
  school: "🏫",
  river: "🌊",
  farm: "🌾",
  garden: "🌻",
  wetland: "🦩",
  park: "🏞️",
  youth: "👫",
  governance: "⚖️",
  rights: "✊",
};

export default function MapPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECT_LOCATIONS[0] | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load Leaflet dynamically
  useEffect(() => {
    if (!mounted) return;

    const loadMap = async () => {
      // Load Leaflet CSS
      const linkEl = document.createElement("link");
      linkEl.rel = "stylesheet";
      linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(linkEl);

      // Load Leaflet JS
      const scriptEl = document.createElement("script");
      scriptEl.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      scriptEl.async = true;
      scriptEl.onload = () => {
        setMapLoaded(true);
      };
      document.body.appendChild(scriptEl);
    };

    loadMap();
  }, [mounted]);

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || typeof window === "undefined") return;

    const L = (window as unknown as { L: any }).L;

    // Initialize map centered on Kakamega county
    const map = L.map("map", {
      center: [0.28, 34.65],
      zoom: 10,
      minZoom: 8,
      maxZoom: 16,
      // Lock the view to roughly the Kakamega region
      maxBounds: [
        [-0.15, 33.9],
        [0.7, 35.2],
      ],
      maxBoundsViscosity: 0.85,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    // Add Kakamega county boundary overlay
    const countyLayer = L.geoJSON(KAKAMEGA_GEOJSON as any, {
      style: {
        color: "#15803d",
        weight: 3,
        fillColor: "#22c55e",
        fillOpacity: 0.08,
        dashArray: "6 4",
      },
    }).addTo(map);

    // Tooltip on the county boundary
    countyLayer.bindTooltip("Kakamega County, Kenya", {
      sticky: true,
      className: "kakamega-tooltip",
    });

    // Fit map to county boundary so we only see Kakamega, not all of Western Kenya
    map.fitBounds(countyLayer.getBounds(), { padding: [30, 30] });

    // Add markers
    PROJECT_LOCATIONS.forEach((project) => {
      const color = LEGEND_ITEMS.find((l) => l.type === project.type)?.color || "bg-green-600";
      const iconHtml = `
        <div class="w-10 h-10 rounded-full ${color} flex items-center justify-center text-white text-xl shadow-lg border-2 border-white">
          ${TYPE_ICONS[project.type] || "📍"}
        </div>
      `;

      const icon = L.divIcon({
        html: iconHtml,
        className: "custom-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20],
      });

      const marker = L.marker([project.lat, project.lng], { icon }).addTo(map);
      marker.on("click", () => setSelectedProject(project));
    });

    // Clean up
    return () => {
      map.remove();
    };
  }, [mapLoaded]);

  const filteredProjects =
    filter === "all" ? PROJECT_LOCATIONS : PROJECT_LOCATIONS.filter((p) => p.type === filter);

  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span>🗺️</span>
              <span className="text-white/90 text-sm font-medium">Interactive Map</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Project Map
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
              Explore our environmental projects, tree planting sites, and community initiatives across Kakamega County.
            </p>
          </div>
        </section>

        {/* SECTION HEADING — "Explore Our Projects Across All 12 Sub-Counties" */}
        <section className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Explore Our Projects Across All 12 Sub-Counties
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
              Click any marker on the map to view project details, or browse the full project list below.
            </p>
          </div>
        </section>

      {/* Map Container */}
      <div className="relative">
        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filter:</span>
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === "all"
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                }`}
              >
                All Projects
              </button>
              {LEGEND_ITEMS.map((item) => (
                <button
                  key={item.type}
                  onClick={() => setFilter(item.type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    filter === item.type
                      ? "bg-green-700 text-white"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${item.color}`} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="h-[500px] md:h-[600px] relative">
          {!mounted || !mapLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-slate-800">
              <div className="text-center">
                <div className="animate-spin text-4xl mb-4">🗺️</div>
                <p className="text-gray-500 dark:text-gray-400">Loading map...</p>
              </div>
            </div>
          ) : (
            <div id="map" className="w-full h-full z-0" />
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 rounded-xl shadow-xl p-4 z-[1000] max-w-xs">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Legend</h3>
            <div className="grid grid-cols-2 gap-2">
              {LEGEND_ITEMS.map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full ${item.color}`} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Count */}
          <div className="absolute top-4 right-4 bg-white dark:bg-slate-800 rounded-xl shadow-xl p-4 z-[1000]">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              {filteredProjects.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {filter === "all" ? "Total Projects" : "Filtered Projects"}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Project Detail */}
      {selectedProject && (
        <section className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 p-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl text-white">
                  {TYPE_ICONS[selectedProject.type]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedProject.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {selectedProject.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        selectedProject.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}
                    >
                      {selectedProject.status === "active" ? "● Active" : "○ Planning"}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      📍 {selectedProject.lat.toFixed(4)}, {selectedProject.lng.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {selectedProject.trees.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Trees Planted</div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project List */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            All Projects ({PROJECT_LOCATIONS.length})
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`bg-gray-50 dark:bg-slate-800 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg border-2 ${
                  selectedProject?.id === project.id
                    ? "border-green-500"
                    : "border-transparent hover:border-green-200 dark:hover:border-green-700"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl">
                    {TYPE_ICONS[project.type]}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{project.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          project.status === "active"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                      >
                        {project.status}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        🌳 {project.trees.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Custom styles for map markers */}
      <style jsx global>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-container {
          font-family: inherit;
        }
        .kakamega-tooltip {
          background: #15803d;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          padding: 6px 12px;
        }
        .kakamega-tooltip:before {
          border-top-color: #15803d;
        }
      `}</style>
      </main>
      <Footer />
    </>
  );
}
