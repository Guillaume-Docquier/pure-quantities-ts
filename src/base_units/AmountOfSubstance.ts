import type { Quantity } from '../Quantity.ts'

export type AmountOfSubstance = Quantity<AmountOfSubstanceUnit>

export enum AmountOfSubstanceUnit {}

export const AmountOfSubstance = {
  MAGNITUDES: {
  } satisfies Record<AmountOfSubstanceUnit, number>,
} as const
