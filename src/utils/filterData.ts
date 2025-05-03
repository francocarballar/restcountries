/**
 * @function getNestedValue
 * @description Safely gets a nested value from an object using a dot-notation path.
 * @param obj The object to query.
 * @param path The dot-notation path string (e.g., "a.b.c").
 * @returns The value at the path, or undefined if the path doesn't exist.
 * @example
 * const obj = { a: { b: { c: 'value' } } }
 * const value = getNestedValue(obj, 'a.b.c') // 'value'
 * const value = getNestedValue(obj, 'a.b.d') // undefined
 */
export const getNestedValue = (obj: any, path: string): any => {
  return path
    .split('.')
    .reduce(
      (acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined),
      obj
    )
}

/**
 * @function setNestedValue
 * @description Safely sets a nested value in an object using a dot-notation path.
 * Creates intermediate objects if they don't exist.
 * @param obj The object to modify.
 * @param path The dot-notation path string.
 * @param value The value to set.
 * @example
 * const obj = { a: { b: { c: 'value' } } }
 * setNestedValue(obj, 'a.b.d', 'newValue') // { a: { b: { c: 'value', d: 'newValue' } } }
 */
export const setNestedValue = (obj: any, path: string, value: any): void => {
  if (value === undefined) {
    return
  }
  const keys = path.split('.')
  let current = obj
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (
      current[key] === undefined ||
      typeof current[key] !== 'object' ||
      current[key] === null
    ) {
      current[key] = {}
    }
    current = current[key]
  }
  current[keys[keys.length - 1]] = value
}

/**
 * @function filterFields
 * @description Filters an array of objects, returning a new array containing objects
 * with only the specified fields (supports nested fields via dot notation).
 *
 * @param data The array of objects to filter.
 * @param fieldsToKeep An array of strings representing the field paths to keep (e.g., ["name.common", "capital"]).
 * @returns A new array with filtered objects, or the original array if fieldsToKeep is empty or undefined.
 */
export const filterFields = <T extends Record<string, any>>(
  data: T[],
  fieldsToKeep?: string[],
  flatten?: boolean
): Record<string, any>[] | (string | number | boolean | null | undefined)[] => {
  if (!fieldsToKeep || fieldsToKeep.length === 0) {
    return data
  }

  const filteredData = data.map(item => {
    const filteredItem: Record<string, any> = {}
    fieldsToKeep.forEach(path => {
      const value = getNestedValue(item, path)
      setNestedValue(filteredItem, path, value)
    })
    return filteredItem
  })

  if (flatten && fieldsToKeep.length === 1) {
    const singlePath = fieldsToKeep[0]
    const flattenedData = data.map(item => getNestedValue(item, singlePath))

    return flattenedData
  }

  return filteredData
}
