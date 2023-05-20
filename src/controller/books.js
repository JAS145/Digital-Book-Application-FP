const response = require("../utils/response");
const bookModel = require("../models/bookModel");
const multer = require("../middleware/multer");
const db = require("../confiq/connection");
const path = require("path");
const fs = require("fs");

//PUBLISHER
//SHOW ALL BOOKS

const viewAllBook = (req, res) => {
  // const { publisher_id } = req.query;
  const userEmail = req.user.email;
  const sql = `select books.id, books.title, books.price, AVG(ratings.score) as average_rating, ratings.comment from books 
  left join ratings on ratings.book_id = books.id 
  left join users on books.user_id = users.id 
  where users.email = ? group by books.id`;

  db.query(sql, [userEmail], (error, result) => {
    if (error) {
      response(400, error.name, error, res);
    }
    if (result[0] == undefined) {
      response(404, "Result is undefined", "Your book is not found.", res);
      return;
    }
    response(200, result, "Here are your books.", res);
    return;
  });
};

const viewSpecificBook = (req, res) => {
  const { id } = req.params;

  bookModel.viewSpecificBook(id, (error, result) => {
    if (error) {
      return response(400, error.name, error, res);
    }

    if (!result) {
      return response(
        404,
        "Result is undefined",
        "The book is not found.",
        res
      );
    }

    response(200, result, "Here is your book.", res);
  });
};

//SHOW BOOK IMAGE
const viewBookImage = (req, res) => {
  const id = req.params.id;

  const sql = `SELECT image_url FROM books WHERE id = ?`;

  db.query(sql, [id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error getting book image" });
      return;
    }
    const imagePath = result[0].image_url;
    const absolutePath = path.resolve(__dirname, "..", "..", imagePath);
    res.sendFile(absolutePath);
  });
};

//READ BOOK
const readBook = (req, res) => {
  const bookId = req.params.bookId;
  // const userEmail = req.user.email;
  const sql = "SELECT file_url FROM books WHERE id = ?";
  db.query(sql, [bookId], (err, result) => {
    if (err) {
      res.status(500).json({ err });
      return;
    }
    if (result.length === 0) {
      res.status(403).json({ error: "You have not paid for this book" });
      return;
    }
    const bookPath = result[0].file_url;
    // Stream the book file to the client
    const stream = fs.createReadStream(bookPath);
    stream.pipe(res);
  });
};

//BOOK ACCESS
const bookAccess = (req, res) => {
  const { book_id, user_id, payment_id } = req.body;
  const sql =
    "INSERT INTO book_access (book_id, user_id, payment_id) VALUES (?, ?, ?)";

  db.query(sql, [book_id, user_id, payment_id], (error, result) => {
    if (error) {
      response(400, error.name, error.message, res);
      return;
    } else {
      response(200, result, "The data sent successfully.", res);
      return;
    }
  });
};

//UPLOAD BOOK
const publishBook = (req, res) => {
  const {
    user_id,
    title,
    author,
    description,
    publisher,
    isbn,
    publication_date,
    category,
    price,
    languages,
    keywords,
  } = req.body;
  const image_url = req.files.image[0].path;
  const file_url = req.files.book[0].path;
  const sql =
    "INSERT INTO books (user_id, title, author, description, publisher, isbn, publication_date, category, price, languages, keywords, image_url, file_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";

  db.query(
    sql,
    [
      user_id,
      title,
      author,
      description,
      publisher,
      isbn,
      publication_date,
      category,
      price,
      languages,
      keywords,
      image_url,
      file_url,
    ],
    (error, result) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      } else {
        response(200, result, "The upload is successful.", res);
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
    languages,
    keywords,
  } = req.body;
  const image_url = req.files.image;
  const file_url = req.files.book;
  const sql = `UPDATE books SET title = ?, author = ?, description = ?, publisher = ?, isbn = ?, publication_date = ?, category = ?, price = ?, languages = ?, keywords = ?, image_url = ?, file_url = ?`;

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
      languages,
      keywords,
      image_url,
      file_url,
      id,
    ],
    (error, result) => {
      if (error) {
        response(400, error.name, error, res);
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
  // const userEmail = req.user.email;
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
  let sql = `select books.id, books.title, books.author, AVG(ratings.score) as average_rating from books left join ratings on ratings.book_id = books.id where 1=1`; //PLEASE CHECK THIS LATER
  const params = [];

  if (title) {
    sql += " AND title like ?";
    params.push("%" + title + "%");
  }
  if (keywords) {
    sql += " AND keywords like ?";
    params.push("%" + keywords + "%");
  }
  if (category) {
    sql += " AND category like ?";
    params.push("%" + category + "%");
  }
  if (!title && !keywords && !category) {
    sql = `select books. *, AVG(ratings.score) as average_rating, ratings.comment from books left join ratings on ratings.book_id = books.id`;
  }
  sql += ` group by books.id limit 10`;
  db.query(sql, params, (error, result) => {
    if (error) {
      return response(400, error.name, error, res);
    }

    if (result[0] == undefined) {
      return response(
        404,
        "Result is undefined",
        "The books are not found",
        res
      );
    }
    response(200, result, "Here are the books.", res);
    return;
  });
};

module.exports = {
  viewAllBook,
  viewSpecificBook,
  viewBookImage,
  readBook,
  bookAccess,
  publishBook,
  multer,
  updateBook,
  deleteBook,
  bookSearch,
};
