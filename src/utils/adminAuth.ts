import type { AdminSession } from "@/types/admin";

export async function login(username: string, password: string): Promise<AdminSession> {
  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const errorMessage = (data as { error?: string })?.error ?? "Login failed";
    throw new Error(errorMessage);
  }

  return (await response.json()) as AdminSession;
}

export async function logout(): Promise<void> {
  const response = await fetch("/api/admin/logout", {
    method: "POST",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const errorMessage = (data as { error?: string })?.error ?? "Logout failed";
    throw new Error(errorMessage);
  }
}

export async function fetchSession(): Promise<AdminSession | null> {
  const response = await fetch("/api/admin/me");

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to load admin session");
  }

  return (await response.json()) as AdminSession;
}
