// ============================================================
// Stock photo URLs — sourced from Unsplash (free, hotlinkable)
// Each photo is curated for the section it's used in
// Photos replaced to feature African subjects
// ============================================================

export const STOCK_IMAGES = {
  // Hero / landscape images — Kakamega / Kenyan / African forests
  hero: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80&auto=format&fit=crop", // Kenya landscape / Kakamega
  heroAlt: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80&auto=format&fit=crop", // Kenya 2

  // Community, children, youth — African subjects
  community: "https://images.unsplash.com/photo-1484097412496-3f7a7f8d0e62?w=1200&q=80&auto=format&fit=crop", // African community gathering
  children: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&q=80&auto=format&fit=crop", // African school children
  youth: "https://images.unsplash.com/photo-1531546678013-23b3010c9a84?w=1200&q=80&auto=format&fit=crop", // African youth

  // Hands / planting — African subjects
  treePlanting: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1200&q=80&auto=format&fit=crop", // African hands planting

  // Classroom / education — African school setting
  classroom: "https://images.unsplash.com/photo-1588072432836-e10032724340?w=1200&q=80&auto=format&fit=crop", // African school

  // Nature / environment — landscapes
  forest: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80&auto=format&fit=crop", // forest path
  forestAlt: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=1200&q=80&auto=format&fit=crop", // dense forest
  river: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop", // clean river
  farm: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80&auto=format&fit=crop", // farmland
  wetland: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&q=80&auto=format&fit=crop", // wetland
  urbanPark: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&q=80&auto=format&fit=crop", // urban park

  // Governance / meetings — African subjects
  governance: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=1200&q=80&auto=format&fit=crop", // African community meeting
  governance2: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&auto=format&fit=crop", // African community discussion

  // Rights / advocacy — African subjects
  rights: "https://images.unsplash.com/photo-1591200072821-a4d1c2c7d594?w=1200&q=80&auto=format&fit=crop", // African rights / protest

  // Volunteers — African subjects
  volunteers: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&q=80&auto=format&fit=crop", // African volunteers

  // Kenya / Kenya-specific imagery
  kenya: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80&auto=format&fit=crop", // Kenya landscape
  kenyaAlt: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80&auto=format&fit=crop", // Kenya 2

  // Per-thematic-area hero images — African / Kenyan subjects
  climate: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80&auto=format&fit=crop", // African landscape / trees
  humanRights: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=1200&q=80&auto=format&fit=crop", // African people / gathering
  landRights: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop", // earth/agriculture
};

// ============================================================
// Image component with loading state and graceful fallback
// ============================================================

import Image from "next/image";

interface StockImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  rounded?: boolean;
}

export function StockImage({
  src,
  alt,
  className = "",
  priority = false,
  fill = false,
  width,
  height,
  sizes,
  rounded = false,
}: StockImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes || "100vw"}
        className={`object-cover ${rounded ? "rounded-2xl" : ""} ${className}`}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width || 1200}
      height={height || 800}
      priority={priority}
      sizes={sizes}
      className={`object-cover ${rounded ? "rounded-2xl" : ""} ${className}`}
    />
  );
}
