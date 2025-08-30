"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Business } from "../page";
import { ArrowDirectIcon } from "@/assets/svg";
import WalletAddress from "@/components/walletAddress";

type BusinessCardProps = {
  biz: Business;
};

export const BusinessCard = ({ biz }: BusinessCardProps) => {
  return (
    <div className="bg-white p-3 rounded-[20px] shadow-[0px_1px_1px_0px_#0000000D] border">
      {/* <div className="rounded-[10px] overflow-hidden w-full mb-2">
        <Image
          src="/image/shop-image.png"
          alt="Shop Image"
          width={500}
          height={250}
          className="w-full h-auto object-cover"
        />
      </div> */}

      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-medium text-base text-[var(--general-text-color)] mb-1">
            {biz.name}
          </h2>
          {biz.walletAddress ? (
            <WalletAddress walletAddress={biz.walletAddress} />
          ) : null}
        </div>

        <Button
          onClick={() => {}}
          size="sm"
          className="!bg-[var(--direct-btn-color)] text-white border-0 border-[var(--border-color)] 
          rounded-full px-3 py-0 text-sm cursor-pointer font-medium flex items-center "
        >
          <ArrowDirectIcon />
          Direct Me
        </Button>
      </div>

      <h4 className="font-medium text-sm mt-4 text-[#6F6F6F]">
        {biz.description}
      </h4>

      <div className="flex items-center space-x-2 mt-4">
        <p className="text-sm font-medium text-black">Tokens accepted:</p>
        {biz.acceptsUSDC ? (
          <Image
            src="/image/usdc-logo.svg"
            alt="USDC Logo"
            width={18}
            height={18}
            className="w-[18px] h-[18px]"
          />
        ) : (
          <span className="text-sm text-gray-500">None</span>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        {/* Category with icon biz.category */}
        <Button
          className="!bg-[var(--box-map-bg-color)] text-[#1D1D20]
          rounded-full cursor-pointer border border-[var(--border-color)] font-medium text-sm"
        >
          {biz.category}
        </Button>
      </div>
    </div>
  );
};

export default BusinessCard;
