const Users = require("./usersDatatype");
const Roles = require("./rolesDatatype");
const Ratings = require("./ratingsDatatype");
const BookAccess = require("./bookAccessDatatype");
const Book = require("./booksDatatype");
// const db = require("../confiq/connection");

const model = {};

model.Users = Users;
model.Roles = Roles;
model.Ratings = Ratings;
model.BookAccess = BookAccess;
model.Book = Book;

//FK CONNECTION FOR ROLES AND USERS TABLES
model.Roles.hasMany(model.Users, {
  foreignKey: "role_id",
  as: "users",
  onUpdate: "CASCADE",
});
model.Users.belongsTo(model.Roles, { foreignKey: "role_id", as: "roles" });

model.Book.hasMany(model.Ratings, {
  foreignKey: "book_id",
  as: "ratings",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
model.Ratings.belongsTo(model.Book, { foreignKey: "book_id", as: "books" });
model.Ratings.belongsTo(model.Users, { foreignKey: "user_id", as: "users" });
model.Book.belongsTo(model.Users, { foreignKey: "user_id", as: "users" });
model.Users.hasMany(model.Book, {
  foreignKey: "user_id",
  as: "users",
  onUpdate: "CASCADE",
});

// Ratings.associate = (model) => {
//   Ratings.belongsTo(model.Book, { foreignKey: "book_id", as: "books" });
//   model.Book.hasMany(Ratings, { foreignKey: "book_id", as: "ratings" });
// };

// //FK CONNECTION FOR USERS AND BOOKS TABLES

// model.Users.hasMany(model.Book, {
//   as: "books",
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
// model.Book.belongsTo(model.Users, { as: "users", foreignKey: "user_id" });

// //FK CONNECTION FOR RATINGS
// //books
// model.Book.hasMany(model.Ratings, {
//   foreignKey: "book_id",
//   as: "ratings",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
// model.Ratings.belongsTo(model.Book, { foreignKey: "book_id", as: "books" });

// // users
// model.Users.hasMany(model.Ratings, {
//   foreignKey: "user_id",
//   as: "ratings",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
// model.Ratings.belongsTo(model.Users, { foreignKey: "user_id", as: "users" });

// // FK CONNECTION FOR BOOK ACCESS
// // books
// model.Book.hasMany(model.BookAccess, {
//   foreignKey: "book_id",
//   as: "book_access",
//   onUpdate: "CASCADE",
// });
// model.Ratings.belongsTo(model.Book, { foreignKey: "book_id", as: "books" });

// // users
// model.Users.hasMany(model.BookAccess, {
//   foreignKey: "user_id",
//   as: "book_access",
//   onUpdate: "CASCADE",
// });
// model.Ratings.belongsTo(model.Users, { foreignKey: "user_id", as: "users" });

// db.sync({ force: false })
//   .then(() => {
//     console.log("Database synchronized successfully");
//     // Start your application or perform other operations
//   })
//   .catch((error) => {
//     console.error("Error synchronizing database:", error);
//     // Handle the error or exit the application
//   });
module.exports = model;
