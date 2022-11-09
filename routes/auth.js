const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");

// ADD CONTROLLER
const authController = require("../controllers/auth");

const router = express.Router();

router.put(
  "/signup",
  [
    body("username")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Please enter a valid username of atleast 5 characters")
      .custom(async (value, { req }) => {
        try {
          const user = await User.findOne({ username: value });

          if (user) {
            return Promise.reject("Username already exists");
          }

          return Promise.resolve();
        } catch (err) {
          if (!err.statusCode) {
            err.statusCode = 500;
          }

          next(err);
        }
      }),
    body("password")
      .trim()
      .isString()
      .isLength({ min: 8, max: 100 })
      .not()
      .isLowercase()
      .not()
      .isUppercase()
      .not()
      .isNumeric()
      .not()
      .isAlpha()
      .withMessage(
        "Password must be of min 8 character with a number, lowercase and uppercase letter"
      ),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          return Promise.reject("Passwords do not match");
        }

        return Promise.resolve();
      }),
  ],
  authController.signup
);

router.post(
  "/login",
  [
    body("username").trim().not().isEmpty(),
    body("password").trim().not().isEmpty(),
  ],
  authController.login
);

module.exports = router;
