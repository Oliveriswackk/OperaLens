/**
 * Cliente HTTP para el backend FastAPI de OperaLens.
 * La URL base apunta al servidor compartido del equipo (VITE_API_URL).
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

/** Error de API que conserva el status y el `detail` del backend FastAPI. */
export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function parseError(res: Response): Promise<ApiError> {
  let detail = res.statusText
  try {
    const body = await res.json()
    if (body && typeof body.detail === 'string') detail = body.detail
  } catch {
    // respuesta sin cuerpo JSON; conservamos el statusText
  }
  return new ApiError(res.status, detail)
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })
  if (!res.ok) {
    throw await parseError(res)
  }
  return res.json() as Promise<T>
}

/** POST multipart/form-data. No fija Content-Type para que el browser ponga el boundary. */
export async function apiUpload<T>(path: string, formData: FormData): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    throw await parseError(res)
  }
  return res.json() as Promise<T>
}

/** Simula latencia de red para que los estados de carga sean visibles en demo */
export function mockFetch<T>(data: T, delayMs = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs))
}
