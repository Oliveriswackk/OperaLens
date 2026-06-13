/**
 * Cliente HTTP para el backend FastAPI de OperaLens.
 *
 * Mientras el backend no exponga los endpoints (Backend/routers/api.py),
 * los hooks consumen mocks vía `mockFetch`. Cuando la API esté lista,
 * basta con cambiar la implementación de cada hook a `apiFetch`.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

/** Simula latencia de red para que los estados de carga sean visibles en demo */
export function mockFetch<T>(data: T, delayMs = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs))
}
