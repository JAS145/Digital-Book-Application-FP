const multer = require("multer");
const fs = require("fs");
const bookSchema = require("../validations/bookValidation");

//Create directories if they don't exist
const imageDir = "./uploads/images";
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

const bookDir = "./uploads/books";
if (!fs.existsSync(bookDir)) {
  fs.mkdirSync(bookDir, { recursive: true });
}

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    req.fileValidationError = "Please upload a valid image file";
    return cb(null, false);
  }
  cb(null, true);
};

const bookFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(pdf)$/)) {
    req.fileValidationError = "Please upload a valid PDF file";
    return cb(null, false);
  }
  cb(null, true);
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, "uploads/images/");
    } else if (file.fieldname === "book") {
      cb(null, "uploads/books/");
    } else {
      cb({ message: "Unknown field name" }, false);
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.fieldname === "image") {
      imageFilter(req, file, cb);
    } else if (file.fieldname === "book") {
      bookFilter(req, file, cb);
    } else {
      cb(new Error("Unknown field name"), false);
    }
  },
});
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       if (file.mimetype.match("image")) {
//         cb(null, "uploads/images/");
//       } else if (file.mimetype.match("book")) {
//         cb(null, "uploads/books");
//       }
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, file.fieldname + "-" + uniqueSuffix);
//     },
//   }),
//   fileFilter: function (req, file, cb) {
//     if (file.mimetype.match("image")) {
//       imageFilter(req, file, cb);
//     } else if (file.mimetype.match("book")) {
//       bookFilter(req, file, cb);
//     } else {
//       cb(new error("Only image and pdf files are allowed"));
//     }
//   },
// });

// Set up multer middleware to accept multiple files
const uploadFiles = upload.fields(
  [
    { name: "image", maxCount: 1 },
    { name: "book", maxCount: 1 },
  ],
  "exact"
);
const multerMiddleware = (req, res, next) => {
  uploadFiles(req, res, function (err) {
    if (req.fileValidationError) {
      // Delete uploaded files if there was an error
      if (req.files) {
        const imageFile = req.files["image"] ? req.files["image"][0] : null;
        const bookFile = req.files["book"] ? req.files["book"][0] : null;
        if (imageFile) {
          fs.unlink(imageFile.path, function (err) {
            if (err) {
              console.error(err);
            }
          });
        }
        if (bookFile) {
          fs.unlink(bookFile.path, function (err) {
            if (err) {
              console.error(err);
            }
          });
        }
      }
      return res.status(400).send({ error: req.fileValidationError });
    }
    if (!req.files || !req.files["image"] || !req.files["book"]) {
      return res
        .status(400)
        .send({ error: "Please upload both image and book files" });
    }

    if (err) {
      // Delete uploaded files if there was an error
      if (req.files) {
        const imageFile = req.files["image"] ? req.files["image"][0] : null;
        const bookFile = req.files["book"] ? req.files["book"][0] : null;
        if (imageFile) {
          fs.unlink(imageFile.path, function (err) {
            if (err) {
              console.error(err);
            }
          });
        }
        if (bookFile) {
          fs.unlink(bookFile.path, function (err) {
            if (err) {
              console.error(err);
            }
          });
        }
      }
      return res.status(400).send({ error: err.message });
    }
    // Handle any multer errors
    if (err instanceof multer.MulterError) {
      // Delete uploaded files if there was an error
      if (req.files) {
        const imageFile = req.files["image"] ? req.files["image"][0] : null;
        const bookFile = req.files["book"] ? req.files["book"][0] : null;
        if (imageFile) {
          fs.unlink(imageFile.path, function (err) {
            if (err) {
              console.error(err);
            }
          });
        }
        if (bookFile) {
          fs.unlink(bookFile.path, function (err) {
            if (err) {
              console.error(err);
            }
          });
        }
      }
      return res.status(400).json({ error: err.message });
    }
    const bookData = { ...req.body };
    bookSchema.bookSchema
      .validate(bookData)
      .then(() => {
        next();
      })
      .catch((error) => {
        if (req.files) {
          const imageFile = req.files["image"] ? req.files["image"][0] : null;
          const bookFile = req.files["book"] ? req.files["book"][0] : null;
          if (imageFile) {
            fs.unlink(imageFile.path, function (err) {
              if (err) {
                console.error(err);
              }
            });
          }
          if (bookFile) {
            fs.unlink(bookFile.path, function (err) {
              if (err) {
                console.error(err);
              }
            });
          }
        }
        return res
          .status(400)
          .json({ errorName: "ValidationError", errorMessage: error.message });
      });
  });
};
module.exports = multerMiddleware;
