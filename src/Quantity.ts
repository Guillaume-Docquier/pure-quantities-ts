import { Length } from './Length.ts'
import { Time } from './Time.ts'
import { Mass } from './Mass.ts'
import { type BaseUnit, isBaseUnit } from './BaseUnit.ts'
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
} as const

export const Quantity = {
  convert<TUnit extends Unit>(quantity: Quantity<TUnit>, newUnit: TUnit): Quantity<TUnit> {
    return {
      value: Quantity.in(quantity, newUnit),
      unit: newUnit,
    }
  },

  in<TUnit extends Unit>(quantity: Quantity<TUnit>, newUnit: TUnit): number {
    if (isDerivedUnit(quantity.unit) && isDerivedUnit(newUnit)) {
      return quantity.value *
        getFactor(quantity.unit.baseUnits.length, newUnit.baseUnits.length) *
        getFactor(quantity.unit.baseUnits.mass, newUnit.baseUnits.mass) *
        getFactor(quantity.unit.baseUnits.time, newUnit.baseUnits.time)
    }
    else if (isBaseUnit(quantity.unit) && isBaseUnit(newUnit)) {
      return quantity.value * MAGNITUDES[quantity.unit] / MAGNITUDES[newUnit]
    }

    throw new Error(`Unsupported conversion (for now) from ${JSON.stringify(quantity.unit)} to ${JSON.stringify(newUnit)}`)
  },
} as const

function getFactor<TBaseUnitSpec extends BaseUnitSpecification<BaseUnit>> (from: TBaseUnitSpec, to: TBaseUnitSpec): number {
  return MAGNITUDES[from.unit] ** from.power / MAGNITUDES[to.unit] ** to.power
}
