import type { NextApiRequest, NextApiResponse } from "next";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import jwt from "jsonwebtoken";
import type { AdminSession } from "@/types/admin";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const AUTH_COOKIE_NAME = "kealee_admin_token";
const TOKEN_TTL_SECONDS = 60 * 60 * 8; // 8 hours
const JWT_SECRET = "kealee-admin-secret-key"; // TODO: move to env for production

function serializeCookie(value: string, options?: { maxAge?: number }) {
  const parts = [`${AUTH_COOKIE_NAME}=${value}`];
  parts.push("Path=/");
  parts.push("HttpOnly");
  parts.push("SameSite=Strict");
  if (options?.maxAge !== undefined) {
    parts.push(`Max-Age=${options.maxAge}`);
    if (options.maxAge === 0) {
      parts.push("Expires=Thu, 01 Jan 1970 00:00:00 GMT");
    }
  }
  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }
  return parts.join("; ");
}

export function validateAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function generateAdminToken(username: string): string {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: TOKEN_TTL_SECONDS });
}

export function verifyAdminToken(token: string): AdminSession | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AdminSession;
    if (!payload?.username) {
      return null;
    }
    return { username: payload.username };
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextApiRequest | GetServerSidePropsContext["req"]): string | null {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split("; ");
  for (const cookie of cookies) {
    const [name, ...rest] = cookie.split("=");
    if (name === AUTH_COOKIE_NAME) {
      return rest.join("=");
    }
  }
  return null;
}

export function getSessionFromRequest(req: NextApiRequest | GetServerSidePropsContext["req"]): AdminSession | null {
  const token = (req as { cookies?: Record<string, string> }).cookies?.[AUTH_COOKIE_NAME] ?? getTokenFromRequest(req);
  if (!token) return null;
  return verifyAdminToken(token);
}

export function setAuthCookie(res: NextApiResponse, token: string) {
  res.setHeader("Set-Cookie", serializeCookie(token, { maxAge: TOKEN_TTL_SECONDS }));
}

export function clearAuthCookie(res: NextApiResponse) {
  res.setHeader("Set-Cookie", serializeCookie("", { maxAge: 0 }));
}

export function requireAdminApi(req: NextApiRequest, res: NextApiResponse): AdminSession | null {
  const session = getSessionFromRequest(req);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  return session;
}

export function withAdminGuard<P extends Record<string, unknown> = Record<string, unknown>>(
  handler?: (
    context: GetServerSidePropsContext,
    session: AdminSession,
  ) => Promise<GetServerSidePropsResult<P>> | GetServerSidePropsResult<P>,
): (
  context: GetServerSidePropsContext,
) => Promise<GetServerSidePropsResult<P & { session: AdminSession }>> {
  return async (context) => {
    const session = getSessionFromRequest(context.req);

    if (!session) {
      return {
        redirect: {
          destination: "/admin",
          permanent: false,
        },
      };
    }

    if (!handler) {
      return {
        props: { session } as P & { session: AdminSession },
      };
    }

    const result = await handler(context, session);

    if ("props" in result) {
      return {
        ...result,
        props: {
          ...(result.props as P),
          session,
        } as P & { session: AdminSession },
      };
    }

    return result as GetServerSidePropsResult<P & { session: AdminSession }>;
  };
}

export { AUTH_COOKIE_NAME };
