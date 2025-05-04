Esta API está diseñada para ser desplegada en Cloudflare Workers utilizando el Wrangler CLI.

## Prerrequisitos

- Node.js y npm/yarn/bun instalados.
- Una cuenta de Cloudflare.
- Wrangler CLI instalado globalmente o como dependencia de desarrollo (`npm install -g wrangler` o `bun add -d wrangler`).

## Configuración

1. **Iniciar sesión en Cloudflare:**

   ```bash
   wrangler login
   ```

   Sigue las instrucciones para autenticarte con tu cuenta de Cloudflare.

2. **Revisar `wrangler.jsonc` (o `wrangler.toml`):**
   - Asegúrate de que la propiedad `name` refleje el nombre deseado para tu servicio Worker.
   - Verifica que la propiedad `main` apunte al archivo de entrada correcto (probablemente relacionado con `src/app/index.ts` después de la compilación). _(La ruta exacta depende del resultado de la compilación)_
   - Comprueba `compatibility_date` y actualízala si es necesario.
   - Confirma que el `account_id` esté presente o configurado mediante variables de entorno/secretos si es necesario.
   - _(Agrega cualquier detalle específico encontrado en wrangler.jsonc, como namespaces KV, rutas, etc., si estaban presentes)_

## Compilación (Build)

Antes de desplegar, necesitas compilar el código TypeScript a JavaScript adecuado para Cloudflare Workers.

```bash
# Revisa package.json para el script de compilación exacto
bun run build
# O: npm run build / yarn build
```

Este comando típicamente usa `tsc` u otro empaquetador (como esbuild a través de las herramientas de compilación de Hono) para compilar el código, a menudo generando la salida en un directorio `dist`.

## Despliegue (Deploy)

Una vez compilado, despliega el worker usando Wrangler:

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

Wrangler subirá el código compilado y configurará el Worker de acuerdo a `wrangler.jsonc`. Después del despliegue, usualmente mostrará la URL donde el Worker es accesible.

## CI/CD (Integración Continua / Despliegue Continuo)

_(No se detectó configuración específica de CI/CD (p. ej., GitHub Actions, GitLab CI) en la estructura del repositorio proporcionada.)_

Para configurar CI/CD:

1. Crea archivos de flujo de trabajo (p. ej., `.github/workflows/deploy.yml`).
2. Configura los pasos para:
   - Hacer checkout del código.
   - Configurar Node.js/Bun.
   - Instalar dependencias (`bun install`).
   - Compilar el proyecto (`bun run build`).
   - Desplegar usando Wrangler (`wrangler deploy`).
3. Almacena los tokens de API de Cloudflare (`CF_API_TOKEN`) y `CF_ACCOUNT_ID` de forma segura como secretos en tu entorno de CI/CD. El comando de despliegue de Wrangler puede usar estas variables de entorno para la autenticación.
