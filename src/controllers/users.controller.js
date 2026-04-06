import * as UserService from '../services/user.service.js';

export const getProfile = async (req, res) => {
  try {

    // Extracting the ID that the authenticate middleware attached to the request
    const userId = req.user.id;

    // Asking the service for the data
    const user = await UserService.getProfile(userId);

    // Handle the edge case where a token is valid, but the user was deleted
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: "User profile not found." 
      });
    }

    // Return the data
    return res.status(200).json({ 
      success: true, 
      data: user 
    });

    // error handling
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Internal server error while fetching profile." 
    });
  }
};



export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: "User not found." 
      });
    }

    return res.status(200).json({ 
      success: true, 
      data: user 
    });
  } catch (error) {
    console.error("Get User By ID Error:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Internal server error." 
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Check if the user actually exists before trying to delete
    const existingUser = await UserService.getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ 
        success: false, 
        error: "User not found." 
      });
    }

    // 2. Delete the user
    await UserService.deleteUser(id);

    // 3. Send 204 No Content (Standard practice for successful deletes)
    return res.status(204).send();
  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Internal server error." 
    });
  }
};






export const getAllUsers = async (req, res, next) => {
  try {
    // Exclude password hashes in the service layer!
    const users = await UserService.fetchAllUsers();
    
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    const updatedUser = await UserService.changeRole(id, role);
    
    res.status(200).json({
      success: true,
      message: "User role updated",
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    
    const updatedUser = await UserService.toggleStatus(id, isActive);
    
    res.status(200).json({
      success: true,
      message: isActive ? "User activated" : "User deactivated",
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};