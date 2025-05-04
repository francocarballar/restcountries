# API Endpoints

This document details the available API endpoints. All endpoints are prefixed with `/api/v1`.

## Endpoints Overview

| Route           | Method | Description                   |
| --------------- | ------ | ----------------------------- |
| `/`             | GET    | Welcome message               |
| `/all`          | GET    | Get all countries             |
| `/name/:name`   | GET    | Get countries by name         |
| `/regions`      | GET    | Get list of available regions |
| `/region/:name` | GET    | Get countries by region name  |

---

### `GET /`

Returns a simple welcome message, translated based on the `Accept-Language` header.

- **Description**: Provides a localized welcome message to the API.
- **Query Parameters**: None.
- **Headers**:
  - `Accept-Language` (Optional): Specifies preferred language(s) for the welcome message (e.g., `es-ES`, `fr`, `en-US;q=0.9`). Defaults to English ('en').
- **Success Response (200)**:

  ```
  Content-Type: text/plain;charset=UTF-8
  Welcome to the API
  ```

  _(Message content varies by language)_

- **Errors**:
  - 500: Internal Server Error (if translation fails unexpectedly).
- **Curl Example**:

  ```bash
  curl -i http://<api-host>/
  curl -i -H "Accept-Language: es" http://<api-host>/
  ```

---

### `GET /all`

Retrieves a list of all countries. Supports filtering, sorting, and flattening.

- **Description**: Returns an array containing all country objects from the dataset.
- **Query Parameters**:

  | Name      | Type    | Required | Description                                                                                                                                   |
  | --------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
  | `fields`  | string  | No       | Comma-separated list of fields to include (e.g., `name,capital,population`). Supports dot notation for nested fields (e.g., `name.common`).   |
  | `sort`    | string  | No       | Comma-separated list of fields to sort by. Prefix with `-` for descending order (e.g., `population`, `-area`, `region,name.official`).        |
  | `flatten` | boolean | No       | If `true` AND `fields` specifies exactly one field, returns an array of values instead of objects (e.g., `?fields=name.common&flatten=true`). |

- **Headers**: None specific.
- **Success Response (200)**:

  - Default: Array of full country objects.

    ```json
    [
      {
        "name": { "common": "...", "official": "...", ... },
        "population": 12345,
        // ... other country fields ...
      },
      ...
    ]
    ```

  - With `?fields=name.common,population`:

    ```json
    [
      { "name": { "common": "..." }, "population": 12345 },
      ...
    ]
    ```

  - With `?fields=name.common&flatten=true`:

    ```json
    [ "CountryName1", "CountryName2", ... ]
    ```

- **Errors**:
  - 400: Invalid query parameter format (handled by `zValidator`).
  - 500: Internal Server Error.
- **Curl Example**:

  ```bash
  # Get all data for all countries
  curl http://<api-host>/api/v1/all
  # Get only common name and population, sorted by population descending
  curl http://<api-host>/api/v1/all?fields=name.common,population&sort=-population
  # Get flat array of common names
  curl http://<api-host>/api/v1/all?fields=name.common&flatten=true
  ```

---

### `GET /name/:name`

Retrieves one or more countries matching the provided name (common, official, native, translation). Search is case-insensitive and ignores accents/diacritics.

- **Description**: Finds countries by matching the `:name` parameter against various name fields. Can return multiple countries if the name is ambiguous (e.g., "kongo").
- **Path Parameters**:

  | Name   | Type   | Description                            |
  | ------ | ------ | -------------------------------------- |
  | `name` | string | The name of the country to search for. |

- **Query Parameters**: Same as `GET /all` (`fields`, `sort`, `flatten`).
- **Headers**:
  - `Accept-Language` (Optional): For localized "Not Found" error message.
- **Success Response (200)**: Array containing the found country/countries matching the structure defined by `fields`/`flatten`.

  ```json
  // Example for /name/spain?fields=name.common,capital
  [{ "name": { "common": "Spain" }, "capital": ["Madrid"] }]
  ```

  ```json
  // Example for /name/spain?fields=capital.0&flatten=true
  ["Madrid"]
  ```

- **Errors**:

  - 400: Invalid query parameters or missing/empty `:name` parameter.
  - 404: Country not found (localized message).

    ```json
    {
      "error": { "status": 404, "message": "Country with name '...' not found" }
    }
    ```

  - 500: Internal Server Error.

- **Curl Example**:

  ```bash
  curl http://<api-host>/api/v1/name/germany
  curl http://<api-host>/api/v1/name/deutschland?fields=capital,currencies
  curl -H "Accept-Language: es" http://<api-host>/api/v1/name/nonexistentcountry
  ```

---

### `GET /regions`

Retrieves a list of all available regions present in the dataset, along with country counts and subregions.

- **Description**: Returns a summary list of distinct regions.
- **Query Parameters**: None supported on this specific endpoint by default (schema not applied).
- **Headers**: None specific.
- **Success Response (200)**:

  ```json
  [
    {
      "name": "africa", // Normalized region name
      "countryCount": 59,
      "subregions": ["Eastern Africa", "Middle Africa", ...] // Sorted list
    },
    {
      "name": "americas",
      "countryCount": 57,
      "subregions": ["Caribbean", "Central America", ...]
    },
    // ... other regions
  ]
  ```

- **Errors**:
  - 500: Internal Server Error.
- **Curl Example**:

  ```bash
  curl http://<api-host>/api/v1/regions
  ```

---

### `GET /region/:name`

Retrieves all countries belonging to the specified region. Search is case-insensitive and ignores accents/diacritics.

- **Description**: Finds countries by matching the `:name` parameter against the normalized region name.
- **Path Parameters**:

  | Name   | Type   | Description                           |
  | ------ | ------ | ------------------------------------- |
  | `name` | string | The name of the region to search for. |

- **Query Parameters**: Same as `GET /all` (`fields`, `sort`, `flatten`).
- **Headers**:
  - `Accept-Language` (Optional): For localized "Not Found" error message.
- **Success Response (200)**: Array containing the countries in the specified region, matching the structure defined by `fields`/`flatten`.

  ```json
  // Example for /region/europe?fields=name.common&sort=name.common
  [
    { "name": { "common": "Albania" } },
    { "name": { "common": "Andorra" } }
    // ... other European countries alphabetically
  ]
  ```

- **Errors**:

  - 400: Invalid query parameters or missing/empty `:name` parameter.
  - 404: Region not found (localized message).

    ```json
    {
      "error": { "status": 404, "message": "Region with name '...' not found" }
    }
    ```

  - 500: Internal Server Error.

- **Curl Example**:

  ```bash
  curl http://<api-host>/api/v1/region/asia
  curl http://<api-host>/api/v1/region/oceania?fields=name,population&sort=-population
  ```
