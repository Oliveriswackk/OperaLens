export const SUPPORT_EMAIL = 'soporte@operalens.com'
export const SUPPORT_SLA = 'Respuesta promedio: menos de 24 horas'

export function supportMailtoUrl(subject = 'Soporte OperaLens'): string {
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}`
}
