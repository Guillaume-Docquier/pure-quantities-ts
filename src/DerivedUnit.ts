import type { BaseUnit, BaseUnitKind, KindToBaseUnit } from './BaseUnit.ts'
import { TypeGuards } from './TypeGuards.ts'

export function isDerivedUnit (unit: unknown): unit is DerivedUnit {
  return TypeGuards.isRecord(unit) && 'unitName' in unit
}

export interface DerivedUnit {
  unitName: string
  baseUnits: BaseUnitsSpecification
}

export type BaseUnitsSpecification = {
  [TBaseUnitKind in BaseUnitKind]?: BaseUnitSpecification<KindToBaseUnit[TBaseUnitKind]>
}

export interface BaseUnitSpecification<TBaseUnit extends BaseUnit> {
  unit: TBaseUnit
  power: number
}
