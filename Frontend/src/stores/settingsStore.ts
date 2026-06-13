import { create } from 'zustand'

export type TextSize = 'small' | 'medium' | 'large'
export type InterfaceDensity = 'compact' | 'comfortable' | 'spacious'
export type Theme = 'light' | 'dark'
export type TimeFormat = '12h' | '24h'

interface SettingsState {
  textSize: TextSize
  density: InterfaceDensity
  theme: Theme
  highContrast: boolean
  reduceAnimations: boolean
  keyboardNavigation: boolean
  focusVisibility: boolean
  systemAlerts: boolean
  riskAlerts: boolean
  inventoryAlerts: boolean
  aiRecommendations: boolean
  emailNotifications: boolean
  autoCollapseSidebar: boolean
  enableTooltips: boolean
  showOnboardingTips: boolean
  rememberNavigationState: boolean
  language: string
  timeFormat: TimeFormat
  dateFormat: string
  currencyFormat: string
  set: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void
  hydrate: () => void
}

const STORAGE_KEY = 'operalens-settings'

const defaults: Omit<SettingsState, 'set' | 'hydrate'> = {
  textSize: 'medium',
  density: 'comfortable',
  theme: 'light',
  highContrast: false,
  reduceAnimations: false,
  keyboardNavigation: true,
  focusVisibility: true,
  systemAlerts: true,
  riskAlerts: true,
  inventoryAlerts: true,
  aiRecommendations: true,
  emailNotifications: false,
  autoCollapseSidebar: false,
  enableTooltips: true,
  showOnboardingTips: true,
  rememberNavigationState: true,
  language: 'es',
  timeFormat: '24h',
  dateFormat: 'DD/MM/YYYY',
  currencyFormat: 'MXN',
}

function loadSettings(): Omit<SettingsState, 'set' | 'hydrate'> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults, ...JSON.parse(raw) }
  } catch {
    /* ignore */
  }
  return defaults
}

function persist(state: Omit<SettingsState, 'set' | 'hydrate'>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...loadSettings(),
  set: (key, value) => {
    set({ [key]: value } as Partial<SettingsState>)
    const { set: _s, hydrate: _h, ...rest } = get()
    persist(rest)
  },
  hydrate: () => set(loadSettings()),
}))
