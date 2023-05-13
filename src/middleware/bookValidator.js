const deleteValidation = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.params.id);
    return next();
  } catch (error) {
    res
      .status(401)
      .send({ errorName: error.name, errorMessage: error.message });
  }
};

const putValidation = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.params.id);
    return next();
  } catch (error) {
    res.status(401).send({ errorName: error.name, errorMessage: error });
  }
};

const getSpecificValidation = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.params.id);
    return next();
  } catch (error) {
    res
      .status(401)
      .send({ errorName: error.name, errorMessage: error.message });
  }
};
const getBookImage = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.params.id);
    return next();
  } catch (error) {
    res
      .status(401)
      .send({ errorName: error.name, errorMessage: error.message });
  }
};

const getReadBook = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.params.id);
    return next();
  } catch (error) {
    res
      .status(401)
      .send({ errorName: error.name, errorMessage: error.message });
  }
};

const postBookAccess = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { stripUnknown: false, strict: true });
    return next();
  } catch (error) {
    res.status(401).send({ errorName: error.name, errorMessage: error });
  }
};

const bookSearchValidation = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.query, { abortEarly: false });
    return next();
  } catch (error) {
    res.status(401).send({ errorName: error.name, errorMessage: error });
  }
};

module.exports = {
  getSpecificValidation,
  getBookImage,
  getReadBook,
  postBookAccess,
  putValidation,
  deleteValidation,
  bookSearchValidation,
};
