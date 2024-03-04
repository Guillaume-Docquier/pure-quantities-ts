import { describe, expect, it } from 'vitest'
import { Time, TimeUnit } from './Time.ts'

describe('Time', () => {
  describe('convert', () => {
    const THEORY = [
      { time: { value: 2.5, unit: TimeUnit.SECONDS }, expected: { value: 2.5, unit: TimeUnit.SECONDS } },
      { time: { value: 2.5, unit: TimeUnit.SECONDS }, expected: { value: 2500, unit: TimeUnit.MILLISECONDS } },
      { time: { value: 2500, unit: TimeUnit.MILLISECONDS }, expected: { value: 2.5, unit: TimeUnit.SECONDS } },
      { time: { value: 2500, unit: TimeUnit.MILLISECONDS }, expected: { value: 2500, unit: TimeUnit.MILLISECONDS } },
    ]
    it.each(THEORY)('should convert $distance.unit to $expected.unit', ({ time, expected }) => {
      // Act
      const converted = Time.convert(time, expected.unit)

      // Assert
      expect(converted).toEqual(expected)
    })
  })

  describe('in', () => {
    const THEORY = [
      { time: { value: 2.5, unit: TimeUnit.SECONDS }, expected: { value: 2.5, unit: TimeUnit.SECONDS } },
      { time: { value: 2.5, unit: TimeUnit.SECONDS }, expected: { value: 2500, unit: TimeUnit.MILLISECONDS } },
      { time: { value: 2500, unit: TimeUnit.MILLISECONDS }, expected: { value: 2.5, unit: TimeUnit.SECONDS } },
      { time: { value: 2500, unit: TimeUnit.MILLISECONDS }, expected: { value: 2500, unit: TimeUnit.MILLISECONDS } },
    ]
    it.each(THEORY)('should convert $distance.unit to $expected.unit', ({ time, expected }) => {
      // Act
      const converted = Time.in(time, expected.unit)

      // Assert
      expect(converted).toEqual(expected.value)
    })
  })
})
