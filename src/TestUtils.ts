import { type BaseUnit, type Quantity } from './Quantity.ts'

export type UnitTestData<TUnit extends BaseUnit> = Record<TUnit, Record<TUnit, { initial: number, converted: number }>>

export interface UnitTheoryData<TUnit extends BaseUnit> {
  quantity: Quantity<TUnit>
  expected: Quantity<TUnit>
}

export function createTheory<TUnit extends BaseUnit> (data: UnitTestData<TUnit>): Array<UnitTheoryData<TUnit>> {
  const theory: Array<UnitTheoryData<TUnit>> = []
  for (const fromUnit in data) {
    for (const toUnit in data[fromUnit]) {
      const { initial, converted } = data[fromUnit][toUnit]
      // TODO GD Fix as unknown as TUnit
      theory.push({ quantity: { value: initial, unit: fromUnit }, expected: { value: converted, unit: toUnit as unknown as TUnit } })
    }
  }

  return theory
}
