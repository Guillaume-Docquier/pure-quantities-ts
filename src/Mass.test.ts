import { describe, expect, it } from 'vitest'
import { Quantity } from './Quantity.ts'
import { MassUnit } from './Mass.ts'
import { createTheory } from './TestUtils.ts'

describe('Mass', () => {
  const THEORY = createTheory<MassUnit>({
    [MassUnit.GRAM]: {
      [MassUnit.GRAM]: { initial: 2.5, converted: 2.5 },
      [MassUnit.MILLIGRAM]: { initial: 2.5, converted: 2500 },
    },
    [MassUnit.MILLIGRAM]: {
      [MassUnit.GRAM]: { initial: 2500, converted: 2.5 },
      [MassUnit.MILLIGRAM]: { initial: 2500, converted: 2500 },
    },
  })

  describe('convert', () => {
    it.each(THEORY)('should convert $quantity.unit to $expected.unit', ({ quantity, expected }) => {
      // Act
      const converted = Quantity.convert(quantity, expected.unit)

      // Assert
      expect(converted).toEqual(expected)
    })
  })

  describe('in', () => {
    it.each(THEORY)('should convert $quantity.unit to $expected.unit', ({ quantity, expected }) => {
      // Act
      const converted = Quantity.in(quantity, expected.unit)

      // Assert
      expect(converted).toEqual(expected.value)
    })
  })
})
