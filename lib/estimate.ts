// Pure pricing logic — safe to import from both client and server code.

export type EstimateInput = {
  bedrooms: number
  bathrooms: number
  serviceType: string
  hasBasement: boolean
  hasGarage: boolean
  hasPatio: boolean
  hasWindows: boolean
  hasPets: boolean
}

export const SERVICE_BASE_PRICES: Record<string, number> = {
  'standard-cleaning': 120,
  'deep-cleaning': 220,
  'move-in-out': 250,
  'recurring-cleaning': 100,
  'special-event': 175,
}

export const ADDON_PRICES = {
  basement: 50,
  garage: 35,
  patio: 30,
  windows: 40,
  pets: 25,
} as const

export function calculateEstimate(data: EstimateInput): { min: number; max: number } {
  let base = SERVICE_BASE_PRICES[data.serviceType] ?? 150
  base += data.bedrooms * 25
  base += data.bathrooms * 20
  if (data.hasBasement) base += ADDON_PRICES.basement
  if (data.hasGarage) base += ADDON_PRICES.garage
  if (data.hasPatio) base += ADDON_PRICES.patio
  if (data.hasWindows) base += ADDON_PRICES.windows
  if (data.hasPets) base += ADDON_PRICES.pets
  return { min: base, max: Math.round(base * 1.2) }
}
