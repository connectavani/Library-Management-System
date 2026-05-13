import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const emailRegexPattern = /^[^\s@]+@[^\@]+\.[^\s@]+$/;

const DEFAULT_ROLE_ID = new mongoose.Types.ObjectId('64f53a3bfec13c001d9bfa02');

const userSchema = new mongoose.Schema(
  {
    contactNo: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [false, 'Please enter your email'],
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters'],
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      default: DEFAULT_ROLE_ID,
    },
    roleName: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Hash Password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE || '1h' },
  );
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model('User', userSchema);

export default userModel;
