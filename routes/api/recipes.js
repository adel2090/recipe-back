const express = require("express");
const router = express.Router();
//const recipeValidate = require("../../validation/recipe.validation");
const {
  validateNewRecipeSchema,
  validateUpdateRecipeSchema,
  validateDeleteRecipeSchema,
  validateFindRecipeByIDSchema,
} = require("../../validation/recipe.validation");

const {
  createNewRecipe,
  showAllRecipes,
  showByIdRecipes,
  showRecipesByIdUser,
  updateByIdRecipe,
  deleteByIdRecipes,
} = require("../../models/recipes.models");

const authMiddleWare = require("../../middleware/auth.middleware");
const allowAccessMiddleWare = require("../../middleware/allowModify.middleware");

//==============================================================

// /api/recipes/recipes
router.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await showAllRecipes();
    res.json(allRecipes);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// /api/recipes/recipe/321321315
router.get("/recipe/:id", async (req, res) => {
  try {
    const cardId=req.params.id;
    const card=await showByIdRecipes(cardId);
    console.log({card});
    res.json(card);
    // const validateValue = await validateFindRecipeByIDSchema(req.params);
    // const recipeData = await showByIdRecipes(validateValue.id);
    // res.json({ recipeData });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// api/recipes/my-recipes
// need token
router.get("/myRecipes",authMiddleWare, async (req, res) => {
  try {
    const user=req.userData;
    console.log("user",user);
    if(!user.isChef) return res.status(403).json("Un authorize user");
    const card=await showRecipesByIdUser(user);
    res.json(card);
    //res.json({ message: "get all recipes of registered user" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
 
});

// api/recipes/
// need token
router.post("/",authMiddleWare, async (req, res) => {
  try {
    /**recipeTitle
recipeImg
recipeDescription
recipeClock
recipeUser
recipeType
recipeLevel */
    req.body.user_id=req.userData.id
    const validateValue = await validateNewRecipeSchema(req.body);
    const recipeData = await createNewRecipe(
      validateValue.recipeTitle,
      validateValue.recipeImg,
      validateValue.recipeDescription,
      validateValue.recipeClock,
      validateValue.recipeUser,
      validateValue.recipeType,
      validateValue.recipeLevel,
      validateValue.recipeIngredients,
      validateValue.recipePreparation,
      validateValue.user_id,
    );

    res.status(201).json(recipeData);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// api/recipes/:id
//need token
router.patch("/:id",authMiddleWare,allowAccessMiddleWare, async (req, res) => {
  try {
    const validateValue = await validateUpdateRecipeSchema(req.body);
    const cardId=req.params.id;
    
    const recipeData = await showByIdRecipes(cardId);
    console.log(recipeData);
     //recipes not exists
     if (!recipeData) throw "recipes not exist";
     console.log(req.userData);
     // if find the id and id equal to id_user so the recipes of thus user and allow to update the recipes
    
    if (recipeData.user_id._id==req.userData.id || req.userData.allowAccess) {
      console.log("here");
      await updateByIdRecipe(
        cardId,
        validateValue.recipeTitle,
        validateValue.recipeImg,
        validateValue.recipeDescription,
        validateValue.recipeClock,
        validateValue.recipeUser,
        validateValue.recipeType,
        validateValue.recipeLevel,
        validateValue.recipeIngredients,
        validateValue.recipePreparation
      );
    } else {
      throw "invalid operation";
    }

    res.status(201).json({ message: "The recipe is update" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// api/recipes/:id
//need token
router.delete(
  "/:id",
  authMiddleWare,
  allowAccessMiddleWare,
  async (req, res) => {
    try {
      const validateValue = await validateDeleteRecipeSchema(req.params);
      const recipeData = await showByIdRecipes(validateValue.id);
      if (!recipeData) throw "the recipe not exist";
      if (recipeData.user_id._id == req.userData.id || req.userData.allowAccess) {
        await deleteByIdRecipes(validateValue.id);
      } else {
        throw "invalid operation";
      }

      res.status(201).json({ message: "The recipe is deleted" });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
);

module.exports = router;
