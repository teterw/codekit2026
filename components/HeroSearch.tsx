"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, Search } from "lucide-react";

const DEFAULT_CHECK_IN = "2024-10-12";
const DEFAULT_CHECK_OUT = "2024-10-18";

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function addDays(value: string, days: number) {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export default function HeroSearch() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(DEFAULT_CHECK_IN);
  const [checkOut, setCheckOut] = useState(DEFAULT_CHECK_OUT);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!calendarRef.current?.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const dateLabel = `${formatDate(checkIn)} - ${formatDate(checkOut)}`;

  const handleCheckInChange = (value: string) => {
    setCheckIn(value);

    if (checkOut <= value) {
      setCheckOut(addDays(value, 1));
    }
  };

  return (
    <div className="mt-6 flex w-full max-w-[768px] flex-col gap-2 rounded-xl bg-[#FFFFFF] p-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-1 md:flex-row md:items-stretch">
      <label className="flex h-[52px] min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#6B7FC6] bg-[#E9E9E9] px-[13px]">
        <MapPin className="h-5 w-5 shrink-0 text-[#64748B]" />
        <input
          type="text"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          placeholder="Where to next?"
          className="min-w-0 flex-1 bg-transparent text-base text-[#191C22] outline-none placeholder:text-[#6B7280]"
        />
      </label>

      <div ref={calendarRef} className="relative min-w-0 flex-1">
        <button
          type="button"
          onClick={() => setIsCalendarOpen((open) => !open)}
          className="flex h-[52px] w-full min-w-0 items-center gap-2 rounded-lg border border-[#6B7FC6] bg-[#E9E9E9] px-[13px] text-left text-base text-[#191C22] transition-colors hover:bg-[#E7E8F1]"
          aria-expanded={isCalendarOpen}
        >
          <Calendar className="h-5 w-5 shrink-0 text-[#64748B]" />
          <span className="truncate">{dateLabel}</span>
        </button>

        {isCalendarOpen ? (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 rounded-xl border border-[#C2C6D5]/60 bg-white p-4 text-left shadow-[0_18px_40px_rgba(15,23,42,0.20)] md:left-auto md:w-[360px]">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#424753]">
                  Check in
                </span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(event) => handleCheckInChange(event.target.value)}
                  className="h-11 rounded-lg border border-[#6B7FC6] bg-[#F8F9FA] px-3 text-sm font-semibold text-[#191C22] outline-none focus:border-[#005CBD] focus:ring-2 focus:ring-[#5392F9]/20"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#424753]">
                  Check out
                </span>
                <input
                  type="date"
                  value={checkOut}
                  min={addDays(checkIn, 1)}
                  onChange={(event) => setCheckOut(event.target.value)}
                  className="h-11 rounded-lg border border-[#6B7FC6] bg-[#F8F9FA] px-3 text-sm font-semibold text-[#191C22] outline-none focus:border-[#005CBD] focus:ring-2 focus:ring-[#5392F9]/20"
                />
              </label>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="min-w-0 truncate text-sm font-semibold text-[#191C22]">
                {dateLabel}
              </span>
              <button
                type="button"
                onClick={() => setIsCalendarOpen(false)}
                className="h-10 rounded-lg bg-[#005CBD] px-5 text-sm font-bold text-white transition-colors hover:bg-[#004f9f]"
              >
                Done
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <Link
        href="/search"
        className="flex h-[52px] min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-[#005CBD] px-8 text-lg font-bold text-[#FFFFFF] transition duration-200 hover:bg-[#004f9f] active:scale-[0.98] md:w-[151px] md:flex-none"
      >
        <Search className="h-[18px] w-[18px]" />
        Search
      </Link>
    </div>
  );
}
