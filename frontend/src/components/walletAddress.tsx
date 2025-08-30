"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { useToast } from "@/app/hooks/useToast";

export default function WalletAddress({ walletAddress }: { walletAddress: string }) {
  const [copied, setCopied] = useState(false);
  const { showInfo } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    showInfo("Wallet address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shortenWallet = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="flex items-center gap-2">
      <p className="font-medium mt-2 text-sm text-[#6F6F6F]">
        {shortenWallet(walletAddress)}
      </p>
      <button
        onClick={handleCopy}
        className="p-1 rounded-md hover:bg-gray-100 transition cursor-pointer"
      >
        <Copy
          size={16}
          className={copied ? "text-green-500" : "text-blue-500"}
        />
      </button>
    </div>
  );
}
