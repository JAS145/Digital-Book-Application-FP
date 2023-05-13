const express = require("express");
const router = express.Router();
const ratingController = require("../controller/ratings");
const auth = require("../middleware/authentication");
const ratingValidator = require("../middleware/ratingValidator");
const ratingValidation = require("../validations/ratingValidation");
const ratingLimit = require("../middleware/apiLimit");
const role = require("../middleware/roleAuthentication");

router.post(
  "/",
  ratingLimit.ratingLimiter,
  auth,
  role.readerAuth,
  ratingValidator.postValidation(ratingValidation.createRatingSchema),
  ratingController.addRatings
);
router.delete(
  "/:id",
  auth,
  role.readerAuth,
  ratingValidator.deleteValidation(ratingValidation.deleteRatingSchema),
  ratingController.deleteRatings
);
router.put(
  "/:id",
  auth,
  role.readerAuth,
  ratingValidator.putValidation(ratingValidation.updateRatingSchema),
  ratingController.updateRatings
);
router.get(
  "/",
  auth,
  ratingValidator.getValidation(ratingValidation.viewAllRatingSchema),
  ratingController.viewAllRatings
);
//RATING FILTER
router.get(
  "/filter",
  auth,
  ratingValidator.getRatingFilter(ratingValidation.viewRatingFilterSchema),
  ratingController.viewRatingsFilter
);
router.get(
  "/:id",
  auth,
  ratingValidator.getSpecificValidation(
    ratingValidation.viewSpecificRatingSchema
  ),
  ratingController.viewSpecificRatings
);

module.exports = router;
