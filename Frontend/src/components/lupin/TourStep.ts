export type { TourStepConfig } from '@/lib/lupin/tours'

export function resolveTarget(targetId: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-lupin-target="${targetId}"]`)
}

export interface TargetRect {
  top: number
  left: number
  width: number
  height: number
}

export function measureTarget(el: HTMLElement, padding = 8): TargetRect {
  const rect = el.getBoundingClientRect()
  return {
    top: rect.top - padding,
    left: rect.left - padding,
    width: rect.width + padding * 2,
    height: rect.height + padding * 2,
  }
}

export type CardPlacement = 'top' | 'bottom' | 'left' | 'right'

export function computeCardPosition(
  target: TargetRect,
  placement: CardPlacement | 'auto',
  cardWidth: number,
  cardHeight: number,
): { top: number; left: number; placement: CardPlacement } {
  const gap = 16
  const vw = window.innerWidth
  const vh = window.innerHeight
  const margin = 16

  const placements: CardPlacement[] =
    placement === 'auto' ? ['bottom', 'top', 'right', 'left'] : [placement]

  for (const p of placements) {
    let top = 0
    let left = 0

    switch (p) {
      case 'bottom':
        top = target.top + target.height + gap
        left = target.left + target.width / 2 - cardWidth / 2
        break
      case 'top':
        top = target.top - cardHeight - gap
        left = target.left + target.width / 2 - cardWidth / 2
        break
      case 'right':
        top = target.top + target.height / 2 - cardHeight / 2
        left = target.left + target.width + gap
        break
      case 'left':
        top = target.top + target.height / 2 - cardHeight / 2
        left = target.left - cardWidth - gap
        break
    }

    left = Math.max(margin, Math.min(left, vw - cardWidth - margin))
    top = Math.max(margin, Math.min(top, vh - cardHeight - margin))

    const fits =
      p === 'bottom'
        ? target.top + target.height + gap + cardHeight <= vh - margin
        : p === 'top'
          ? target.top - gap - cardHeight >= margin
          : p === 'right'
            ? target.left + target.width + gap + cardWidth <= vw - margin
            : target.left - gap - cardWidth >= margin

    if (fits || placement !== 'auto') {
      return { top, left, placement: p }
    }
  }

  return {
    top: Math.max(margin, vh - cardHeight - margin - 80),
    left: Math.max(margin, vw - cardWidth - margin - 80),
    placement: 'bottom',
  }
}
