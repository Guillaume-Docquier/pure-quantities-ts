import { type DerivedUnit } from './DerivedUnit.ts'
import { BaseUnitKind } from './BaseUnit.ts'
import { type LengthUnit } from './base_units/Length.ts'
import { type Quantity } from './Quantity.ts'

export interface Area<TLength extends LengthUnit> extends Quantity<AreaUnit<TLength>> {}

export interface AreaUnit<TLength extends LengthUnit> extends DerivedUnit {
  unitName: 'Area'
  baseUnits: {
    [BaseUnitKind.Length]: {
      unit: TLength
      power: 2
    }
  }
}

export function AreaUnit<TLength extends LengthUnit> (lengthUnit: TLength): AreaUnit<TLength> {
  return {
    unitName: 'Area',
    baseUnits: {
      [BaseUnitKind.Length]: {
        unit: lengthUnit,
        power: 2,
      },
    },
  }
}
