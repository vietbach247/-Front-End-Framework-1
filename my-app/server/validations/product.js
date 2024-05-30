import Joi from "joi";

export const productValidate = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  discountPercentage: Joi.number(),
  rating: Joi.number(),
  stock: Joi.number(),
  brand: Joi.string(),
  category: Joi.string(),
  thumbnail: Joi.string(),
  images: Joi.string(),
});
