import { type Quantity } from './Quantity.ts'

export enum LengthUnit {
  METERS = 'meters',
  MILLIMETERS = 'millimeters',
}

export interface Length extends Quantity<LengthUnit> {}

export const Length = {
  MAGNITUDES: {
    [LengthUnit.METERS]: 1,
    [LengthUnit.MILLIMETERS]: 1 / 1_000,
  } satisfies Record<LengthUnit, number>,
} as const
