export type AdminUser = {
  username: string;
};

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123"; // change later to env
const ADMIN_SESSION_KEY = "kealee_admin_session";

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const user: AdminUser = { username };
    if (typeof window !== "undefined") {
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(user));
      window.dispatchEvent(new CustomEvent("adminAuthChanged"));
    }
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    window.dispatchEvent(new CustomEvent("adminAuthChanged"));
  }
}

export function getCurrentAdmin(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getCurrentAdmin() !== null;
}
