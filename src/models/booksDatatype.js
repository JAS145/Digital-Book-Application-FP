const { DataTypes } = require("sequelize");
const User = require("./usersDatatype");
const db = require("../confiq/connection");
// const model = require("./index");

const Book = db.define(
  "books",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    publisher: {
      type: DataTypes.STRING(255),
    },
    isbn: {
      type: DataTypes.STRING(13),
    },
    publication_date: {
      type: DataTypes.DATE,
    },
    category: {
      type: DataTypes.STRING(255),
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    languages: {
      type: DataTypes.STRING(255),
    },
    keywords: {
      type: DataTypes.STRING(255),
    },
    image_url: {
      type: DataTypes.STRING(255),
    },
    file_url: {
      type: DataTypes.STRING(255),
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
  },
  {
    // freezeTableName: true,
    timestamps: false,
  }
);


module.exports = Book;
