const express = require("express");
const router = express.Router();
const ratingController = require("../controller/ratings");
const auth = require("../middleware/authentication");
const ratingValidator = require("../middleware/ratingValidator");
const ratingValidation = require("../validations/ratingValidation");

router.post(
  "/",
  auth,
  ratingValidator.postValidation(ratingValidation.publishRatingSchema),
  ratingController.publishRating
);
// router.delete(
//   "/:id",
//   auth,
//   ratingValidator.deleteValidation(ratingValidation.deleteRatingSchema),
//   ratingController.deleteRating
// );
router.put(
  "/:id",
  auth,
  ratingValidator.putValidation(ratingValidation.updateRatingSchema),
  ratingController.updateRatings
);
router.get(
  "/",
  auth,
  ratingValidator.getValidation(ratingValidation.viewAllRatingSchema),
  ratingController.viewAllRatings
);
router.get(
  "/:id",
  auth,
  ratingValidator.getSpecificValidation(
    ratingValidation.viewSpecificRatingSchema
  ),
  ratingController.viewSpecificRatings
);

router.get(
  "/",
  auth,
  ratingValidator.ratingCategoryValidation(
    ratingValidation.ratingDisplayCategorySchema
  ),
  ratingController.ratingDisplayCategory
);

module.exports = router;
