"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import FilterSidebar, { FiltersState, DEFAULT_FILTERS } from "@/components/FilterSidebar";
import ResultsHeader from "@/components/ResultsHeader";
import FlashDealsCard from "@/components/FlashDealsCard";
import PropertyCard from "@/components/PropertyCard";
import Pagination from "@/components/Pagination";
import QuickViewModal from "@/components/QuickViewModal";
import WishlistDrawer from "@/components/WishlistDrawer";
import CompareBar from "@/components/CompareBar";
import CompareModal from "@/components/CompareModal";
import RecentlyViewedWidget from "@/components/RecentlyViewedWidget";
import SkeletonCard from "@/components/SkeletonCard";
import {
  ALL_PROPERTIES,
  ITEMS_PER_PAGE,
  PropertyData,
  FACILITY_FILTER_MAP,
} from "@/components/data";
import { useWishlist } from "@/hooks/useWishlist";
import { useCompare } from "@/hooks/useCompare";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useBreakpoint } from "@/hooks/useBreakpoint";

function applyFilters(properties: PropertyData[], filters: FiltersState): PropertyData[] {
  return properties.filter((p) => {
    if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(p.propertyType))
      return false;
    if (filters.starRatings.length > 0 && !filters.starRatings.includes(p.stars)) return false;
    if (filters.facilities.length > 0) {
      const hasAll = filters.facilities.every((facility) => {
        const tags = FACILITY_FILTER_MAP[facility] ?? [];
        return tags.some((tag) => p.tagLabels.includes(tag));
      });
      if (!hasAll) return false;
    }
    if (filters.reviewScores.length > 0) {
      const match = filters.reviewScores.some((score) => {
        if (score === "Superb 9+") return p.ratingScoreNum >= 9;
        if (score === "Very Good 8+") return p.ratingScoreNum >= 8;
        if (score === "Good 7+") return p.ratingScoreNum >= 7;
        return false;
      });
      if (!match) return false;
    }
    if (filters.neighborhoods.length > 0 && !filters.neighborhoods.includes(p.neighborhood))
      return false;
    if (filters.bedTypes.length > 0 && !filters.bedTypes.includes(p.bedType)) return false;
    if (p.priceNum < filters.priceMin || p.priceNum > filters.priceMax) return false;
    return true;
  });
}

function applySorting(properties: PropertyData[], sortBy: string): PropertyData[] {
  const sorted = [...properties];
  if (sortBy === "Price: Low to High") sorted.sort((a, b) => a.priceNum - b.priceNum);
  else if (sortBy === "Price: High to Low") sorted.sort((a, b) => b.priceNum - a.priceNum);
  else if (sortBy === "Review Score") sorted.sort((a, b) => b.ratingScoreNum - a.ratingScoreNum);
  else if (sortBy === "Star Rating") sorted.sort((a, b) => b.stars - a.stars);
  return sorted;
}

function getChips(filters: FiltersState): { label: string; key: string }[] {
  const chips: { label: string; key: string }[] = [];
  filters.propertyTypes.forEach((t) => chips.push({ label: t, key: `propertyTypes:${t}` }));
  filters.starRatings.forEach((r) => chips.push({ label: `${r}-star`, key: `starRatings:${r}` }));
  filters.facilities.forEach((f) => chips.push({ label: f, key: `facilities:${f}` }));
  filters.reviewScores.forEach((s) => chips.push({ label: s, key: `reviewScores:${s}` }));
  filters.neighborhoods.forEach((n) => chips.push({ label: n, key: `neighborhoods:${n}` }));
  filters.bedTypes.forEach((b) => chips.push({ label: `${b} Bed`, key: `bedTypes:${b}` }));
  if (filters.priceMin > 0 || filters.priceMax < 1000) {
    const maxLabel = filters.priceMax >= 1000 ? "1000+" : `$${filters.priceMax}`;
    chips.push({ label: `$${filters.priceMin}–${maxLabel}`, key: "priceRange" });
  }
  return chips;
}

