import type { Quantity } from '../Quantity.ts'

export type ElectricCurrent = Quantity<ElectricCurrentUnit>

export enum ElectricCurrentUnit {}

export const ElectricCurrent = {
  MAGNITUDES: {
  } satisfies Record<ElectricCurrentUnit, number>,
} as const
