import { type Quantity } from '../Quantity.ts'

export type Time = Quantity<TimeUnit>

export enum TimeUnit {
  SECONDS = 'seconds',
  MILLISECONDS = 'milliseconds',
}

export const Time = {
  MAGNITUDES: {
    [TimeUnit.SECONDS]: 1,
    [TimeUnit.MILLISECONDS]: 1 / 1_000,
  } satisfies Record<TimeUnit, number>,
} as const
