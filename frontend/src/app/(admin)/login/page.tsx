"use client";

import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import axios from "axios";
import { BASE_URL } from "@/utils/config";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

   const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/api/admin/login`, {
        password,
      });
      // Save JWT token in cookie
      setCookie("admin_token", res.data.token, { maxAge: 6 * 60 * 60 }); // 6 hours

      router.push("/admin"); // Redirect to dashboard
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || "Login failed");
      } else {
        setError("Server error, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your password to access the dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <Button
              onClick={handleLogin}
              className="w-full cursor-pointer"
              disabled={loading || !password}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
