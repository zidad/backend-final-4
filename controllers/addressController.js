// Import necessary modules and dependencies
const { Address } = require('../models');
const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');

/**
 * Creates a new address in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const createAddress = asyncWrapper(async (req, res) => {
  // Destructure required properties from the request body
  const { street, postalCode, state, city, userId } = req.body;

  // Create a new address in the database
  const address = await Address.create({
    street,
    postalCode,
    state,
    city,
    userId,
  });

  // Log the created address and send a success response
  console.log('Created address: ', address);
  res.status(201).json({
    success: true,
    message: 'Address created successfully',
    data: address,
  });
});

/**
 * Retrieves all addresses from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getAddresses = asyncWrapper(async (req, res) => {
  // Fetch all addresses from the database
  const addresses = await Address.findAll();

  // Log the successful retrieval and send a response with the addresses
  console.log('Addresses are fetched');
  res.status(200).json({
    success: true,
    message: `Addresses fetched successfully`,
    data: addresses,
  });
});

/**
 * Retrieves a single address by ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getAddress = asyncWrapper(async (req, res, next) => {
  // Extract address ID from request parameters
  const id = Number(req.params.id);

  // Find the address by ID in the database
  const address = await Address.findByPk(id);

  // If the address is found, send a success response; otherwise, invoke the next middleware with a custom error
  if (address) {
    return res.status(200).json({
      success: true,
      message: `Address fetched successfully`,
      data: address,
    });
  } else {
    return next(createCustomError(`No address with id: ${id} is found`, 404));
  }
});

/**
 * Updates an address by ID in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const updateAddress = asyncWrapper(async (req, res, next) => {
  // Extract address ID from request parameters
  const id = Number(req.params.id);

  // Destructure address properties from the request body
  const { street, postalCode, state, city, userId } = req.body;

  // Update the address in the database
  const [updatedRowCount] = await Address.update(
    { street, postalCode, state, city, userId },
    { where: { id } }
  );

  // If no rows are updated, invoke the next middleware with a custom error; otherwise, fetch the updated address and send a success response
  if (updatedRowCount === 0) {
    return next(createCustomError(`No address with id: ${id} is found`, 404));
  }

  const updatedAddress = await Address.findByPk(id);
  console.log('Updated address: ', updatedAddress);
  res.status(200).json({
    success: true,
    message: `Address updated successfully`,
    data: updatedAddress,
  });
});

/**
 * Deletes an address by ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const deleteAddress = asyncWrapper(async (req, res, next) => {
  // Extract address ID from request parameters
  const id = Number(req.params.id);

  // Delete the address from the database
  const deletedRowCount = await Address.destroy({ where: { id } });

  // If no rows are deleted, invoke the next middleware with a custom error; otherwise, log the deletion and send a success response
  if (deletedRowCount === 0) {
    return next(createCustomError(`No address with id: ${id} is found`, 404));
  }

  console.log('Deleted address: ', deletedRowCount);
  res.status(200).json({
    success: true,
    message: 'Address deleted successfully',
  });
});

// Export the API functions
module.exports = {
  createAddress,
  getAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
};
