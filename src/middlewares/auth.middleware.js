import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try {
    // Checking if the Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        error: "Access denied. No token provided." 
      });
    }

    //  Extracting the token from the string "Bearer <token>"
    const token = authHeader.split(' ')[1];

    // Verifying the token using your secret key stored in .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded payload attached (user ID and role) to the request
    req.user = decoded;

    // next middleware or controller
    next();
  } catch (error) {
    // If the token is expired or tampered with, jwt.verify throws an error
    return res.status(401).json({ 
      success: false, 
      error: "Invalid or expired token." 
    });
  }
};