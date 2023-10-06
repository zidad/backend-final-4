const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');
const Brand = require('../models/brandModel');

/**
 * Fetches all brands from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getBrands = asyncWrapper(async (req, res, next) => {
  // Fetch all brands from the database
  const brands = await Brand.findAll();

  // If no brands are found, log and return a custom error
  if (!brands) {
    console.log('No brands found');
    return next(createCustomError(`No brands found`, 404));
  }

  console.log('Brands successfully fetched');

  // Send a success response with the fetched brands
  res.status(200).json({
    success: true,
    message: `Brands successfully fetched`,
    data: brands,
  });
});

/**
 * Fetches a single brand by ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getBrand = asyncWrapper(async (req, res, next) => {
  // Extract brand ID from request parameters
  const brandId = Number(req.params.id);

  // Find the brand by ID in the database
  const brand = await Brand.findByPk(brandId);

  // If the brand is not found, log and return a custom error
  if (!brand) {
    console.log(`Brand with ID ${brandId} not found`);
    return next(createCustomError(`Brand not found`, 404));
  }

  console.log(`Brand with ID ${brandId} successfully fetched`);

  // Send a success response with the fetched brand
  res.status(200).json({
    success: true,
    message: `Brand successfully fetched`,
    data: brand,
  });
});

/**
 * Adds a new brand to the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const addBrand = asyncWrapper(async (req, res, next) => {
  // Destructure properties from the request body
  const { name, imageUrl } = req.body;

  // Create a new brand in the database
  const newBrand = await Brand.create({
    name,
    imageUrl,
  });

  // If there's an error creating the brand, return a custom error
  if (!newBrand) {
    return next(createCustomError(`Error creating the brand`, 500));
  }

  console.log('Created Brand: ', newBrand?.name);

  // Send a success response with the newly created brand
  res.status(201).json({
    success: true,
    message: `Brand created successfully`,
    data: newBrand,
  });
});

/**
 * Updates an existing brand by ID in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateBrand = asyncWrapper(async (req, res) => {
  // Extract brand ID from request parameters
  const brandId = req.params.id;

  // Destructure properties from the request body
  const { name, imgUrl } = req.body;

  // Update the brand in the database
  const updatedBrand = await Brand.update(
    { name, imgUrl },
    { where: { id: brandId } }
  );

  // If no rows are updated, throw a custom error
  if (updatedBrand[0] === 0) {
    throw createCustomError(`Brand not found`, 404);
  }

  // Send a success response with the updated brand
  res.status(200).json({
    success: true,
    message: `Brand updated successfully`,
    data: updatedBrand,
  });
});

/**
 * Deletes an existing brand by ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteBrand = asyncWrapper(async (req, res) => {
  // Extract brand ID from request parameters
  const brandId = req.params.id;

  // Delete the brand from the database
  const deletedBrand = await Brand.destroy({
    where: { id: brandId },
  });

  // If the brand is not found, throw a custom error
  if (!deletedBrand) {
    throw createCustomError(`Brand not found`, 404);
  }

  // Send a success response after deleting the brand
  res.status(200).json({
    success: true,
    message: `Brand deleted successfully`,
    data: deletedBrand,
  });
});

module.exports = {
  getBrands,
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,
};
