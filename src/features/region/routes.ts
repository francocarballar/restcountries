// Modules and main functions
import { Context, Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { zValidator } from '@hono/zod-validator'

// Services
import {
  findCountriesByRegion,
  getAvailableRegions
} from '@/features/region/service'

// Utils
import { normalizeParam } from '@/shared/utils/normalizeParam'
import { parseSortParameter } from '@/shared/utils/sortData'

// Validators
import { paramSchema, querySchema } from '@/features/region/validators'

/**
 * @function handleGetAllRegions
 * @description Handles the request to get all regions.
 * @param {Context} c - The context object.
 * @returns {Promise<Response>} A promise that resolves to the response.
 */
const handleGetAllRegions = (c: Context) => {
  const regions = getAvailableRegions()
  return c.json(regions)
}

/**
 * @function handleGetRegionByName
 * @description Handles the request to get a region by name.
 * @param {Context} c - The context object.
 * @returns {Promise<Response>} A promise that resolves to the response.
 */
const handleGetRegionByName = (c: Context) => {
  const { fields, sort, flatten: flattenQuery } = c.req.query()
  const { name } = c.req.param()

  if (!name) {
    throw new HTTPException(400, { message: 'Name parameter is missing' })
  }

  const normalizedRegionName = normalizeParam(name)
  const fieldsToKeep = fields
    ? fields
        .split(',')
        .map(f => f.trim())
        .filter(Boolean)
    : undefined

  const sortCriteria = parseSortParameter(sort)

  const flatten = flattenQuery ? flattenQuery === 'true' : undefined

  const countries = findCountriesByRegion(
    normalizedRegionName,
    fieldsToKeep,
    sortCriteria,
    flatten
  )

  if (!countries) {
    throw new HTTPException(404, {
      cause: {
        key: 'regionNotFound',
        params: { param: name }
      }
    })
  }

  return c.json(countries)
}

/**
 * @function region
 * @description Returns a Hono app with the region routes.
 * @returns {Hono} The Hono app with the region routes.
 */
export const region = (): Hono => {
  const regionApp = new Hono()

  regionApp.get(
    '/regions',
    zValidator('query', querySchema),
    handleGetAllRegions
  )

  regionApp.get(
    '/region/:name',
    zValidator('param', paramSchema),
    zValidator('query', querySchema),
    handleGetRegionByName
  )

  return regionApp
}
