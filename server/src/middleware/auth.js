import ErrorHandler from '../utils/ErrorHandler.js';
import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach decoded user info to request object
    req.user = decoded;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ message: 'Token expired. Please log in again.' });
    }
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// validate user role
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role || '')) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allow to access this resource `,
          403,
        ),
      );
    }
    next();
  };
};
