const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
recipeTitle
recipeDescription
recipeImg: url,alt
recipeClock
recipeUser
recipeType
recipeLevel
recipeIngredients
recipePreparation
chefName
user_id

*/
const recipesSchema = new Schema(
  {
    recipeTitle: { type: String, required: true },
    recipeImg: {
      type: String,
      required: true,
    },
    recipeDescription: {
      type: String,
      required: true,
      // minlength: 2,
      // maxlength: 1024,
    },
    // recipeImg: {
    //   url: { type: String, required: true, minlength: 2, maxlength: 1024 },
    //   alt: { type: String, required: true, minlength: 2, maxlength: 256 },
    // },
    recipeClock: { type: String, required: true },
    recipeUser: { type: String, required: true },
    recipeType: { type: String, required: true },
    recipeLevel: { type: String, required: true },
    recipeIngredients: { type: String, required: true },
    recipePreparation: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

recipesSchema.pre(/^find/, function (next) {
  this.populate({ path: "user_id", select: "name" });
  next();
});

const Recipes = mongoose.model("recipes", recipesSchema);

// create new recipes
const createNewRecipe = (
  recipeTitle,
  recipeImg,
  recipeDescription,
  recipeClock,
  recipeUser,
  recipeType,
  recipeLevel,
  recipeIngredients,
  recipePreparation,
  user_id
) => {
  const recipe = new Recipes({
    recipeTitle,
    recipeImg,
    recipeDescription,
    recipeClock,
    recipeUser,
    recipeType,
    recipeLevel,
    recipeIngredients,
    recipePreparation,
    user_id,
  });
  return recipe.save();
};

const showAllRecipes = () => {
  return Recipes.find({});
};

const showByIdRecipes = (id) => {
  return Recipes.findById(id);
};

const showRecipesByIdUser = (user) => {
  return Recipes.find({ user_id: user.id });
};

const updateByIdRecipe = (
  id,
  recipeTitle,
  recipeImg,
  recipeDescription,
  recipeClock,
  recipeUser,
  recipeType,
  recipeLevel,
  recipeIngredients,
  recipePreparation
) => {
  return Recipes.findByIdAndUpdate(
    id,
    {
      recipeTitle,
      recipeImg,
      recipeDescription,
      recipeClock,
      recipeUser,
      recipeType,
      recipeLevel,
      recipeIngredients,
      recipePreparation,
    },
    { returnDocument: true }
  );
};

const deleteByIdRecipes = (id) => {
  return Recipes.findByIdAndDelete(id);
};

module.exports = {
  createNewRecipe,
  showAllRecipes,
  showByIdRecipes,
  showRecipesByIdUser,
  updateByIdRecipe,
  deleteByIdRecipes,
};
