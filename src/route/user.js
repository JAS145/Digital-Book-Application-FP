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
router.delete("/", auth, userController.deleteUsersAccount);

router.get("/profile", auth, userController.getUsersAccount);
router.get("/profile/detail", auth, userController.getUsersAccountDetails);
router.put(
  "/:id",
  auth,
  userValidator.putValidation(userValidation.userPutSchema),
  userController.updateUsersAccount
);

module.exports = router;
