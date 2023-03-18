const express = require("express");
const router = express.Router();

const {
  validateRegisterSchema,
} = require("../../../validation/userValidation/register");
const {
  validateLoginSchema,
} = require("../../../validation/userValidation/login");
const {
  validateForgotPasswordSchema,
} = require("../../../validation/userValidation/forgotPassword");
const {
  validateResetPasswordSchema,
} = require("../../../validation/userValidation/resetPassword");
const {
  validateUpdateUserSchema,
  validateDeleteUserSchema,
  validateFindUserByIdSchema,
} = require("../../../validation/userValidation/authUser");
const {
  findUserByEmail,
  createNewUser,
  updatePasswordById,
  showAllUsers,
  showUserById,
  updateUserById,
  deleteUserById,
} = require("../../../models/users.models");

const { createHash, cpmHash } = require("../../../config/bcrypt");
const { generateToken, verifyToken } = require("../../../config/jwt");

const authMiddleWare = require("../../../middleware/auth.middleware");
const allowAccessMiddleWare = require("../../../middleware/allowModify.middleware");

const morgan = require("morgan");
//=====================================================

router.get("/", async (req, res) => {
  try {
    const allUsers = await showAllUsers();
    res.json({ users: allUsers });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.get("/getuser/:id", async (req, res) => {
  try {
    const validate = await validateFindUserByIdSchema(req.params);
    const userData = await showUserById(validate.id);
    res.json({ massage: "get specific user" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

/**
  4.	If valid
    a.	If email not exists
      i.	Create hash password
      ii.	Store in db
      iii.	Send massage to client with ststus 201
  5.	Else
    a.	Send error with status 400

 * 
 */

router.post("/register", async (req, res) => {
  try {
    const validateValue = await validateRegisterSchema(req.body);
    const user = await findUserByEmail(validateValue.email);
    if (user) {
      throw "The email already exists";
    }
    const hashPassword = await createHash(validateValue.password);
    validateValue.password = hashPassword;
    await createNewUser(validateValue);
    res.status(201).json({ validateValue: validateValue });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const validateValue = await validateLoginSchema(req.body);
    const user = await findUserByEmail(validateValue.email);

    if (!user) {
      throw "invalid email/password";
    }

    const isEqualPassword = await cpmHash(
      validateValue.password,
      user.password
    );
    if (!isEqualPassword) {
      throw "invalid email/password";
    }
    const token = await generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
      isChef: user.isChef,
      isAdmin: user.isAdmin,
    });

    res.status(201).json({ token });
  } catch (error) {
    global.logger.warn({
      method: req.method,
      error: error.message,
      url: req.originalUrl,
      body: req.body,
    });
    res.status(400).json({ error: error });
  }
});

router.post("/forgotpassword", async (req, res) => {
  try {
    const validate = await validateForgotPasswordSchema(req.body);
    const userData = await findUserByEmail(validate.email);
    if (!userData) res.json({ msg: "check your inbox" });
    const jwtToken = await generateToken({ email: userData.email }, "1h");
    console.log("http://localhost:3000/resetpassword/" + jwtToken);
    res.json({ msg: "success" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.post("/resetpassword/:token", async (req, res) => {
  try {
    const validate = await validateResetPasswordSchema(req.body);
    const payload = await verifyToken(req.params.token);
    const userData = await findUserByEmail(payload.email);
    if (!userData) throw "wrong";
    const hashPassword = await createHash(validate.password);
    await updatePasswordById(userData._id, hashPassword);
    res.json({ msg: "the password update" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.get("/userInfo", authMiddleWare,async (req, res) => {
  try {
    let user = await showUserById(req.userData.id);
    if (user) {
      res.json( user );
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

router.patch(
  "/updateUser",
  authMiddleWare,
  allowAccessMiddleWare,
  async (req, res) => {
    try {
      const validate = await validateUpdateUserSchema(req.body);
      const userData = await showUserById(validate.id);
      //console.log("userData: ",userData);
      if (!userData) throw "the user not exist";
      if (req.userData._id || req.userData.allowAccess) {
        await updateUserById(userData._id, validate);
      } else {
        throw "don't allow update";
      }
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
);

module.exports = router;
