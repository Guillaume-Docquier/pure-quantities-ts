import { describe, expect, it } from 'vitest'
import { Quantity } from './Quantity.ts'
import { createTheory } from './TestUtils.ts'
import { LengthUnit } from './base_units/Length.ts'
import { type Area, AreaUnit } from './Area.ts'

describe('Area', () => {
  const THEORY = createTheory<LengthUnit>({
    [LengthUnit.METERS]: {
      [LengthUnit.METERS]: { initial: 2.5, converted: 2.5 },
      [LengthUnit.MILLIMETERS]: { initial: 2.5, converted: 2500000 },
    },
    [LengthUnit.MILLIMETERS]: {
      [LengthUnit.METERS]: { initial: 2500, converted: 0.0025 },
      [LengthUnit.MILLIMETERS]: { initial: 2500, converted: 2500 },
    },
  })

  describe('convert', () => {
    it.each(THEORY)('should convert $quantity.unit to $expected.unit', ({ quantity, expected }) => {
      // Arrange
      const area: Area<typeof quantity.unit> = {
        value: quantity.value,
        unit: AreaUnit(quantity.unit),
      }

      // Act
      const converted = Quantity.convert(area, AreaUnit(expected.unit))

      // Assert
      expect(converted).toEqual({
        value: expected.value,
        unit: AreaUnit(expected.unit),
      })
    })
  })

  describe('in', () => {
    it.each(THEORY)('should convert $quantity.unit to $expected.unit', ({ quantity, expected }) => {
      // Arrange
      const area: Area<typeof quantity.unit> = {
        value: quantity.value,
        unit: AreaUnit(quantity.unit),
      }

      // Act
      const converted = Quantity.in(area, AreaUnit(expected.unit))

      // Assert
      expect(converted).toEqual(expected.value)
    })
  })
})
