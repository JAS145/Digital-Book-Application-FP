const response = require("../utils/response");
const db = require("../confiq/connection");

//PUBLISHER
//SHOW ALL BOOKS

const viewAllBook = (req, res) => {
  const { publisher_id } = req.body;
  const sql = `select books. *, AVG(ratings.score) as average_rating, ratings.comment from books left join ratings on ratings.book_id = books.id where publisher_id = ? group by books.id`;
  db.query(sql, [publisher_id], (error, result) => {
    if (error) {
      response(400, error.name, error.message, res);
    }
    if (result[0] == undefined) {
      response(404, "Result is undefined", "Your book is not found.", res);
      return;
    }
    response(200, result, "Here are your books.", res);
    return;
  });
};

//SHOW BOOKS BY ID
const viewSpecificBook = (req, res) => {
  const { id } = req.params;
  const sql = `select books. *, AVG(ratings.score) as average_rating, ratings.comment from books left join ratings on ratings.book_id = books.id where id = ? group by books.id`;

  db.query(sql, [id], (error, result) => {
    if (error) {
      response(400, error.name, error.message, res);
      return;
    }
    if (result[0] == undefined) {
      response(404, "Result is undefined", "Your book is not found.", res);
      return;
    }
    response(200, result, "Here is your book.", res);
    return;
  });
};

//UPLOAD BOOK
const publishBook = (req, res) => {
  const {
    title,
    author,
    description,
    publisher,
    isbn,
    publication_date,
    category,
    price,
    formats,
    languages,
    keywords,
  } = req.body;
  const image_url = req.files.image;
  const file_url = req.files.book;
  const sql =
    "INSERT INTO books (title, author, description, publisher, isbn, publication_date, category, price, formats, languages, keywords, image_url, file_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      title,
      author,
      description,
      publisher,
      isbn,
      publication_date,
      category,
      price,
      formats,
      languages,
      keywords,
      image_url,
      file_url,
    ],
    (error, result, fields) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      } else {
        response(200, result, "Here is your book.", res);
        return;
      }
    }
  );
};

//UPDATE book
const updateBook = (req, res) => {
  const { id } = req.params;
  const {
    title,
    author,
    description,
    publisher,
    isbn,
    publication_date,
    category,
    price,
    formats,
    languages,
    keywords,
  } = req.body;
  const image_url = req.files.image;
  const file_url = req.files.book;
  const sql = `UPDATE books SET title = ?, author = ?, description = ?, publisher = ? isbn = ? publication_date = ?, category = ?, price = ?, format = ?, languages = ?, keywords = ?, image_url = ? file_url = ?`;
  db.query(
    sql,
    [
      title,
      author,
      description,
      publisher,
      isbn,
      publication_date,
      category,
      price,
      formats,
      languages,
      keywords,
      image_url,
      file_url,
      id,
    ],
    (error, result) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      }
      if (result.affectedRows == 0) {
        response(
          404,
          "Error updating book",
          `The book with the ID = ${id} is not found`,
          res
        );
        return;
      }
      const data = {
        isSuccess: result.affectedRows,
        message: result.message,
      };
      response(200, data, `The book with the ID = ${id} is updated`, res);
    }
  );
};

//HAPUS BOOK
const deleteBook = (req, res) => {
  const { id } = req.params;
  const sql = `delete from books where id = ?`;
  db.query(sql, [id], (error, result) => {
    if (error) {
      response(400, error.name, error.message, res);
      return;
    }
    if (result.affectedRows) {
      const data = {
        isDeleted: result.affectedRows,
      };
      response(200, data, `Your book with ID = ${id} has been deleted`, res);
      return;
    } else {
      response(404, "error", `Your book with ID = ${id} is not found`, res);
    }
  });
};

//USER
const bookSearch = (req, res) => {
  const { title, keywords, category } = req.query;
  const sql = `select books. *, AVG(ratings.score) as average_rating, ratings.comment from books left join ratings on ratings.book_id = books.id where 1=1 limit 10 group by books.id`; //PLEASE CHECK THIS LATER
  const params = [];

  if (title) {
    sql += "AND title like ?";
    params.push("%" + title + "%");
  }
  if (keywords) {
    sql += "AND keywords like ?";
    params.push("%" + keywords + "%");
  }
  if (category) {
    sql += "AND category like ?";
    params.push("%" + category + "%");
  }
  if (!title && !keywords && !category) {
    sql = `select books. *, AVG(ratings.score) as average_rating, ratings.comment from books left join ratings on ratings.book_id = books.id limit 10 group by books.id`;
  }
  db.query(sql, params, (error, result) => {
    if (error) {
      response(400, error.name, error.message, res);
    }
    if (result[0] == undefined) {
      response(404, `Result is undefined", "The books are not found`, res);
      return;
    }
    response(200, result, "Here are the books.", res);
    return;
  });
};

module.exports = {
  viewAllBook,
  viewSpecificBook,
  publishBook,
  updateBook,
  deleteBook,
  bookSearch,
};
