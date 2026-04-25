import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  CalendarCheck,
  Headset,
  Heart,
  Mail,
  Search,
  Tag,
} from "lucide-react";

const destinations = [
  {
    name: "Bangkok, Thailand",
    price: "$120",
    image: "/image/Bankok, Thailand.png",
    badge: "Top Rated",
  },
  {
    name: "Tokyo, Japan",
    price: "$250",
    image: "/image/Tokyo, Japan.png",
  },
  {
    name: "Paris, France",
    price: "$180",
    image: "/image/Paris, France.png",
  },
  {
    name: "London, UK",
    price: "$210",
    image: "/image/London, UK.png",
  },
];

const features = [
  {
    title: "Best Price Guarantee",
    text: "Find a lower price? We'll match it and give you a voucher for your next trip.",
    icon: Tag,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "24/7 Global Support",
    text: "Our world-class support team is here to help you anywhere, anytime in 40+ languages.",
    icon: Headset,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Flexible Booking",
    text: "Life happens. Most of our properties offer free cancellation for peace of mind.",
    icon: CalendarCheck,
    color: "bg-amber-100 text-amber-700",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f7f9] font-sans text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
          <div className="flex items-center gap-9">
            <Link href="/" className="text-2xl font-extrabold text-blue-600">
              T-Goda
            </Link>
            <div className="flex items-center gap-8">
              <a
                href="#"
                className="border-b-2 border-blue-600 pb-1 text-sm font-semibold text-blue-600"
              >
                Hotels
              </a>
              <a href="#" className="text-sm font-semibold text-slate-700">
                Flights
              </a>
              <a href="#" className="text-sm font-semibold text-slate-700">
                Bundles
              </a>
              <a href="#" className="text-sm font-semibold text-slate-700">
                Activities
              </a>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm font-semibold text-slate-700">
              Sign In
            </a>
            <a
              href="#"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm"
            >
              Create Account
            </a>
          </div>
        </div>
      </nav>

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
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 mx-auto flex w-full max-w-[760px] flex-col items-center px-4 text-center">
              <h1 className="max-w-[690px] text-[64px] font-extrabold leading-[0.96] text-white">
                Escape to Your Perfect Paradise
              </h1>
              <p className="mt-7 max-w-[720px] text-[21px] leading-8 text-white/90">
                Unlock exclusive prices on over 2 million properties and flights across
                the globe.
              </p>

              <div className="mt-7 flex w-full max-w-[760px] items-center gap-2 rounded-xl bg-white p-2 shadow-lg">
                <label className="flex h-14 flex-1 items-center gap-3 rounded-lg border border-blue-400 bg-slate-50 px-4">
                  <Search className="h-5 w-5 shrink-0 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Where to next?"
                    className="min-w-0 flex-1 bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </label>
                <button className="flex h-14 min-w-[290px] items-center gap-3 rounded-lg border border-blue-400 bg-slate-50 px-4 text-left text-base text-slate-800">
                  <Calendar className="h-5 w-5 text-slate-500" />
                  Oct 12 - Oct 18
                </button>
                <button className="flex h-14 min-w-[150px] items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 text-lg font-bold text-white">
                  <Search className="h-6 w-6" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-0 py-24">
          <div className="grid grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="flex min-h-[190px] flex-col items-center justify-center rounded-lg bg-[#e9e9ea] px-10 text-center"
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full ${feature.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-extrabold">{feature.title}</h2>
                  <p className="mt-4 max-w-[330px] text-sm leading-5 text-slate-600">
                    {feature.text}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-0 pb-24">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-[30px] font-extrabold leading-none">
                Trending Destinations
              </h2>
              <p className="mt-2 text-base text-slate-600">
                Handpicked favorites for your next adventure
              </p>
            </div>
            <a href="#" className="text-sm font-bold text-blue-600">
              View all
            </a>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <article key={destination.name}>
                <div className="relative overflow-hidden" style={{ height: 360 }}>
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 50vw, 285px"
                    className="object-cover"
                  />
                  {destination.badge ? (
                    <span className="absolute bottom-3 left-3 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold uppercase text-slate-800 shadow">
                      {destination.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-5 text-[21px] font-extrabold leading-none">
                  {destination.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Starting from{" "}
                  <span className="font-extrabold text-blue-600">
                    {destination.price}
                  </span>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-0 pb-32">
          <div className="relative min-h-[400px] overflow-hidden rounded-2xl bg-[#c21851] px-12 py-16">
            <div className="relative z-10 max-w-[580px]">
              <h2 className="text-[50px] font-extrabold leading-[0.98] text-white">
                Summer Sales: Up to
                <br />
                40% Off!
              </h2>
              <p className="mt-7 max-w-[540px] text-lg leading-7 text-white/85">
                Exclusive member deals on flights and luxury hotels for your next
                summer getaway. Valid until Oct 31st.
              </p>
              <div className="mt-9 flex gap-4">
                <button className="h-14 rounded-xl bg-white px-9 text-base font-extrabold text-[#c21851]">
                  Explore Deals
                </button>
                <button className="h-14 rounded-xl border-2 border-white px-9 text-base font-extrabold text-white">
                  Join Club T-Goda
                </button>
              </div>
            </div>

            <div className="absolute left-[52%] top-2 h-64 w-64 rotate-45 rounded-[34px] bg-[#a71545]" />
            <div className="absolute left-[56%] top-32 flex h-24 w-24 items-center justify-center rounded-full bg-[#c21851]">
              <Heart className="h-16 w-16 fill-[#c21851] text-[#c21851]" />
            </div>
            <div className="absolute left-[53.5%] top-12 h-8 w-8 rounded-full bg-[#c21851]" />

            <div className="absolute right-10 top-16 z-10 w-[340px] rotate-3 overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/image/Swimming pool.png"
                alt="Luxury resort pool"
                width={380}
                height={260}
                sizes="340px"
                className="object-cover"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-0 pb-28">
          <div className="rounded-2xl bg-[#e8eaf3] px-8 py-20 text-center">
            <Mail className="mx-auto h-10 w-10 text-blue-600" />
            <h2 className="mt-6 text-[30px] font-extrabold">
              Get Travel Deals Directly
            </h2>
            <p className="mx-auto mt-5 max-w-[670px] text-lg leading-7 text-slate-600">
              Subscribe to our newsletter and get early access to hidden gems and seasonal
              discounts. No spam, only adventure.
            </p>
            <div className="mx-auto mt-8 flex max-w-[650px] gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="h-14 flex-1 rounded-xl border border-blue-400 bg-white px-6 text-base text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button className="h-14 rounded-xl bg-blue-600 px-8 text-base font-bold text-white">
                Subscribe Now
              </button>
            </div>
            <p className="mt-5 text-xs text-slate-500">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-[#f6f7f9] pt-14 pb-56">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[1.5fr_1fr_1fr_1fr] gap-16 px-6">
          <div>
            <p className="text-xl font-extrabold">T-Goda</p>
            <p className="mt-6 max-w-[410px] text-sm leading-6 text-slate-500">
              Making world travel accessible, affordable, and delightful for everyone
              since 2024. Your journey starts here.
            </p>
            <p className="mt-7 text-sm text-slate-500">
              &copy; 2024 T-Goda Booking. All rights reserved.
            </p>
            <div className="mt-7 flex gap-4 text-slate-300">
              <a href="#" aria-label="Facebook" className="hover:text-slate-400">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-slate-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-slate-400">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {[
            ["Company", "About Us", "Careers"],
            ["Support", "Support", "Mobile App"],
            ["Legal", "Privacy Policy", "Terms of Service"],
          ].map(([heading, first, second]) => (
            <div key={heading}>
              <h2 className="text-sm font-extrabold">{heading}</h2>
              <ul className="mt-5 space-y-4 text-sm text-slate-500">
                <li>
                  <a href="#">{first}</a>
                </li>
                <li>
                  <a href="#">{second}</a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
