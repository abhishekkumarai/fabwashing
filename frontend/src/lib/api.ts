// Thin fetch wrapper around the Django REST API (auth is bypassed on the backend).
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}/api${path}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${path}: ${text.slice(0, 200)}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export type Paginated<T> = { count: number; results: T[] };

export const api = {
  get: <T>(path: string) => req<T>(path),
  post: <T>(path: string, body: unknown) =>
    req<T>(path, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    req<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  del: (path: string) => req<void>(path, { method: "DELETE" }),
};

// Convenience list helper that tolerates both paginated and array responses.
export async function list<T>(path: string): Promise<T[]> {
  const data = await api.get<Paginated<T> | T[]>(path);
  if (Array.isArray(data)) return data;
  return data.results ?? [];
}
