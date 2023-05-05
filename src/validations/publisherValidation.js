// require("yup-password")(yup);
const yup = require("yup");
const publisherPostSchema = yup
  .object({
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
    email: yup.email().required(),
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

const logInPublisher = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .noUnknown(`Invalid input`);

const publisherDeleteSchema = yup.number({
  id: yup.object({ id: yup.number().required() }).required(),
});

module.exports = {
  publisherPostSchema,
  logInPublisher,
  publisherDeleteSchema,
};
