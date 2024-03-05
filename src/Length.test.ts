import { describe, expect, it } from 'vitest'
import { Quantity } from './Quantity.ts'
import { LengthUnit } from './Length.ts'
import { createTheory } from './TestUtils.ts'

describe('Length', () => {
  const THEORY = createTheory<LengthUnit>({
    [LengthUnit.METERS]: {
      [LengthUnit.METERS]: { initial: 2.5, converted: 2.5 },
      [LengthUnit.MILLIMETERS]: { initial: 2.5, converted: 2500 },
    },
    [LengthUnit.MILLIMETERS]: {
      [LengthUnit.METERS]: { initial: 2500, converted: 2.5 },
      [LengthUnit.MILLIMETERS]: { initial: 2500, converted: 2500 },
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
