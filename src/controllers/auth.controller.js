import * as AuthService from '../services/auth.service.js';

// controller function responsible for reading the request body and act according to that
// (i.e., calling the service or throwing an error)



export const register = async (req, res, next) => {
  try {
    const newUser = await AuthService.registerUser(req.body);
    
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser
    });
  } catch (error) {
    next(error);
  }
};

// 
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.loginUser(email, password);
    
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    next(error);
  }
};