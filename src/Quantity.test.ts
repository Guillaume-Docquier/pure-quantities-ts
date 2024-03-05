import { describe, expect, it } from 'vitest'
import { Quantity } from './Quantity.ts'
import { DistanceUnit } from './Distance.ts'
import { TimeUnit } from './Time.ts'

describe('Quantity', () => {
  const THEORY = [
    { quantity: { value: 2.5, unit: DistanceUnit.METERS }, expected: { value: 2.5, unit: DistanceUnit.METERS } },
    { quantity: { value: 2.5, unit: DistanceUnit.METERS }, expected: { value: 2500, unit: DistanceUnit.MILLIMETERS } },
    { quantity: { value: 2500, unit: DistanceUnit.MILLIMETERS }, expected: { value: 2.5, unit: DistanceUnit.METERS } },
    { quantity: { value: 2500, unit: DistanceUnit.MILLIMETERS }, expected: { value: 2500, unit: DistanceUnit.MILLIMETERS } },
    { quantity: { value: 2.5, unit: TimeUnit.SECONDS }, expected: { value: 2.5, unit: TimeUnit.SECONDS } },
    { quantity: { value: 2.5, unit: TimeUnit.SECONDS }, expected: { value: 2500, unit: TimeUnit.MILLISECONDS } },
    { quantity: { value: 2500, unit: TimeUnit.MILLISECONDS }, expected: { value: 2.5, unit: TimeUnit.SECONDS } },
    { quantity: { value: 2500, unit: TimeUnit.MILLISECONDS }, expected: { value: 2500, unit: TimeUnit.MILLISECONDS } },
  ] as const

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