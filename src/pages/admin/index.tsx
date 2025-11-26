import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { NextPageWithMeta } from "@/pages/_app";
import { fetchSession, login } from "@/utils/adminAuth";

const AdminLogin: NextPageWithMeta = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const ensureLoggedOut = async () => {
      try {
        const session = await fetchSession();
        if (cancelled) return;
        if (session) {
          router.replace("/admin/dashboard");
          return;
        }
      } catch (checkError) {
        console.error("[AdminLogin] Session check failed", checkError);
      } finally {
        if (!cancelled) {
          setIsChecking(false);
        }
      }
    };

    ensureLoggedOut();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(username.trim(), password);
      router.push("/admin/dashboard");
    } catch (loginError: unknown) {
      const message = loginError instanceof Error ? loginError.message : "Invalid username or password.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen p-8 text-center text-slate-600">Checking session…</div>
    );
  }

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
          <button type="submit" className="btn-primary justify-center" disabled={isSubmitting}>
            {isSubmitting ? "Signing In…" : "Sign In"}
          </button>
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
