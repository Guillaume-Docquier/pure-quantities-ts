import type { Quantity } from '../Quantity.ts'

export type LuminousIntensity = Quantity<LuminousIntensityUnit>

export enum LuminousIntensityUnit {}

export const LuminousIntensity = {
  MAGNITUDES: {
  } satisfies Record<LuminousIntensityUnit, number>,
} as const
