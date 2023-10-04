const { User, Cart, CartItem, Product } = require('../models');
const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');

// Fetch User's Cart
const fetchCart = asyncWrapper(async (req, res, next) => {
  const userId = 2; // Changed later to fetch from the jwt token
  console.log('Fetching Cart from userId:' + userId);
  const cart = await Cart.findAll({
    where: {
      userId: userId,
    },
    include: CartItem,
  });
  if (!cart) {
    console.log('Error Fetching Cart from userId:' + userId);
    return next(createCustomError(`Invalid User`, 403));
  }
  console.log(`Fetching Cart from userId(${userId}) Successfully`);
  return res.status(200).json({
    success: true,
    message: `Cart successfully Fetched`,
    data: cart,
  });
});

// Add CartItem to Cart
const addItemToCart = asyncWrapper(async (req, res) => {
  // remove next
  const userId = 2;
  const productId = Number(req.body.productId);
  const totalPrice = Number(req.body.totalPrice);
  let quantity = Number(req.body.quantity);
  console.log('Adding Item to Cart with userId: ' + userId);
  const user = await User.findByPk(userId); // Changed later to fetch from the jwt token
  const cart = await user.getCart();
  console.log(await cart.getCartItems());
  const cartItems = await cart.getCartItems({
    where: {
      productId: productId,
    },
  });
  if (cartItems.length > 0 && cartItems[0]) {
    const oldQuantity = cartItems[0].quantity;
    quantity += oldQuantity;
    cartItems[0].quantity = quantity;
    return res.status(200).json({
      success: true,
      message: `Item Added to Cart Successfully`,
      data: cartItems[0],
    });
  } else {
    const fetchedProduct = await Product.findByPk(productId);
    await CartItem.create({
      price: totalPrice,
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

const updateItemCart = asyncWrapper(async (req, res, next) => {
  const userId = 2;
  const cartItemId = Number(req.params.id);
  const productId = Number(req.body.productId);
  const totalPrice = Number(req.body.totalPrice);
  const quantity = Number(req.body.quantity);
  console.log('Updating Item in Cart with userId: ' + userId);
  // const user = await User.findByPk(userId); // Changed later to fetch from the jwt token
  // const cart = await user.getCart();
  // console.log(await cart.getCartItems());
  // const cartItems = await cart.getCartItems({
  //   where: {
  //     productId: productId
  //   }
  // });
  // if (cartItems.length > 0 && cartItems[0]) {
  //   const oldQuantity = cartItems[0].quantity;
  //   quantity += oldQuantity;
  //   cartItems[0].quantity = quantity;
  //   cartItems[0].totalPrice = totalPrice;
  //   return res.status(200).json({
  //     success: true,
  //     message: `Item Added to Cart Successfully`,
  //     data: cartItems[0],
  //   });
  const [updatedRowCount] = await CartItem.update(
    {
      productId: productId,
      price: totalPrice,
      quantity: quantity,
    },
    {
      where: {
        id: cartItemId,
      },
    }
  );
  if (updatedRowCount === 0) {
    return next(createCustomError(`Cart Item Does not exists`, 404));
  }
  const updatedCartItem = await CartItem.findByPk(cartItemId);
  console.log('Updated address: ', updatedCartItem);
  res.status(200).json({
    success: true,
    message: `Address updated Successfully`,
    data: updatedCartItem,
  });
});

const deleteItemCart = asyncWrapper(async (req, res, next) => {
  // remove next
  const userId = 2;
  const cartItemId = Number(req.params.id);
  const user = await User.findByPk(userId); // Changed later to fetch from the jwt token
  const cart = await user.getCart();
  console.log(await cart.getCartItems());
  const cartItems = await cart.getCartItems({
    where: {
      id: cartItemId,
    },
  });

  if (cartItems.length > 0 && cartItems[0]) {
    await cartItems[0].destroy();
    console.log('Deleted product : ', cartItems[0]);
    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: cartItems[0],
    });
  } else {
    return next(createCustomError(`Cart Item Does not exists`, 404));
  }
});

const deleteAllItemsCart = asyncWrapper(async (req, res, next) => {
  // remove next
  const userId = 2;
  const user = await User.findByPk(userId); // Changed later to fetch from the jwt token
  const cart = await user.getCart();
  console.log(await cart.getCartItems());
  const cartItems = await cart.getCartItems();

  if (cartItems.length > 0) {
    for (const item of cartItems) {
      item.destroy();
    }
    console.log('Deleted cart id: ', cart.id);
    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: cartItems[0],
    });
  } else {
    return next(
      createCustomError(`Something Went Wrong While Deleting Cart!`, 500)
    );
  }
});

module.exports = {
  fetchCart,
  addItemToCart,
  updateItemCart,
  deleteItemCart,
  deleteAllItemsCart,
};
