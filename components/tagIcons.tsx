import { Wifi, Waves, Coffee, Umbrella, Leaf, Plane, Dumbbell, Car, PawPrint } from "lucide-react";
import { ReactNode } from "react";

const MAP: Record<string, ReactNode> = {
  "Free Wi-Fi": <Wifi size={11} />,
  "Pool": <Waves size={11} />,
  "Breakfast": <Coffee size={11} />,
  "Private Beach": <Umbrella size={11} />,
  "Spa": <Leaf size={11} />,
  "Airport Shuttle": <Plane size={11} />,
  "Gym": <Dumbbell size={11} />,
  "Fitness Center": <Dumbbell size={11} />,
  "Parking": <Car size={11} />,
  "Pet Friendly": <PawPrint size={11} />,
};

export function getTagIcon(label: string): ReactNode {
  return MAP[label] ?? null;
}
