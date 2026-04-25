import { PropertyData } from "@/components/data";

export function getMatchScore(p: PropertyData): number {
  const rating = (p.ratingScoreNum / 10) * 35;
  const price = Math.max(0, (700 - p.priceNum) / 700) * 25;
  const amenities = Math.min(p.tagLabels.length / 4, 1) * 20;
  const stars = (p.stars / 5) * 20;
  return Math.min(99, Math.max(65, Math.round(rating + price + amenities + stars)));
}

export function getPriceInsight(p: PropertyData): { label: string; color: string } {
  if (p.oldPrice) return { label: "Great deal vs similar stays", color: "#16A34A" };
  if (p.ratingScoreNum >= 9) return { label: "Price likely to rise", color: "#D97706" };
  if (p.priceNum < 150) return { label: "Best value today", color: "#16A34A" };
  return { label: "Competitive rate", color: "#005CBD" };
}

const TRUST_TABLE = [
  { viewers: 12, bookings: 4 },
  { viewers: 7,  bookings: 2 },
  { viewers: 18, bookings: 6 },
  { viewers: 5,  bookings: 1 },
  { viewers: 9,  bookings: 3 },
  { viewers: 22, bookings: 8 },
  { viewers: 3,  bookings: 1 },
  { viewers: 14, bookings: 5 },
  { viewers: 8,  bookings: 2 },
  { viewers: 16, bookings: 7 },
  { viewers: 6,  bookings: 2 },
  { viewers: 11, bookings: 4 },
];

export function getTrustData(id: string) {
  const idx = (parseInt(id, 10) - 1 + TRUST_TABLE.length) % TRUST_TABLE.length;
  return TRUST_TABLE[idx];
}
