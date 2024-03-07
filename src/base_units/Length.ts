import { type Quantity } from '../Quantity.ts'

export type Length = Quantity<LengthUnit>

export enum LengthUnit {
  METERS = 'meters',
  MILLIMETERS = 'millimeters',
}

export const Length = {
  MAGNITUDES: {
    [LengthUnit.METERS]: 1,
    [LengthUnit.MILLIMETERS]: 1 / 1_000,
  } satisfies Record<LengthUnit, number>,
} as const
