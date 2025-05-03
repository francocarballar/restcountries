/**
 * @interface Countries
 * @description Interface for the countries.
 */
export interface Countries {
  name: Name
  tld: string[]
  cca2: string
  ccn3: string
  cca3: string
  cioc: string
  fifa: string
  independent: boolean
  status: Status
  unMember: boolean
  currencies: { [key: string]: Currency }
  idd: Idd
  capital: string[]
  capitalInfo: CapitalInfo
  altSpellings: string[]
  region: Region
  subregion: string
  continents: Continent[]
  languages: { [key: string]: string }
  translations: { [key: string]: Translation }
  latlng: number[]
  landlocked: boolean
  borders: string[]
  area: number
  flag: string
  demonyms: Demonyms
  flags: Flags
  coatOfArms: CoatOfArms
  population: number
  maps: Maps
  gini: { [key: string]: number }
  car: Car
  postalCode: PostalCode
  startOfWeek: StartOfWeek
  timezones: string[]
}

/**
 * @interface CapitalInfo
 * @description Interface for the capital info.
 */
export interface CapitalInfo {
  latlng: number[]
}

/**
 * @interface Car
 * @description Interface for the car.
 */
export interface Car {
  signs: string[]
  side: Side
}

/**
 * @enum Side
 * @description Enum for the side.
 */
export enum Side {
  Left = 'left',
  Right = 'right'
}

/**
 * @interface CoatOfArms
 * @description Interface for the coat of arms.
 */
export interface CoatOfArms {
  svg: string
  png: string
}

/**
 * @enum Continent
 * @description Enum for the continent.
 */
export enum Continent {
  Africa = 'Africa',
  Antarctica = 'Antarctica',
  Asia = 'Asia',
  Europe = 'Europe',
  NorthAmerica = 'North America',
  Oceania = 'Oceania',
  SouthAmerica = 'South America'
}

/**
 * @interface Currency
 * @description Interface for the currency.
 */
export interface Currency {
  name: string
  symbol: string
}

/**
 * @interface Demonyms
 * @description Interface for the demonyms.
 */
export interface Demonyms {
  eng: Eng
  fra: Eng
}

/**
 * @interface Eng
 * @description Interface for the eng.
 */
export interface Eng {
  f: string
  m: string
}

/**
 * @interface Flags
 * @description Interface for the flags.
 */
export interface Flags {
  svg: string
  png: string
  alt: string
}

/**
 * @interface Idd
 * @description Interface for the idd.
 */
export interface Idd {
  root: Root
  suffixes: string[]
}

/**
 * @enum Root
 * @description Enum for the root.
 */
export enum Root {
  Empty = '',
  The1 = '+1',
  The2 = '+2',
  The3 = '+3',
  The4 = '+4',
  The5 = '+5',
  The6 = '+6',
  The7 = '+7',
  The8 = '+8',
  The9 = '+9'
}

/**
 * @interface Maps
 * @description Interface for the maps.
 */
export interface Maps {
  googleMaps: string
  openStreetMaps: string
}

/**
 * @interface Name
 * @description Interface for the name.
 */
export interface Name {
  common: string
  official: string
  nativeName: { [key: string]: Translation }
}

/**
 * @interface Translation
 * @description Interface for the translation.
 */
export interface Translation {
  official: string
  common: string
}

/**
 * @interface PostalCode
 * @description Interface for the postal code.
 */
export interface PostalCode {
  format: null | string
  regex: null | string
}

/**
 * @enum Region
 * @description Enum for the region.
 */
export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Antarctic = 'Antarctic',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania'
}

/**
 * @enum StartOfWeek
 * @description Enum for the start of week.
 */
export enum StartOfWeek {
  Monday = 'monday',
  Saturday = 'saturday',
  Sunday = 'sunday'
}

/**
 * @enum Status
 * @description Enum for the status.
 */
export enum Status {
  OfficiallyAssigned = 'officially-assigned',
  UserAssigned = 'user-assigned'
}
