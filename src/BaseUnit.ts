import {
  type AmountOfSubstanceUnit,
  type ElectricCurrentUnit,
  LengthUnit,
  type LuminousIntensityUnit,
  MassUnit,
  type TemperatureUnit,
  TimeUnit,
} from './base_units'

export function isBaseUnit (data: unknown): data is BaseUnit {
  // TODO GD Do this correctly
  return typeof data === 'string'
}

export enum BaseUnitKind {
  Length = 'length',
  Time = 'time',
  Mass = 'mass',
  ElectricCurrent = 'electricCurrent',
  Temperature = 'temperature',
  AmountOfSubstance = 'amountOfSubstance',
  LuminousIntensity = 'luminousIntensity',
}

export type BaseUnit = LengthUnit | TimeUnit | MassUnit | ElectricCurrentUnit | TemperatureUnit | AmountOfSubstanceUnit | LuminousIntensityUnit

/**
 * A type to map each base unit kind to its possible base units
 */
export interface KindToBaseUnit {
  [BaseUnitKind.Length]: LengthUnit
  [BaseUnitKind.Time]: TimeUnit
  [BaseUnitKind.Mass]: MassUnit
  [BaseUnitKind.ElectricCurrent]: ElectricCurrentUnit
  [BaseUnitKind.Temperature]: TemperatureUnit
  [BaseUnitKind.AmountOfSubstance]: AmountOfSubstanceUnit
  [BaseUnitKind.LuminousIntensity]: LuminousIntensityUnit
}

/**
 * A lookup table from base unit to its kind
 */
export const BaseUnitToKind: BaseUnitToKind = {
  [LengthUnit.METERS]: BaseUnitKind.Length,
  [LengthUnit.MILLIMETERS]: BaseUnitKind.Length,

  [TimeUnit.SECONDS]: BaseUnitKind.Time,
  [TimeUnit.MILLISECONDS]: BaseUnitKind.Time,

  [MassUnit.KILOGRAM]: BaseUnitKind.Mass,
  [MassUnit.GRAM]: BaseUnitKind.Mass,
  [MassUnit.MILLIGRAM]: BaseUnitKind.Mass,
}

// Inspired from https://stackoverflow.com/questions/59058685/how-can-i-get-the-inverse-of-a-typescript-mapped-type
// Could not get it to work with any type, but so far I only need it to work for KindToBaseUnit, so that's fine by me
type GetKeyOfValue<Map, Value> = {
  [Key in keyof Map]: Value extends Map[Key] ? Key : never
}[keyof Map]

/**
 * A type to map each base unit to its unit kind
 * It is the inverse of KindToBaseUnit
 */
export type BaseUnitToKind = {
  [BaseUnit in KindToBaseUnit[keyof KindToBaseUnit]]: GetKeyOfValue<KindToBaseUnit, BaseUnit>
}
