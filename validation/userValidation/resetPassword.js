const Joi = require("joi");
const validate = require("../validate.validation");

const resetPassword = Joi.object({
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .required(),
});

const validateResetPasswordSchema = (userInput) => {
  //return newRecipeSchema.validateAsync(userInput, { abortEarly: false });
  return validate(resetPassword, userInput);
};

module.exports = {
    validateResetPasswordSchema,
};
