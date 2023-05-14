const express = require("express");
const router = express.Router();
const bookController = require("../controller/books");
const auth = require("../middleware/authentication");
const bookValidator = require("../middleware/bookValidator");
const bookValidation = require("../validations/bookValidation");
const multer = require("../middleware/multer");
const role = require("../middleware/roleAuthentication");

//PUBLISHER
//TO PUBLISH BOOKS
router.post(
  "/publish",
  auth,
  role.publisherAuth,
  multer,
  bookController.publishBook
);

//TO DELETE BOOKS
router.delete(
  "/:id",
  auth,
  role.publisherAuth,
  bookValidator.deleteValidation(bookValidation.deleteBookSchema),
  bookController.deleteBook
);

//TO UPDATE BOOKS
router.put(
  "/:id",
  auth,
  role.publisherAuth,
  bookValidator.putValidation(bookValidation.updateBookSchema),
  multer,
  bookController.updateBook
);
//TO VIEW ALL BOOKS
router.get("/", auth, role.publisherAuth, bookController.viewAllBook);

//BOOK SEARCH FOR READERS
router.get(
  "/search",
  auth,
  role.readerAuth,
  bookValidator.bookSearchValidation(bookValidation.bookSearchSchema),
  bookController.bookSearch
);
//TO VIEW SPECIFIC BOOK
router.get(
  "/:id",
  auth,
  bookValidator.getSpecificValidation(bookValidation.viewSpecificBookSchema),
  bookController.viewSpecificBook
);
//TO SHOW IMAGE
router.get(
  "/:id/image",
  auth,
  bookValidator.getBookImage(bookValidation.viewBookImageSchema),
  bookController.viewBookImage
);

//TO READ BOOK
router.get(
  "/:bookId/read",
  auth,
  role.readerAuth,
  bookValidator.getReadBook(bookValidation.readBookSchema),
  bookController.readBook
);

//TO POST BOOK ACCESS
router.post(
  "/access",
  auth,
  role.readerAuth,
  bookValidator.postBookAccess(bookValidation.bookAccessSchema),
  bookController.bookAccess
);

module.exports = router;
