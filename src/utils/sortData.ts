import type { SortCriterion, SortDirection } from '@/types/sort'
import { getNestedValue } from '@/utils/filterData'

/**
 * @function parseSortParameter
 * @description Parses a sort query parameter string into an array of SortCriterion objects.
 * @param sortString The raw sort string from query parameters.
 * @returns An array of SortCriterion objects.
 * @example
 * const sortString = 'name.common,-population'
 * const sortCriteria = parseSortParameter(sortString)
 * // sortCriteria = [{ field: 'name.common', direction: 'asc' }, { field: 'population', direction: 'desc' }]
 */
export const parseSortParameter = (
  sortString: string | undefined
): SortCriterion[] => {
  if (!sortString) {
    return []
  }

  return sortString
    .split(',')
    .map(part => {
      part = part.trim()
      let direction: SortDirection = 'asc'
      let field = part

      if (part.startsWith('-')) {
        direction = 'desc'
        field = part.substring(1)
      } else if (part.startsWith('+')) {
        field = part.substring(1)
      }

      return { field, direction }
    })
    .filter(criterion => criterion.field)
}

/**
 * @function sortData
 * @description Sorts an array of objects based on multiple criteria.
 * Handles nested fields and basic type comparisons (string, number).
 * Missing values are treated as the lowest value ('asc') or highest ('desc').
 * @param data The array of objects to sort.
 * @param criteria An array of SortCriterion objects.
 * @returns The sorted array (a new array instance).
 */
export const sortData = <T extends Record<string, any>>(
  data: T[],
  criteria: SortCriterion[]
): T[] => {
  if (!criteria.length || !data.length) {
    return [...data]
  }

  const dataToSort = [...data]

  dataToSort.sort((a, b) => {
    for (const { field, direction } of criteria) {
      const valueA = getNestedValue(a, field)
      const valueB = getNestedValue(b, field)

      const aExists = valueA !== undefined && valueA !== null
      const bExists = valueB !== undefined && valueB !== null

      if (!aExists && !bExists) continue
      if (!aExists) return direction === 'asc' ? -1 : 1
      if (!bExists) return direction === 'asc' ? 1 : -1

      let comparison = 0
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        comparison = valueA - valueB
      } else if (typeof valueA === 'string' && typeof valueB === 'string') {
        comparison = valueA.localeCompare(valueB)
      } else {
        comparison = String(valueA).localeCompare(String(valueB))
      }

      if (comparison !== 0) {
        return direction === 'asc' ? comparison : -comparison
      }
    }
    return 0
  })

  return dataToSort
}
