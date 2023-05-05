const express = require("express");
const router = express.Router();
const publisherController = require("../controller/publishers");
const auth = require("../middleware/authentication");
const publisherValidator = require("../middleware/publisherValidator");
const publisherValidation = require("../validations/publisherValidation");

router.post(
  "/",
  publisherValidator.postValidation(publisherValidation.publisherPostSchema),
  publisherController.createPublishersAccount
);

router.post(
  "/login",
  publisherValidator.postLogInValidation(publisherValidation.logInPublisher),
  publisherController.logInAccount
);
router.delete(
  "/:id",
  auth,
  publisherValidator.deleteValidation(
    publisherValidation.publisherDeleteSchema
  ),
  publisherController.deletePublishersAccount
);

module.exports = router;
