import type { Quantity } from '../Quantity.ts'

export type Temperature = Quantity<TemperatureUnit>

export enum TemperatureUnit {}

export const Temperature = {
  MAGNITUDES: {
  } satisfies Record<TemperatureUnit, number>,
} as const
