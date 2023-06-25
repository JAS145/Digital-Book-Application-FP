const { DataTypes } = require("sequelize");
const db = require("../confiq/connection");
const model = require("./index");

const Ratings = db.define(
  "Ratings",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.DECIMAL(10, 1),
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },

  {
    timestamps: false,
    tableName: "ratings",
    indexes: [
      {
        unique: true,
        fields: ["book_id", "user_id"],
      },
    ],
  }
);

module.exports = Ratings;
