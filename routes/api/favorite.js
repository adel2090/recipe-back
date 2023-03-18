const express = require("express");
const router = express.Router();

const { Favorite } = require("../../models/favorite.models");
const authMiddleWare = require("../../middleware/auth.middleware");

// const authMiddleWare = require("../../middleware/auth.middleware");
// const allowAccessMiddleWare = require("../../middleware/allowModify.middleware");

//==============================================================
//                            Favorite
//=============================================================
// /api/favorite/favoriteNumber
router.post("/favoriteNumber", async (req, res) => {
  // Find Favorite information inside Favorite Collection by Recipe ID
  try {
    const subscribe = await Favorite.find({ recipeId: req.body.recipeId });
    res.status(200).json({ success: true, subscribeNumber: subscribe.length });
  } catch (error) {
    return res.status(400).send(error);
  }

  //   Favorite.find({ recipeId: req.body.recipeId }).exec((err, subscribe) => {
  //     if (err) return res.status(400).send(err);
  //     res.status(200).json({ success: true, subscribeNumber: subscribe.length });
  //   });
});

//-------------------------------------------
// /api/favorite/favorited
router.post("/favorited", authMiddleWare, async (req, res) => {
  // Find Favorite information inside Favorite Collection by Recipe ID, userForm

  try {
    const subscribe = await Favorite.find({
      recipeId: req.body.recipeId,
      userForm: req.body.userForm,
    });
    // how can we know if I already favorite this movie or not ?
    let result = false;
    if (subscribe.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, subcribed: result });
  } catch (error) {
    res.status(400).send(error);
  }

  //   Favorite.find({
  //     recipeId: req.body.recipeId,
  //     userForm: req.body.userForm,
  //   }).exec((err, subscribe) => {
  //     if (err) return res.status(400).send(err);

  //     // how can we know if I already favorite this movie or not ?
  //     let result = false;
  //     if (subscribe.length !== 0) {
  //       result = true;
  //     }
  //     res.status(200).json({ success: true, subcribed: result });
  //   });
});

//------------------------------------------------------------------
// /api/favorite/addToFavorite
router.post("/addToFavorite", authMiddleWare, async (req, res) => {
  // Save the information about the recipe or user Id inside favorite Collection

  try {
    const favorite =new Favorite(req.body);
    favorite.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.json({ success: false, error });
  }

  //    const favorite = new Favorite(req.body);
  //   favorite.save((err, doc) => {
  //     if (err) return res.json({ success: false, err });
  //     return res.status(200).json({ success: true });
  //   });
});

//------------------------------------------------------------------
// /api/favorite/removeFromFavorite
router.post("/removeFromFavorite",authMiddleWare, async (req, res) => {
  try {
    //console.log(req.body);
    const doc = await Favorite.findOneAndDelete(req.body);
    res.status(200).json({ success: true, doc });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
  //console.log(req.body);
  //   Favorite.findOneAndDelete({
  //     recipeId: req.body.recipeId,
  //     userForm: req.body.userForm,
  //   }).exec((err, doc) => {
  //     console.log("doc",doc);
  //     if (err) return res.status(400).json({ success: false, err });
  //     res.status(200).json({ success: true, doc });
  //   });
});

//-----------------------------------------------------
//getFavoritedRecipe
router.post("/getFavoritedRecipe",authMiddleWare, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userForm: req.body.userForm });
    return res.status(200).json({ success: true, favorites });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }

  //   Favorite.find({ userForm: req.body.userForm }).exec((err, favorites) => {
  //     if (err) return res.status(400).json({ success: false, err });
  //     return res.status(200).json({ success: true, favorites });
  //   });
});
module.exports = router;
