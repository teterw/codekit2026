"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Share2,
  Heart,
  ChevronRight,
  ChevronDown,
  MapPin,
  Waves,
  Sparkles,
  UtensilsCrossed,
  Dumbbell,
  Wifi,
  Umbrella,
  User,
  CircleCheck,
  Info,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Room {
  id: string;
  name: string;
  description: string;
  sleeps: number;
  originalPrice: number;
  price: number;
  currency: string;
  perks: string[];
  urgency?: string;
  badge?: string;
  highlight?: boolean;
  selectColor: "rose" | "blue";
}

interface Review {
  id: string;
  author: string;
  country: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  date: string;
  rating: number;
  text: string;
}

interface RatingBreakdown {
  label: string;
  score: number;
  max: number;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const breadcrumbs = ["Home", "Greece", "Crete Hotels", "Grand Azure Resort & Spa"];

const images = [
  { src: "/pool.png", alt: "Resort main view", span: "large" },
  { src: "/room.png", alt: "Room view 1", span: "small" },
  { src: "/home1.png", alt: "Room view 2", span: "small" },
  { src: "/bigpool.png", alt: "Room view 3", span: "small" },
  { src: "/123.png", alt: "+124 photos", span: "small", overlay: "+124 photos" },
];

const amenities = [
  { icon: <Waves size={20} color="#005CBD" />, label: "3 Outdoor Pools" },
  { icon: <Sparkles size={20} color="#005CBD" />, label: "Full-service Spa" },
  { icon: <UtensilsCrossed size={20} color="#005CBD" />, label: "5 Restaurants" },
  { icon: <Dumbbell size={20} color="#005CBD" />, label: "Gym & Fitness" },
  { icon: <Wifi size={20} color="#005CBD" />, label: "Free High-speed Wi-Fi" },
  { icon: <Umbrella size={20} color="#005CBD" />, label: "Private Beach" },
];

const rooms: Room[] = [
  {
    id: "presidential",
    name: "Presidential Sea Front Suite",
    description: "85m² • Panoramic Sea View • Infinity Pool Access",
    sleeps: 4,
    originalPrice: 1295,
    price: 862,
    currency: "$",
    perks: ["Free Airport Transfer", "All-Inclusive Premium"],
    urgency: "Only 1 room left!",
    badge: "LIMITED TIME OFFER",
    highlight: true,
    selectColor: "rose",
  },
  {
    id: "deluxe",
    name: "Deluxe Garden View Room",
    description: "32m² • Balcony • Garden View • 1 King Bed",
    sleeps: 2,
    originalPrice: 345,
    price: 264,
    currency: "$",
    perks: ["Free Cancellation", "Breakfast Included"],
    selectColor: "blue",
  },
  {
    id: "junior",
    name: "Junior Suite with Private Pool",
    description: "45m² • Private Pool • Sea View • King Bed",
    sleeps: 3,
    originalPrice: 626,
    price: 445,
    currency: "$",
    perks: ["Free Cancellation", "All-Inclusive"],
    urgency: "Only 2 rooms left!",
    selectColor: "blue",
  },
];

const ratingBreakdowns: RatingBreakdown[] = [
  { label: "Cleanliness", score: 9.5, max: 10 },
  { label: "Service", score: 9.2, max: 10 },
  { label: "Location", score: 8.9, max: 10 },
];

const reviews: Review[] = [
  {
    id: "1",
    author: "Sophia Martinez",
    country: "United Kingdom",
    initials: "SM",
    avatarBg: "#D7E2FF",
    avatarText: "#001A40",
    date: "May 12, 2024",
    rating: 5,
    text: '"An absolute paradise. The views from the Presidential Suite are unmatched. The service was impeccable from start to finish."',
  },
  {
    id: "2",
    author: "James Wilson",
    country: "United States",
    initials: "JW",
    avatarBg: "#FFD9DD",
    avatarText: "#400013",
    date: "Apr 28, 2024",
    rating: 5,
    text: '"Excellent facilities and great breakfast selection. The private beach is beautiful, though the city center is a bit of a walk."',
  },
  {
    id: "3",
    author: "Anna Kowalski",
    country: "Germany",
    initials: "AK",
    avatarBg: "#FFDCBD",
    avatarText: "#2C1600",
    date: "Apr 15, 2024",
    rating: 5,
    text: '"The spa treatments were heavenly. Truly a five-star experience. We will definitely be coming back next summer."',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ count, size = 16 }: { count: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i < count ? "#FACC15" : "#E5E7EB"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

export default function HotelDetailPage() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="w-full bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="w-full max-w-[1280px] mx-auto px-6 pt-24 pb-16 flex flex-col gap-6">

          {/* ── Breadcrumb ── */}
          <nav className="flex flex-wrap items-center gap-2">
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return (
                <div key={crumb} className="flex items-center gap-2">
                  {!isLast ? (
                    <>
                      <Link href="#" className="text-sm leading-6 hover:underline" style={{ color: "#424753" }}>
                        {crumb}
                      </Link>
                      <ChevronRight size={12} color="#424753" />
                    </>
                  ) : (
                    <span className="text-sm font-semibold leading-6" style={{ color: "#191C22" }}>
                      {crumb}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── Header Row ── */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <StarRating count={5} size={20} />
                <span className="px-2 py-0.5 rounded text-sm font-semibold text-white" style={{ background: "#005CBD" }}>
                  RESORT
                </span>
              </div>
              <p className="text-base leading-6" style={{ color: "#191C22" }}>
                Grand Azure Resort &amp; Spa, Elounda
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <MapPin size={16} color="#005CBD" />
                <span className="text-sm leading-6" style={{ color: "#424753" }}>
                  Elounda Bay, Crete, 72053, Greece
                </span>
                <Link href="#hotel-map" className="text-sm font-semibold leading-6 pl-1" style={{ color: "#005CBD" }}>
                  Show on map
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm leading-6 hover:bg-slate-50 transition-colors"
                style={{ border: "1px solid #C2C6D5", color: "#191C22" }}
              >
                <Share2 size={16} color="#191C22" />
                Share
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm leading-6 hover:bg-slate-50 transition-colors"
                style={{ border: "1px solid #C2C6D5", color: "#191C22" }}
              >
                <Heart size={16} color="#191C22" />
                Save
              </button>
              <button
                className="px-8 py-3 rounded-lg text-white text-sm font-semibold leading-6 shadow transition-opacity hover:opacity-90"
                style={{ background: "#B61B4A" }}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* ── Image Gallery ── */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2 h-[500px] mt-2">
            <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden">
              <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" />
            </div>
            {images.slice(1).map((img, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden">
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
                {img.overlay && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.40)" }}>
                    <span className="text-white text-base font-medium">{img.overlay}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Two-column: Overview/Amenities + Sidebar ── */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">

            {/* Left (2/3) */}
            <div className="lg:col-span-2 flex flex-col gap-10">

              {/* Overview */}
              <section className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold leading-6" style={{ color: "#191C22" }}>
                  Overview
                </h2>
                <p className="text-sm leading-[26px]" style={{ color: "#424753" }}>
                  Experience unparalleled luxury at the Grand Azure Resort &amp; Spa, nestled on the pristine shores of Elounda Bay.
                  This architectural masterpiece blends traditional Cretan charm with ultra-modern design, offering guests breathtaking
                  panoramic views of the Mediterranean. Whether you&apos;re seeking a romantic getaway or a rejuvenation retreat, our
                  world-class amenities and personalized service ensure a stay that transcends the ordinary.
                </p>
              </section>

              {/* Popular Amenities */}
              <section className="flex flex-col gap-4">
                <h2 className="text-sm font-semibold leading-6" style={{ color: "#191C22" }}>
                  Popular Amenities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
                  {amenities.map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-3 h-7">
                      {icon}
                      <span className="text-sm leading-6" style={{ color: "#191C22" }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="flex items-center gap-1.5 pt-1">
                  <span className="text-sm font-semibold" style={{ color: "#005CBD" }}>
                    See all 45 amenities
                  </span>
                  <ChevronDown size={14} color="#005CBD" />
                </button>
              </section>
            </div>

            {/* Right sidebar (1/3) */}
            <div className="lg:col-span-1 flex flex-col gap-6">

              {/* Rating Card */}
              <div
                className="flex flex-col gap-4 p-6 bg-white rounded-2xl"
                style={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.05)", border: "1px solid rgba(194,198,213,0.30)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-base font-semibold" style={{ color: "#191C22" }}>Excellent</span>
                    <span className="text-sm" style={{ color: "#424753" }}>1,248 verified reviews</span>
                  </div>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "#005CBD" }}>
                    <span className="text-2xl font-bold text-white">9.2</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {ratingBreakdowns.map(({ label, score, max }) => (
                    <div key={label} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: "#191C22" }}>{label}</span>
                        <span className="text-sm" style={{ color: "#191C22" }}>{score}</span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#E7E8F1" }}>
                        <div className="h-2 rounded-full" style={{ width: `${(score / max) * 100}%`, background: "#005CBD" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Card */}
              <div
                id="hotel-map"
                className="w-full rounded-2xl overflow-hidden bg-white"
                style={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.05)", border: "1px solid rgba(194,198,213,0.30)" }}
              >
                <div className="relative w-full h-48">
                  <iframe
                    title="Hotel location map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31446.864463690514!2d25.724703921748934!3d35.32117885408508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1490ec46f66d8aab%3A0xc5e80e89728f739e!2sElounda%2C%20Greece!5e0!3m2!1sen!2sus!4v1710000000000"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allow="geolocation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-4 flex flex-col gap-0.5">
                  <span className="text-sm font-medium" style={{ color: "#191C22" }}>Near Spinalonga Island</span>
                  <span className="text-sm" style={{ color: "#424753" }}>15 min walk to city center</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Room Selection — FULL WIDTH ── */}
          <section className="w-full flex flex-col gap-6 pt-8">
            <h2 className="text-sm font-semibold leading-6" style={{ color: "#191C22" }}>
              Select Your Room
            </h2>

            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(194,198,213,0.30)", boxShadow: "0px 1px 2px rgba(0,0,0,0.05)" }}
            >
              {/* Table header */}
              <div
                className="hidden md:grid gap-0"
                style={{
                  background: "#F2F3FC",
                  gridTemplateColumns: "2fr 1fr 1.5fr 1.5fr 140px",
                }}
              >
                {["Room Type", "Sleeps", "Today's Price", "Options", ""].map((h) => (
                  <div key={h} className="px-6 py-5">
                    <span className="text-sm font-bold" style={{ color: "#424753" }}>{h}</span>
                  </div>
                ))}
              </div>

              {/* Room rows */}
              {rooms.map((room, idx) => (
                <div
                  key={room.id}
                  className={`flex flex-col md:grid items-stretch ${idx > 0 ? "border-t" : ""}`}
                  style={{
                    gridTemplateColumns: "2fr 1fr 1.5fr 1.5fr 140px",
                    borderColor: "rgba(194,198,213,0.30)",
                    background: room.highlight ? "rgba(239,246,255,0.50)" : "white",
                    borderLeft: room.highlight ? "4px solid #005CBD" : "4px solid transparent",
                  }}
                >
                  {/* Room Type */}
                  <div className="flex flex-col gap-2 px-5 py-5">
                    <div className="flex flex-wrap items-start gap-2">
                      <span className="text-sm font-semibold" style={{ color: "#191C22" }}>
                        {room.name}
                      </span>
                      {room.badge && (
                        <span
                          className="px-2 py-0.5 rounded text-[9px] font-bold uppercase text-white leading-4 whitespace-nowrap"
                          style={{ background: "#B61B4A", letterSpacing: 0.5 }}
                        >
                          {room.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-5" style={{ color: "#424753" }}>{room.description}</p>
                    <button className="flex items-center gap-1 w-fit">
                      <Info size={12} color="#005CBD" />
                      <span className="text-xs font-semibold" style={{ color: "#005CBD" }}>Room details</span>
                    </button>
                  </div>

                  {/* Sleeps */}
                  <div className="flex items-center gap-1 px-6 py-5">
                    {Array.from({ length: room.sleeps }).map((_, i) => (
                      <User key={i} size={16} color="#191C22" />
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex flex-col px-6 py-5 justify-center">
                    <span className="text-sm line-through" style={{ color: "#424753" }}>
                      {room.currency}{room.originalPrice}
                    </span>
                    <span className="text-2xl font-bold leading-8" style={{ color: room.highlight ? "#B61B4A" : "#191C22" }}>
                      {room.currency}{room.price}
                    </span>
                    <span className="text-xs" style={{ color: "#424753" }}>Includes taxes &amp; fees</span>
                  </div>

                  {/* Perks */}
                  <div className="flex flex-col gap-2 px-6 py-5 justify-center">
                    {room.perks.map((perk) => (
                      <div key={perk} className="flex items-center gap-2">
                        <CircleCheck size={15} color="#16A34A" />
                        <span className="text-xs" style={{ color: "#16A34A" }}>{perk}</span>
                      </div>
                    ))}
                    {room.urgency && (
                      <span className="text-xs font-bold" style={{ color: "#BA1A1A" }}>{room.urgency}</span>
                    )}
                  </div>

                  {/* Select */}
                  <div className="flex items-center justify-end px-6 py-5">
                    <button
                      onClick={() => setSelectedRoom(room.id)}
                      className="px-6 py-2 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90 shadow-sm whitespace-nowrap"
                      style={{ background: room.selectColor === "rose" ? "#B61B4A" : "#005CBD" }}
                    >
                      {selectedRoom === room.id ? "✓ Selected" : "Select"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Guest Reviews — FULL WIDTH 3 columns ── */}
          <section className="w-full flex flex-col gap-6 pt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold leading-6" style={{ color: "#191C22" }}>
                Guest Reviews
              </h2>
              <Link href="#" className="text-sm font-semibold" style={{ color: "#005CBD" }}>
                Read all 1,248 reviews
              </Link>
            </div>

            {/* 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex flex-col justify-between gap-4 p-6 bg-white rounded-2xl"
                  style={{ boxShadow: "0px 1px 2px rgba(0,0,0,0.05)", border: "1px solid rgba(194,198,213,0.30)" }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <StarRating count={review.rating} size={14} />
                      <span className="text-xs" style={{ color: "#424753" }}>{review.date}</span>
                    </div>
                    <p className="text-sm italic leading-6" style={{ color: "#191C22" }}>
                      {review.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: review.avatarBg, color: review.avatarText }}
                    >
                      {review.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium" style={{ color: "#191C22" }}>{review.author}</span>
                      <span className="text-xs" style={{ color: "#424753" }}>{review.country}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}