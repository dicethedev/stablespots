"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import AdminDashboard from "../components/AdminDashboard";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("admin_token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (<AdminDashboard />);
}
