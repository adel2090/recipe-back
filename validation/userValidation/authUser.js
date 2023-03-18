const Joi = require("joi");
const validate = require("../validate.validation");

const updateUserSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
  name: Joi.string().min(2).max(255).required().trim(),
  email: Joi.string().min(6).max(255).required().email().trim(),
  //password: Joi.string().min(6).max(1024).required(),
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .required(),
  avatar: Joi.string(),
  isChef: Joi.boolean(),
  isAdmin: Joi.boolean(),
});

const deleteUserSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
});

const findUserByIdSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
});

//===============================================
const validateUpdateUserSchema = (userInput) => {
  //return newRecipeSchema.validateAsync(userInput, { abortEarly: false });
  return validate(updateUserSchema, userInput);
};

const validateDeleteUserSchema = (userInput) => {
  //return newRecipeSchema.validateAsync(userInput, { abortEarly: false });
  return validate(deleteUserSchema, userInput);
};

const validateFindUserByIdSchema = (userInput) => {
  //return newRecipeSchema.validateAsync(userInput, { abortEarly: false });
  return validate(findUserByIdSchema, userInput);
};

module.exports = {
  validateUpdateUserSchema,
  validateDeleteUserSchema,
  validateFindUserByIdSchema,
};
