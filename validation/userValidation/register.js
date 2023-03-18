const Joi = require("joi");
const validate = require("../validate.validation");

const registerSchema = Joi.object({
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

const validateRegisterSchema = (userInput) => {
  //return newRecipeSchema.validateAsync(userInput, { abortEarly: false });
  return validate(registerSchema, userInput);
};

module.exports = {
  validateRegisterSchema,
};
