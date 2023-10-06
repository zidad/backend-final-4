// imports
const { Cart, Order, OrderItem } = require('../models');
const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');

/**
 * Fetch the user orders based on the authorized user
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const fetchOrders = asyncWrapper(async (req, res, next) => {
  const userId = 6; // Changed later to fetch from the jwt token

  // logging the process
  console.log('Fetching order from userId:' + userId);

  // fetch the orders related to the user with their items
  const order = await Order.findAll({
    where: {
      userId: userId,
    },
    include: OrderItem,
  });

  // returns error or response based on the order output
  if (!order) {
    console.log('Error Fetching order from userId:' + userId);
    return next(createCustomError(`Invalid User`, 403));
  }
  console.log(`Fetching order from userId(${userId}) Successfully`);
  return res.status(200).json({
    success: true,
    message: `order successfully Fetched`,
    data: order,
  });
});

/**
 * Create new order based on the authorized user
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const createOrder = asyncWrapper(async (req, res, next) => {
  // process logging
  console.log('Creating Order');

  // extracting the body data
  const userId = 6; // Changed later to fetch from the jwt token
  const cartId = Number(req.body.cartId); // Changed later based on requirements
  const { status, date } = req.body;
  const tax = 0;
  const deliveryFee = 12;
  const paymentId = Number(req.body.paymentId);
  const addressId = Number(req.body.addressId);

  // find the cart and the products I want to add to the order
  const cart = await Cart.findByPk(cartId); // cartId is the same as the userId (incase of cartId is changed to multiple)
  const cartItems = await cart.getCartItems();
  // if no cart items found return error
  if (cartItems.length === 0) {
    return next(createCustomError(`Can not Place order on empty cart`, 500));
  }

  // updating the total price of order based on the taxes and delivery fees
  const totalPrice = Number(cart.totalPrice) + tax + deliveryFee;
  // creating the order
  const order = await Order.create({
    totalPrice,
    date,
    status,
    tax,
    deliveryFee,
    paymentId,
    cartId,
    userId,
    addressId,
  });

  // creating the order items
  for (const item of cartItems) {
    await OrderItem.create({
      price: item.price,
      quantity: item.quantity,
      productId: item.productId,
      orderId: order.id,
    });
  }
  // logging process
  console.log('Order created', order.id);
  // response
  res.status(200).json({
    success: true,
    message: `Order created Successfully`,
    data: order,
  });
});

/**
 * Fetch the order details based on the id
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getOrder = asyncWrapper(async (req, res, next) => {
  // fetch id
  const id = Number(req.params.id);

  // fetch order and its related items
  const order = await Order.findByPk(id, { include: OrderItem });

  // exists return response otherwise return error
  if (order) {
    return res.status(200).json({
      success: true,
      message: `Order Fetched Successfully`,
      data: order,
    });
  } else {
    return next(createCustomError(`No Order with id: ${id} is found`, 404));
  }
});

// update the Order
// const updateOrder = asyncWrapper(async (req, res, next) => {
//   const id = Number(req.params.id);

//   const [updatedRowCount] = await Order.update(req.body, { where: { id } });

//   console.log('Updated Row Count: ', updatedRowCount);

//   if (updatedRowCount === 0) {
//     return next(createCustomError(`No Order with id: ${id} is found`, 404));
//   }

//   const updatedOrder = await Order.findByPk(id);
//   console.log('Updated Order: ', updatedOrder.id);
//   res.status(200).json({
//     success: true,
//     message: `Orders Updated Successfully`,
//     data: updatedOrder,
//   });
// });

// delete Order
// const deleteOrder = asyncWrapper(async (req, res, next) => {
//   const id = Number(req.params.id);

//   const deletedRowCount = await Order.destroy({ where: { id } });

//   if (deletedRowCount === 0) {
//     return next(createCustomError(`No Order with id: ${id} is found`, 404));
//   }

//   console.log('Deleted Order : ', deletedRowCount);
//   res
//     .status(200)
//     .json({ success: true, message: 'Order deleted successfully' });
// });

/**
 * cancel a certain error
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 *
 * the function will assign status to cancelled for now
 */
const cancelOrder = asyncWrapper(async (req, res, next) => {
  // extracting body data
  const id = Number(req.params.id);

  // updating the order
  const deletedRowCount = await Order.update(
    { status: 'cancelled' },
    { where: { id } }
  );

  // return error if does not exist
  if (deletedRowCount === 0) {
    return next(createCustomError(`No Order with id: ${id} is found`, 404));
  }
  // logging the process
  console.log('Cancelled Order : ', deletedRowCount);
  // return response
  res
    .status(200)
    .json({ success: true, message: 'Order Cancelled successfully' });
});

//exports
module.exports = {
  fetchOrders,
  createOrder,
  getOrder,
  cancelOrder,
  // updateOrder,
  // deleteOrder,
};
