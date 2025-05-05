# Getting Started

This guide will walk you through setting up the REST Countries API project locally.

## Prerequisites

- **Node.js:** Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Package Manager:** This project uses Bun by default (`bun.lock` present), but you can also use npm (comes with Node.js), yarn, or pnpm.
- **Git:** You need Git to clone the repository.

## Installation & Configuration

1. **Clone the repository:**

   ```bash
   git clone https://github.com/francocarballar/restcountries
   cd restcountries
   ```

2. **Install dependencies:**
   Choose the command corresponding to your preferred package manager:

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
   - The primary configuration for deployment and local development settings (like the development server port) is handled by `wrangler.jsonc` (or `wrangler.toml`). Review this file if you need to adjust settings.
   - For standard local development, no specific environment variables are typically required unless you modify the code to depend on them or configure Cloudflare secrets that might be needed even locally (less common).

## Local Development Server

To run the development server, which provides hot-reloading:

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

The API should now be running locally. By default, it's usually accessible at `http://localhost:8787`. Check the output in your terminal or the `wrangler.jsonc` file for the exact port.

You can now make requests to the local endpoints (e.g., `http://localhost:8787/api/v1/all`).
