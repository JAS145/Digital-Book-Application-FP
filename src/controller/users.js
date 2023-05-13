const response = require("../utils/response");
const db = require("../confiq/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//CREATE USERS ACCOUNT
const createUsersAccount = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const { role_id, name, email, username, address, join_date, phone_number } =
    req.body;
  const sql = `Insert into users (role_id, name, password, email, username, address, join_date, phone_number) 
  values (?,?,?,?,?,?,?,?)`;

  db.query(
    sql,
    [
      role_id,
      name,
      hashedPassword,
      email,
      username,
      address,
      join_date,
      phone_number,
    ],
    (error, result) => {
      if (error) {
        response(400, error.name, error, res);
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
  const { email, password } = req.body;
  const sql1 = `select * from users where email = ?`;
  db.query(sql1, [email, password], (error, result) => {
    if (error) {
      response(400, error, error, res);
      return;
    }
    if (!result[0] || !bcrypt.compare(password, result[0].password)) {
      console.log(result);
      return response(400, error, "Email or password is incorrect.", res);
      // res.status(401).json({ error: "Invalid username or password" });
    }
    const user = result[0];
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    response(200, token, "Here is your token", res);
  });
};

//DELETE MERCHANT ACCOUNT
const deleteUsersAccount = (req, res) => {
  const email = req.user.email;
  const sql2 = `delete from users where email = ?`;
  db.query(sql2, [email], (error, result) => {
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

const getUsersAccount = (req, res) => {
  const email = req.user.email; //from the JWT authentication
  const sql = `select name, email from  users 
   where email = ?`;

  db.query(sql, [email], (error, result) => {
    if (error) {
      response(400, error.name, error, res);
      return;
    }
    if (result.affectedRows != 0) {
      response(200, result, "Here is your account profile", res);
      return;
    } else {
      response(404, "error", "The account is not found", res);
    }
  });
};

const getUsersAccountDetails = (req, res) => {
  const email = req.user.email; //from the JWT authentication
  const sql = `select  users.id,users.name, users.email, users.address, users.join_date, users.phone_number, roles.name role from users left join roles 
  on role_id = roles.id where users.email = ?`;

  db.query(sql, [email], (error, result) => {
    if (error) {
      response(400, error.name, error, res);
      return;
    }
    if (result.affectedRows != 0) {
      response(200, result, "Here is your account profile", res);
      return;
    } else {
      response(404, "error", "The account is not found", res);
    }
  });
};

const updateUsersAccount = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const { id } = req.params;
  const { role_id, name, email, username, address, join_date, phone_number } =
    req.body;
  const sql = `update users set role_id = ?, name = ?, password = ?, email = ?, username =?, address = ?, join_date = ?, phone_number =?  
  where id = ?`;

  db.query(
    sql,
    [
      role_id,
      name,
      hashedPassword,
      email,
      username,
      address,
      join_date,
      phone_number,
      id,
    ],
    (error, result) => {
      if (error) {
        response(400, error.name, error, res);
        return;
      }
      if (result.affectedRows) {
        const data = {
          isSuccess: result.affectedRows,
          id: result.insertId,
        };
        response(200, data, "Your account is successfully updated", res);
      }
    }
  );
};

module.exports = {
  createUsersAccount,
  logInAccount,
  deleteUsersAccount,
  getUsersAccount,
  getUsersAccountDetails,
  updateUsersAccount,
};
