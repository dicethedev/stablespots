"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { BusinessStatus } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/app/hooks/useToast";
import SubmissionModal from "@/components/SubmissionModal";
import { BASE_URL } from "@/utils/config";

type FormFields = {
  name: string;
  category: string;
  lat: string;
  lng: string;
  walletAddress: string;
  website: string;
  status: BusinessStatus;
  acceptsUSDC: boolean;
  description: string;
  contactEmail: string;
};

export default function AddBusiness() {
  const { showError } = useToast();
  const [form, setForm] = useState<FormFields>({
    name: "",
    category: "",
    lat: "",
    lng: "",
    walletAddress: "",
    website: "",
    status: "pending",
    acceptsUSDC: false,
    description: "",
    contactEmail: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm((prev) => ({
            ...prev,
            lat: pos.coords.latitude.toString(),
            lng: pos.coords.longitude.toString(),
          }));
        },
        (err) => console.error("Error fetching location:", err)
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/businesses`, {
        ...form,
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
      });
      setSubmitted(true);
    } catch (error: any) {
      console.error("Error adding business:", error);
      showError("Failed to add business. Try again.", error?.toString());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#071134] to-[#0a1f4d] px-4 py-12 sm:px-6 md:px-8 lg:px-12">
      {submitted && (
        <SubmissionModal submitted={submitted} setSubmitted={setSubmitted} />
      )}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#071134] mb-8 text-center">
          🚀 Add Your Business
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-semibold text-[#071134] mb-2">
              Business Name
            </label>
            <input
              id="name"
              placeholder="e.g. Crypto Café"
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] focus:border-transparent transition w-full"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label htmlFor="category" className="text-sm font-semibold text-[#071134] mb-2">
              Category
            </label>
            <input
              id="category"
              placeholder="e.g. Restaurant, Retail, Service"
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          {/* Lat & Lng side by side on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="lat" className="text-sm font-semibold text-[#071134] mb-2">
                Latitude
              </label>
              <input
                id="lat"
                placeholder="Enter latitude"
                className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full"
                value={form.lat}
                onChange={(e) => setForm({ ...form, lat: e.target.value })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lng" className="text-sm font-semibold text-[#071134] mb-2">
                Longitude
              </label>
              <input
                id="lng"
                placeholder="Enter longitude"
                className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full"
                value={form.lng}
                onChange={(e) => setForm({ ...form, lng: e.target.value })}
              />
            </div>
          </div>

          {/* Wallet */}
          <div className="flex flex-col">
            <label htmlFor="walletAddress" className="text-sm font-semibold text-[#071134] mb-2">
              Wallet Address
            </label>
            <input
              id="walletAddress"
              placeholder="0x123...abc"
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full"
              value={form.walletAddress}
              onChange={(e) => setForm({ ...form, walletAddress: e.target.value })}
            />
          </div>

          {/* Accepts USDC */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptsUSDC"
              checked={form.acceptsUSDC}
              onCheckedChange={(checked: any) =>
                setForm({ ...form, acceptsUSDC: Boolean(checked) })
              }
            />
            <Label htmlFor="acceptsUSDC" className="text-sm font-semibold text-[#071134]">
              Accepts USDC?
            </Label>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-semibold text-[#071134] mb-2">
              Description / Notes
            </label>
            <textarea
              id="description"
              placeholder="Short description about your business"
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* Contact Email */}
          <div className="flex flex-col">
            <label htmlFor="contactEmail" className="text-sm font-semibold text-[#071134] mb-2">
              Contact Email (optional)
            </label>
            <input
              id="contactEmail"
              placeholder="you@example.com"
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full"
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
            />
          </div>

          {/* Website */}
          <div className="flex flex-col">
            <label htmlFor="website" className="text-sm font-semibold text-[#071134] mb-2">
              Website (optional)
            </label>
            <input
              id="website"
              placeholder="https://example.com"
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-[#071134] hover:bg-[#0a1a4b] text-white font-semibold py-4 rounded-xl shadow-md transform transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Add Business
          </button>
        </form>
      </div>
    </div>
  );
}
