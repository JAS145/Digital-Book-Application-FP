const multer = require("multer");

const imageFilter = function (req, res, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Only image files are allowed"));
  }
  cb(null, true);
};
const bookFilter = function (req, res, cb) {
  if (!file.originalname.match(/\.(pdf)$/)) {
    return cb(new Error("Only pdf files are allowed"));
  }
  cb(null, true);
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.mimetype.match("image")) {
        cb(null, "uploads/images/");
      } else if (file.mimetype.match("book")) {
        cb(null, "uploads/books");
      }
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),
  fileFilter: function (req, file, cb) {
    if (file.mimetype.match("image")) {
      imageFilter(req, file, cb);
    } else if (file.mimetype.match("book")) {
      bookFilter(req, file, cb);
    } else {
      cb(new error("Only image and pdf files are allowed"));
    }
  },
});
// Set up multer middleware to accept multiple files

const multerMiddleware = (req, res, next) => {
  try {
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "book", maxCount: 1 },
    ]);
    next();
  } catch (error) {
    res
      .status(401)
      .send({ errorName: error.name, errorMessage: error.message });
  }
};
module.exports = multerMiddleware;
