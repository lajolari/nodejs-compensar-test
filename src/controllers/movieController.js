const movieService = require('../services/movieService');
const { searchSchema } = require('../validators/movieValidator');
// CAMBIO 1: Importamos 'memory-cache' directamente aquí.
const cache = require('memory-cache');

// Función para normalizar la respuesta
const normalizeMovieData = (movies) => {
  return movies.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    type: movie.Type,
    poster: movie.Poster === 'N/A' ? null : movie.Poster,
  }));
};

const search = async (req, res) => {
  // 1. Validación de entrada
  const { error, value } = searchSchema.validate(req.query);
  if (error) {
    return res.status(400).json({
      error: 'Bad Request',
      message: error.details[0].message,
    });
  }

  const { q: searchTerm, page } = value;
  const cacheKey = `search-${searchTerm}-page-${page}`;
  // CAMBIO 2: Obtenemos el TTL directamente de las variables de entorno.
  const CACHE_TTL_SECONDS = parseInt(process.env.CACHE_TTL_SECONDS, 10) || 300;


  // 2. Revisa el caché (ahora con el objeto correcto)
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) {
    console.log('Sirviendo desde caché...');
    return res.json(cachedResult);
  }

  console.log('Buscando en la API externa...');
  // 3. Llama al servicio si no hay caché
  const data = await movieService.searchMovies(searchTerm, page);

  if (data.error) {
    return res.status(404).json({ error: 'Not Found', message: data.error });
  }

  // 4. Normaliza y construye la respuesta final
  const response = {
    pagination: {
      totalResults: parseInt(data.totalResults, 10),
      currentPage: page,
      totalPages: Math.ceil(data.totalResults / 10),
    },
    data: normalizeMovieData(data.Search),
  };

  // 5. Guarda la respuesta en caché, AÑADIENDO EL TTL (tiempo de vida)
  cache.put(cacheKey, response, CACHE_TTL_SECONDS * 1000); // El TTL se pone en milisegundos

  res.status(200).json(response);
};

module.exports = {
  search,
};