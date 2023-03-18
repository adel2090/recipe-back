const express = require("express");
const router = express.Router();
// import to api animal

const recipesRouter = require("./api/recipes");
const usersRouter = require("./api/Users/userRouter");
const favoriteRouter = require("./api/favorite");

/* GET home page. */
router.get("/newuser", (req, res) => {
  res.json({ mas: "newUser" });
});


router.use("/recipes", recipesRouter);
router.use("/users", usersRouter);
router.use("/favorite", favoriteRouter);

module.exports = router;
