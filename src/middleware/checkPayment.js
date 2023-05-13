const checkPayment = (req, res, next) => {
  const bookId = req.params.bookId;
  const userEmail = req.user.email;
  const sql =
    "SELECT * FROM book_access left join users on users.id = book_access (user_id) WHERE book_id = ? AND users.email = ?";

  db.query(sql, [bookId, userEmail], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Server error" });
      return;
    }
    if (result.length === 0) {
      res.status(403).json({ error: "You have not paid for this book" });
      return;
    }
    // If user has paid for the book, call next middleware
    next();
  });
};
