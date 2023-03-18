const Joi = require("joi");
const validate = require("../validate.validation");

const forgotPassword = Joi.object({
  email: Joi.string().min(6).max(255).required().email().trim(),
 
});

const validateForgotPasswordSchema = (userInput) => {
  //return newRecipeSchema.validateAsync(userInput, { abortEarly: false });
  return validate(forgotPassword, userInput);
};

module.exports = {
    validateForgotPasswordSchema,
};
