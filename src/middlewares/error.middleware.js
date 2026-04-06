export const errorHandler = (err, req, res, next) => {
  // 1. Log the error for your own debugging (you can remove this in production)
  console.error(`[Error]: ${err.message}`);
  console.error(err.stack);

  // 2. Handle specific database errors (Example: Prisma Unique Constraint)
  // P2002 is Prisma's code for "A record with this unique field already exists"
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      error: "Duplicate data error. A record with this unique identifier already exists."
    });
  }

  // 3. Handle custom thrown errors (like "Invalid email or password" from your auth service)
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // 4. Send the standardized error response
  res.status(statusCode).json({
    success: false,
    error: message
  });
};