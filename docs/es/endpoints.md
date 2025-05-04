Este documento detalla los endpoints de la API disponibles. Todos los endpoints tienen el prefijo `/api/v1`.

## Resumen de Endpoints

| Ruta            | Método | Descripción                           |
| --------------- | ------ | ------------------------------------- |
| `/`             | GET    | Mensaje de bienvenida                 |
| `/all`          | GET    | Obtener todos los países              |
| `/name/:name`   | GET    | Obtener países por nombre             |
| `/regions`      | GET    | Obtener lista de regiones disponibles |
| `/region/:name` | GET    | Obtener países por nombre de región   |

---

### `GET /`

Devuelve un mensaje de bienvenida simple, traducido según la cabecera `Accept-Language`.

- **Descripción**: Proporciona un mensaje de bienvenida localizado a la API.
- **Parámetros de Consulta**: Ninguno.
- **Cabeceras (Headers)**:
  - `Accept-Language` (Opcional): Especifica el(los) idioma(s) preferido(s) para el mensaje de bienvenida (p. ej., `es-ES`, `fr`, `en-US;q=0.9`). Por defecto es inglés ('en').
- **Respuesta Exitosa (200)**:

  ```
  Content-Type: text/plain;charset=UTF-8
  Bienvenido a la API
  ```

  _(El contenido del mensaje varía según el idioma)_

- **Errores**:
  - 500: Error Interno del Servidor (si la traducción falla inesperadamente).
- **Ejemplo con Curl**:

  ```bash
  curl -i http://<host-api>/
  curl -i -H "Accept-Language: es" http://<host-api>/
  ```

---

### `GET /all`

Recupera una lista de todos los países. Admite filtrado, ordenamiento y aplanamiento (flattening).

- **Descripción**: Devuelve un array que contiene todos los objetos de país del conjunto de datos.
- **Parámetros de Consulta**:

  | Nombre    | Tipo    | Requerido | Descripción                                                                                                                                                 |
  | --------- | ------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `fields`  | string  | No        | Lista separada por comas de campos a incluir (p. ej., `name,capital,population`). Admite notación de puntos para campos anidados (p. ej., `name.common`).   |
  | `sort`    | string  | No        | Lista separada por comas de campos por los cuales ordenar. Prefijar con `-` para orden descendente (p. ej., `population`, `-area`, `region,name.official`). |
  | `flatten` | boolean | No        | Si es `true` Y `fields` especifica exactamente un campo, devuelve un array de valores en lugar de objetos (p. ej., `?fields=name.common&flatten=true`).     |

- **Cabeceras (Headers)**: Ninguna específica.
- **Respuesta Exitosa (200)**:

  - Por defecto: Array de objetos de país completos.

    ```json
    [
      {
        "name": { "common": "...", "official": "...", ... },
        "population": 12345,
        // ... otros campos del país ...
      },
      ...
    ]
    ```

  - Con `?fields=name.common,population`:

    ```json
    [
      { "name": { "common": "..." }, "population": 12345 },
      ...
    ]
    ```

  - Con `?fields=name.common&flatten=true`:

    ```json
    [ "NombrePais1", "NombrePais2", ... ]
    ```

- **Errores**:
  - 400: Formato de parámetro de consulta inválido (manejado por `zValidator`).
  - 500: Error Interno del Servidor.
- **Ejemplo con Curl**:

  ```bash
  # Obtener todos los datos para todos los países
  curl http://<host-api>/api/v1/all
  # Obtener solo nombre común y población, ordenados por población descendente
  curl http://<host-api>/api/v1/all?fields=name.common,population&sort=-population
  # Obtener array plano de nombres comunes
  curl http://<host-api>/api/v1/all?fields=name.common&flatten=true
  ```

---

### `GET /name/:name`

Recupera uno o más países que coincidan con el nombre proporcionado (común, oficial, nativo, traducción). La búsqueda no distingue mayúsculas/minúsculas e ignora acentos/diacríticos.

- **Descripción**: Encuentra países haciendo coincidir el parámetro `:name` con varios campos de nombre. Puede devolver múltiples países si el nombre es ambiguo (p. ej., "kongo").
- **Parámetros de Ruta**:

  | Nombre | Tipo   | Descripción                  |
  | ------ | ------ | ---------------------------- |
  | `name` | string | El nombre del país a buscar. |

