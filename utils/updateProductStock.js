const { Cart, Product, OrderItem } = require('../models');

/**
 * Update the availableInStock value for products in the cart.
 * @param {number} cartId - ID of the cart to update.
 */
const updateProductStockInCart = async (cartId) => {
  try {
    // Fetch cart items for the given cartId
    const cart = await Cart.findByPk(cartId, { include: Product });

    if (!cart) {
      throw new Error(`Cart with ID ${cartId} not found.`);
    }

    const cartItems = cart.products;

    // Loop through cart items and update product stock
    for (const cartItem of cartItems) {
      const productId = cartItem.id;
      const quantityInCart = cartItem.cartItem.quantity;

      // Find the product by ID
      const product = await Product.findByPk(productId);

      if (product) {
        // Calculate the new availableInStock value
        const newAvailableInStock = product.availableInStock - quantityInCart;

        // Update the product's availableInStock value in the database
        await Product.update(
          { availableInStock: newAvailableInStock },
          { where: { id: productId } }
        );
      }
    }

    console.log('Product stock in cart updated successfully.');
  } catch (error) {
    console.error('Error updating product stock in cart:', error);
    // Handle the error here, such as logging or sending an error response
  }
};

/**
 * Update the product stock when an order is canceled.
 * @param {Order} order - The canceled order.
 */
const updateProductStockOnOrderCancellation = async (order) => {
  try {
    // Fetch the order items (products) associated with the canceled order
    const orderItems = await OrderItem.findAll({ where: { orderId: order.id } });

    // Restore the product stock by adding the quantities back
    for (const orderItem of orderItems) {
      const productId = orderItem.productId;
      const quantityInOrder = orderItem.quantity;

      // Find the product by ID
      const product = await Product.findByPk(productId);

      if (product) {
        // Calculate the new availableInStock value
        const newAvailableInStock = product.availableInStock + quantityInOrder;

        // Update the product's availableInStock value in the database
        await Product.update(
          { availableInStock: newAvailableInStock },
          { where: { id: productId } }
        );
      }
    }

    console.log('Product stock updated for canceled order: ', order.id);
  } catch (error) {
    console.error('Error updating product stock on order cancellation:', error);
    // Handle the error here, such as logging or sending an error response
  }
};

module.exports = {
  updateProductStockInCart,
  updateProductStockOnOrderCancellation,
};
