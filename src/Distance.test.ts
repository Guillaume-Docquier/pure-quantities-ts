import { describe, expect, it } from 'vitest'
import { Distance, DistanceUnit } from './Distance.ts'

describe('Distance', () => {
  describe('convert', () => {
    const THEORY = [
      { distance: { value: 2.5, unit: DistanceUnit.METERS }, expected: { value: 2.5, unit: DistanceUnit.METERS } },
      { distance: { value: 2.5, unit: DistanceUnit.METERS }, expected: { value: 2500, unit: DistanceUnit.MILLIMETERS } },
      { distance: { value: 2500, unit: DistanceUnit.MILLIMETERS }, expected: { value: 2.5, unit: DistanceUnit.METERS } },
      { distance: { value: 2500, unit: DistanceUnit.MILLIMETERS }, expected: { value: 2500, unit: DistanceUnit.MILLIMETERS } },
    ]
    it.each(THEORY)('should convert $distance.unit to $expected.unit', ({ distance, expected }) => {
      // Act
      const converted = Distance.convert(distance, expected.unit)

      // Assert
      expect(converted).toEqual(expected)
    })
  })

  describe('in', () => {
    const THEORY = [
      { distance: { value: 2.5, unit: DistanceUnit.METERS }, expected: { value: 2.5, unit: DistanceUnit.METERS } },
      { distance: { value: 2.5, unit: DistanceUnit.METERS }, expected: { value: 2500, unit: DistanceUnit.MILLIMETERS } },
      { distance: { value: 2500, unit: DistanceUnit.MILLIMETERS }, expected: { value: 2.5, unit: DistanceUnit.METERS } },
      { distance: { value: 2500, unit: DistanceUnit.MILLIMETERS }, expected: { value: 2500, unit: DistanceUnit.MILLIMETERS } },
    ]
    it.each(THEORY)('should convert $distance.unit to $expected.unit', ({ distance, expected }) => {
      // Act
      const converted = Distance.in(distance, expected.unit)

      // Assert
      expect(converted).toEqual(expected.value)
    })
  })
})
