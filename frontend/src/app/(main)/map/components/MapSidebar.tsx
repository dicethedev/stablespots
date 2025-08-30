"use client";

import { useState, useMemo } from "react";
import { Business } from "../page";
import { CategoryFilter } from "./CategoryFilter";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import BusinessCard from "./BusinessCard";
import { SortBy } from "./SortBy";
import debounce from "lodash.debounce";

interface MapSidebarProps {
  businesses: Business[];
  selectedBusiness: Business | null;
  setSelectedBusiness: (biz: Business) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  category: string;
  setCategory: (cat: string) => void;
  sort: string;
  setSort: (s: string) => void;
  loading?: boolean;
}

export default function MapSidebar({
  businesses,
  setSelectedBusiness,
  searchQuery,
  setSearchQuery,
  category,
  setCategory,
  sort,
  setSort,
  loading,
}: MapSidebarProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  //search input to avoid frequent state updates
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchQuery(query);
      }, 500), // 500ms delay
    [setSearchQuery]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  // Filter businesses locally (or rely on backend fetch if needed)
  const filteredBusinesses = businesses.filter((b) => {
    const matchesCategory =
      category && category !== "All Categories"
        ? b.category.toLowerCase() === category.toLowerCase()
        : true;
    const matchesSearch = searchQuery
      ? b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const hasResults = filteredBusinesses.length > 0;

  return (
    <div className="fixed top-0 left-0 z-50 h-full w-full sm:w-[360px] bg-[var(--box-map-bg-color)] backdrop-blur-[27.2px] px-6 py-6 overflow-y-auto rounded-r-[20px] shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[var(--general-text-color)]">
          Search for <span className="text-[var(--primary-color)]">USDC</span>
          <br />
          near you
        </h1>

        {/* Search Box */}
        <div className="relative mt-4">
          {loading ? (
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          ) : (
            <>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search USDC Near Me..."
                value={localSearch}
                onChange={handleSearchChange}
                className="pl-12 pr-4 py-5 bg-white text-black placeholder:text-gray-400 rounded-full border-white focus:border-white focus:outline-none focus:ring-0 focus:ring-transparent shadow-[0px_1px_1px_0px_#0000000D]"
              />
              {localSearch && (
                <button
                  onClick={() => {
                    setLocalSearch("");
                    setSearchQuery("");
                  }}
                  className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        activeCategory={category}
        setActiveCategory={setCategory}
        loading={loading}
      />

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm text-[var(--btn-outline-text-color)] font-medium">
          {hasResults ? "Recommended" : "No Recommendations"}
        </h3>
        <SortBy sort={sort} setSort={setSort} disabled={!hasResults} />
      </div>

      {/* Business List */}
      <div className="space-y-4 mt-4">
        {loading ? (
          // Skeleton loader
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            />
          ))
        ) : filteredBusinesses.length > 0 ? (
          filteredBusinesses.map((biz) => (
            <div
              key={biz._id}
              onClick={() => setSelectedBusiness(biz)}
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <BusinessCard biz={biz} />
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p className="font-medium text-sm text-center">
              USDC is coming to your <br /> location soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
