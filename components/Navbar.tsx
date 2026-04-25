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
    <div className="w-full left-0 top-0 fixed z-50 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border-b border-slate-200 flex flex-col justify-start items-start">
      <div className="w-full max-w-[1280px] mx-auto h-16 px-6 flex justify-between items-center">

        {/* Left: Logo + Nav Links */}
        <div className="flex justify-start items-center gap-8">
          {/* Logo */}
          <Link href="/" className="text-blue-600 text-2xl font-black font-['Plus_Jakarta_Sans'] leading-8 whitespace-nowrap smooth-transition hover:scale-110">
            T-Goda
          </Link>

          {/* Nav Links - Hidden on mobile */}
          <nav className="hidden md:flex justify-start items-center gap-6">
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

        {/* Right: Sign In + Create Account (Desktop) */}
        <div className="hidden md:flex justify-start items-center gap-4">
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} color="#0F172A" /> : <Menu size={24} color="#0F172A" />}
        </button>

      </div>

      {/* Mobile Menu - Slides down */}
      <div
        className={`w-full md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E2E8F0",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col gap-4">
          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-3">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href || href === "/hotels";
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-semibold font-['Plus_Jakarta_Sans'] leading-5 py-2 px-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Sign In + Create Account */}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
            <Link
              href="/signin"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg text-slate-600 text-sm font-semibold font-['Plus_Jakarta_Sans'] leading-5 hover:bg-slate-100 transition-colors text-center"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-semibold font-['Plus_Jakarta_Sans'] leading-5 transition-colors text-center"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}