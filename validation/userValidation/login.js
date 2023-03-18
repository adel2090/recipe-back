const Joi = require("joi");
const validate = require("../validate.validation");

const loginSchema = Joi.object({
  email: Joi.string().min(6).max(255).required().email().trim(),
  //password: Joi.string().min(6).max(1024).required(),
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .required(),
});

const validateLoginSchema = (userInput) => {
  //return newRecipeSchema.validateAsync(userInput, { abortEarly: false });
  return validate(loginSchema, userInput);
};

module.exports = {
  validateLoginSchema,
};
