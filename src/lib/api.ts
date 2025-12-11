export const getApiBase = () => {
  // Hardcode API base for this project per request
  return "https://api.charadesai.com";
};

import { getToken as getStoredToken } from "@/lib/auth";

export async function postJson<T = unknown>(path: string, data?: unknown, token?: string) {
  const base = getApiBase();
  const res = await fetch(`${base}${path.startsWith("/") ? path : `/${path}`}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token || getStoredToken() ? { Authorization: `Bearer ${token || getStoredToken()}` } : {}),
    },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => null);
  const jsonAny = json as { message?: string; errors?: unknown } | null;
  if (!res.ok) {
    const err = new Error(jsonAny?.message || res.statusText) as Error & { details?: unknown };
    err.details = jsonAny?.errors ?? null;
    throw err;
  }

  return json as T;
}
