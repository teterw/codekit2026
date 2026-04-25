import Image from "next/image";
<<<<<<< HEAD
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="#"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm"
            >
=======
import {
  Search,
  Calendar,
  Tag,
  Headset,
  CalendarCheck,
  Mail,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            <a href="/" className="text-xl font-bold text-blue-600">T-Goda</a>
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-0.5">Hotels</a>
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-700">Flights</a>
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-700">Bundles</a>
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-700">Activities</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign In</a>
            <a href="#" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
>>>>>>> parent of b7af857 (feat. Update home page to match reference design and fix Next Image warnings)
              Create Account
            </a>
          </div>
        </div>
      </nav>

<<<<<<< HEAD
      <main>
        <section className="mx-auto max-w-[1200px] px-0 pt-10">
          <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden">
            <Image
              src="/image/Beach.png"
              alt=""
              fill
              priority
              sizes="1200px"
              className="object-cover"
              style={{ objectPosition: "center 43%" }}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
=======
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative w-full flex items-center justify-center" style={{ minHeight: 480 }}>
        <Image
          src="/image/Beach.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-20 flex flex-col items-center text-center">
          <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight max-w-xl">
            Escape to Your Perfect Paradise
          </h1>
          <p className="text-white/80 text-base mb-8 max-w-md leading-relaxed">
            Unlock exclusive prices on over 2 million properties and flights across the globe.
          </p>

          {/* Search bar */}
          <div className="flex w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
            <label className="flex items-center gap-2.5 px-5 py-3.5 flex-1 border-r border-gray-200 cursor-text">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Where to next?"
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
              />
            </label>
            <div className="flex items-center gap-2.5 px-5 py-3.5 border-r border-gray-200 cursor-pointer whitespace-nowrap">
              <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-700">Oct 12 - Oct 18</span>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3.5 font-semibold text-sm hover:bg-blue-700">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
                  <Tag className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Best Price Guarantee</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Find a lower price? We&apos;ll match it and give you a voucher for your next trip.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center">
                  <Headset className="w-6 h-6 text-rose-500" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">24/7 Global Support</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our world-class support team is here to help you anywhere, anytime in 40+ languages.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center">
                  <CalendarCheck className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Flexible Booking</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Life happens. Most of our properties offer free cancellation for peace of mind.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Trending Destinations ────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Trending Destinations</h2>
              <p className="text-gray-500 text-sm mt-1">Handpicked favorites for your next adventure</p>
            </div>
            <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">View all</a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {/* Bangkok */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-64">
              <Image
                src="/image/Bankok, Thailand.png"
                alt="Bangkok, Thailand"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 296px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="bg-white text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  Top Rated
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-semibold text-sm">Bangkok, Thailand</p>
                <p className="text-gray-300 text-xs mt-0.5">
                  Starting from <span className="text-blue-400 font-bold">$120</span>
                </p>
              </div>
            </div>

            {/* Tokyo */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-64">
              <Image
                src="/image/Tokyo, Japan.png"
                alt="Tokyo, Japan"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 296px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-semibold text-sm">Tokyo, Japan</p>
                <p className="text-gray-300 text-xs mt-0.5">
                  Starting from <span className="text-blue-400 font-bold">$250</span>
                </p>
              </div>
            </div>

            {/* Paris */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-64">
              <Image
                src="/image/Paris, France.png"
                alt="Paris, France"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 296px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-semibold text-sm">Paris, France</p>
                <p className="text-gray-300 text-xs mt-0.5">
                  Starting from <span className="text-blue-400 font-bold">$180</span>
                </p>
              </div>
            </div>

            {/* London */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-64">
              <Image
                src="/image/London, UK.png"
                alt="London, UK"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 296px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-semibold text-sm">London, UK</p>
                <p className="text-gray-300 text-xs mt-0.5">
                  Starting from <span className="text-blue-400 font-bold">$210</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Summer Sales Banner ──────────────────────────────────────────── */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-center justify-between px-12 py-12 gap-8"
            style={{ background: "linear-gradient(135deg, #8B1A2B 0%, #C0203A 55%, #A8192F 100%)" }}
          >
            {/* decorative circles */}
            <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: "rgba(255,255,255,0.06)", top: -90, left: -70 }} />
            <div className="absolute rounded-full pointer-events-none" style={{ width: 180, height: 180, background: "rgba(255,255,255,0.05)", top: 20, left: 60 }} />

            <div className="relative z-10 max-w-sm">
              <h2 className="text-4xl font-extrabold text-white leading-snug mb-4">
                Summer Sales: Up to<br />40% Off!
              </h2>
              <p className="text-rose-200 text-sm leading-relaxed mb-7">
                Exclusive member deals on flights and luxury hotels for your next summer getaway. Valid until Oct 31st.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button className="border-2 border-white text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-white hover:text-red-900 transition-colors">
                  Explore Deals
                </button>
                <button className="border-2 border-white text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-white hover:text-red-900 transition-colors">
                  Join Club T-Goda
                </button>
              </div>
            </div>

            <div className="relative z-10 w-full max-w-[380px] flex-shrink-0">
              <Image
                src="/image/Swimming pool.png"
                alt="Luxury resort pool"
                width={380}
                height={260}
                sizes="(max-width: 768px) calc(100vw - 6rem), 380px"
                className="h-auto w-full rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-lg mx-auto text-center">
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Get Travel Deals Directly</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Subscribe to our newsletter and get early access to hidden gems and seasonal discounts. No spam, only adventure.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-400 bg-white"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-4">
              By subscribing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16">

            {/* Brand */}
            <div className="md:w-72 flex-shrink-0">
              <p className="text-lg font-bold text-gray-900 mb-2">T-Goda</p>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Making world travel accessible, affordable, and delightful for everyone since 2024. Your journey starts here.
              </p>
              <p className="text-gray-400 text-sm mt-6">&copy; 2024 T-Goda Booking. All rights reserved.</p>
              <div className="flex gap-4 mt-4">
                {/* Facebook */}
                <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
                {/* Twitter/X */}
                <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="flex-1 grid grid-cols-3 gap-8 pt-1">
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-4">Company</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-500 text-sm hover:text-gray-900">About Us</a></li>
                  <li><a href="#" className="text-gray-500 text-sm hover:text-gray-900">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-4">Support</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-500 text-sm hover:text-gray-900">Support</a></li>
                  <li><a href="#" className="text-gray-500 text-sm hover:text-gray-900">Mobile App</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-4">Legal</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-500 text-sm hover:text-gray-900">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-500 text-sm hover:text-gray-900">Terms of Service</a></li>
                </ul>
              </div>
            </div>

          </div>
>>>>>>> parent of b7af857 (feat. Update home page to match reference design and fix Next Image warnings)
        </div>

      </main>
              <Footer />
    </div>
    
  );
}
