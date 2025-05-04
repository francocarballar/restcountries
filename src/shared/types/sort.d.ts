/**
 * @type SortDirection
 * @description The direction of the sort.
 */
export type SortDirection = 'asc' | 'desc'

/**
 * @interface SortCriterion
 * @description The criterion of the sort.
 */
export interface SortCriterion {
  field: string
  direction: SortDirection
}
