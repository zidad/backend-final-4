const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');
const Category = require('../models/categoryModel');

/**
 * Fetches all categories from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getCategories = asyncWrapper(async (req, res, next) => {
  // Fetch all categories from the database
  const categories = await Category.findAll();

  // If no categories are found, log and return a custom error
  if (!categories) {
    console.log('No categories found');
    return next(createCustomError(`No categories found`, 404));
  }

  console.log('Categories successfully fetched');

  // Send a success response with the fetched categories
  res.status(200).json({
    success: true,
    message: `Categories successfully fetched`,
    data: categories,
  });
});

/**
 * Fetches a single category by ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getCategory = asyncWrapper(async (req, res, next) => {
  // Extract category ID from request parameters
  const categoryId = Number(req.params.id);

  // Find the category by ID in the database
  const category = await Category.findByPk(categoryId);

  // If the category is not found, log and return a custom error
  if (!category) {
    console.log(`Category with ID ${categoryId} not found`);
    return next(createCustomError(`Category not found`, 404));
  }

  console.log(`Category with ID ${categoryId} successfully fetched`);

  // Send a success response with the fetched category
  res.status(200).json({
    success: true,
    message: `Category successfully fetched`,
    data: category,
  });
});

/**
 * Adds a new category to the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const addCategory = asyncWrapper(async (req, res, next) => {
  // Destructure properties from the request body
  const { name, imageUrl, isFeatured } = req.body;

  // Create a new category in the database
  const newCategory = await Category.create({
    name,
    imageUrl,
    isFeatured,
  });

  // If there's an error creating the category, return a custom error
  if (!newCategory) {
    return next(createCustomError(`Error creating the category`, 500));
  }

  console.log('Created Category: ', newCategory?.name);

  // Send a success response with the newly created category
  res.status(201).json({
    success: true,
    message: `Category created successfully`,
    data: newCategory,
  });
});

/**
 * Updates an existing category by ID in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateCategory = asyncWrapper(async (req, res) => {
  // Extract category ID from request parameters
  const categoryId = req.params.id;

  // Destructure properties from the request body
  const { name, imgUrl, isFeatured } = req.body;

  // Update the category in the database
  const updatedCategory = await Category.update(
    { name, imgUrl, isFeatured },
    { where: { id: categoryId } }
  );

  // If no rows are updated, throw a custom error
  if (updatedCategory[0] === 0) {
    throw createCustomError(`Category not found`, 404);
  }

  // Send a success response with the updated category
  res.status(200).json({
    success: true,
    message: `Category updated successfully`,
    data: updatedCategory[0],
  });
});

/**
 * Deletes an existing category by ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteCategory = asyncWrapper(async (req, res) => {
  // Extract category ID from request parameters
  const categoryId = req.params.id;

  // Delete the category from the database
  const deletedCategory = await Category.destroy({
    where: { id: categoryId },
  });

  // If the category is not found, throw a custom error
  if (!deletedCategory) {
    throw createCustomError(`Category not found`, 404);
  }

  // Send a success response after deleting the category
  res.status(200).json({
    success: true,
    message: `Category deleted successfully`,
    data: deletedCategory,
  });
});

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
