import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import {
  CalendarCheck,
  Headset,
  Mail,
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
      <Navbar />

      <main>
        <section className="mx-auto max-w-[1200px] px-4 pt-24 sm:px-6 sm:pt-[104px] xl:px-0">
          <div className="relative flex min-h-[440px] items-center justify-center overflow-hidden sm:min-h-[520px]">
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
            <div className="animate-fade-up relative z-10 mx-auto flex w-full max-w-[800px] flex-col items-center px-4 text-center">
              <h1 className="max-w-[750px] text-[38px] font-extrabold leading-none tracking-[-0.025em] text-[#FFFFFF] sm:text-[60px]">
                Escape to Your Perfect Paradise
              </h1>
              <p className="mt-6 max-w-[672px] text-lg font-medium leading-7 text-[#FFFFFF]/90 sm:text-xl">
                Unlock exclusive prices on over 2 million properties and flights across
                the globe.
              </p>

              <HeroSearch />
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
                  className="animate-fade-up group flex min-h-[192px] flex-col items-center justify-center rounded-xl bg-[#E9E9E9] p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full transition duration-300 group-hover:scale-110 ${feature.color}`}
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
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
                <Link
                  href="/search"
                  aria-label={`Search hotels in ${destination.name}`}
                  className="group relative block h-[280px] overflow-hidden sm:h-[376px]"
                >
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 50vw, 285px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  {destination.badge ? (
                    <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-[#FFFFFF]/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.05em] text-[#191C22] shadow">
                      {destination.badge}
                    </span>
                  ) : null}
                </Link>
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
          <div className="relative min-h-[400px] overflow-hidden rounded-3xl bg-[#B61B4A] px-6 py-8 sm:px-12 sm:py-10">
            <div className="relative z-10 flex min-h-[320px] max-w-[576px] flex-col justify-center">
              <h2 className="text-[34px] font-extrabold leading-none text-[#FFFFFF] sm:text-[48px]">
                Summer Sales: Up to
                <br />
                40% Off!
              </h2>
              <p className="mt-5 max-w-[540px] text-lg leading-7 text-[#FFFFFF]/80">
                Exclusive member deals on flights and luxury hotels for your next
                summer getaway. Valid until Oct 31st.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button className="h-14 rounded-xl bg-[#FFFFFF] px-8 text-lg font-bold text-[#B61B4A] transition duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:min-w-[184px]">
                  Explore Deals
                </button>
                <button className="h-14 rounded-xl border-2 border-[#FFFFFF] px-8 text-lg font-bold text-[#FFFFFF] transition duration-200 hover:-translate-y-0.5 hover:bg-[#FFFFFF]/10 sm:min-w-[220px]">
                  Join Club T-Goda
                </button>
              </div>
            </div>

            <div className="pointer-events-none absolute left-[45%] top-4 z-0 h-[240px] w-[240px] opacity-20 sm:left-[50.5%] sm:top-0 sm:h-[280px] sm:w-[280px]">
              <Image
                src="/icon/Icon.png"
                alt=""
                width={280}
                height={280}
                sizes="280px"
                className="h-full w-full object-contain"
                aria-hidden="true"
              />
            </div>

            <div className="animate-float absolute right-10 top-16 z-10 hidden h-[260px] w-[360px] rotate-3 overflow-hidden rounded-2xl shadow-2xl lg:block">
              <Image
                src="/image/Swimming pool.png"
                alt="Luxury resort pool"
                fill
                sizes="360px"
                className="object-cover"
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
            <div className="mx-auto mt-6 flex max-w-[672px] flex-col gap-3 sm:flex-row">
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
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-16">
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
