# REST Countries API (Hono + Cloudflare Workers)

A RESTful API built with Hono and TypeScript, deployed on Cloudflare Workers, providing information about world countries based on the REST Countries project data (v3.1).

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Installation & Configuration](#installation--configuration)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [OpenAPI Specification](#openapi-specification)
- [Contributing](#contributing)
- [License](#license)

## Features

- Fetch all countries or filter by name/region.
- Select specific fields to include in the response (including nested fields).
- Sort results by various fields (population, area, name, etc.) in ascending or descending order.
- Flatten response for single-field requests.
- Internationalized error messages (supports multiple languages via `Accept-Language` header).
- Input validation using Zod.
- Efficient data retrieval using preprocessed maps.
- Edge caching via Cloudflare Workers Cache API for improved performance.

## Architecture

See [docs/architecture.md](docs/architecture.md) for a detailed explanation of the project structure and request flow.

## Installation & Configuration

1. **Clone the repository:**

   ```bash
   git clone https://github.com/francocarballar/restcountries
   cd restcountries
   ```

2. **Install dependencies:**
   _(Assuming Bun is used, based on `bun.lock`; adjust if using npm or yarn)_

   ```bash
   bun install
   ```

3. **Configuration:**
   - This project relies on configuration defined in `wrangler.jsonc` (or `wrangler.toml`).
   - No specific environment variables seem required based on the current code, but review `wrangler.jsonc` for any potential secrets or variables needed for Cloudflare deployment (e.g., `account_id`).

## Local Development

To run the development server locally:

```bash
bun run dev
# Or: npm run dev / yarn dev (depending on package.json scripts)
```

The API will typically be available at `http://localhost:8787` (or the port configured in `wrangler.jsonc`/`package.json`).

## Deployment

Deployment to Cloudflare Workers is managed by Wrangler CLI.

1. **Configure Wrangler:** Ensure you have Wrangler installed and configured with your Cloudflare account credentials.
2. **Deploy:**

   <CodeGroup>

   ```bash bun
   bun run deploy
   ```

   ```bash pnpm
   pnpm run deploy
   ```

   ```bash npm
   npm run deploy
   ```

   ```bash yarn
   yarn run deploy
   ```

   </CodeGroup>

See [docs/deploy.md](docs/deploy.md) for more details.

## API Endpoints

See [docs/endpoints.md](docs/endpoints.md) for a detailed list and usage examples of all available API endpoints.

## OpenAPI Specification

An OpenAPI 3.0 specification is available: [openapi.yaml](openapi.yaml).

## Contributing

_(Placeholder: Add contribution guidelines if applicable)_

## License

_(Placeholder: Add license information, e.g., MIT)_

```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
