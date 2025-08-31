// "use client";

// import { useState, useEffect, useCallback, useMemo } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import { BASE_URL } from "@/utils/config";
// import MapSidebar from "./components/MapSidebar";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// import dynamic from "next/dynamic";
// const MapLeaflet = dynamic(() => import("./MapLeaflet"), { ssr: false });

// export interface Business {
//   _id: string;
//   name: string;
//   category: string;
//   lat: number;
//   lng: number;
//   walletAddress: string;
//   website?: string;
//   description?: string;
//   acceptsUSDC?: boolean;
// }

// export default function Map() {
//   const router = useRouter();
//   const [businesses, setBusinesses] = useState<Business[]>([]);
//   const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
//     null
//   );
//   const [loading, setLoading] = useState<boolean>(true);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [category, setCategory] = useState<string>("");
//   const [sort, setSort] = useState<string>("recent");

//   const mapPosition = useMemo<[number, number]>(() => [6.5244, 3.3792], []);

//   const fetchBusinesses = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params: any = {
//         search: searchQuery || undefined,
//         category: category || undefined,
//         sort,
//         lat: mapPosition[0],
//         lng: mapPosition[1],
//       };

//       const res = await axios.get(`${BASE_URL}/businesses/search`, {
//         params,
//       });
//       setBusinesses(res.data);
//     } catch (err) {
//       console.error("Error fetching businesses:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [searchQuery, category, sort, mapPosition]);

//   useEffect(() => {
//     fetchBusinesses();
//   }, [fetchBusinesses]);

//   return (
//     <div className="relative w-full h-screen flex">
//       {/* Sidebar */}
//       <div className="fixed top-0 left-0 z-50 h-full w-[360px] bg-[var(--box-map-bg-color)] backdrop-blur-[27.2px] px-4 py-6 overflow-y-auto">
//         <MapSidebar
//           businesses={businesses}
//           selectedBusiness={selectedBusiness}
//           setSelectedBusiness={setSelectedBusiness}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           category={category}
//           setCategory={setCategory}
//           sort={sort}
//           setSort={setSort}
//           loading={loading}
//         />
//       </div>

//       {/* Logo top-right */}
//       <div
//         className="fixed top-4 right-4 z-[9999] bg-[#FFFFFF80] rounded-[20px] backdrop-blur-[5px] p-[12px] cursor-pointer"
//         onClick={() => router.push("/")}
//       >
//         <Image
//           src="/image/stablespots_logo.svg"
//           alt="StableSpots Logo"
//           width={140}
//           height={40}
//           className="object-contain"
//         />
//       </div>

//       {/* Map container */}
//       <div className="ml-[360px] flex-1 h-full flex items-center justify-center">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center h-full w-full backdrop-blur-sm">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//             <p className="mt-4 text-gray-700">Loading map...</p>
//           </div>
//         ) : (
//           <MapLeaflet
//             businesses={businesses}
//             selectedBusiness={selectedBusiness}
//             mapPosition={mapPosition}
//           />
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/utils/config";
import MapSidebar from "./components/MapSidebar";

const MapLeaflet = dynamic(() => import("./MapLeaflet"), { ssr: false });

export interface Business {
  _id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  walletAddress: string;
  website?: string;
  description?: string;
  acceptsUSDC?: boolean;
}

export default function Map() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("recent");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const mapPosition = useMemo<[number, number]>(() => [6.5244, 3.3792], []);

  const fetchBusinesses = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = {
        search: searchQuery || undefined,
        category: category || undefined,
        sort,
        lat: mapPosition[0],
        lng: mapPosition[1],
      };

      const res = await axios.get(`${BASE_URL}/businesses/search`, { params });
      setBusinesses(res.data);
    } catch (err) {
      console.error("Error fetching businesses:", err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, category, sort, mapPosition]);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  return (
    <div className="relative w-full h-screen flex overflow-hidden">

      {/* Mobile & Tablet Sidebar Toggle */}
      <button
        className="fixed top-4 left-4 z-[10000] p-3 bg-white rounded-lg shadow-md md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full bg-[var(--box-map-bg-color)] backdrop-blur-[27.2px] px-4 py-6 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:w-[280px] lg:w-[360px] rounded-r-[20px] shadow-lg
        `}
      >
        <MapSidebar
          businesses={businesses}
          selectedBusiness={selectedBusiness}
          setSelectedBusiness={setSelectedBusiness}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          loading={loading}
        />
      </div>

      {/* Overlay for mobile when sidebar open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Logo top-right */}
      <div
        className="fixed top-4 right-4 z-[9999] bg-[#FFFFFF80] rounded-[20px] backdrop-blur-[5px] p-[12px] cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/image/stablespots_logo.svg"
          alt="StableSpots Logo"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>

      {/* Map container */}
      <div
        className={`
          flex-1 h-full flex items-center justify-center transition-all duration-300
          ${isSidebarOpen ? "blur-sm md:blur-0" : ""}
          md:ml-[280px] lg:ml-[360px]
        `}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-700">Loading map...</p>
          </div>
        ) : (
          <MapLeaflet
            businesses={businesses}
            selectedBusiness={selectedBusiness}
            mapPosition={mapPosition}
          />
        )}
      </div>
    </div>
  );
}

