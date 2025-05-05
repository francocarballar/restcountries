# Empezar

Esta guía te mostrará cómo configurar el proyecto de la API REST Countries localmente.

## Prerrequisitos

- **Node.js:** Asegúrate de tener Node.js instalado. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **Gestor de Paquetes:** Este proyecto usa Bun por defecto (existe `bun.lock`), pero también puedes usar npm (viene con Node.js), yarn, o pnpm.
- **Git:** Necesitas Git para clonar el repositorio.

## Instalación y Configuración

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/francocarballar/restcountries
    cd restcountries
    ```

2.  **Instalar dependencias:**
    Elige el comando correspondiente a tu gestor de paquetes preferido:

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

3.  **Configuración:**
    - La configuración principal para el despliegue y los ajustes de desarrollo local (como el puerto del servidor de desarrollo) se gestiona mediante `wrangler.jsonc` (o `wrangler.toml`). Revisa este archivo si necesitas ajustar la configuración.
    - Para el desarrollo local estándar, normalmente no se requieren variables de entorno específicas, a menos que modifiques el código para que dependa de ellas o configures secretos de Cloudflare que puedan necesitarse incluso localmente (menos común).

## Servidor de Desarrollo Local

Para ejecutar el servidor de desarrollo, que proporciona recarga en caliente (hot-reloading):

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

La API debería estar ahora ejecutándose localmente. Por defecto, suele estar accesible en `http://localhost:8787`. Comprueba la salida en tu terminal o el archivo `wrangler.jsonc` para ver el puerto exacto.

Puedes ahora realizar peticiones a los endpoints locales (p. ej., `http://localhost:8787/api/v1/all`).
