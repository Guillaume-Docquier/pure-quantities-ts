import type { LengthUnit } from './Length.ts'
import type { TimeUnit } from './Time.ts'
import type { MassUnit } from './Mass.ts'

export function isBaseUnit (data: unknown): data is BaseUnit {
  return typeof data === 'string'
}

export enum BaseUnitKind {
  Length = 'length',
  Time = 'time',
  Mass = 'mass',
}

export type BaseUnit = LengthUnit | TimeUnit | MassUnit
