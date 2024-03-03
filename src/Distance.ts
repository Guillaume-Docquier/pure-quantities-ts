import { type Quantity } from './Quantity.ts'

export enum DistanceUnit {
  METERS = 'meters',
  MILLIMETERS = 'millimeters',
}

const MAGNITUDES: Record<DistanceUnit, number> = {
  [DistanceUnit.METERS]: 1,
  [DistanceUnit.MILLIMETERS]: 1 / 1_000,
}

export interface Distance extends Quantity<DistanceUnit> {}

export const Distance = {
  convert (distance: Distance, newUnit: DistanceUnit): Distance {
    return {
      value: Distance.in(distance, newUnit),
      unit: newUnit,
    }
  },

  in (distance: Distance, newUnit: DistanceUnit): number {
    return distance.value * MAGNITUDES[distance.unit] / MAGNITUDES[newUnit]
  },
}
