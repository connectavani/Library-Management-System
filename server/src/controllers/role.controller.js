import roleService from '../services/role.service.js'; 
import { CatchAsyncError } from '../middleware/catchAsyncError.js';
import ErrorHandler from '../utils/ErrorHandler.js';

// create a new role
export const createRole = CatchAsyncError(async (req, res, next) => {

  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json({
      success: true,
      data: role,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get all roles
export const getAllRoles = CatchAsyncError(async (req, res, next) => {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//get a role by ID
export const getRoleById = CatchAsyncError(async (req, res, next) => {
  const { roleId } = req.params;

  try {
    const role = await roleService.getRoleById(roleId);
    res.status(200).json( role);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update a role
export const updateRole = CatchAsyncError(async (req, res, next) => {
  const { roleId } = req.params;
  const roleData = req.body;

  try {
    const updatedRole = await roleService.updateRole(roleId, roleData);
    res.status(200).json({
      data: updatedRole,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//delete a role
export const deleteRole = CatchAsyncError(async (req, res, next) => {
  const { roleId } = req.params;

  try {
    const deletedRole = await roleService.deleteRole(roleId);
    res.status(200).json({
      message: 'Role deleted successfully',
      data: deletedRole,
    });
  } catch (error) {
   return next(new ErrorHandler(error.message, 500));
  }
});
