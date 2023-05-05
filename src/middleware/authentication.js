const jwt = require("jsonwebtoken");
const response = require("../utils/response");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }
  // res.send("Andi");
  // Extract the token from the authorization header

  // jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
  //   if (error) {
  //     return res.send(error);
  //   }
  //   req.user = user;
  //   next();
  // });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.token = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = auth;
