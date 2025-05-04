// Types and interfaces
import type { SortCriterion } from '@/shared/types/sort'
import type { RegionSummary } from '@/shared/types/region'
import type { Countries } from '@/shared/types/countries'

// Utils
import { normalizeParam } from '@/shared/lib/utils/normalizeParam'
import { filterFields } from '@/shared/lib/utils/filterData'
import { sortData } from '@/shared/lib/utils/sortData'

// Data
import countriesDataJson from '@/shared/data/countriesV3.1.json' with { type: 'json' }

const countriesData: Countries[] = countriesDataJson as unknown as Countries[]

const regionToCountriesMap = new Map<string, Countries[]>()
const regionToSubregionsMap = new Map<string, Set<string>>()
let regionSummaries: RegionSummary[] = []

const preprocessRegions = () => {
  console.log('Preprocessing region data...')
  countriesData.forEach((country: Countries) => {
    if (country.region) {
      const normalizedRegion = normalizeParam(country.region)
      if (!normalizedRegion) return

      const existingCountries = regionToCountriesMap.get(normalizedRegion)
      if (existingCountries) {
        existingCountries.push(country)
      } else {
        regionToCountriesMap.set(normalizedRegion, [country])
      }

      if (country.subregion) {
        const subregionSet =
          regionToSubregionsMap.get(normalizedRegion) || new Set<string>()
        subregionSet.add(country.subregion)
        regionToSubregionsMap.set(normalizedRegion, subregionSet)
      }
    }
  })

  regionSummaries = Array.from(regionToCountriesMap.entries())
    .map(([name, countries]) => {
      const subregions = regionToSubregionsMap.get(name)
      return {
        name: name,
        countryCount: countries.length,
        subregions: subregions ? Array.from(subregions).sort() : []
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  console.log(
    `Preprocessing complete. ${regionToCountriesMap.size} regions mapped.`
  )
}

preprocessRegions()

/**
 * @function getAvailableRegions
 * @description Gets a list of available regions with counts and subregions.
 * @returns {RegionSummary[]} An array of objects, each containing region name, country count, and subregions list.
 */
export const getAvailableRegions = (): RegionSummary[] => {
  return regionSummaries
}

/**
 * @function findCountriesByRegion
 * @description Finds all countries belonging to a specific region.
 * @param normalizedRegionName The normalized name of the region to search for.
 * @param fieldsToKeep Optional array of fields to return for each country.
 * @param sortCriteria Optional array of sort criteria.
 * @param flatten Optional flatten flag.
 * @returns {Record<string, any>[] | (string | number | boolean | null | undefined)[] | undefined} An array of countries (potentially filtered) or undefined if the region doesn't exist.
 */
export const findCountriesByRegion = (
  normalizedRegionName: string,
  fieldsToKeep?: string[],
  sortCriteria?: SortCriterion[],
  flatten?: boolean
):
  | Record<string, any>[]
  | (string | number | boolean | null | undefined)[]
  | undefined => {
  const foundCountries = regionToCountriesMap.get(normalizedRegionName)
  if (!foundCountries) {
    return undefined
  }

  let resultData: Countries[] = foundCountries

  if (sortCriteria && sortCriteria.length > 0) {
    resultData = sortData(resultData, sortCriteria)
  }

  return filterFields(resultData, fieldsToKeep, flatten)
}
