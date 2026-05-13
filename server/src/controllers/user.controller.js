import { CatchAsyncError } from '../middleware/catchAsyncError.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendMail from '../utils/sendMail.js';
import {
  activateUserSchema,
  loginUserSchema,
} from '../validations/user.validations.js';
import {
  accessTokenOptions,
  refreshTokenOptions,
} from '../utils/jwt.js';
import userService from '../services/user.service.js';
import generatesPassword from '../utils/generatePassword.js';


export const registrationsUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { email, name } = req.body;

    //  Validate input
    if (!email) {
      return next(new ErrorHandler("Email is required", 400));
    }

    //  Check existing user
    const existingUser = await userService.findUser(email);

    if (existingUser) {
      return next(
        new ErrorHandler(`User already exists with email: ${email}`, 400)
      );
    }

    //  Generate password
    const password = await generatesPassword();

    //  Create user ONLY
    const newUser = await userService.create({
      email,
      password,
      name, // optional
    });

    if (!newUser) {
      return next(new ErrorHandler("Failed to create user", 500));
    }

    // Final response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });

  } catch (error) {
    return next(
      new ErrorHandler(error.message || "Registration failed", 500)
    );
  }
});

export const loginUser = CatchAsyncError(async (req, res, next) => {
  const { error } = loginUserSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return next(
      new ErrorHandler(error.details.map((err) => err.message).join(', '), 400),
    );
  }

  const { email, password } = req.body;

  const user = await userModel
    .findOne({ email })
    .select('+password')
    .populate('roleId');

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 400));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!user.isAuthenticated) {
    return next(new ErrorHandler('Need admin approval to login', 400));
  }

  if (!isPasswordMatch) {
    return next(new ErrorHandler('Invalid user name or password', 400));
  }

  const accessToken = user.generateAccessToken();

  res.status(200).json({
    message: 'Login successful',
    accessToken,
    _id: user._id,
    isAuthenticated: user.isAuthenticated,
    email: user.email,
    roleId: user.roleId._id,
    roleName: user.roleId.roleName,
  });
});

// logout User
export const logoutUser = CatchAsyncError(async (req, res, next) => {
  try {
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('refresh_token', '', { maxAge: 1 });
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// update access token.
export const updateAccessToken = CatchAsyncError(async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);

    const message = 'Could not refresh token';
    if (!decoded) {
      return next(new ErrorHandler(message, 400));
    }

    const session = await redis.get(decoded.id);

    if (!session) {
      return next(new ErrorHandler(message, 400));
    }

    const user = JSON.parse(session);

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: '5m',
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: '3d',
    });

    req.user = user;

    res.cookie('access_token', accessToken, accessTokenOptions);
    res.cookie('refresh_token ', refreshToken, refreshTokenOptions);

    res.status(200).json({
      status: 'success',
      accessToken,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getAllUser = CatchAsyncError(async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getUserById = CatchAsyncError(async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);

    res.status(200).json(user);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const userAction = CatchAsyncError(async (req, res, next) => {
  try {
    const { userId, isAuthenticated } = req.params;
    const user = await userService.userAction(userId, isAuthenticated);
    res.status(200).json({ success: true, message: 'Successfully', user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});



