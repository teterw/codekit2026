import { Wifi, Waves, Coffee, Umbrella, Leaf, Plane, Dumbbell } from "lucide-react";
import SearchBar from "./components/SearchBar";
import FilterSidebar from "./components/FilterSidebar";
import ResultsHeader from "./components/ResultsHeader";
import FlashDealsCard from "./components/FlashDealsCard";
import PropertyCard from "./components/PropertyCard";
import Pagination from "./components/Pagination";

const properties = [
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=512&h=400&fit=crop&q=80",
    topBadge: "Top Choice",
    name: "The Azure Serenity Resort",
    location: "Ubud, Bali",
    locationDetail: "2.5 km from center",
    stars: 5,
    tags: [
      { icon: <Wifi size={11} />, label: "Free Wi-Fi" },
      { icon: <Waves size={11} />, label: "Pool" },
      { icon: <Coffee size={11} />, label: "Breakfast" },
    ],
    note: "Only 2 rooms left at this price!",
    noteColor: "#B61B4A",
    ratingScore: "8.9",
    ratingLabel: "Excellent",
    ratingCount: "1,240",
    oldPrice: "$320",
    price: "$284",
  },
  {
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=512&h=400&fit=crop&q=80",
    name: "Lumina Beach Villas",
    location: "Seminyak, Bali",
    locationDetail: "Beachfront",
    stars: 4,
    tags: [
      { icon: <Umbrella size={11} />, label: "Private Beach" },
      { icon: <Leaf size={11} />, label: "Spa" },
    ],
    note: "Free cancellation before Oct 10",
    noteColor: "#16A34A",
    ratingScore: "9.2",
    ratingLabel: "Exceptional",
    ratingCount: "856",
    price: "$415",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=512&h=400&fit=crop&q=80",
    name: "The Palms Sanctuary",
    location: "Nusa Dua, Bali",
    locationDetail: "0.8 km from beach",
    stars: 4,
    tags: [
      { icon: <Plane size={11} />, label: "Airport Shuttle" },
      { icon: <Dumbbell size={11} />, label: "Gym" },
    ],
    note: "Breakfast + Dinner deal available",
    noteColor: "#D97706",
    ratingScore: "8.4",
    ratingLabel: "Great",
    ratingCount: "2,102",
    price: "$189",
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FA" }}>
      <SearchBar />

      {/* Main content */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 32,
          paddingBottom: 32,
          display: "flex",
          alignItems: "flex-start",
          gap: 24,
        }}
      >
        <FilterSidebar />

        {/* Results column */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          <ResultsHeader />
          <FlashDealsCard />
          {properties.map((p) => (
            <PropertyCard key={p.name} {...p} />
          ))}
          <Pagination />
        </div>
      </div>
    </div>
  );
}
