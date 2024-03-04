import { type Quantity } from './Quantity.ts'

export enum TimeUnit {
  SECONDS = 'seconds',
  MILLISECONDS = 'milliseconds',
}

const MAGNITUDES: Record<TimeUnit, number> = {
  [TimeUnit.SECONDS]: 1,
  [TimeUnit.MILLISECONDS]: 1 / 1_000,
} as const

export interface Time extends Quantity<TimeUnit> {}

export const Time = {
  convert (time: Time, newUnit: TimeUnit): Time {
    return {
      value: Time.in(time, newUnit),
      unit: newUnit,
    }
  },

  in (time: Time, newUnit: TimeUnit): number {
    return time.value * MAGNITUDES[time.unit] / MAGNITUDES[newUnit]
  },
} as const
