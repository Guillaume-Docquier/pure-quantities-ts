import { AmountOfSubstance, ElectricCurrent, Length, LuminousIntensity, Mass, Temperature, Time } from './base_units'
import { type BaseUnit, type BaseUnitKind, BaseUnitToKind, isBaseUnit } from './BaseUnit.ts'
import { type BaseUnitSpecification, type DerivedUnit, isDerivedUnit } from './DerivedUnit.ts'

type Unit = BaseUnit | DerivedUnit

export interface Quantity<TUnit extends Unit> {
  value: number
  unit: TUnit
}

const MAGNITUDES: Record<BaseUnit, number> = {
  ...Length.MAGNITUDES,
  ...Time.MAGNITUDES,
  ...Mass.MAGNITUDES,
  ...AmountOfSubstance.MAGNITUDES,
  ...ElectricCurrent.MAGNITUDES,
  ...LuminousIntensity.MAGNITUDES,
  ...Temperature.MAGNITUDES,
} as const

export const Quantity = {
  convert<TUnit extends Unit>(quantity: Quantity<TUnit>, newUnit: TUnit): Quantity<TUnit> {
    return {
      value: Quantity.in(quantity, newUnit),
      unit: newUnit,
    }
  },

  in<TUnit extends Unit>(quantity: Quantity<TUnit>, newUnit: TUnit): number {
    if (!canConvert(quantity.unit, newUnit)) {
      throw new Error(`Cannot convert from ${JSON.stringify(quantity.unit)} to ${JSON.stringify(newUnit)}. The new unit kinds are not a subset of the quantity units kinds.`)
    }

    // TODO GD Mix base units and derived units
    if (isDerivedUnit(quantity.unit) && isDerivedUnit(newUnit)) {
      return quantity.value *
        getFactor(quantity.unit.baseUnits?.length, newUnit.baseUnits?.length) *
        getFactor(quantity.unit.baseUnits?.mass, newUnit.baseUnits?.mass) *
        getFactor(quantity.unit.baseUnits?.time, newUnit.baseUnits?.time) *
        getFactor(quantity.unit.baseUnits?.electricCurrent, newUnit.baseUnits?.electricCurrent) *
        getFactor(quantity.unit.baseUnits?.temperature, newUnit.baseUnits?.temperature) *
        getFactor(quantity.unit.baseUnits?.amountOfSubstance, newUnit.baseUnits?.amountOfSubstance) *
        getFactor(quantity.unit.baseUnits?.luminousIntensity, newUnit.baseUnits?.luminousIntensity)
    }
    else if (isBaseUnit(quantity.unit) && isBaseUnit(newUnit)) {
      return quantity.value * MAGNITUDES[quantity.unit] / MAGNITUDES[newUnit]
    }

    throw new Error(`Unsupported conversion (for now) from ${JSON.stringify(quantity.unit)} to ${JSON.stringify(newUnit)}`)
  },
} as const

function canConvert (from: Unit, to: Unit): boolean {
  return isSubset(new Set(getBaseUnits(from)), getBaseUnits(to))
}

function isSubset (set: Set<unknown>, maybeSubset: unknown[]): boolean {
  return maybeSubset.every(item => set.has(item))
}

function getBaseUnits (unit: Unit): BaseUnitKind[] {
  if (isDerivedUnit(unit)) {
    return Object.keys(unit.baseUnits) as BaseUnitKind[]
  }

  return [BaseUnitToKind[unit]]
}

function getFactor<TBaseUnitSpec extends BaseUnitSpecification<BaseUnit>> (from: TBaseUnitSpec | undefined, to: TBaseUnitSpec | undefined): number {
  if (from === undefined || to === undefined) {
    return 1
  }

  return MAGNITUDES[from.unit] ** from.power / MAGNITUDES[to.unit] ** to.power
}
