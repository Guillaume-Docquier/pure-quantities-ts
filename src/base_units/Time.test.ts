import { describe, expect, it } from 'vitest'
import { Quantity } from '../Quantity.ts'
import { TimeUnit } from './Time.ts'
import { createTheory } from '../TestUtils.ts'

describe('Time', () => {
  const THEORY = createTheory<TimeUnit>({
    [TimeUnit.SECONDS]: {
      [TimeUnit.SECONDS]: { initial: 2.5, converted: 2.5 },
      [TimeUnit.MILLISECONDS]: { initial: 2.5, converted: 2500 },
    },
    [TimeUnit.MILLISECONDS]: {
      [TimeUnit.SECONDS]: { initial: 2500, converted: 2.5 },
      [TimeUnit.MILLISECONDS]: { initial: 2500, converted: 2500 },
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
