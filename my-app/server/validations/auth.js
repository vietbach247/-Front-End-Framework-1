import Joi from "joi";

export const registerValidate = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

export const loginValidate = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

export const forgotPassword = Joi.object({
  email: Joi.string().required().email(),
});
