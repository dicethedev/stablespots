"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);

    // Remove token cookie
    deleteCookie("admin_token");

    // Redirect back to login page
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
