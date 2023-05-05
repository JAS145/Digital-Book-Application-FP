const yup = require("yup");

const publishBookSchema = yup
  .object({
    title: yup.string().required(),
    author: yup.string().required(),
    description: yup.string().required(),
    isbn: yup.string().required(),
    publication_date: yup
      .string()
      .matches(
        /^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/,
        "Date must be in format YYYY-MM-DD"
      ),
    category: yup.string().required(),
    price: yup
      .number()
      .mathces(
        /^Rp\s*\d{1,3}(\.\d{3})*,?\s*$/,
        "Please enter the correct price"
      ) //PLEASE CHECK FOR THE PRICE DATA TYPE
      .required(),
    formats: yup.string().required,
    languages: yup.string().required(),
    keywords: yup.string().required,
  })
  .noUnknown(`Invalid input`);

const updateBookSchema = up
  .object({
    title: yup.string().required(),
    author: yup.string().required(),
    description: yup.string().required(),
    isbn: yup.string().required(),
    publication_date: yup
      .string()
      .matches(
        /^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/,
        "Date must be in format YYYY-MM-DD"
      ),
    category: yup.string().required(),
    price: yup
      .number()
      .mathces(
        /^Rp\s*\d{1,3}(\.\d{3})*,?\s*$/,
        "Please enter the correct price"
      )
      .required(),
    formats: yup.string().required,
    languages: yup.string().required(),
    keywords: yup.string().required,
  })
  .noUnknown(`Invalid input`);

const deleteBookSchema = yup.number({
  id: yup.object({ id: yup.number().required() }).required(),
});

// FOR THE PUBLISHER ONLY
const viewAllBookSchema = yup
  .object({
    publisher_id: yup.number().required(),
  })
  .noUnknown(`Invalid input`);

const viewSpecificBookSchema = yup.number({
  id: yup.object({ id: yup.number().required() }).required(),
});

//FOR THE READER/USER
const bookSearchSchema = yup
  .object()
  .shape({
    title: yup.string().trim().min(1).max(255),
    keywords: yup.string().trim().min(1).max(255),
    category: yup.string().trim().min(1).max(255),
  })
  .defined();

module.exports = {
  publishBookSchema,
  updateBookSchema,
  deleteBookSchema,
  viewAllBookSchema,
  viewSpecificBookSchema,
  bookSearchSchema,
};
