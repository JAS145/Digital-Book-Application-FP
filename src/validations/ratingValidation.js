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
    score: yup.number().min(1).max(5).required(),
    comment: yup.string().required(),
  })
  .noUnknown(`Invalid input`);

const deleteRatingSchema = yup.number({
  id: yup.object({ id: yup.number().required() }).required(),
});

const viewAllRatingSchema = yup
  .object()
  .shape({
    book_id: yup.number().integer().required(),
  })
  .noUnknown(`Invalid input`);

const viewRatingFilterSchema = yup
  .object()
  .shape({
    book_id: yup.number().required(),
    score: yup.number().min(1).max(5).required(),
  })
  .noUnknown(`Invalid input`);

const viewSpecificRatingSchema = yup.number({
  id: yup.object({ id: yup.number().required() }).required(),
});

module.exports = {
  createRatingSchema,
  updateRatingSchema,
  deleteRatingSchema,
  viewAllRatingSchema,
  viewRatingFilterSchema,
  viewSpecificRatingSchema,
};
