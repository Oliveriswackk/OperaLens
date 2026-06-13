import { create } from 'zustand'

const NAV_STORAGE_KEY = 'operalens-nav-expanded'
const SIDEBAR_STORAGE_KEY = 'operalens-sidebar-collapsed'

interface UiState {
  commandPaletteOpen: boolean
  copilotOpen: boolean
  sidebarCollapsed: boolean
  mobileSidebarOpen: boolean
  navExpandedGroups: Record<string, boolean>
  setCommandPaletteOpen: (open: boolean) => void
  setCopilotOpen: (open: boolean) => void
  toggleSidebarCollapsed: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setMobileSidebarOpen: (open: boolean) => void
  toggleNavGroup: (id: string) => void
  setNavExpandedGroups: (groups: Record<string, boolean>) => void
  hydrateUi: () => void
}

function loadNavExpanded(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(NAV_STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return {}
}

function loadSidebarCollapsed(): boolean {
  try {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export const useUiStore = create<UiState>((set, get) => ({
  commandPaletteOpen: false,
  copilotOpen: false,
  sidebarCollapsed: loadSidebarCollapsed(),
  mobileSidebarOpen: false,
  navExpandedGroups: loadNavExpanded(),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  setCopilotOpen: (open) => set({ copilotOpen: open }),
  toggleSidebarCollapsed: () => {
    const next = !get().sidebarCollapsed
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next))
    set({ sidebarCollapsed: next })
  },
  setSidebarCollapsed: (collapsed) => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed))
    set({ sidebarCollapsed: collapsed })
  },
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
  toggleNavGroup: (id) =>
    set((state) => {
      const next = { ...state.navExpandedGroups, [id]: !state.navExpandedGroups[id] }
      localStorage.setItem(NAV_STORAGE_KEY, JSON.stringify(next))
      return { navExpandedGroups: next }
    }),
  setNavExpandedGroups: (groups) => {
    localStorage.setItem(NAV_STORAGE_KEY, JSON.stringify(groups))
    set({ navExpandedGroups: groups })
  },
  hydrateUi: () =>
    set({
      sidebarCollapsed: loadSidebarCollapsed(),
      navExpandedGroups: loadNavExpanded(),
    }),
}))
