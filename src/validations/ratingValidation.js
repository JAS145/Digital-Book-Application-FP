const yup = require("yup");

const createRatingSchema = yup
  .object({
    book_id: yup.number().required(),
    user_id: yup.number().required(),
    score: yup.number().min(1).max(5).required(),

    comment: yup.string().required(),
  })
  .noUnknown(`Invalid input`);

const updateRatingSchema = yup
  .object({
    book_id: yup.number().required(),
    user_id: yup.number().required(),
    score: yup
      .number()
      .mathces(/^[-+]?[0-9]+\.[0-9]+$/, "Score should be floating number")
      .required(), // PLEASE CHECK LATER ABOUT THE MESSAGE
    price: yup.string().required(),
    comment: yup.string().required(),
  })
  .noUnknown(`Invalid input`);

// const deleteRatingSchema = yup.number({
//   id: yup.object({ id: yup.number().required() }).required(),
// });

const viewAllRatingSchema = yup
  .object({
    book_id: yup.number().required(),
  })
  .noUnknown(`Invalid input`);

const viewSpecificRatingSchema = yup
  .object({
    book_id: yup.number().required(),
    score: yup.number().min(1).max(5).required(),
  })
  .noUnknown(`Invalid input`);

module.exports = {
  createRatingSchema,
  updateRatingSchema,
  // deleteRatingSchema,
  viewAllRatingSchema,
  viewSpecificRatingSchema,
};
