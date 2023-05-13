const rateLimit = require("express-rate-limit");

const ratingLimiter = rateLimit({
  windowMs: 500 * 60 * 60 * 1000,
  max: 1,
  skipSuccesfulRequests: false,
  message: { errormessage: "You have already input your rating." },
});

module.exports = {
  ratingLimiter,
};
