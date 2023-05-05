const express = require("express");
const router = express.Router();
const bookController = require("../controller/books");
const auth = require("../middleware/authentication");
const bookValidator = require("../middleware/bookValidator");
const bookValidation = require("../validations/bookValidation");
const multer = require("../middleware/multer");

//PUBLISHER
router.post(
  "/",
  auth,
  bookValidator.postValidation(bookValidation.publishBookSchema),
  multer,
  bookController.publishBook
);
router.delete(
  "/:id",
  auth,
  bookValidator.deleteValidation(bookValidation.deleteBookSchema),
  bookController.deleteBook
);
router.put(
  "/:id",
  auth,
  bookValidator.putValidation(bookValidation.updateBookSchema),
  multer,
  bookController.updateBook
);
router.get(
  "/",
  auth,
  bookValidator.getValidation(bookValidation.viewAllBookSchema),
  bookController.viewAllBook
);
router.get(
  "/:id",
  auth,
  bookValidator.getSpecificValidation(bookValidation.viewSpecificBookSchema),
  bookController.viewSpecificBook
);

//READER/USER
router.get(
  "/search",
  auth,
  bookValidator.bookSearchValidation(bookValidation.bookSearchSchema),
  bookController.bookSearch
);

module.exports = router;
