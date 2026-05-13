import express from 'express';
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from '../controllers/role.controller.js';
import { isAuthenticated } from '../middleware/auth.js';

const roleRouter = express.Router();

roleRouter.post('/', isAuthenticated, createRole);

roleRouter.get('/', isAuthenticated, getAllRoles);

roleRouter.get('/:roleId', isAuthenticated, getRoleById);

roleRouter.put('/:roleId', isAuthenticated, updateRole);

roleRouter.delete('/:roleId', isAuthenticated, deleteRole);

export default roleRouter;
