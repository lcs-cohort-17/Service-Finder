import {
  Stethoscope,
  Cross,
  Pill,
  Smile,
  ShieldCheck,
  Flame,
  PawPrint,
  Tent,
  Landmark,
  BookOpen,
  ShoppingBag,
  Bus,
  GraduationCap,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

interface CategoryStyle {
  label: string;
  icon: LucideIcon;
  color: string;
}

export type CategoryKey =
  | "clinics"
  | "libraries"
  | "shelters"
  | "hospitals"
  | "police"
  | "pharmacies"
  | "dentists"
  | "spca"
  | "fire"
  | "homeAffairs"
  | "malls"
  | "transport"
  | "schools";

export const CATEGORY_STYLES: Record<CategoryKey, CategoryStyle> = {

  clinics: {
    label: "Clinics",
    icon: Stethoscope,
    color: "#06B6D4",
  },

  libraries: {
    label: "Libraries",
    icon: BookOpen,
    color: "#2563EB",
  },

  shelters: {
    label: "Shelters",
    icon: Tent,
    color: "#F59E0B",
  },

  hospitals: {
    label: "Hospitals",
    icon: Cross,
    color: "#EF4444",
  },

  police: {
    label: "Police Stations",
    icon: ShieldCheck,
    color: "#1D4ED8",
  },

  pharmacies: {
    label: "Pharmacies",
    icon: Pill,
    color: "#22C55E",
  },

dentists: {
  label: "Dentists",
  icon: Smile,
  color: "#EC4899",
},

  spca: {
    label: "SPCA",
    icon: PawPrint,
    color: "#92400E",
  },

  fire: {
    label: "Fire Station",
    icon: Flame,
    color: "#F97316",
  },

  homeAffairs: {
    label: "Home Affairs",
    icon: Landmark,
    color: "#6D28D9",
  },

  malls: {
    label: "Malls",
    icon: ShoppingBag,
    color: "#DB2777",
  },

  transport: {
    label: "Transport",
    icon: Bus,
    color: "#EAB308",
  },

  schools: {
    label: "Schools / Universities",
    icon: GraduationCap,
    color: "#4F46E5",
  },

};

const FALLBACK_STYLE: CategoryStyle = {

  label: "Unknown",

  icon: Landmark,

  color: "#71717A",

};

export function getCategoryStyle(category: string): CategoryStyle {

  return (
    CATEGORY_STYLES[category as CategoryKey] ??
    FALLBACK_STYLE
  );

}