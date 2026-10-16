import { z } from "zod";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public path: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type ApiOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  /** Bearer token (same JWT the mobile app uses). */
  token?: string;
  retries?: number;
};

/** Standard list envelope shared with the mobile app. */
export const paginated = <T extends z.ZodType>(item: T) =>
  z.object({
    data: z.array(item),
    meta: z.object({ page: z.number(), limit: z.number(), total: z.number() }),
  });

function baseUrl() {
  const url = process.env.API_BASE_URL;
  if (!url) throw new ApiError("API_BASE_URL is not set", 500, "");
  return url.replace(/\/$/, "");
}

/**
 * Typed fetch wrapper: base URL, auth header, JSON, retries, and Zod validation.
 * Validation guarantees UI components only ever receive data matching our types.
 */
export async function apiFetch<T extends z.ZodType>(
  path: string,
  schema: T,
  { token, retries = 1, body, headers, ...init }: ApiOptions = {},
): Promise<z.infer<T>> {
  const url = `${baseUrl()}${path}`;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        ...init,
        headers: {
          Accept: "application/json",
          ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "X-Client": "tgb-web",
          ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) {
        // Don't retry client errors
        if (res.status < 500) throw new ApiError(res.statusText, res.status, path);
        throw new ApiError(`Server error ${res.status}`, res.status, path);
      }

      const json = await res.json();
      const parsed = schema.safeParse(json);
      if (!parsed.success) {
        throw new ApiError(`Invalid response shape: ${parsed.error.message}`, 502, path);
      }
      return parsed.data;
    } catch (err) {
      lastError = err;
      if (err instanceof ApiError && err.status < 500) break;
    }
  }
  throw lastError;
}
