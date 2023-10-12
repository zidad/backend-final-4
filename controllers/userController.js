// Import necessary modules and dependencies
const { Cart, WishList, User, Address, RatingReview } = require('../models');
const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');

/**
 * Creates a new user in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const createUser = asyncWrapper(async (req, res, next) => {
  // Destructure required properties from the request body
  const {
    firstName,
    lastName,
    email,
    mobile,
    dateOfBirth,
    password,
    imageUrl,
  } = req.body; // change to let

  // // Convert first name and last name to lowercase
  // firstName = firstName.toLowerCase();
  // lastName = lastName.toLowerCase();

  // Check if the user with the provided email already exists
  const exists = await User.findOne({ where: { email: email } });

  // If the user doesn't exist, create a new user; otherwise, return a custom error
  if (!exists) {
    const user = await User.create({
      firstName,
      lastName,
      email,
      mobile,
      dateOfBirth,
      password,
      imageUrl,
    });

    // Log the created user and send a success response
    console.log('Created user: ', user?.firstName);

    // Create the cart associated with the user
    const cart = await Cart.findByPk(user.id);
    if (!cart) {
      await Cart.create({
        id: user.id,
        totalPrice: 0,
        userId: user.id,
      });
    }

    // Create the wishlist associated with the user.
    const wishlist = await WishList.findByPk(user.id);
    if (!wishlist) {
      await WishList.create({
        userId: user.id,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } else {
    return next(createCustomError(`Email ${email} already exists`, 400));
  }
});

/**
 * Retrieves all users from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getUsers = asyncWrapper(async (req, res) => {
  // Fetch all users from the database
  const users = await User.findAll();

  // Log the successful retrieval and send a response with the users
  console.log('Users are fetched');
  res.status(200).json({
    success: true,
    message: 'Users fetched successfully',
    data: users,
  });
});

/**
 * Retrieves a single user by ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getUser = asyncWrapper(async (req, res, next) => {
  // Extract user ID from request parameters
  const id = Number(req.params.id);

  // Find the user by ID in the database
  const user = await User.findByPk(id);

  // If the user is found, send a success response; otherwise, invoke the next middleware with a custom error
  if (user) {
    return res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } else {
    return next(createCustomError(`No user with id: ${id} is found`, 404));
  }
});

/**
 * Updates a user by ID in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const updateUser = asyncWrapper(async (req, res, next) => {
  // Extract user ID from request parameters
  const id = Number(req.params.id);

  // Destructure user properties from the request body
  const {
    firstName,
    lastName,
    email,
    mobile,
    dateOfBirth,
    password,
    imageUrl,
  } = req.body;

  // Update the user in the database
  const [updatedRowCount] = await User.update(
    { firstName, lastName, email, mobile, dateOfBirth, password, imageUrl },
    { where: { id } }
  );

  // If no rows are updated, invoke the next middleware with a custom error; otherwise, fetch the updated user and send a success response
  if (updatedRowCount === 0) {
    return next(createCustomError(`No user with id: ${id} is found`, 404));
  }

  const updatedUser = await User.findByPk(id);
  console.log('Updated user: ', updatedUser?.firstName);
  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
});

/**
 * Deletes a user by ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const deleteUser = asyncWrapper(async (req, res, next) => {
  // Extract user ID from request parameters
  const id = Number(req.params.id);

  // Delete the user from the database
  const deletedRowCount = await User.destroy({ where: { id } });

  // If no rows are deleted, invoke the next middleware with a custom error; otherwise, log the deletion and send a success response
  if (deletedRowCount === 0) {
    return next(createCustomError(`No user with id: ${id} is found`, 404));
  }

  console.log('Deleted user: ', deletedRowCount);
  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});

/**
 * Retrieves all addresses for a user from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getUserAddresses = asyncWrapper(async (req, res, next) => {
  // Extract user ID from request parameters
  const userId = Number(req.params.id);

  // Find the user by ID in the database
  const user = await User.findByPk(userId);

  // If the user is not found, invoke the next middleware with a custom error
  if (!user) {
    return next(createCustomError(`No user with id: ${userId} is found`, 404));
  }

  // Fetch all addresses associated with the user
  const addresses = await Address.findAll({ where: { userId } });

  // Send a response with user and associated addresses
  return res.json({
    success: true,
    message: 'User and addresses fetched successfully',
    data: { user: userId, addresses: addresses },
  });
});

/**
 * Retrieves all ratingReviews for a user from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getUserRatingReviews = asyncWrapper(async (req, res, next) => {
  // Extract user ID from request parameters
  const userId = Number(req.params.id);

  // Find the user by ID in the database
  const user = await User.findByPk(userId);

  // If the user is not found, invoke the next middleware with a custom error
  if (!user) {
    return next(createCustomError(`No user with id: ${userId} is found`, 404));
  }

  // Fetch all ratingReviews associated with the user
  const ratingReviews = await RatingReview.findAll({ where: { userId } });

  // Send a response with user and associated ratingReviews
  return res.json({
    success: true,
    message: 'User and RatingReview fetched successfully',
    data: { user: userId, ratingReviews: ratingReviews },
  });
});

// Export the API functions
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserAddresses,
  getUserRatingReviews,
};
