"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/config";
import { getCookie } from "cookies-next";
import LogoutButton from "./LogoutButton";

interface Business {
  _id: string;
  name: string;
  category: string;
  wallet: string;
  website?: string;
  status: string;
  acceptsUSDC: boolean;
  description?: string;
  contactEmail?: string;
}

export default function AdminDashboard() {
  const [pending, setPending] = useState<Business[]>([]);
  const [message, setMessage] = useState<string>("");

  // Fetch pending businesses
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const token = getCookie("admin_token");
        const res = await axios.get(`${BASE_URL}/api/businesses/pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPending(res.data);
      } catch (err) {
        console.error("Error fetching pending businesses:", err);
      }
    };

    fetchPending();
  }, []);

  // Update business status
  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const token = getCookie("admin_token");
      await axios.patch(
        `${BASE_URL}/api/businesses/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updated = pending.filter((b) => b._id !== id);
      setPending(updated);

      // If list is empty, show a message
      if (updated.length === 0) {
        setMessage("All pending businesses have been reviewed!");
      }
    } catch (err) {
      console.error(`Error updating business status for ${id}:`, err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          🚀 Admin Dashboard
        </h1>
        <LogoutButton />
      </header>

      {/* Content */}
      <main className="p-8">
        {pending.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 mt-20">
            {message ? (
              <>
                <span className="text-6xl mb-4">🎯</span>
                <p className="text-lg font-semibold text-green-600">
                  {message}
                </p>
              </>
            ) : (
              <>
                <span className="text-6xl mb-4">🎉</span>
                <p className="text-lg font-medium">No pending businesses</p>
                <p className="text-sm">Check back later for new submissions.</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pending.map((biz) => (
              <div
                key={biz._id}
                className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {biz.name}
                  </h2>
                  <span className="inline-block text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full mb-3">
                    {biz.category}
                  </span>

                  <p className="text-sm text-gray-600 mb-2">
                    USDC Accepted:{" "}
                    <span
                      className={`font-semibold ${
                        biz.acceptsUSDC ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {biz.acceptsUSDC ? "Yes ✅" : "No ❌"}
                    </span>
                  </p>

                  {biz.description && (
                    <p className="text-gray-700 text-sm mb-2">
                      {biz.description}
                    </p>
                  )}

                  {biz.contactEmail && (
                    <p className="text-sm text-gray-500 mb-1">
                      📧 {biz.contactEmail}
                    </p>
                  )}

                  {biz.website && (
                    <a
                      href={biz.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      🌐 {biz.website}
                    </a>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => updateStatus(biz._id, "approved")}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => updateStatus(biz._id, "rejected")}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
