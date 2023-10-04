const { asyncWrapper } = require("../middleware");
const { createCustomError } = require("../utils/errors/custom-error");

const Brand = require("../models/brandModel");

// Fetch All Brands
const getBrands = asyncWrapper(async (req, res, next) => {
  const brands = await Brand.findAll();

  if (!brands) {
    console.log("No brands found");
    return next(createCustomError(`No brands found`, 404));
  }

  console.log("Brands successfully fetched");

  res.status(200).json({
    success: true,
    message: `Brands successfully fetched`,
    data: brands,
  });
});

// Fetch One Brand
const getBrand = asyncWrapper(async (req, res, next) => {
  const brandId = Number(req.params.id);
  const brand = await Brand.findByPk(brandId);

  if (!brand) {
    console.log(`Brand with ID ${brandId} not found`);
    return next(createCustomError(`Brand not found`, 404));
  }

  console.log(`Brand with ID ${brandId} successfully fetched`);

  res.status(200).json({
    success: true,
    message: `Brand successfully fetched`,
    data: brand,
  });
});

// Add new Brand
const addBrand = asyncWrapper(async (req, res, next) => {
  const { name, imgUrl } = req.body;
  const newBrand = await Brand.create({
    name,
    imgUrl,
  });

  if (!newBrand) {
    return next(createCustomError(`Error creating the brand`, 500));
  }
  console.log("Created Brand: ", newBrand?.name);

  res.status(201).json({
    success: true,
    message: `Brand created successfully`,
    data: newBrand,
  });
});

// Update Existing Brand
const updateBrand = asyncWrapper(async (req, res) => {
  const brandId = req.params.id;
  const { name, imgUrl } = req.body;

  const updatedBrand = await Brand.update(
    { name, imgUrl },
    { where: { id: brandId } }
  );

  if (updatedBrand[0] === 0) {
    throw createCustomError(`Brand not found`, 404);
  }

  res.status(200).json({
    success: true,
    message: `Brand updated successfully`,
    data: updatedBrand,
  });
});

// Delete Existing Brand
const deleteBrand = asyncWrapper(async (req, res) => {
  const brandId = req.params.id;

  const deletedBrand = await Brand.destroy({
    where: { id: brandId },
  });

  if (!deletedBrand) {
    throw createCustomError(`Brand not found`, 404);
  }

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
