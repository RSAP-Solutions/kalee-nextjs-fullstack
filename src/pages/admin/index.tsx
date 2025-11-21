import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { NextPageWithMeta } from "../_app";
import { isAuthenticated, login } from "@/utils/adminAuth";

const AdminLogin: NextPageWithMeta = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = login(username.trim(), password);
    if (ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-card">
        <h1 className="text-center text-2xl font-semibold text-navy">Admin Login</h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          Enter your admin credentials to continue.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="username" className="text-sm font-semibold text-navy">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm font-semibold text-navy">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
            />
          </div>
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}
          <button type="submit" className="btn-primary justify-center">
            Sign In
          </button>
          <p className="text-center text-xs text-slate-500">
            Default: admin / kealee@2025
          </p>
        </form>
      </div>
    </div>
  );
};

AdminLogin.meta = {
  title: "Admin Login | Kealee",
  description: "Login to Kealee admin portal.",
};

export default AdminLogin;
