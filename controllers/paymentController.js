// imports
const { Payment } = require('../models');
const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');

/**
 * Fetch the payments
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const fetchPayments = asyncWrapper(async (req, res) => {
  // logging process
  console.log('Fetching Payments');
  // fetch all payments
  const payments = await Payment.findAll();

  // return response
  res.status(200).json({
    success: true,
    message: `Payments Fetched Successfully`,
    data: payments,
  });
});

/**
 * Create new payment
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const createPayment = asyncWrapper(async (req, res) => {
  // extract body data
  const { provider, status, type } = req.body;
  // create new payment
  const payment = await Payment.create({
    provider,
    status,
    type,
  });
  // logging process
  console.log('Payment created', payment);

  //return response
  res.status(200).json({
    success: true,
    message: `Payment created Successfully`,
    data: payment,
  });
});

/**
 * fetch a certain payment based on Id
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getPayment = asyncWrapper(async (req, res, next) => {
  // extract id from param
  const id = Number(req.params.id);

  // fetch the payment
  const payment = await Payment.findByPk(id);

  // return success response else error response
  if (payment) {
    return res.status(200).json({
      success: true,
      message: `Payment Fetched Successfully`,
      data: payment,
    });
  } else {
    return next(createCustomError(`No Payment with id: ${id} is found`, 404));
  }
});

/**
 * Update a certain payment based on Id
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const updatePayment = asyncWrapper(async (req, res, next) => {
  // extract required data from request
  const id = Number(req.params.id);
  const { provider, status, type } = req.body;

  // applying the update on payment
  const [updatedRowCount] = await Payment.update(
    { provider, status, type },
    { where: { id } }
  );

  // logging process
  console.log('Updated Row Count: ', updatedRowCount);

  // no payment return error
  if (updatedRowCount === 0) {
    return next(createCustomError(`No Payment with id: ${id} is found`, 404));
  }

  // return success response
  const updatedPayment = await Payment.findByPk(id);
  console.log('Updated Payment: ', updatedPayment);
  res.status(200).json({
    success: true,
    message: `Payments Updated Successfully`,
    data: updatedPayment,
  });
});

/**
 * delete a certain payment based on Id
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const deletePayment = asyncWrapper(async (req, res, next) => {
  // extracting data from the request
  const id = Number(req.params.id);

  // deleting teh payment
  const deletedRowCount = await Payment.destroy({ where: { id } });

  // payment does not exists them return error
  if (deletedRowCount === 0) {
    return next(createCustomError(`No Payment with id: ${id} is found`, 404));
  }

  // logging process
  console.log('Deleted Payment : ', deletedRowCount);
  // return success response
  res
    .status(200)
    .json({ success: true, message: 'Payment deleted successfully' });
});

//exports
module.exports = {
  fetchPayments,
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
};
