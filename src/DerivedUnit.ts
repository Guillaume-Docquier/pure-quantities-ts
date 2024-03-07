import type { BaseUnit, BaseUnitKind } from './BaseUnit.ts'
import { type LengthUnit } from './Length.ts'
import { type TimeUnit } from './Time.ts'
import { type MassUnit } from './Mass.ts'
import { TypeGuards } from './TypeGuards.ts'

export function isDerivedUnit (unit: unknown): unit is DerivedUnit {
  return TypeGuards.isRecord(unit) && 'unitName' in unit
}

export interface DerivedUnit {
  unitName: string
  baseUnits: BaseUnitsSpecification
}

export type BaseUnitsSpecification = {
  [TBaseUnitKind in BaseUnitKind]: BaseUnitSpecification<KindToBaseUnit[TBaseUnitKind]>
}

export interface KindToBaseUnit {
  [BaseUnitKind.Length]: LengthUnit
  [BaseUnitKind.Time]: TimeUnit
  [BaseUnitKind.Mass]: MassUnit
}

export interface BaseUnitSpecification<TBaseUnit extends BaseUnit> {
  unit: TBaseUnit
  power: number
}
