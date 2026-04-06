/**
 * Validation Middleware
 * Wraps Zod schema validation into an Express middleware.
 * @param {import('zod').ZodSchema} schema - The Zod schema to validate against
 */
export const validate = (schema) => (req, res, next) => {
  try {
    // We parse the request body, query params, and URL params
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    // If validation passes, move to the next function (the Controller)
    next();
  } catch (error) {
    // If validation fails, return a 400 Bad Request with formatted errors
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    });
  }
};