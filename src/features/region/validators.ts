import { z } from 'zod'

/**
 * @constant querySchema
 * @description Schema for the query parameters.
 * @param {z.ZodString} fields - The fields to return.
 * @param {z.ZodString} sort - The sort criteria.
 * @param {z.ZodBoolean} flatten - The flatten flag.
 * @returns {z.ZodObject} The query schema.
 */
export const querySchema = z.object({
  fields: z.string().optional(),
  sort: z.string().optional(),
  flatten: z
    .enum(['true', 'false'])
    .optional()
    .transform(val => val === 'true')
})

/**
 * @constant paramSchema
 * @description Schema for the ':name' parameter (region name).
 * @param {z.ZodString} name - The region name.
 * @returns {z.ZodObject} The param schema.
 */
export const paramSchema = z.object({
  name: z
    .string({ message: 'Region name parameter must be a string' })
    .min(1, { message: 'Region name parameter cannot be empty' })
    .max(50, { message: 'Region name parameter is too long (max 50 chars)' })
})