export default function SearchPage() {
  const [destination, setDestination] = useState("Bali, Indonesia");
  const [dateRange, setDateRange] = useState("Oct 12 - Oct 19, 2024");
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState("Recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // New feature state
  const [quickViewProperty, setQuickViewProperty] = useState<PropertyData | null>(null);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const wishlist = useWishlist();
  const compare = useCompare();
  const recentlyViewed = useRecentlyViewed(4);
  const { isMobile } = useBreakpoint();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const filteredAndSorted = useMemo(
    () => applySorting(applyFilters(ALL_PROPERTIES, filters), sortBy),
    [filters, sortBy]
  );

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const pageProperties = filteredAndSorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const triggerLoad = (fn?: () => void) => {
    setIsLoading(true);
    setCurrentPage(1);
    if (fn) fn();
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleFiltersChange = (next: FiltersState) => {
    triggerLoad(() => setFilters(next));
  };

  const handleSortChange = (sort: string) => {
    triggerLoad(() => setSortBy(sort));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenProperty = (property: PropertyData) => {
    setQuickViewProperty(property);
    recentlyViewed.add(property.id);
  };

  const chips = getChips(filters);

  const removeChip = (key: string) => {
    const [type, value] = key.split(":");
    const next = { ...filters };
    if (type === "propertyTypes") next.propertyTypes = filters.propertyTypes.filter((v) => v !== value);
    if (type === "starRatings") next.starRatings = filters.starRatings.filter((v) => v !== Number(value));
    if (type === "facilities") next.facilities = filters.facilities.filter((v) => v !== value);
    if (type === "reviewScores") next.reviewScores = filters.reviewScores.filter((v) => v !== value);
    if (type === "neighborhoods") next.neighborhoods = filters.neighborhoods.filter((v) => v !== value);
    if (type === "bedTypes") next.bedTypes = filters.bedTypes.filter((v) => v !== value);
    if (key === "priceRange") { next.priceMin = 0; next.priceMax = 1000; }
    handleFiltersChange(next);
  };

  const recentlyViewedProperties = recentlyViewed.viewed
    .map((id) => ALL_PROPERTIES.find((p) => p.id === id))
    .filter(Boolean) as PropertyData[];

  const wishlistProperties = wishlist.savedIds
    .map((id) => ALL_PROPERTIES.find((p) => p.id === id))
    .filter(Boolean) as PropertyData[];

  const compareProperties = compare.selected
    .map((id) => ALL_PROPERTIES.find((p) => p.id === id))
    .filter(Boolean) as PropertyData[];

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FA" }}>
      <Navbar />
      <div style={{ paddingTop: 64 }}>
        <SearchBar
          destination={destination}
          onDestinationChange={setDestination}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          adults={adults}
          onAdultsChange={setAdults}
          rooms={rooms}
          onRoomsChange={setRooms}
          onSearch={() => triggerLoad()}
        />

        <div
          className="search-results-layout"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            paddingLeft: isMobile ? 16 : 24,
            paddingRight: isMobile ? 16 : 24,
            paddingTop: isMobile ? 16 : 32,
            paddingBottom: isMobile ? 100 : 32,
            display: "flex",
            alignItems: "flex-start",
            gap: 24,
          }}
        >
          {/* Sidebar — desktop only */}
          {!isMobile && (
            <FilterSidebar
              filters={filters}
              onChange={handleFiltersChange}
              onReset={() => handleFiltersChange(DEFAULT_FILTERS)}
            />
          )}

          {/* Mobile filter drawer */}
          <AnimatePresence>
            {isMobile && filterDrawerOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setFilterDrawerOpen(false)}
                  style={{
                    position: "fixed", inset: 0,
                    background: "rgba(10,15,30,0.45)",
                    backdropFilter: "blur(3px)",
                    zIndex: 180,
                  }}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 340, damping: 32 }}
                  style={{
                    position: "fixed",
                    top: 0, left: 0, bottom: 0,
                    width: "min(320px, 90vw)",
                    background: "#F8F9FA",
                    zIndex: 181,
                    overflowY: "auto",
                    paddingBottom: 24,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 20px 12px" }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#191C22" }}>Filters</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      onClick={() => setFilterDrawerOpen(false)}
                      style={{ width: 32, height: 32, borderRadius: 9999, background: "#F3F4F6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <X size={15} color="#424753" />
                    </motion.button>
                  </div>
                  <div style={{ paddingLeft: 8, paddingRight: 8 }}>
                    <FilterSidebar
                      filters={filters}
                      onChange={(f) => { handleFiltersChange(f); setFilterDrawerOpen(false); }}
                      onReset={() => { handleFiltersChange(DEFAULT_FILTERS); setFilterDrawerOpen(false); }}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Results column */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Mobile filter toggle */}
            {isMobile && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilterDrawerOpen(true)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  paddingLeft: 14, paddingRight: 14, paddingTop: 9, paddingBottom: 9,
                  background: chips.length > 0 ? "#EEF3FF" : "white",
                  borderRadius: 10,
                  border: chips.length > 0 ? "1px solid rgba(0,92,189,0.30)" : "1px solid rgba(194,198,213,0.40)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  alignSelf: "flex-start",
                }}
              >
                <SlidersHorizontal size={14} color={chips.length > 0 ? "#005CBD" : "#424753"} />
                <span style={{ fontSize: 13, fontWeight: 600, color: chips.length > 0 ? "#005CBD" : "#191C22" }}>
                  Filters{chips.length > 0 ? ` (${chips.length})` : ""}
                </span>
              </motion.button>
            )}

            <ResultsHeader
              count={filteredAndSorted.length}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />

            {/* Active filter chips — horizontal scroll */}
            <AnimatePresence>
              {chips.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: -16 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: -16 }}
                  style={{ overflowX: "auto", overflowY: "hidden", paddingBottom: 2 }}
                >
                  <div style={{ display: "flex", flexWrap: "nowrap", gap: 8, width: "max-content" }}>
                    {chips.map((chip) => (
                      <motion.div
                        key={chip.key}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          paddingLeft: 10,
                          paddingRight: 8,
                          paddingTop: 4,
                          paddingBottom: 4,
                          background: "#EEF3FF",
                          borderRadius: 9999,
                          border: "1px solid rgba(0,92,189,0.20)",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: 12, color: "#005CBD", fontWeight: 500 }}>{chip.label}</span>
                        <button
                          onClick={() => removeChip(chip.key)}
                          style={{ display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: 2 }}
                        >
                          <X size={11} color="#005CBD" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <FlashDealsCard />

            {/* Property cards / skeleton / empty */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </motion.div>
              ) : pageProperties.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "64px 32px",
                    background: "white",
                    borderRadius: 12,
                    outline: "1px rgba(194,198,213,0.20) solid",
                    outlineOffset: -1,
                    gap: 16,
                  }}
                >
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#C2C6D5" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: "#191C22", margin: 0 }}>No properties found</h3>
                  <p style={{ fontSize: 14, color: "#6B7280", textAlign: "center", maxWidth: 320, margin: 0 }}>
                    Try adjusting your filters or searching in a different area.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleFiltersChange(DEFAULT_FILTERS)}
                    style={{
                      paddingLeft: 24,
                      paddingRight: 24,
                      paddingTop: 10,
                      paddingBottom: 10,
                      background: "#005CBD",
                      borderRadius: 8,
                      color: "white",
                      fontSize: 14,
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Clear all filters
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {pageProperties.map((property, i) => (
                    <motion.div
                      key={property.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 28 }}
                    >
                      <PropertyCard
                        property={property}
                        onBook={() => handleOpenProperty(property)}
                        isSaved={wishlist.isSaved(property.id)}
                        onSaveToggle={(e) => { e.stopPropagation(); wishlist.toggle(property.id); }}
                        isCompared={compare.isSelected(property.id)}
                        canCompare={compare.canAdd(property.id)}
                        onCompareToggle={(e) => { e.stopPropagation(); compare.toggle(property.id); }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {!isLoading && pageProperties.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* Floating Saved button */}
      <AnimatePresence>
        {wishlist.count > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onClick={() => setWishlistOpen(true)}
            style={{
              position: "fixed",
              top: isMobile ? 72 : 80,
              right: isMobile ? 12 : 24,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              gap: 7,
              paddingLeft: 14,
              paddingRight: 14,
              paddingTop: 9,
              paddingBottom: 9,
              background: "white",
              borderRadius: 12,
              boxShadow: "0px 8px 24px rgba(0,0,0,0.14), 0px 2px 6px rgba(0,0,0,0.07)",
              border: "1px solid rgba(194,198,213,0.30)",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <Heart size={14} color="#B61B4A" fill="#B61B4A" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#191C22" }}>Saved</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={wishlist.count}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  display: "inline-block",
                  paddingLeft: 6, paddingRight: 6, paddingTop: 1, paddingBottom: 1,
                  background: "#B61B4A", borderRadius: 9999,
                  fontSize: 11, color: "white", fontWeight: 700,
                }}
              >
                {wishlist.count}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Overlays and modals */}
      <QuickViewModal
        property={quickViewProperty}
        onClose={() => setQuickViewProperty(null)}
        isSaved={quickViewProperty ? wishlist.isSaved(quickViewProperty.id) : false}
        onSaveToggle={() => quickViewProperty && wishlist.toggle(quickViewProperty.id)}
      />

      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        properties={wishlistProperties}
        onRemove={(id) => wishlist.toggle(id)}
        onBook={(p) => { setWishlistOpen(false); handleOpenProperty(p); }}
      />

      <CompareBar
        selected={compareProperties}
        onRemove={(id) => compare.toggle(id)}
        onCompare={() => setCompareModalOpen(true)}
        onClear={() => compare.clear()}
      />

      {compareModalOpen && (
        <CompareModal
          properties={compareProperties}
          onClose={() => setCompareModalOpen(false)}
          onBook={(p) => { setCompareModalOpen(false); handleOpenProperty(p); }}
        />
      )}

      <RecentlyViewedWidget
        properties={recentlyViewedProperties}
        onOpen={(p) => handleOpenProperty(p)}
      />
    </div>
  );
}
