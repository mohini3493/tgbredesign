import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, type Session } from "./types";

/**
 * Reads the current session on the server.
 * Today: returns null (auth not enabled).
 * Later: verify the JWT in the cookie (or call GET /v1/auth/me) — same token as the mobile app.
 * Must be called inside a <Suspense> boundary (it reads cookies at request time).
 */
export async function getSession(): Promise<Session> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  // TODO: verify token / fetch profile from the TGB API
  return null;
}
