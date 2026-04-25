"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Hotels", href: "/hotels" },
  { label: "Flights", href: "/flights" },
  { label: "Bundles", href: "/bundles" },
  { label: "Activities", href: "/activities" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 z-50 flex w-full flex-col items-start justify-start border-b border-slate-200 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex min-h-16 w-full max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center justify-start gap-8">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-blue-600 text-2xl font-black font-['Plus_Jakarta_Sans'] leading-8 whitespace-nowrap smooth-transition hover:scale-110"
          >
            T-Goda
          </Link>

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

        <div className="hidden items-center justify-start gap-4 md:flex">
          <Link
            href="/signin"
            className="rounded-lg px-4 py-2 font-['Plus_Jakarta_Sans'] text-sm font-semibold leading-5 text-slate-600 transition-colors hover:bg-slate-100"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 font-['Plus_Jakarta_Sans'] text-sm font-semibold leading-5 text-white transition-colors hover:bg-blue-700 whitespace-nowrap"
          >
            Create Account
          </Link>
        </div>

        <button
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-lg p-2 transition-colors hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} color="#0F172A" /> : <Menu size={24} color="#0F172A" />}
        </button>
      </div>

      <div
        className={`w-full overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E2E8F0",
        }}
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 py-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href || href === "/hotels";
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-2 font-['Plus_Jakarta_Sans'] text-sm font-semibold leading-5 transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-2 border-t border-slate-200 pt-2">
            <Link
              href="/signin"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-2 text-center font-['Plus_Jakarta_Sans'] text-sm font-semibold leading-5 text-slate-600 transition-colors hover:bg-slate-100"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-center font-['Plus_Jakarta_Sans'] text-sm font-semibold leading-5 text-white transition-colors hover:bg-blue-700"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
