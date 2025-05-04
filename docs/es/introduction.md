Una API RESTful construida con Hono y TypeScript, desplegada en Cloudflare Workers, que proporciona información sobre países del mundo basada en los datos del proyecto REST Countries (v3.1).

## Características

- Obtener todos los países o filtrar por nombre/región.
- Seleccionar campos específicos para incluir en la respuesta (incluyendo campos anidados).
- Ordenar resultados por varios campos (población, área, nombre, etc.) en orden ascendente o descendente.
- Aplanar (flatten) la respuesta para solicitudes de un solo campo.
- Mensajes de error internacionalizados (admite múltiples idiomas a través de la cabecera `Accept-Language`).
- Validación de entrada usando Zod.
- Recuperación eficiente de datos usando mapas preprocesados.
- Almacenamiento en caché en el borde (edge caching) mediante la API de Caché de Cloudflare Workers para mejorar el rendimiento.

## Instalación y Configuración

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/francocarballar/restcountries
   cd restcountries
   ```

2. **Instalar dependencias:**
   _(Asumiendo que se usa Bun, basado en `bun.lock`; ajusta si usas npm o yarn)_

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

3. **Configuración:**
   - Este proyecto depende de la configuración definida en `wrangler.jsonc` (o `wrangler.toml`).
   - No parecen requerirse variables de entorno específicas según el código actual, pero revisa `wrangler.jsonc` en busca de posibles secretos o variables necesarias para el despliegue en Cloudflare (p. ej., `account_id`).

## Desarrollo Local

Para ejecutar el servidor de desarrollo localmente:

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

La API estará típicamente disponible en `http://localhost:8787` (o el puerto configurado en `wrangler.jsonc`/`package.json`).

## Enlaces Rápidos

- [Guía de Endpoints de la API](docs/es/endpoints.md)
- [Referencia de la API](api-reference/overview)
- [Descripción de la Arquitectura](docs/es/architecture.md)
- [Guía de Despliegue](docs/es/deploy.md)
