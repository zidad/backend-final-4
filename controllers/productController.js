const { Product } = require('../models');
const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');
const { Op } = require('sequelize');

// Create a new product in the database
const createProduct = asyncWrapper(async (req, res) => {
  const {
    title,
    description,
    price,
    availableInStock,
    totalRating,
    ratingCount,
  } = req.body;
  const product = await Product.create({
    title,
    description,
    price,
    availableInStock,
    totalRating,
    ratingCount,
  });
  console.log('Created product: ', product?.title);
  res.status(201).json({
    success: true,
    message: `Product created Successfully`,
    data: product,
  });
});

// Get all products from the database
const getProducts = asyncWrapper(async (req, res) => {
  const products = await Product.findAll();
  console.log('Products Are Fetched');
  res.status(200).json({
    success: true,
    message: `Products Fetched Successfully`,
    data: products,
  });
});

// Get a single product by ID from the database
const getProduct = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);

  const product = await Product.findByPk(id);
  console.log('Product: ', product?.firstName);
  if (product) {
    return res.status(200).json({
      success: true,
      message: `Product Fetched Successfully`,
      data: product,
    });
  } else {
    return next(createCustomError(`No product with id: ${id} is found`, 404));
  }
});

// Update a product by ID in the database
const updateProduct = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);

  const {
    title,
    description,
    price,
    availableInStock,
    totalRating,
    ratingCount,
  } = req.body;
  const [updatedRowCount] = await Product.update(
    { title, description, price, availableInStock, totalRating, ratingCount },
    { where: { id } }
  );

  console.log('Updated Row Count: ', updatedRowCount);

  if (updatedRowCount === 0) {
    return next(createCustomError(`No product with id: ${id} is found`, 404));
  }

  const updatedProduct = await Product.findByPk(id);
  console.log('Updated product: ', updatedProduct?.firstName);
  res.status(200).json({
    success: true,
    message: `Products Updated Successfully`,
    data: updatedProduct,
  });
});

// Delete a product by ID from the database
const deleteProduct = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);

  const deletedRowCount = await Product.destroy({ where: { id } });

  if (deletedRowCount === 0) {
    return next(createCustomError(`No product with id: ${id} is found`, 404));
  }

  console.log('Deleted product : ', deletedRowCount);
  res
    .status(200)
    .json({ success: true, message: 'Product deleted successfully' });
});

// Search products by keyword
const searchProducts = asyncWrapper(async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({
      success: false,
      error: 'Keyword parameter is required for search',
    });
  }

  const products = await Product.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${keyword}%` } },
        { description: { [Op.like]: `%${keyword}%` } },
      ],
    },
  });

  console.log(`Products matching keyword '${keyword}': `, products);
  res.status(200).json({
    success: true,
    message: 'Operation successful',
    data: products,
  });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
