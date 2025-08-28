const Joi = require('joi');

const searchSchema = Joi.object({
  // 'q' es el término de búsqueda, es obligatorio (required)
  q: Joi.string().min(2).required().messages({
    'string.base': 'El término de búsqueda debe ser texto.',
    'string.min': 'El término de búsqueda debe tener al menos 2 caracteres.',
    'any.required': 'El parámetro "q" (búsqueda) es obligatorio.',
  }),
  // 'page' es la página, es opcional, debe ser un número entero positivo
  page: Joi.number().integer().positive().default(1).messages({
      'number.base': 'La página debe ser un número.',
      'number.positive': 'La página debe ser un número positivo.'
  })
});

module.exports = {
  searchSchema,
};