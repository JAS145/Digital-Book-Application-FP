const { DataTypes } = require("sequelize");
const db = require("../confiq/connection");
const Role = require("./rolesDatatype");
const Sequelize = require("sequelize");
const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
      onUpdate: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      bcrypt: {
        rounds: 10,
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    join_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
  },
  {
    Sequelize,
    modelName: "Users",
    timestamps: false,
  }
);

module.exports = Users;
