// Types and interfaces
import type { Countries, Translation } from '@/shared/types/countries'
import type { SortCriterion } from '@/shared/types/sort'

// Utils
import { normalizeParam } from '@/shared/lib/utils/normalizeParam'
import { filterFields } from '@/shared/lib/utils/filterData'
import { sortData } from '@/shared/lib/utils/sortData'

// Data
import countriesDataJson from '@/shared/data/countriesV3.1.json' with { type: 'json' }

const countriesData: Countries[] = countriesDataJson as unknown as Countries[]

const countriesMap = new Map<string, Countries[]>()

/**
 * @function preprocessCountries
 * @description Preprocesses the countries data to create a map of normalized names to countries
 * @returns {void}
 */
const preprocessCountries = (): void => {
  console.log('Preprocessing country data...')
  countriesData.forEach((country: Countries) => {
    const namesToMap: string[] = []

    if (country.name.common)
      namesToMap.push(normalizeParam(country.name.common))
    if (country.name.official)
      namesToMap.push(normalizeParam(country.name.official))

    if (country.name.nativeName) {
      Object.values(country.name.nativeName).forEach(
        (native: Translation | undefined) => {
          if (native?.common) namesToMap.push(normalizeParam(native.common))
          if (native?.official) namesToMap.push(normalizeParam(native.official))
        }
      )
    }

    if (country.translations) {
      Object.values(country.translations).forEach(
        (translation: Translation | undefined) => {
          if (translation?.common)
            namesToMap.push(normalizeParam(translation.common))
          if (translation?.official)
            namesToMap.push(normalizeParam(translation.official))
        }
      )
    }

    new Set(namesToMap.filter(Boolean)).forEach(normalizedName => {
      const existingCountries = countriesMap.get(normalizedName)

      if (existingCountries) {
        if (!existingCountries.includes(country)) {
          existingCountries.push(country)
        }
      } else {
        countriesMap.set(normalizedName, [country])
      }
    })
  })
  console.log(
    `Preprocessing complete. ${countriesMap.size} unique normalized names mapped.`
  )
}

preprocessCountries()

/**
 * @function getAllCountries
 * @description Get all countries with optional filtering and sorting
 * @param fieldsToKeep - Array of field names to include in the result
 * @param sortCriteria - Array of sort criteria
 * @param flatten - Flag to indicate if the result should be flattened
 * @returns {Record<string, any>[] | (string | number | boolean | null | undefined)[]} Array of countries
 */
export const getAllCountries = (
  fieldsToKeep?: string[],
  sortCriteria?: SortCriterion[],
  flatten?: boolean
): Record<string, any>[] | (string | number | boolean | null | undefined)[] => {
  let resultData: Countries[] = countriesData

  if (sortCriteria && sortCriteria.length > 0) {
    resultData = sortData(resultData, sortCriteria)
  }

  return filterFields(resultData, fieldsToKeep, flatten)
}

/**
 * @function findCountryByName
 * @description Find countries by normalized name with optional filtering and sorting
 * @param normalizedName - Normalized name to search for
 * @param fieldsToKeep - Array of field names to include in the result
 * @param sortCriteria - Array of sort criteria
 * @param flatten - Flag to indicate if the result should be flattened
 * @returns {Record<string, any>[] | (string | number | boolean | null | undefined)[] | undefined} Array of countries or undefined if no countries are found
 */
export const findCountryByName = (
  normalizedName: string,
  fieldsToKeep?: string[],
  sortCriteria?: SortCriterion[],
  flatten?: boolean
):
  | Record<string, any>[]
  | (string | number | boolean | null | undefined)[]
  | undefined => {
  const foundCountries = countriesMap.get(normalizedName)
  if (!foundCountries) {
    return undefined
  }

  let resultData: Countries[] = foundCountries

  if (sortCriteria && sortCriteria.length > 0) {
    resultData = sortData(resultData, sortCriteria)
  }

  return filterFields(resultData, fieldsToKeep, flatten)
}
