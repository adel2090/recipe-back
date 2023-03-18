const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  userForm: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  recipeId: {
    type: String,
  },
  recipeTitle: {
    type: String,
  },
  recipeImg: {
    type: String,
  },
},{ timestamps: true });

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = {
  Favorite,
};
