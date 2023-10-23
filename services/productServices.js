const { Product, Category, Brand, Discount } = require('../models');
const { development } = require('../config/config');
const { Op } = require('sequelize');

/**
 * Retrieve a product's rating summary, including the total rating and rating count.
 *
 * @param {Product} product - The product for which to retrieve the rating summary.
 * @returns {Promise<{totalRating: number, ratingCount: number}>} An object containing the total rating and rating count.
 */
const getProductRatingSummary = async (product) => {
  const reviews = await product.getRatingReviews();

  const rating = reviews
    ? (reviews
        .map((review) => review.rating)
        .reduce((acc, current) => acc + current, 0) /
        reviews.length /
        5) *
      5
    : 0;
  const totalRating = Math.round(rating * 10) / 10;
  const ratingCount = reviews ? reviews.length : 0;
  return {
    totalRating,
    ratingCount,
  };
};

/**
 * Generate a structured response for a product, including details and rating summary.
 *
 * @param {Product} product - The product for which to generate a response.
 * @returns {Promise<object>} A structured response object containing product details and rating summary.
 */
const generateProductResponse = async (product) => {
  const { totalRating, ratingCount } = await getProductRatingSummary(product);

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    availableInStock: product.availableInStock,
    imageUrl: product.imageUrl,
    category: product.category.name, // Access the category name
    brand: product.brand.name, // Access the brand name
    totalRating,
    ratingCount,
    discount: {
      description: product.discount.description, // Access the discount description
      percentage: product.discount.discountPercentage, // Access the discount percentage
    },
  };
};

/**
 * Fetch a list of products with additional information and rating summaries.
 *
 * @param {object} options - Options for querying products.
 * @returns {Promise<{products: object[], count: number}>} An object containing an array of products and the total count.
 */
const fetchProductsWithCount = async (options) => {
  const products = await Product.findAll({
    ...options,
    include: [
      { model: Category, attributes: ['name'] },
      { model: Brand, attributes: ['name'] },
      { model: Discount, attributes: ['description', 'discountPercentage'] },
    ],
  });
  const count = await Product.count({ where: options.where });

  // Transform the products data to include category name, brand name, and discount description/percentage
  const transformedProducts = products.map(async (product) => {
    // Get the totalRating and ratingCount
    return await generateProductResponse(product);
  });

  //   Wait for all promises to resolve
  const responseData = await Promise.all(transformedProducts);

  return {
    products: responseData,
    count: count,
  };
};

/**
 * Fetch a product by its ID and generate a structured response.
 *
 * @param {number} id - The ID of the product to fetch.
 * @param {object} options - Options for querying the product.
 * @returns {Promise<object>} A structured response object containing product details and rating summary.
 */
const fetchProductById = async (id, options) => {
  const product = await Product.findByPk(id, options);

  return await generateProductResponse(product);
};

const fetchHandPickedProducts = async (options) => {
  const products = await fetchProductsWithCount({
    ...options,
    where: { [Op.lte]: development.handPickedPrice },
  });

  const handPickedProducts = products.filter(
    (product) => product.totalRating >= 4.5
  );

  return handPickedProducts;
};

module.exports = {
  fetchProductsWithCount,
  fetchProductById,
  fetchHandPickedProducts,
};
