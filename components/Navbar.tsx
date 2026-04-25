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
    <div className="w-full left-0 top-0 fixed z-50 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border-b border-slate-200 flex flex-col justify-start items-start">
      <div className="w-full max-w-[1280px] mx-auto h-16 px-6 flex justify-between items-center">

        {/* Left: Logo + Nav Links */}
        <div className="flex justify-start items-center gap-8">
          {/* Logo */}
          <Link href="/" className="text-blue-600 text-2xl font-black font-['Plus_Jakarta_Sans'] leading-8 whitespace-nowrap">
            T-Goda
          </Link>

          {/* Nav Links */}
          <nav className="flex justify-start items-center gap-6">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-semibold font-['Plus_Jakarta_Sans'] leading-5 whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "text-white bg-blue-600 border-b-2 border-blue-600 -translate-y-1"
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
        <div className="flex justify-start items-center gap-4">
          <Link
            href="/signin"
            className="px-4 py-2 rounded-lg text-slate-600 text-sm font-semibold font-['Plus_Jakarta_Sans'] leading-5 hover:bg-slate-100 transition-colors"
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