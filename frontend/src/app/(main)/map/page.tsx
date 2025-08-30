"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { BASE_URL } from "@/utils/config";
import MapSidebar from "./MapSidebar";
import { Button } from "@/components/ui/button";
import { ArrowDirectIcon } from "@/assets/svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

// Custom marker icon
const createCustomIcon = () =>
  new L.Icon({
    iconUrl: "/image/marker-icon.svg",
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -45],
  });

// Fly to marker
function FlyToMarker({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 16, { duration: 1.5 });
  }, [position, map]);
  return null;
}

export default function Map() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("recent");

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

      const res = await axios.get(`${BASE_URL}/api/businesses/search`, {
        params,
      });
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
    <div className="relative w-full h-screen flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 z-50 h-full w-[360px] bg-[var(--box-map-bg-color)] backdrop-blur-[27.2px] px-4 py-6 overflow-y-auto">
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

      {/* Logo top-right */}
      <div
        className="fixed top-4 right-4 z-[9999] bg-[#FFFFFF80] rounded-[20px] backdrop-blur-[5px] p-[12px] cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/image/stablespots_logo.svg"
          alt="StableSpots Logo"
          width={140}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Map container */}
      <div className="ml-[360px] flex-1 h-full flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full w-full backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-700">Loading map...</p>
          </div>
        ) : (
          <MapContainer
            center={mapPosition}
            zoom={13}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {businesses.map((biz) => {
              const gmapLink = `https://www.google.com/maps/dir/?api=1&destination=${biz.lat},${biz.lng}`;

              return (
                <Marker
                  key={biz._id}
                  position={[biz.lat, biz.lng]}
                  icon={createCustomIcon()}
                >
                  <Popup className="backdrop-blur-md">
                    <div className="w-[300px] p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 text-black dark:text-white flex flex-col justify-between h-[200px]">
                      <div>
                        <h2 className="font-semibold text-md -mb-2">
                          {biz.name}
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          {biz.category}
                        </p>
                        {biz.description && (
                          <p className="text-sm text-[#6F6F6F] dark:text-gray-400 font-medium -mt-2">
                            {biz.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between -mt-8">
                        <p className="text-sm font-medium text-black dark:text-white">
                          Tokens accepted:
                        </p>
                        <Image
                          src="/image/usdc-logo.svg"
                          alt="USDC Logo"
                          width={18}
                          height={18}
                        />
                      </div>

                      <div className="-mt-3">
                        <Button
                          onClick={() => window.open(gmapLink, "_blank")}
                          size="sm"
                          className="!bg-[var(--direct-btn-color)] text-white rounded-full px-3 py-1 flex items-center justify-center space-x-1"
                        >
                          <ArrowDirectIcon />
                          <span>Direct Me</span>
                        </Button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {selectedBusiness && (
              <FlyToMarker
                position={[selectedBusiness.lat, selectedBusiness.lng]}
              />
            )}
          </MapContainer>
        )}
      </div>
    </div>
  );
}
