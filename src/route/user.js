const express = require("express");
const router = express.Router();
const userController = require("../controller/users");
const auth = require("../middleware/authentication");
const userValidator = require("../middleware/userValidator");
const userValidation = require("../validations/userValidation");

router.post(
  "/",
  userValidator.postValidation(userValidation.userPostSchema),
  userController.createUsersAccount
);

router.post(
  "/login",
  userValidator.postLogInValidation(userValidation.logInUser),
  userController.logInAccount
);
router.delete(
  "/:id",
  auth,
  userValidator.deleteValidation(userValidation.userDeleteSchema),
  userController.deleteUsersAccount
);

module.exports = router;
