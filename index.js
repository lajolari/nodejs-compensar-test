require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const movieController = require('./src/controllers/movieController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Rate Limiter
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW_MINUTES || 15) * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  message: {
    error: 'Too Many Requests',
    message: 'Has excedido el límite de peticiones. Inténtalo de nuevo más tarde.',
  },
});
app.use(limiter);


// Rutas
app.get('/', (req, res) => res.json({ message: '¡Bienvenido a la Micro-API de Películas!' }));
app.get('/api/movies/search', movieController.search);


// Manejador de Errores Centralizado
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Algo salió mal en el servidor.',
  });
});

// Manejador para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found', message: 'La ruta solicitada no existe.' });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});