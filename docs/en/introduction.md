A RESTful API built with Hono and TypeScript, deployed on Cloudflare Workers, providing information about world countries based on the REST Countries project data (v3.1).

## Features

- Fetch all countries or filter by name/region.
- Select specific fields to include in the response (including nested fields).
- Sort results by various fields (population, area, name, etc.) in ascending or descending order.
- Flatten response for single-field requests.
- Internationalized error messages (supports multiple languages via `Accept-Language` header).
- Input validation using Zod.
- Efficient data retrieval using preprocessed maps.
- Edge caching via Cloudflare Workers Cache API for improved performance.

## Installation & Configuration

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   _(Assuming Bun is used, based on `bun.lock`; adjust if using npm or yarn)_

   <CodeGroup>
   ```bash bun
   bun install
   ```
   ```bash pnpm
   pnpm install
   ```
   ```bash npm
   npm install
   ```
   ```bash yarn
   yarn install
   ```
   </CodeGroup>

3. **Configuration:**
   - This project relies on configuration defined in `wrangler.jsonc` (or `wrangler.toml`).
   - No specific environment variables seem required based on the current code, but review `wrangler.jsonc` for any potential secrets or variables needed for Cloudflare deployment (e.g., `account_id`).

## Local Development

To run the development server locally:

<CodeGroup>

```bash bun
bun run dev
```

```bash pnpm
pnpm run dev
```

```bash npm
npm run dev
```

```bash yarn
yarn run dev
```

</CodeGroup>

The API will typically be available at `http://localhost:8787` (or the port configured in `wrangler.jsonc`/`package.json`).

## Quick Links

- [API Endpoints Guide](docs/endpoints)
- [API Reference](api-reference/overview)
- [Architecture Overview](docs/architecture)
- [Deployment Guide](docs/deploy)
