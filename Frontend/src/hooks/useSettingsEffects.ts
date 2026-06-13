import { useEffect } from 'react'
import { useSettingsStore } from '@/stores/settingsStore'

function applySettings(state: ReturnType<typeof useSettingsStore.getState>) {
  const root = document.documentElement
  root.dataset.textSize = state.textSize
  root.dataset.density = state.density
  root.classList.toggle('dark', state.theme === 'dark')
  root.dataset.highContrast = String(state.highContrast)
  root.dataset.reduceMotion = String(state.reduceAnimations)
  root.dataset.focusVisible = String(state.focusVisibility)
}

export function useSettingsEffects() {
  useEffect(() => {
    useSettingsStore.getState().hydrate()
    applySettings(useSettingsStore.getState())
    return useSettingsStore.subscribe(applySettings)
  }, [])
}
