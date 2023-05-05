const response = require("../utils/response");
const db = require("../confiq/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//CREATE USERS ACCOUNT
const createUsersAccount = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const { name, email, username, address, join_date, phone_number } = req.body;
  const sql = `Insert into users (name, password, email, username, address, join_date, phone_number) 
  values (?,?,?,?,?,?,?)`;

  db.query(
    sql,
    [name, hashedPassword, email, username, address, join_date, phone_number],
    (error, result) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      }
      if (result.affectedRows) {
        const data = {
          isSuccess: result.affectedRows,
          id: result.insertId,
        };
        response(200, data, "Your account is successfully created", res);
      }
    }
  );
};

//LOGIN ACCOUNT

const logInAccount = (req, res) => {
  const { username, password } = req.body;
  const sql1 = `select * from users where username =?`;
  db.query(sql1, [username, password], (error, result) => {
    if (error) {
      response(400, error, "An error occurred", res);
      return;
    }
    if (!result[0] || !bcrypt.compare(password, result[0].password)) {
      return response(400, error, "An error occurred", res);
      // res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: result.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    response(200, token, "Here is your token", res);
  });
};

//DELETE MERCHANT ACCOUNT
const deleteUsersAccount = (req, res) => {
  const { id } = req.params;
  const sql2 = `delete from users where id = ?`;
  db.query(sql2, [id], (error, result) => {
    if (error) {
      response(400, error.name, error.message, res);
      return;
    }
    if (result.affectedRows != 0) {
      const data = {
        isDeleted: result.affectedRows,
      };
      response(200, data, "Your account has been deleted", res);
      return;
    } else {
      response(404, "error", "The account is not found", res);
    }
  });
};

module.exports = {
  createUsersAccount,
  logInAccount,
  deleteUsersAccount,
};
