import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RestaurantsIcon, RetailStoreIcon, SalonIcon } from "@/assets/svg";
import { Category } from "@/lib/types";

const categories: Category[] = [
  { name: "All Categories", icon: null },
  { name: "Restaurants", icon: <RestaurantsIcon /> },
  { name: "Retail Store", icon: <RetailStoreIcon /> },
  { name: "Salon", icon: <SalonIcon /> },
  { name: "Others", icon: null },
];

interface Props {
  activeCategory: string;
  setActiveCategory: (name: string) => void;
  loading?: boolean;
}

export const CategoryFilter = ({ activeCategory, setActiveCategory, loading }: Props) => {
  return (
    <div className="flex flex-row flex-wrap gap-3 mb-6">
      {loading
        ? // Skeleton placeholders while loading
          Array.from({ length: categories.length }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
            />
          ))
        : // Actual category buttons
          categories.map((cat) => {
            const isActive = cat.name === activeCategory;
            return (
              <Button
                key={cat.name}
                size="sm"
                onClick={() => setActiveCategory(cat.name)}
                variant="default"
                className={`!bg-white cursor-pointer border 
                    ${isActive ? "!text-[#1D1D20]" : "!text-[#9B9B9B]"}
                    border-[var(--border-color)] rounded-full px-3 py-3 text-sm`}
                style={isActive ? { boxShadow: "inset 0px -3px 0px 0px #ECECEC" } : {}}
              >
                {cat.icon && <span className="text-base">{cat.icon}</span>}
                <span>{cat.name}</span>
              </Button>
            );
          })}
    </div>
  );
};