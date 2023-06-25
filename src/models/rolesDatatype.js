const { DataTypes } = require("sequelize");
const db = require("../confiq/connection");
const Users = require("./usersDatatype");

const Roles = db.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
  },
  {
    // freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Roles;
