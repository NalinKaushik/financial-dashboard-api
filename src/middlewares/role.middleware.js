/**
 * A higher-order function that accepts an array of allowed roles
 * and returns a middleware function.
 * * Usage: authorize('ADMIN', 'ANALYST')
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    
    // 1. Safety check: Ensure the user object exists
    if (!req.user || !req.user.role) {
      return res.status(401).json({ 
        success: false, 
        error: "Unauthorized: User context is missing." 
      });
    }

    // 2. Check if the user's role is in the list of allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        error: "Forbidden: You do not have the required permissions to perform this action." 
      });
    }

    // 3. User is authorized, proceed!
    next();
  };
};