// imports
const { Cart, Order, OrderItem } = require('../models');
const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');

// Fetch User's Orders
const fetchOrders = asyncWrapper(async (req, res, next) => {
  const userId = 2; // Changed later to fetch from the jwt token
  console.log('Fetching order from userId:' + userId);
  const cart = await Order.findAll({
    where: {
      userId: userId,
    },
    include: OrderItem,
  });
  if (!cart) {
    console.log('Error Fetching order from userId:' + userId);
    return next(createCustomError(`Invalid User`, 403));
  }
  console.log(`Fetching order from userId(${userId}) Successfully`);
  return res.status(200).json({
    success: true,
    message: `order successfully Fetched`,
    data: cart,
  });
});

//  Create Order
const createOrder = asyncWrapper(async (req, res, next) => {
  console.log('Creating Order');
  const userId = 6;
  const { status } = req.body;
  const tax = Number(req.body.tax);
  const deliveryFee = Number(req.body.deliveryFee);
  const paymentId = Number(req.body.paymentId);
  const cartId = Number(req.body.cartId);
  const addressId = Number(req.body.addressId);

  const cart = await Cart.findByPk(cartId); // cartId is the same as the userId (incase of cartId is changed to multiple)
  const cartItems = await cart.getCartItems();
  if (cartItems.length === 0) {
    return next(createCustomError(`Can not Place order on empty cart`, 500));
  }
  const totalPrice = Number(cart.totalPrice) + tax + deliveryFee;
  const order = await Order.create({
    totalPrice,
    status,
    tax,
    deliveryFee,
    paymentId,
    cartId,
    userId,
    addressId,
  });

  for (const item of cartItems) {
    await OrderItem.create({
      price: item.price,
      quantity: item.quantity,
      productId: item.productId,
      orderId: order.id,
    });
  }

  console.log('Order created', order.id);
  res.status(200).json({
    success: true,
    message: `Order created Successfully`,
    data: order,
  });
});

// Get Order
const getOrder = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);

  const order = await Order.findByPk(id);

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
const updateOrder = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);

  const [updatedRowCount] = await Order.update(req.body, { where: { id } });

  console.log('Updated Row Count: ', updatedRowCount);

  if (updatedRowCount === 0) {
    return next(createCustomError(`No Order with id: ${id} is found`, 404));
  }

  const updatedOrder = await Order.findByPk(id);
  console.log('Updated Order: ', updatedOrder.id);
  res.status(200).json({
    success: true,
    message: `Orders Updated Successfully`,
    data: updatedOrder,
  });
});

// delete Order
const deleteOrder = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);

  const deletedRowCount = await Order.destroy({ where: { id } });

  if (deletedRowCount === 0) {
    return next(createCustomError(`No Order with id: ${id} is found`, 404));
  }

  console.log('Deleted Order : ', deletedRowCount);
  res
    .status(200)
    .json({ success: true, message: 'Order deleted successfully' });
});

//exports
module.exports = {
  fetchOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
