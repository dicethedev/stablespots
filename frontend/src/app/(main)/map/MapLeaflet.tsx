"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDirectIcon } from "@/assets/svg";
import { useEffect } from "react";

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

const createCustomIcon = () =>
  new L.Icon({
    iconUrl: "/image/marker-icon.svg",
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -45],
  });

// function FlyToMarker({ position }: { position: [number, number] }) {
//   const map = useMap();
//   useEffect(() => {
//     if (position) map.flyTo(position, 16, { duration: 1.5 });
//   }, [position, map]);
//   return null;
// }

function FlyToMarker({ position }: { position: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (map && position) {
      const lat = Number(position[0]);
      const lng = Number(position[1]);

      if (isNaN(lat) || isNaN(lng)) {
        console.error("Invalid coords received:", position);
        return;
      }

      try {
        map.flyTo([lat, lng], 16, { duration: 1.5 });
      } catch (err) {
        console.error("flyTo failed with:", lat, lng, err);
      }
    }
  }, [position, map]);

  return null;
}


interface MapProps {
  businesses: Business[];
  selectedBusiness: Business | null;
  mapPosition: [number, number];
}

export default function MapLeaflet({
  businesses,
  selectedBusiness,
  mapPosition,
}: MapProps) {
  return (
    <MapContainer center={mapPosition} zoom={13} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {businesses.map((biz) => {
        const gmapLink = `https://www.google.com/maps/dir/?api=1&destination=${biz.lat},${biz.lng}`;

        return (
          <Marker
            key={biz._id}
            position={[biz.lat, biz.lng]}
            icon={createCustomIcon()}
          >
            <Popup>
              <div className="w-[300px] p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 text-black dark:text-white flex flex-col justify-between h-[200px]">
                <div>
                  <h2 className="font-semibold text-md -mb-2">{biz.name}</h2>
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
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.open(gmapLink, "_blank");
                      }
                    }}
                    size="sm"
                    className="!bg-[var(--direct-btn-color)] text-white border-0 rounded-full px-3 py-1 text-sm flex items-center mt-3 md:mt-0"
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
        <FlyToMarker position={[selectedBusiness.lat, selectedBusiness.lng]} />
      )}
    </MapContainer>
  );
}
