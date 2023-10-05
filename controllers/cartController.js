const { User, Cart, CartItem, Product } = require('../models');
const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');

/**
 * Fetch the user cart based on the authorized user
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const fetchCart = asyncWrapper(async (req, res, next) => {
  const userId = 6; // Changed later to fetch from the jwt token

  // logging the process
  console.log('Fetching Cart from userId:' + userId);

  // Fetching the cart based on the user
  const cart = await Cart.findAll({
    where: {
      userId: userId,
    },
    include: CartItem,
  });

  // If the cart is not found return error
  if (!cart) {
    console.log('Error Fetching Cart from userId:' + userId);
    return next(createCustomError(`Invalid User`, 403));
  }

  // The cart is Fetched and returned in the response
  console.log(`Fetching Cart from userId(${userId}) Successfully`);
  return res.status(200).json({
    success: true,
    message: `Cart successfully Fetched`,
    data: cart,
  });
});

/**
 * Add Product to cart based on the authorized user
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const addItemToCart = asyncWrapper(async (req, res) => {
  // fetch userId from the body
  const userId = 6; // Changed later to fetch from the jwt token
  // Extract data from the body
  const productId = Number(req.body.productId);
  let quantity = Number(req.body.quantity);

  // logging  the process
  console.log('Adding Item to Cart with userId: ' + userId);

  // fetch the user and cart
  const user = await User.findByPk(userId);
  const cart = await user.getCart();

  // fetch all cart items related to the cart
  const cartItems = await cart.getCartItems({
    where: {
      productId: productId,
    },
  });

  // If the cart item already exists then add on its quantity and update the cart totalPrice
  if (cartItems.length > 0 && cartItems[0]) {
    const newTotal =
      Number(cart.totalPrice) + Number(cartItems[0].price * quantity);
    console.log(cart.totalPrice, cartItems[0].price, quantity, newTotal);
    cart.update({
      totalPrice: newTotal,
    });
    quantity += Number(cartItems[0].quantity);
    await cartItems[0].update({
      quantity: quantity,
    });
    return res.status(200).json({
      success: true,
      message: `Item Added to Cart Successfully`,
      data: cartItems[0],
    });
  } else {
    // If the cart item does not exists then add it to cart and update the cart totalPrice
    const fetchedProduct = await Product.findByPk(productId);
    cart.totalPrice =
      Number(cart.totalPrice) + Number(fetchedProduct.price * quantity);
    cart.update({
      totalPrice: cart.totalPrice,
    });
    await CartItem.create({
      price: fetchedProduct.price,
      quantity: quantity,
      productId: fetchedProduct.id,
      cartId: cart.id,
    });
    return res.status(200).json({
      success: true,
      message: `Item Added to Cart Successfully`,
      data: fetchedProduct,
    });
  }
});

/**
 * Add Product to cart based on the authorized user
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const deleteItemCart = asyncWrapper(async (req, res, next) => {
  // fetch body data
  const userId = 6; // Changed later to fetch from the jwt token
  const cartItemId = Number(req.params.id);

  // fetch the user and cart
  const user = await User.findByPk(userId);
  const cart = await user.getCart();
  // logging the process
  console.log('Deleting Item from cart', cart.id);

  // fetch cartItems
  const cartItems = await cart.getCartItems({
    where: {
      id: cartItemId,
    },
  });

  // If the cart item already exists then decrease on its quantity and update the cart totalPrice
  if (cartItems.length > 0 && cartItems[0]) {
    const cartNewTotal = Number(cart.totalPrice) - Number(cartItems[0].price);
    cart.update({
      totalPrice: cartNewTotal,
    });
    if (cartItems[0].quantity > 1) {
      const newQuantity = Number(cartItems[0].quantity) - 1;
      console.log('Decrease product quantity: ', cartItems[0]);
      await cartItems[0].update({
        quantity: newQuantity,
      });
      return res.status(200).json({
        success: true,
        message: 'Product Quantity Decreased successfully',
        data: cartItems[0],
      });
    } else {
      // If the cart item does not exists then delete it to cart and update the cart totalPrice
      await cartItems[0].destroy();
      console.log('Deleted product : ', cartItems[0]);
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        data: cartItems[0],
      });
    }
  } else {
    return next(createCustomError(`Cart Item Does not exists`, 404));
  }
});

/**
 * Add Product to cart based on the authorized user
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const deleteAllItemsCart = asyncWrapper(async (req, res, next) => {
  // fetch body data
  const userId = 6; // Changed later to fetch from the jwt token

  // fetch the user and cart
  const user = await User.findByPk(userId);
  const cart = await user.getCart();

  // fetch the cart items
  const cartItems = await cart.getCartItems();

  // if there is items in the cart delete them all and update cart price to 0
  if (cartItems.length > 0) {
    for (const item of cartItems) {
      item.destroy();
    }
    cart.update({
      totalPrice: 0,
    });
    console.log('Deleted cart id: ', cart.id);
    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: cartItems,
    });
  } else {
    return next(
      createCustomError(`Something Went Wrong While Deleting Cart!`, 500)
    );
  }
});

// exports
module.exports = {
  fetchCart,
  addItemToCart,
  deleteItemCart,
  deleteAllItemsCart,
};
