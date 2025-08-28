const axios = require('axios');

// Cliente de Axios con configuración base
const apiClient = axios.create({
  baseURL: process.env.OMDB_BASE_URL,
  timeout: 5000, // Timeout de 5 segundos
});

const searchMovies = async (searchTerm, page = 1) => {
  const params = {
    s: searchTerm,
    page,
    apikey: process.env.OMDB_API_KEY,
  };

  // Lógica de reintentos simple
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const { data } = await apiClient.get('', { params });
      if (data.Response === 'True') {
        return data;
      }
      // Si OMDb responde con un error conocido, no reintentamos
      return { error: data.Error || 'No se encontraron resultados.' };
    } catch (error) {
      console.error(`Intento ${attempt} falló:`, error.message);
      if (attempt === 3) {
        // Si todos los intentos fallan, lanzamos un error personalizado
        throw new Error('El servicio de películas no está disponible en este momento.');
      }
    }
  }
};

module.exports = {
  searchMovies,
};