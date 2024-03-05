import { type Quantity } from './Quantity.ts'

export enum DistanceUnit {
  METERS = 'meters',
  MILLIMETERS = 'millimeters',
}

export interface Distance extends Quantity<DistanceUnit> {}

export const Distance = {
  MAGNITUDES: {
    [DistanceUnit.METERS]: 1,
    [DistanceUnit.MILLIMETERS]: 1 / 1_000,
  } satisfies Record<DistanceUnit, number>,
} as const
