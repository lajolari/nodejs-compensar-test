# Micro-API de Búsqueda de Películas (Node.js)

Esta es una micro-API construida en Node.js y Express que consume la API pública de OMDb para buscar películas. El proyecto cumple con varios requerimientos técnicos avanzados como validación de entrada, cacheo en memoria con TTL, limitación de peticiones (rate limiting), logging y un manejo de errores robusto.

## Requisitos

- Node.js v18 o superior
- npm (o un gestor de paquetes equivalente)
- Una API Key de [OMDb API](https://www.omdbapi.com/apikey.aspx)

## Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/lajolari/nodejs-compensar-test.git](https://github.com/lajolari/nodejs-compensar-test.git)
    cd nodejs-compensar-test
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea una copia del archivo `.env.example` y renómbrala a `.env`.
    ```bash
    cp .env.example .env
    ```
    Luego, abre el archivo `.env` y añade tu API Key de OMDb.

## Ejecución

El proyecto incluye dos scripts principales para su ejecución:

-   **Para desarrollo (con reinicio automático):**
    ```bash
    npm run dev
    ```

-   **Para producción:**
    ```bash
    npm start
    ```

El servidor se iniciará en el puerto especificado en el archivo `.env` (por defecto, `3000`).

## Uso del Endpoint

La API expone un único endpoint para la búsqueda de películas.

`GET /api/movies/search`

#### Parámetros

-   `q` (string, **obligatorio**): El término de búsqueda para el título de la película. Debe tener al menos 2 caracteres.
-   `page` (integer, opcional): El número de página para la paginación de resultados. Por defecto es `1`.

#### Ejemplo de Petición