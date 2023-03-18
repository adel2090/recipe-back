const Joi = require("joi");
const validate = require("./validate.validation");
/**
 *  img,
  title,
  clock,
  users,
  numStar,
  description,
  alt,
  id,
 */
const newRecipeSchema = Joi.object({
  recipeTitle: Joi.string().min(2).max(255).required().trim(),
  recipeImg: Joi.string()
    .regex(/^http(s?)\:\/\/(\.?)/)
    .required(),
  recipeDescription: Joi.string().min(2).max(255).required().trim(),
  recipeClock: Joi.string().min(2).max(10).required().trim(),
  recipeUser: Joi.string().min(1).max(10).required().trim(),
  recipeType: Joi.string().min(2).max(255).required().trim(),
  recipeLevel: Joi.string().min(2).max(10).required().trim(),
  recipeIngredients: Joi.string().min(2).max(1024).required().trim(),
  recipePreparation: Joi.string().min(2).max(1024).required().trim(),
  user_id: Joi.string().length(24).hex().required().trim(),
});

const updateRecipeSchema = Joi.object({
  //id: Joi.string().length(24).hex().required().trim(),
  recipeTitle: Joi.string().allow("").min(2).max(255).trim(),
  recipeImg: Joi.string().regex(/^http(s?)\:\/\/(\.?)/),
  recipeDescription: Joi.string().allow("").min(2).max(255).trim(),
  recipeClock: Joi.string().allow("").min(2).max(10).trim(),
  recipeUser: Joi.string().allow("").min(1).max(10).trim(),
  recipeType: Joi.string().allow("").min(2).max(255).trim(),
  recipeLevel: Joi.string().allow("").min(2).max(10).trim(),
  recipeIngredients: Joi.string().min(2).max(1024).required().trim(),
  recipePreparation: Joi.string().min(2).max(1024).required().trim(),
});

const deleteRecipeSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
});

const findRecipeByIdSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
});
//----------------------------------------------------------
const validateNewRecipeSchema = (userInput) => {
  //return newRecipeSchema.validateAsync(userInput, { abortEarly: false });
  return validate(newRecipeSchema, userInput);
};
const validateUpdateRecipeSchema = (userInput) => {
  //return newRecipeSchema.validateAsync(userInput, { abortEarly: false });
  return validate(updateRecipeSchema, userInput);
};
const validateDeleteRecipeSchema = (userInput) => {
  //return newRecipeSchema.validateAsync(userInput, { abortEarly: false });
  return validate(deleteRecipeSchema, userInput);
};
const validateFindRecipeByIDSchema = (userInput) => {
  //return newRecipeSchema.validateAsync(userInput, { abortEarly: false });
  return validate(findRecipeByIdSchema, userInput);
};

module.exports = {
  validateNewRecipeSchema,
  validateUpdateRecipeSchema,
  validateDeleteRecipeSchema,
  validateFindRecipeByIDSchema,
};
