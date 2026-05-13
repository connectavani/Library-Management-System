import Joi from 'joi';
import mongoose from 'mongoose';

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId Validation');

export const registerSchema = Joi.object({
  // name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$',
      ),
    )
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain uppercase, lowercase, number, and special character',
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const activateUserSchema = Joi.object({
  activation_code: Joi.string().length(4).required().messages({
    'string.empty': 'Activation code is required',
    'string.length': 'Activation code must be 4 characters',
  }),
  activation_token: Joi.string().required().messages({
    'string.empty': 'Activation token is required',
  }),
});

// export const createUserSchemaValidations = (data) => {
//   const schema = Joi.array()
//     .items(
//       Joi.object({
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         contactNo: Joi.string()
//           .pattern(/^[0-9]{10}$/)
//           .messages({
//             'string.pattern.base':
//               'Phone number must contain only digits and 10 characters long',
//           }),
//         email: Joi.string().email().required(),
//         roleId: objectId.required(),
//         roleName: Joi.string().required(),
//         password: Joi.string().min(6),
//         consumerId: objectId.optional(),
//       }),
//     )
//     .min(1)
//     .required();

//   return schema.validate(data);
// };
