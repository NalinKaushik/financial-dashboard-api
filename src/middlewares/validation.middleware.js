/** 
  Validation Middleware:
   Wrapping Zod schema validation into an Express middleware.
   @param {import('zod').ZodSchema} schema
 */

export const validate = (schema) => (req, res, next) => {
  try {
    // parsing all three sources of input (body, query, params)
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    // If validation pass, go to the next function (the Controller)
    next();
  } catch (error) {
    // If validation fails, return a Status code: 400 (Bad Request) with formatted errors
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