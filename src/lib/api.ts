const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

function getBaseUrl() {
  if (!API_BASE_URL) throw new Error("VITE_API_BASE_URL is missing. Set it in the frontend .env file.")
  return API_BASE_URL.replace(/\/$/, "")
}

async function readJson<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T
  const payload = await response.json().catch(() => ({})) as { error?: string }
  if (!response.ok) throw new ApiError(payload.error ?? "The request could not be completed", response.status)
  return payload as T
}

export async function apiRequest<T>(path: string, init: RequestInit = {}, retrySession = true): Promise<T> {
  const baseUrl = getBaseUrl()
  const headers = new Headers(init.headers)
  if (init.body && !headers.has("content-type")) headers.set("content-type", "application/json")
  const response = await fetch(`${baseUrl}${path}`, { ...init, headers, credentials: "include" })

  const noRefresh = ["/auth/login", "/auth/register", "/auth/admin/login"].includes(path)
  if (response.status === 401 && retrySession && !noRefresh) {
    const refreshed = await fetch(`${baseUrl}/auth/refresh`, { method: "POST", credentials: "include" })
    if (refreshed.ok) return apiRequest<T>(path, init, false)
  }

  return readJson<T>(response)
}

export function jsonBody(value: unknown) {
  return JSON.stringify(value)
}
