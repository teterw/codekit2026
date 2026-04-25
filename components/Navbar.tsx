"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Hotels", href: "/hotels" },
  { label: "Flights", href: "/flights" },
  { label: "Bundles", href: "/bundles" },
  { label: "Activities", href: "/activities" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 z-50 flex w-full flex-col items-start justify-start border-b border-slate-200 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex min-h-16 w-full max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">

        {/* Left: Logo + Nav Links */}
        <div className="flex min-w-0 items-center justify-start gap-8">
          {/* Logo */}
          <Link href="/" className="text-blue-600 text-2xl font-black font-['Plus_Jakarta_Sans'] leading-8 whitespace-nowrap">
            T-Goda
          </Link>

          {/* Nav Links */}
          <nav className="hidden items-center justify-start gap-6 md:flex">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href || href === "/hotels";
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-semibold font-['Plus_Jakarta_Sans'] leading-5 whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "text-blue-600 bg-white border-b-2 border-blue-600 -translate-y-1"
                      : "text-slate-600 border-b-2 border-transparent hover:text-blue-600 hover:-translate-y-1"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Sign In + Create Account */}
        <div className="flex items-center justify-start gap-3 sm:gap-4">
          <Link
            href="/signin"
            className="hidden rounded-lg px-4 py-2 font-['Plus_Jakarta_Sans'] text-sm font-semibold leading-5 text-slate-600 transition-colors hover:bg-slate-100 sm:block"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-semibold font-['Plus_Jakarta_Sans'] leading-5 transition-colors whitespace-nowrap"
          >
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}
