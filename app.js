require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const book = require("./src/route/book");
const rating = require("./src/route/rating");
const user = require("./src/route/user");
const PORT = process.env.PORT || 5000;

app.use("/book", book);
app.use("/rating", rating);
app.use("/user", user);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
