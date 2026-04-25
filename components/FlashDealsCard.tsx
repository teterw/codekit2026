"use client";

import { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import DealRow from "./DealRow";
import { AnimatedTime } from "./AnimatedDigit";

const deals = [
  {
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=512&h=384&fit=crop&q=80",
    badge: "60% OFF",
    name: "Mandala Sky Luxury Villas",
    location: "Uluwatu, Bali",
    locationDetail: "Cliff-top view",
    stars: 5,
    oldPrice: "$1,200",
    newPrice: "$480",
  },
  {
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=512&h=384&fit=crop&q=80",
    badge: "45% OFF",
    name: "Emerald Jungle Retreat",
    location: "Ubud, Bali",
    locationDetail: "Private Sanctuary",
    stars: 4,
    oldPrice: "$450",
    newPrice: "$247",
  },
  {
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=512&h=384&fit=crop&q=80",
    badge: "35% OFF",
    name: "Seminyak Shores Club",
    location: "Seminyak, Bali",
    locationDetail: "Beachfront Bliss",
    stars: 5,
    oldPrice: "$680",
    newPrice: "$442",
  },
];

const INITIAL_SECONDS = 8 * 3600 + 45 * 60 + 12;

export default function FlashDealsCard() {
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const h = pad(Math.floor(seconds / 3600));
  const m = pad(Math.floor((seconds % 3600) / 60));
  const s = pad(seconds % 60);

  return (
    <div
      style={{
        padding: 4,
        background: "linear-gradient(146deg, #005CBD 0%, #004591 100%)",
        borderRadius: 16,
        boxShadow: "0px 8px 10px -6px rgba(0,0,0,0.10), 0px 20px 25px -5px rgba(0,0,0,0.10)",
        outline: "1px rgba(0,92,189,0.20) solid",
        outlineOffset: -1,
      }}
    >
      <div style={{ background: "white", borderRadius: 12, overflow: "hidden" }}>
        {/* Header strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 12,
            paddingBottom: 12,
            background: "rgba(182, 27, 74, 0.10)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Flame size={19} color="#B61B4A" />
            <span style={{ fontSize: 18, color: "#B61B4A", fontWeight: 400, lineHeight: "28px" }}>
              Flash Deals for You
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "#424753", fontWeight: 500, lineHeight: "16.8px" }}>
              Ends in:
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 4,
                paddingBottom: 4,
                background: "#B61B4A",
                borderRadius: 6,
              }}
            >
              <AnimatedTime
                h={h}
                m={m}
                s={s}
                style={{ fontSize: 14, color: "white", fontWeight: 700, lineHeight: "20px" }}
              />
            </div>
          </div>
        </div>

        {deals.map((deal, i) => (
          <DealRow key={deal.name} {...deal} hasBorderTop={i > 0} />
        ))}
      </div>
    </div>
  );
}
