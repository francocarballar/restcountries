import { z } from 'zod'

/**
 * @function querySchema
 * @description Schema for the optional query parameters.
 * @returns {z.ZodObject<{ fields: z.ZodOptional<z.ZodString>; sort: z.ZodOptional<z.ZodString>; flatten: z.ZodOptional<z.ZodBoolean> }>} A zod object.
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
 * @function paramSchema
 * @description Schema for the ':name' route parameter.
 * @returns {z.ZodObject<{ name: z.ZodString }>} A zod object.
 */
export const paramSchema = z.object({
  name: z
    .string({ message: 'Name parameter must be a string' })
    .min(1, { message: 'Name parameter cannot be empty' })
    .max(100, { message: 'Name parameter is too long (max 100 chars)' })
})
