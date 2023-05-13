const db = require("../confiq/connection");

const viewSpecificBook = (id, callback) => {
  const sql = `
      SELECT
        books.*,
        AVG(ratings.score) AS average_rating,
        ratings.comment
      FROM
        books
        LEFT JOIN ratings ON ratings.book_id = books.id
      WHERE
        books.id = ?
      GROUP BY
        books.id
    `;

  db.query(sql, [id], (error, result) => {
    callback(error, result && result[0]);
  });
};

module.exports = { viewSpecificBook };
