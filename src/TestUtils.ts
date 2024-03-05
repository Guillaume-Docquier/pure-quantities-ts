import { type Unit } from './Quantity.ts'

export type UnitTestData<TUnit extends Unit> = Record<TUnit, Record<TUnit, { initial: number, converted: number }>>

export interface UnitTheoryData<TUnit extends Unit> {
  quantity: {
    value: number
    unit: TUnit
  }
  expected: {
    value: number
    unit: TUnit
  }
}

export function createTheory<TUnit extends Unit> (data: UnitTestData<TUnit>): Array<UnitTheoryData<TUnit>> {
  const theory: Array<UnitTheoryData<TUnit>> = []
  for (const fromUnit in data) {
    for (const toUnit in data[fromUnit]) {
      const { initial, converted } = data[fromUnit][toUnit]
      theory.push({ quantity: { value: initial, unit: fromUnit }, expected: { value: converted, unit: toUnit } })
    }
  }

  return theory
}
