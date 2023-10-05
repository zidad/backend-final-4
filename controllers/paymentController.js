// imports
const { Payment } = require('../models');
const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');

// fetch payments
const fetchPayments = asyncWrapper(async (req, res) => {
  console.log('Fetching Payments');
  const payments = await Payment.findAll();
  res.status(200).json({
    success: true,
    message: `Payments Fetched Successfully`,
    data: payments,
  });
});

//  Create Payment
const createPayment = asyncWrapper(async (req, res) => {
  const { provider, status, type } = req.body;
  const payment = await Payment.create({
    provider,
    status,
    type,
  });
  console.log('Payment created', payment);
  res.status(200).json({
    success: true,
    message: `Payment created Successfully`,
    data: payment,
  });
});

// Get payment
const getPayment = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);

  const payment = await Payment.findByPk(id);

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

// update the payment
const updatePayment = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);
  const { provider, status, type } = req.body;

  const [updatedRowCount] = await Payment.update(
    { provider, status, type },
    { where: { id } }
  );

  console.log('Updated Row Count: ', updatedRowCount);

  if (updatedRowCount === 0) {
    return next(createCustomError(`No Payment with id: ${id} is found`, 404));
  }

  const updatedPayment = await Payment.findByPk(id);
  console.log('Updated Payment: ', updatedPayment);
  res.status(200).json({
    success: true,
    message: `Payments Updated Successfully`,
    data: updatedPayment,
  });
});

// delete payment
const deletePayment = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);

  const deletedRowCount = await Payment.destroy({ where: { id } });

  if (deletedRowCount === 0) {
    return next(createCustomError(`No Payment with id: ${id} is found`, 404));
  }

  console.log('Deleted Payment : ', deletedRowCount);
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
