import { create } from 'zustand'

interface Organization {
  id: string
  nombre: string
  tipo: string
}

interface UserState {
  nombre: string
  rol: string
  iniciales: string
  organizaciones: Organization[]
  orgActiva: Organization
  setOrgActiva: (org: Organization) => void
}

const organizaciones: Organization[] = [
  { id: 'org-1', nombre: 'Manufactura Norte S.A.', tipo: 'Manufactura · PyME' },
  { id: 'org-2', nombre: 'Planta Bajío', tipo: 'Producción · Regional' },
  { id: 'org-3', nombre: 'Distribución Centro', tipo: 'Distribución · Nacional' },
]

export const useUserStore = create<UserState>((set) => ({
  nombre: 'Juan Dávila',
  rol: 'Director General',
  iniciales: 'JD',
  organizaciones,
  orgActiva: organizaciones[0],
  setOrgActiva: (org) => set({ orgActiva: org }),
}))
