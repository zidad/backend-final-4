const { /*Cart,*/ Product, OrderItem, CartItem } = require('../models');

/**
 * Update the availableInStock value for products in the cart.
 * @param {number} cartId - ID of the cart to update.
 */
const updateProductStockInCart = async (cartId) => {
  try {
    // Find all cart items associated with the specified cart and include only the necessary attributes of the Product model
    const cartItems = await CartItem.findAll({
      where: { cartId },
      include: [
        {
          model: Product,
          attributes: ['id', 'availableInStock'],
        },
      ],
    });

    if (cartItems && cartItems.length > 0) {
      // Loop through each cart item and update the stock for the associated product
      for (const cartItem of cartItems) {
        const product = cartItem.product;
        if (product) {
          // Calculate the updated stock based on the quantity in the cart
          const updatedStock = product.availableInStock - cartItem.quantity;

          // Check if the updated stock is not negative
          if (updatedStock >= 0) {
            // Update the stock for the product
            product.availableInStock = updatedStock;
            await product.save(); // Save the changes to the database
          } else {
            // Handle the case where there is not enough stock available
            console.log(`Not enough stock for product ${product.id}`);
            // You can throw an error or handle this situation as needed.
          }
        }
      }
    }
  } catch (error) {
    // Handle any errors that may occur during the update process
    console.error('Error updating product stock in cart:', error);
  }
};

/**
 * Update the product stock when an order is canceled.
 * @param {Order} order - The canceled order.
 */
const updateProductStockOnOrderCancellation = async (order) => {
  try {
    // Find all order items associated with the canceled order
    const orderItems = await OrderItem.findAll({ where: { orderId: order.id } });

    for (const orderItem of orderItems) {
      // Find the associated product
      const product = await Product.findByPk(orderItem.productId);

      if (product) {
        // Calculate the quantity to add back to the product's stock
        const quantityToRestore = orderItem.quantity;

        // Update the product's stock
        product.availableInStock += quantityToRestore;

        // Save the updated product to the database
        await product.save();
      }
    }
  } catch (error) {
    // Handle any errors that may occur during the update process
    console.error('Error updating product stock on order cancellation:', error);
  }

};

module.exports = {
  updateProductStockInCart,
  updateProductStockOnOrderCancellation,
};
