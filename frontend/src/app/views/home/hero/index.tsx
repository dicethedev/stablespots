"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapIcon } from "@/assets/svg";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-20 h-full w-full max-w-7xl mx-auto">
      {/* Logo */}
      <div>
        <Image
          src="/image/stablespots_logo.svg"
          alt="StableSpots logo"
          width={100}
          height={100}
          className="mb-6 w-50 h-50 sm:w-24 sm:h-24 md:w-28 md:h-28"
        />
      </div>

      <div className="pt-6 sm:pt-10">
        {/* Headline */}
        <div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 flex flex-wrap items-center justify-center gap-2"
            style={{ fontFamily: "Balige" }}
          >
            Find places{" "}
            <Image
              src="/icons/find-places.png"
              alt="USDC"
              width={40}
              height={40}
              className="inline-block w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            />{" "}
            <b
              className="text-[var(--headline-text-color)]"
              style={{ fontFamily: "Balige" }}
            >
              to spend
            </b>
            <Image
              src="/icons/usdc-logo.png"
              alt="USDC"
              width={40}
              height={40}
              className="inline-block w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            />
            USDC
          </h1>
          <h1
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6"
            style={{ fontFamily: "Balige" }}
          >
            <b
              className="text-[var(--headline-text-color)]"
              style={{ fontFamily: "Balige" }}
            >
              anywhere in the
            </b>{" "}
            <Image
              src="/icons/global-lovation.png"
              alt="USDC"
              width={40}
              height={40}
              className="inline-block w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            />{" "}
            world.
          </h1>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-[var(--desc-text-color)] font-medium max-w-2xl mb-10 mx-auto px-2">
          Discover nearby businesses that accept{" "}
          <b className="text-black">USDC</b>, from restaurants to retailers.{" "}
          <b className="text-black">StableSpots</b> helps you find real-world
          places to spend stablecoins, seamlessly and globally.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-2">
        <Button
          onClick={() => router.push("/map")}
          size="lg"
          className="!bg-[var(--explore-btn-color)] text-[var(--explore-btn-text-color)] 
          border border-[var(--border-color)] rounded-full px-6 sm:px-8 md:px-10 py-4 md:py-6 text-sm sm:text-base md:text-lg cursor-pointer 
          flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          Explore the Map
          <MapIcon />
        </Button>
        <Button
          onClick={() => router.push("/addbusiness")}
          size="lg"
          variant="outline"
          className="bg-[var(--btn-outline-color)] text-[var(--btn-outline-text-color)]
          cursor-pointer border border-[var(--border-color)] hover:text-black 
          px-6 sm:px-8 md:px-10 py-4 md:py-6 rounded-full text-sm sm:text-base md:text-lg
          w-full sm:w-auto"
        >
          Add a business
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
