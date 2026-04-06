import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try {
    // 1. Check if the Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        error: "Access denied. No token provided." 
      });
    }

    // 2. Extract the token from the string "Bearer <token>"
    const token = authHeader.split(' ')[1];

    // 3. Verify the token using your secret key
    // Ensure you have JWT_SECRET defined in your .env file!
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the decoded payload (user ID and role) to the request
    req.user = decoded;

    // 5. Move to the next middleware or controller
    next();
  } catch (error) {
    // If the token is expired or tampered with, jwt.verify throws an error
    return res.status(401).json({ 
      success: false, 
      error: "Invalid or expired token." 
    });
  }
};