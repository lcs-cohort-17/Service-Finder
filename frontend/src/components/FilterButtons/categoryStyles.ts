import {
  BookOpen,
  Bus,
  Cross,
  Flame,
  GraduationCap,
  Landmark,
  PawPrint,
  Pill,
  ShieldCheck,
  ShoppingBag,
  Smile,
  Stethoscope,
  Tent,
} from "lucide-react";

import type { IconNode, LucideIcon } from "lucide-react";

export interface CategoryStyle {
  label: string;
  icon: LucideIcon;
  color: string;
}

type LucideIconWithRender = LucideIcon & {
  render?: (
    props: Record<string, unknown>,
    ref: unknown
  ) => {
    props?: {
      iconNode?: IconNode;
    };
  };
};

export type CategoryKey =
  | "Clinics"
  | "Libraries"
  | "Shelters"
  | "Hospitals"
  | "Police Stations"
  | "Pharmacies"
  | "Dentists"
  | "SPCA"
  | "Fire Stations"
  | "Home Affairs"
  | "Malls"
  | "Transport"
  | "Education";

export const CATEGORY_STYLES: Record<CategoryKey, CategoryStyle> = {
  Clinics: {
    label: "Clinics",
    icon: Stethoscope,
    color: "#06B6D4",
  },
  Libraries: {
    label: "Libraries",
    icon: BookOpen,
    color: "#2563EB",
  },
  Shelters: {
    label: "Shelters",
    icon: Tent,
    color: "#F59E0B",
  },
  Hospitals: {
    label: "Hospitals",
    icon: Cross,
    color: "#EF4444",
  },
  "Police Stations": {
    label: "Police Stations",
    icon: ShieldCheck,
    color: "#1D4ED8",
  },
  Pharmacies: {
    label: "Pharmacies",
    icon: Pill,
    color: "#22C55E",
  },
  Dentists: {
    label: "Dentists",
    icon: Smile,
    color: "#EC4899",
  },
  SPCA: {
    label: "SPCA",
    icon: PawPrint,
    color: "#92400E",
  },
  "Fire Stations": {
    label: "Fire Stations",
    icon: Flame,
    color: "#F97316",
  },
  "Home Affairs": {
    label: "Home Affairs",
    icon: Landmark,
    color: "#6D28D9",
  },
  Malls: {
    label: "Malls",
    icon: ShoppingBag,
    color: "#DB2777",
  },
  Transport: {
    label: "Transport",
    icon: Bus,
    color: "#EAB308",
  },
  Education: {
    label: "Education",
    icon: GraduationCap,
    color: "#4F46E5",
  },
};

export const serviceCategories = Object.entries(CATEGORY_STYLES).map(
  ([id, style]) => ({
    id: id as CategoryKey,
    ...style,
  })
);

const FALLBACK_STYLE: CategoryStyle = {
  label: "Unknown",
  icon: Landmark,
  color: "#71717A",
};

export function getCategoryStyle(category: string): CategoryStyle {
  return CATEGORY_STYLES[category as CategoryKey] ?? FALLBACK_STYLE;
}

const svgToDataUrl = (svg: string): string =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const getLucideIconNode = (icon: LucideIcon): IconNode =>
  (icon as LucideIconWithRender).render?.({}, null)?.props?.iconNode ?? [];

const escapeSvgAttribute = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const renderLucideIconNode = (iconNode: IconNode): string =>
  iconNode
    .map(([tagName, attrs]) => {
      const renderedAttrs = Object.entries(attrs)
        .filter(([attrName]) => attrName !== "key")
        .map(
          ([attrName, attrValue]) =>
            `${attrName}="${escapeSvgAttribute(String(attrValue))}"`
        )
        .join(" ");

      return `<${tagName} ${renderedAttrs}/>`;
    })
    .join("");

export function getCategoryMarkerIconUrl(category: string): string {
  const style = getCategoryStyle(category);
  const iconNode = getLucideIconNode(style.icon);

  return svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
      <path fill="${style.color}" d="M12.5 0C5.6 0 0 5.6 0 12.5 0 21.9 12.5 41 12.5 41S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0Z"/>
      <circle cx="12.5" cy="12.5" r="8.25" fill="#FFFFFF"/>
      <svg x="5.25" y="5.25" width="14.5" height="14.5" viewBox="0 0 24 24" fill="none" stroke="${style.color}" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round">
        ${renderLucideIconNode(iconNode)}
      </svg>
    </svg>
  `);
}
