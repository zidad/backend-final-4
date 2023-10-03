const { Cart, CartItem } = require('../models');
const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');

// Fetch User's Cart
const fetchCart = asyncWrapper(async (req, res, next) => {
  const userId = 1; // Changed later to fetch from the jwt token
  console.log('Fetching Cart from userId:' + userId);
  const cart = await Cart.findAll({
    where: { userId: userId },
    include: CartItem,
  });
  if (!cart) {
    console.log('Error Fetching Cart from userId:' + userId);
    return next(createCustomError(`Invalid User`, 403));
  }
  console.log(`Fetching Cart from userId(${userId}) Failed`);
  return res
    .status(200)
    .json({ success: true, message: `Cart successfully Fetched`, data: cart });
});

// Add CartItem to Cart
const addItemToCart = asyncWrapper(async (req, res) => {       // remove next
  const userId = 1; // Changed later to fetch from the jwt token
  const productId = req.body.productId;
  const totalPrice = req.body.totalPrice;
  const quantity = req.body.quantity;
  console.log('Adding Item to Cart with userId: ' + userId);
  // const cart = await Cart.findOne({ where: { userId: userId } });
  const CartItem = new CartItem({
    price: totalPrice,
    quantity: quantity,
    productId: productId,
    // cartId: cartId,
  });

  return res.status(200).json({
    success: true,
    message: `Item Added to Cart Successfully`,
    data: {},
  });
});

const updateItemCart = asyncWrapper(async (req, res) => {   // remove next
  return res.status(200).json({
    success: true,
    message: `Item Updated to Cart Successfully`,
    data: {},
  });
});

const deleteItemCart = asyncWrapper(async (req, res) => {   // remove next
  return res.status(200).json({
    success: true,
    message: `Item Deleted from Cart Successfully`,
    data: {},
  });
});

const deleteAllItemsCart = asyncWrapper(async (req, res) => {    // remove next
  return res.status(200).json({
    success: true,
    message: `All Items Deleted from Cart Successfully`,
    data: {},
  });
});

module.exports = {
  fetchCart,
  addItemToCart,
  updateItemCart,
  deleteItemCart,
  deleteAllItemsCart,
};
