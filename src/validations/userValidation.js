const yup = require("yup");
const userPostSchema = yup
  .object({
    role_id: yup.number().required(),
    name: yup.string().max(150).required(),
    password: yup
      .string()
      .min(6)
      .max(20)
      .matches(
        RegExp("(.*[a-z].*)"),
        "Password must contain at least one character"
      )
      .matches(
        RegExp("(.*[A-Z].*)"),
        "Password must contain at least 1 uppercase"
      )
      .matches(RegExp("(.*\\d.*)"), "Password must contain at least 1 number")
      .matches(
        RegExp('[!@#$%^&*(),.?":{}|<>]'),
        "Password must contain at least one special character"
      )
      .required(),
    email: yup.string().email().required(),
    username: yup.string().max(150).required(),
    address: yup.string().required(),
    join_date: yup
      .string()
      .matches(
        /^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/,
        "Date must be in format YYYY-MM-DD"
      ),
    phone_number: yup.string().required(),
  })
  .noUnknown(`Invalid input`);

const logInUser = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .noUnknown(`Invalid input`);

const userPutSchema = yup
  .object({
    role_id: yup.number().required(),
    name: yup.string().max(150).required(),
    password: yup
      .string()
      .min(6)
      .max(20)
      .matches(
        RegExp("(.*[a-z].*)"),
        "Password must contain at least one character"
      )
      .matches(
        RegExp("(.*[A-Z].*)"),
        "Password must contain at least 1 uppercase"
      )
      .matches(RegExp("(.*\\d.*)"), "Password must contain at least 1 number")
      .matches(
        RegExp('[!@#$%^&*(),.?":{}|<>]'),
        "Password must contain at least one special character"
      )
      .required(),
    email: yup.string().email().required(),
    username: yup.string().max(150).required(),
    address: yup.string().required(),
    join_date: yup
      .string()
      .matches(
        /^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/,
        "Date must be in format YYYY-MM-DD"
      ),
    phone_number: yup.string().required(),
  })
  .noUnknown(`Invalid input`);
module.exports = {
  userPostSchema,
  logInUser,
  userPutSchema,
};
