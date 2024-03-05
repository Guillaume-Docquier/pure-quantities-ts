import { type Quantity } from './Quantity.ts'

export enum MassUnit {
  GRAM = 'grams',
  MILLIGRAM = 'milligrams',
}

export interface Mass extends Quantity<MassUnit> {}

export const Mass = {
  MAGNITUDES: {
    [MassUnit.GRAM]: 1,
    [MassUnit.MILLIGRAM]: 1 / 1_000,
  } satisfies Record<MassUnit, number>,
} as const
