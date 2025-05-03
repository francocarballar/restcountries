/**
 * @function normalizeParam
 * @description Normalizes a string parameter robustly:
 * - Replaces underscores (_), hyphens (-), dots (.), and plus signs (+) with spaces.
 * - Removes leading and trailing spaces.
 * - Collapses multiple internal spaces into a single one.
 * - Converts to lowercase.
 * - Removes diacritics (accents, tildes, etc.).
 * @param param The string parameter to normalize (string | null | undefined).
 * @returns The normalized string, or an empty string if the input is not a valid string.
 */
export const normalizeParam = (param: string | null | undefined): string => {
  // 1. Ensure the input is a string
  if (typeof param !== 'string') {
    return ''
  }

  // 2. Replace common separators (_, -, +, .) with spaces
  let normalized = param.replace(/[-_+.]/g, ' ')

  // 3. Trim leading/trailing spaces and collapse multiple internal spaces
  normalized = normalized.trim().replace(/\s+/g, ' ')

  // 4. Convert to lowercase
  normalized = normalized.toLowerCase()

  // 5. Remove diacritics (decompose and remove marks)
  // NFD: Canonical Decomposition Form
  normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  return normalized
}
