const { CustomAPIError } = require('../utils/errors/custom-error');
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    message: err.message || 'Something Went Wrong',
    error: err,
  });
};

module.exports = errorHandler;
