const { CustomAPIError } = require('../utils/errors/custom-error');
const errorHandler = (err, req, res) => { // remove next
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({
      success: false,
      msg: err.message || 'Something Went Wrong',
      error: err,
    });
};

module.exports = errorHandler;
