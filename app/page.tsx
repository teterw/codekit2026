import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  CalendarCheck,
  Headset,
  Heart,
  Mail,
  MapPin,
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
    color: "bg-[#5392F9]/20 text-[#005CBD]",
  },
  {
    title: "24/7 Global Support",
    text: "Our world-class support team is here to help you anywhere, anytime in 40+ languages.",
    icon: Headset,
    color: "bg-[#FF567D]/20 text-[#B61B4A]",
  },
  {
    title: "Flexible Booking",
    text: "Life happens. Most of our properties offer free cancellation for peace of mind.",
    icon: CalendarCheck,
    color: "bg-[#D47F00]/20 text-[#8A5100]",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#191C22]">
      <nav className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-[#FFFFFF]/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-[-0.05em] text-[#2563EB]"
            >
              T-Goda
            </Link>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="border-b-2 border-[#2563EB] pb-1.5 text-sm font-semibold tracking-[-0.025em] text-[#2563EB]"
              >
                Hotels
              </a>
              <a href="#" className="text-sm font-semibold tracking-[-0.025em] text-[#475569]">
                Flights
              </a>
              <a href="#" className="text-sm font-semibold tracking-[-0.025em] text-[#475569]">
                Bundles
              </a>
              <a href="#" className="text-sm font-semibold tracking-[-0.025em] text-[#475569]">
                Activities
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="px-4 py-2 text-sm font-semibold text-[#475569]">
              Sign In
            </a>
            <a
              href="#"
              className="rounded-lg bg-[#005CBD] px-4 py-2 text-sm font-semibold text-[#FFFFFF] shadow-sm"
            >
              Create Account
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="mx-auto max-w-[1200px] px-4 pt-10 sm:px-6 xl:px-0">
          <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden">
            <Image
              src="/image/Beach.png"
              alt=""
              fill
              priority
              sizes="1200px"
              className="object-cover brightness-110"
              style={{ objectPosition: "center 43%" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.70)_0%,rgba(0,0,0,0.30)_50%,rgba(0,0,0,0.40)_100%)] shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />
            <div className="relative z-10 mx-auto flex w-full max-w-[800px] flex-col items-center px-4 text-center">
              <h1 className="max-w-[750px] text-[42px] font-extrabold leading-none tracking-[-0.025em] text-[#FFFFFF] sm:text-[60px]">
                Escape to Your Perfect Paradise
              </h1>
              <p className="mt-6 max-w-[672px] text-lg font-medium leading-7 text-[#FFFFFF]/90 sm:text-xl">
                Unlock exclusive prices on over 2 million properties and flights across
                the globe.
              </p>

              <div className="mt-6 flex w-full max-w-[768px] flex-col gap-2 rounded-xl bg-[#FFFFFF] p-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] md:flex-row md:items-stretch">
                <label className="flex h-[52px] min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#6B7FC6] bg-[#E9E9E9] px-[13px]">
                  <MapPin className="h-5 w-5 shrink-0 text-[#64748B]" />
                  <input
                    type="text"
                    placeholder="Where to next?"
                    className="min-w-0 flex-1 bg-transparent text-base text-[#191C22] outline-none placeholder:text-[#6B7280]"
                  />
                </label>
                <button
                  type="button"
                  className="flex h-[52px] min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#6B7FC6] bg-[#E9E9E9] px-[13px] text-left text-base text-[#191C22]"
                >
                  <Calendar className="h-5 w-5 shrink-0 text-[#64748B]" />
                  <span className="truncate">Oct 12 - Oct 18</span>
                </button>
                <button
                  type="button"
                  className="flex h-[52px] items-center justify-center gap-2 rounded-lg bg-[#005CBD] px-8 text-lg font-bold text-[#FFFFFF] md:w-[151px]"
                >
                  <Search className="h-[18px] w-[18px]" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 xl:px-0">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="flex min-h-[192px] flex-col items-center justify-center rounded-xl bg-[#E9E9E9] p-6 text-center"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${feature.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold leading-7 text-[#191C22]">
                    {feature.title}
                  </h2>
                  <p className="mt-3 max-w-[320px] text-sm leading-5 text-[#424753]">
                    {feature.text}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6 xl:px-0">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-[30px] font-bold leading-9 text-[#191C22]">
                Trending Destinations
              </h2>
              <p className="text-base leading-6 text-[#424753]">
                Handpicked favorites for your next adventure
              </p>
            </div>
            <a href="#" className="text-sm font-bold text-[#005CBD]">
              View all
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => (
              <article key={destination.name}>
                <div className="relative h-[376px] overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 50vw, 285px"
                    className="object-cover"
                  />
                  {destination.badge ? (
                    <span className="absolute bottom-3 left-3 rounded-full bg-[#FFFFFF]/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.05em] text-[#191C22] shadow">
                      {destination.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-5 text-xl font-bold leading-7 text-[#191C22]">
                  {destination.name}
                </h3>
                <p className="text-sm leading-5 text-[#424753]">
                  Starting from{" "}
                  <span className="font-bold text-[#005CBD]">
                    {destination.price}
                  </span>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 pb-32 sm:px-6 xl:px-0">
          <div className="relative flex min-h-[400px] items-center justify-between overflow-hidden rounded-3xl bg-[#B61B4A] px-12 py-10">
            <div className="relative z-10 max-w-[576px]">
              <h2 className="text-[48px] font-extrabold leading-none text-[#FFFFFF]">
                Summer Sales: Up to
                <br />
                40% Off!
              </h2>
              <p className="mt-4 max-w-[540px] text-lg leading-7 text-[#FFFFFF]/80">
                Exclusive member deals on flights and luxury hotels for your next
                summer getaway. Valid until Oct 31st.
              </p>
              <div className="mt-8 flex gap-4">
                <button className="h-14 rounded-xl bg-[#FFFFFF] px-8 text-lg font-bold text-[#B61B4A]">
                  Explore Deals
                </button>
                <button className="h-14 rounded-xl border-2 border-[#FFFFFF] px-8 text-lg font-bold text-[#FFFFFF]">
                  Join Club T-Goda
                </button>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/2 top-0 w-1/2 opacity-20">
              <Heart className="absolute left-8 top-8 h-[250px] w-[250px] rotate-[-45deg] fill-[#191C22] text-[#191C22]" />
            </div>

            <div className="relative z-10 hidden w-[320px] rotate-3 overflow-hidden rounded-2xl shadow-2xl lg:block">
              <Image
                src="/image/Swimming pool.png"
                alt="Luxury resort pool"
                width={320}
                height={320}
                sizes="320px"
                className="h-[320px] w-[320px] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 pb-28 sm:px-6 xl:px-0">
          <div className="rounded-3xl bg-[#E7E8F1] px-8 py-16 text-center">
            <Mail className="mx-auto h-10 w-10 text-[#005CBD]" />
            <h2 className="mt-4 text-[30px] font-bold leading-9 text-[#191C22]">
              Get Travel Deals Directly
            </h2>
            <p className="mx-auto mt-4 max-w-[672px] text-lg leading-7 text-[#424753]">
              Subscribe to our newsletter and get early access to hidden gems and seasonal
              discounts. No spam, only adventure.
            </p>
            <div className="mx-auto mt-6 flex max-w-[672px] gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="h-14 flex-1 rounded-xl border border-[#6B7FC6] bg-[#FFFFFF] px-6 text-base text-[#191C22] outline-none placeholder:text-[#6B7280]"
              />
              <button className="h-14 rounded-xl bg-[#005CBD] px-8 text-base font-bold text-[#FFFFFF]">
                Subscribe Now
              </button>
            </div>
            <p className="mt-5 text-xs leading-4 text-[#424753]">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC] pt-14 pb-56">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[1.5fr_1fr_1fr_1fr] gap-16 px-6">
          <div>
            <p className="text-xl font-bold text-[#0F172A]">T-Goda</p>
            <p className="mt-6 max-w-[410px] text-sm leading-5 text-[#64748B]">
              Making world travel accessible, affordable, and delightful for everyone
              since 2024. Your journey starts here.
            </p>
            <p className="mt-7 text-sm text-[#64748B]">
              &copy; 2024 T-Goda Booking. All rights reserved.
            </p>
            <div className="mt-7 flex gap-4 text-[#D1D5DB]">
              <a href="#" aria-label="Facebook" className="hover:text-[#64748B]">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-[#64748B]">
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
              <a href="#" aria-label="Twitter" className="hover:text-[#64748B]">
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
              <h2 className="text-sm font-bold text-[#0F172A]">{heading}</h2>
              <ul className="mt-5 space-y-4 text-sm text-[#64748B]">
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
