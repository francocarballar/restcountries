// Types and interfaces
import type { MessageKey } from '@/types/message'

// Modules and main functions
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

// Utils
import { getTranslatedMessage } from '@/i18n/getTranslatedMessage'

// Routes
import { countries } from '@/countries/routes'
import { region } from '@/region/routes'

const app = new Hono()

/**
 * @function onError
 * @description Handles errors in the application.
 * @param {Error} err - The error object.
 * @param {Context} c - The context object.
 * @returns {Promise<Response>} A promise that resolves to a JSON response.
 */
app.onError((err, c) => {
  let status: number = 500
  let message: string
  let logError: boolean = true

  const acceptLanguage = c.req.header('accept-language')

  if (err instanceof HTTPException) {
    status = err.status
    logError = status >= 500

    const cause = err.cause as
      | { key: MessageKey; params?: Record<string, string> }
      | undefined

    if (cause?.key) {
      message = getTranslatedMessage(acceptLanguage, cause.key, cause.params)
    } else {
      message = err.message || 'An error occurred'
    }
  } else {
    console.error('[UNEXPECTED ERROR]:', err)
    message = getTranslatedMessage(acceptLanguage, 'internalServerError')
  }

  if (logError) {
    console.error(`[ERROR - Status ${status}]:`, err)
  }

  const responsePayload = {
    error: {
      status,
      message
    }
  }

  return c.json(responsePayload, status as any)
})

app.get('/', c => {
  const acceptLanguage = c.req.header('accept-language')
  const message = getTranslatedMessage(acceptLanguage, 'welcome')

  return c.text(message)
})

app.route('/api/v1', countries())

app.route('/api/v1', region())

export default app
