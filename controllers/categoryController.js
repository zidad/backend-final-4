const { asyncWrapper } = require("../middleware");
const { createCustomError } = require("../utils/errors/custom-error");

const Category = require("../models/categoryModel");

// Fetch All categories
const getCategories = asyncWrapper(async (req, res, next) => {
  const categories = await Category.findAll();

  if (!categories) {
    console.log("No categories found");
    return next(createCustomError(`No categories found`, 404));
  }

  console.log("Categories successfully fetched");

  res.status(200).json({
    success: true,
    message: `Categories successfully fetched`,
    data: categories,
  });
});

// Fetch One category
const getCategory = asyncWrapper(async (req, res, next) => {
  const categoryId = Number(req.params.id);
  const category = await Category.findByPk(categoryId);

  if (!category) {
    console.log(`Category with ID ${categoryId} not found`);
    return next(createCustomError(`Category not found`, 404));
  }

  console.log(`Category with ID ${categoryId} successfully fetched`);

  res.status(200).json({
    success: true,
    message: `Category successfully fetched`,
    data: category,
  });
});

// Add new Category
const addCategory = asyncWrapper(async (req, res, next) => {
  const { name, imgUrl, isFeatured } = req.body;
  const newCategory = await Category.create({
    name,
    imgUrl,
    isFeatured,
  });

  if (!newCategory) {
    return next(createCustomError(`Error creating the category`, 500));
  }
  console.log("Created Category: ", newCategory?.name);

  res.status(201).json({
    success: true,
    message: `Category created successfully`,
    data: newCategory,
  });
});

// Update Existing Category
const updateCategory = asyncWrapper(async (req, res) => {
  const categoryId = req.params.id;
  const { name, imgUrl, isFeatured } = req.body;

  const updatedCategory = await Category.update(
    { name, imgUrl, isFeatured },
    { where: { id: categoryId } }
  );

  if (updatedCategory[0] === 0) {
    throw createCustomError(`Category not found`, 404);
  }

  res.status(200).json({
    success: true,
    message: `Category updated successfully`,
    data: updatedCategory,
  });
});

// Delete Existing Category
const deleteCategory = asyncWrapper(async (req, res) => {
  const categoryId = req.params.id;

  const deletedCategory = await Category.destroy({
    where: { id: categoryId },
  });

  if (!deletedCategory) {
    throw createCustomError(`Category not found`, 404);
  }

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
