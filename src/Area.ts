import { type DerivedUnit } from './DerivedUnit.ts'
import { BaseUnitKind } from './BaseUnit.ts'
import { type LengthUnit } from './Length.ts'
import { TimeUnit } from './Time.ts'
import { MassUnit } from './Mass.ts'
import { type Quantity } from './Quantity.ts'

export interface Area<TLength extends LengthUnit> extends Quantity<AreaUnit<TLength>> {}

export interface AreaUnit<TLength extends LengthUnit> extends DerivedUnit {
  unitName: 'Area'
  baseUnits: {
    [BaseUnitKind.Length]: {
      unit: TLength
      power: 2
    }
    [BaseUnitKind.Time]: {
      unit: TimeUnit.SECONDS
      power: 0
    }
    [BaseUnitKind.Mass]: {
      unit: MassUnit.GRAM
      power: 0
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
      [BaseUnitKind.Time]: {
        unit: TimeUnit.SECONDS,
        power: 0,
      },
      [BaseUnitKind.Mass]: {
        unit: MassUnit.GRAM,
        power: 0,
      },
    },
  }
}
