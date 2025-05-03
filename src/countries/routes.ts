// Modules and main functions
import { Hono, type Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { zValidator } from '@hono/zod-validator'

// Utils
import { normalizeParam } from '@/utils/normalizeParam'
import { parseSortParameter } from '@/utils/sortData'

// Services
import { findCountryByName, getAllCountries } from '@/countries/service'

// Validators
import { querySchema, paramSchema } from '@/countries/validators'

/**
 * @function handleGetAllCountries
 * @description Handler for the /all route.
 * @param {Context} c - The context object.
 * @returns {Promise<Response>} A promise that resolves to a JSON response.
 */
const handleGetAllCountries = (c: Context) => {
  const { fields, sort, flatten: flattenQuery } = c.req.query()

  const fieldsToKeep = fields
    ? fields
        .split(',')
        .map(f => f.trim())
        .filter(Boolean)
    : undefined

  const sortCriteria = parseSortParameter(sort)

  const flatten = flattenQuery === 'true'

  const result = getAllCountries(fieldsToKeep, sortCriteria, flatten)
  return c.json(result)
}

/**
 * @function handleGetCountryByName
 * @description Handler for the /name/:name route.
 * @param {Context} c - The context object.
 * @returns {Promise<Response>} A promise that resolves to a JSON response.
 */
const handleGetCountryByName = (c: Context) => {
  const { fields, sort, flatten: flattenQuery } = c.req.query()
  const { name } = c.req.param()

  if (!name) {
    throw new HTTPException(400, { message: 'Name parameter is missing' })
  }

  const normalizedName: string = normalizeParam(name)
  const fieldsToKeep = fields
    ? fields
        .split(',')
        .map(f => f.trim())
        .filter(Boolean)
    : undefined

  const sortCriteria = parseSortParameter(sort)

  const flatten = flattenQuery === 'true'

  const countriesFound = findCountryByName(
    normalizedName,
    fieldsToKeep,
    sortCriteria,
    flatten
  )

  if (!countriesFound) {
    throw new HTTPException(404, {
      cause: {
        key: 'countryNotFound',
        params: { param: name }
      }
    })
  }

  return c.json(countriesFound)
}

/**
 * @function countries
 * @description Returns a Hono instance with the routes for the countries API.
 * @returns {Hono} A Hono instance with the routes for the countries API.
 */
export const countries = (): Hono => {
  const countriesApp = new Hono()

  countriesApp.get(
    '/all',
    zValidator('query', querySchema),
    handleGetAllCountries
  )

  countriesApp.get(
    '/name/:name',
    zValidator('param', paramSchema),
    zValidator('query', querySchema),
    handleGetCountryByName
  )

  return countriesApp
}
