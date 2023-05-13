const yup = require("yup");

const bookSchema = yup
  .object()
  .shape({
    user_id: yup.number().required(),
    title: yup.string().required(),
    author: yup
      .string()
      .matches(
        /^[a-zA-Z\s.-]*[a-zA-Z][a-zA-Z\s.-]*$/,
        "Author must be in letters format"
      ),
    description: yup.string().max(255).required(),
    isbn: yup.string().required(),
    publication_date: yup
      .string()
      .matches(
        /^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/,
        "Date must be in format YYYY-MM-DD"
      ),
    category: yup.string().required(),
    price: yup.number().required(),
    formats: yup.string().required(),
    languages: yup.string().required(),
    keywords: yup
      .string()
      .matches(/^[a-zA-Z\s.-]*[a-zA-Z][a-zA-Z\s.-]*$/)
      .required(),
  })
  .noUnknown(`Invalid input`);

const updateBookSchema = yup.number({
  id: yup.object({ id: yup.number().required() }).required(),
});

const deleteBookSchema = yup.number({
  id: yup.object({ id: yup.number().required() }).required(),
});
const viewBookImageSchema = yup.number({
  id: yup.object({ id: yup.number().required() }).required(),
});

const readBookSchema = yup.number({
  bookId: yup.object({ id: yup.number().required() }).required(),
});
const bookAccessSchema = yup
  .object()
  .shape({
    book_id: yup.number().required(),
    user_id: yup.number().required(),
    payment_id: yup.number().required(),
  })
  .noUnknown(`Invalid input`);

// FOR THE PUBLISHER ONLY

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
    search: yup.string().trim().optional(),
  })
  .defined();

module.exports = {
  bookSchema,
  updateBookSchema,
  deleteBookSchema,
  viewSpecificBookSchema,
  viewBookImageSchema,
  readBookSchema,
  bookAccessSchema,
  bookSearchSchema,
};
