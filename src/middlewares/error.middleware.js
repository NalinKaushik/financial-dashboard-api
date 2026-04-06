export const errorHandler = (err, req, res, next) => {
  // 2. Handling specific database errors
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      error: "Duplicate data error. A record with this unique identifier already exists."
    });
  }

  // custome error response
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // 4. Send the standardized error response
  res.status(statusCode).json({
    success: false,
    error: message
  });
};