- **Parámetros de Consulta**: Igual que `GET /all` (`fields`, `sort`, `flatten`).
- **Cabeceras (Headers)**:
  - `Accept-Language` (Opcional): Para mensaje de error "No Encontrado" localizado.
- **Respuesta Exitosa (200)**: Array que contiene el/los país(es) encontrado(s) coincidiendo con la estructura definida por `fields`/`flatten`.

  ```json
  // Ejemplo para /name/spain?fields=name.common,capital
  [{ "name": { "common": "Spain" }, "capital": ["Madrid"] }]
  ```

  ```json
  // Ejemplo para /name/spain?fields=capital.0&flatten=true
  ["Madrid"]
  ```

- **Errores**:

  - 400: Parámetros de consulta inválidos o parámetro `:name` faltante/vacío.
  - 404: País no encontrado (mensaje localizado).

    ```json
    {
      "error": {
        "status": 404,
        "message": "País con nombre '...' no encontrado"
      }
    }
    ```

  - 500: Error Interno del Servidor.

- **Ejemplo con Curl**:

  ```bash
  curl http://<host-api>/api/v1/name/germany
  curl http://<host-api>/api/v1/name/deutschland?fields=capital,currencies
  curl -H "Accept-Language: es" http://<host-api>/api/v1/name/paisinexistente
  ```

---

### `GET /regions`

Recupera una lista de todas las regiones disponibles presentes en el conjunto de datos, junto con el recuento de países y subregiones.

- **Descripción**: Devuelve una lista resumida de regiones distintas.
- **Parámetros de Consulta**: Ninguno soportado en este endpoint específico por defecto (no se aplica esquema).
- **Cabeceras (Headers)**: Ninguna específica.
- **Respuesta Exitosa (200)**:

  ```json
  [
    {
      "name": "africa", // Nombre de región normalizado
      "countryCount": 59,
      "subregions": ["Eastern Africa", "Middle Africa", ...] // Lista ordenada
    },
    {
      "name": "americas",
      "countryCount": 57,
      "subregions": ["Caribbean", "Central America", ...]
    },
    // ... otras regiones
  ]
  ```

- **Errores**:
  - 500: Error Interno del Servidor.
- **Ejemplo con Curl**:

  ```bash
  curl http://<host-api>/api/v1/regions
  ```

---

### `GET /region/:name`

Recupera todos los países pertenecientes a la región especificada. La búsqueda no distingue mayúsculas/minúsculas e ignora acentos/diacríticos.

- **Descripción**: Encuentra países haciendo coincidir el parámetro `:name` con el nombre de región normalizado.
- **Parámetros de Ruta**:

  | Nombre | Tipo   | Descripción                      |
  | ------ | ------ | -------------------------------- |
  | `name` | string | El nombre de la región a buscar. |

- **Parámetros de Consulta**: Igual que `GET /all` (`fields`, `sort`, `flatten`).
- **Cabeceras (Headers)**:
  - `Accept-Language` (Opcional): Para mensaje de error "No Encontrado" localizado.
- **Respuesta Exitosa (200)**: Array que contiene los países de la región especificada, coincidiendo con la estructura definida por `fields`/`flatten`.

  ```json
  // Ejemplo para /region/europe?fields=name.common&sort=name.common
  [
    { "name": { "common": "Albania" } },
    { "name": { "common": "Andorra" } }
    // ... otros países europeos alfabéticamente
  ]
  ```

- **Errores**:

  - 400: Parámetros de consulta inválidos o parámetro `:name` faltante/vacío.
  - 404: Región no encontrada (mensaje localizado).

    ```json
    {
      "error": {
        "status": 404,
        "message": "Región con nombre '...' no encontrada"
      }
    }
    ```

  - 500: Error Interno del Servidor.

- **Ejemplo con Curl**:

  ```bash
  curl http://<host-api>/api/v1/region/asia
  curl http://<host-api>/api/v1/region/oceania?fields=name,population&sort=-population
  ```
