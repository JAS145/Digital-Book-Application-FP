const response = require("../utils/response");
const db = require("../confiq/connection");

//SHOW ALL RATINGS OF THE BOOK
const viewAllRatings = (req, res) => {
  const { book_id } = req.query;
  const sql = `select * from ratings where book_id = ?`;
  db.query(sql, [book_id], (error, result) => {
    if (error) {
      response(400, error.name, error.message, res);
    }
    if (result[0] == undefined) {
      response(404, "Result is undefined", "The ratings are not found.", res);
      return;
    }
    response(200, result, "Here are the book's ratings.", res);
    return;
  });
};

// SHOW RATINGS BY ID
const viewRatingsFilter = (req, res) => {
  const { book_id, score } = req.query;
  const sql = `select * from ratings where book_id = ? and score =? `;

  db.query(sql, [book_id, score], (error, result) => {
    if (error) {
      response(400, error.name, error.message, res);
      return;
    }
    if (result[0] == undefined) {
      response(404, "Result is undefined", "The ratings are not found.", res);
      return;
    }
    response(200, result, "Here are the book's ratings.", res);
    return;
  });
};
const viewSpecificRatings = (req, res) => {
  const { id } = req.params;
  const sql = `select * from ratings where id =? `;

  db.query(sql, [id], (error, result) => {
    if (error) {
      response(400, error.name, error.message, res);
      return;
    }
    if (result[0] == undefined) {
      response(404, "Result is undefined", "The ratings are not found.", res);
      return;
    }
    response(200, result, "Here are the book's ratings.", res);
    return;
  });
};

//ADD RATINGS
const addRatings = (req, res) => {
  const { book_id, user_id, score, comment } = req.body;
  const sql = `Insert into ratings (book_id, user_id, score, comment)
  values (?,?,?,?)`;

  db.query(sql, [book_id, user_id, score, comment], (error, result) => {
    if (error) {
      response(400, error.name, error, res);
      return;
    }
    if (result.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        RatingsID: result.insertId,
      };
      response(
        200,
        data,
        "Your rating and comment have been successfully stored in the database",
        res
      );
    }
  });
};
//UPDATE ratings
const updateRatings = (req, res) => {
  const { id } = req.params;
  const { book_id, user_id, score, comment } = req.body;
  const sql = `UPDATE ratings SET book_id = ?, user_id = ?, score= ?, comment = ? where id = ?`;
  db.query(sql, [book_id, user_id, score, comment, id], (error, result) => {
    if (error) {
      response(400, error.name, error.message, res);
      return;
    }
    if (result.affectedRows == 0) {
      response(
        404,
        "Error updating ratings",
        `The rating with the ID = ${id} is not found`,
        res
      );
      return;
    }
    const data = {
      isSuccess: result.affectedRows,
      message: result.message,
    };
    response(200, data, `The rating with the ID = ${id} is updated`, res);
  });
};

// //HAPUS RATINGS LIST
const deleteRatings = (req, res) => {
  const { id } = req.params;
  const sql = `delete from ratings where id = ?`;
  db.query(sql, [id], (error, result) => {
    if (error) {
      response(400, error.name, error.message, res);
      return;
    }
    if (result.affectedRows) {
      const data = {
        isDeleted: result.affectedRows,
      };
      response(200, data, `Your ratings with ID = ${id} has been deleted`, res);
      return;
    } else {
      response(404, "error", `Your ratings with ID = ${id} is not found`, res);
    }
  });
};

module.exports = {
  viewAllRatings,
  viewSpecificRatings,
  viewRatingsFilter,
  addRatings,
  updateRatings,
  deleteRatings,
};
