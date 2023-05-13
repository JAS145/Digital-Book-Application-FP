const db = require("../confiq/connection");
const response = require("../utils/response");

const publisherAuth = (req, res, next) => {
  const userEmail = req.user.email;
  db.query(
    "SELECT roles.name FROM users JOIN roles ON users.role_id = roles.id WHERE users.email = ?",
    [userEmail],
    (error, results, fields) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      }

      if (results[0].name !== "publisher") {
        response(401, null, "Only publishers can access this page.", res);
        return;
      }
      return next();
    }
  );
};

const readerAuth = (req, res, next) => {
  const userEmail = req.user.email;
  db.query(
    "SELECT roles.name FROM users JOIN roles ON users.role_id = roles.id WHERE users.email = ?",
    [userEmail],
    (error, results, fields) => {
      if (error) {
        response(400, error.name, error, res);
        return;
      }

      if (results[0].name !== "reader") {
        response(401, null, "Only readers can access this page.", res);
        return;
      }
      return next();
    }
  );
};

module.exports = {
  publisherAuth,
  readerAuth,
};
