const express = require('express');
const router = express.Router();

const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

// Fetch All categories
router.get('/categories', getCategories);

// Fetch One category
router.get('/categories/:id', getCategory);

// Add new Category
router.post('/categories', addCategory);

// Update Existing Category
router.put('/categories/:id', updateCategory);

// Delete Existing Category
router.delete('/categories/:id', deleteCategory);

module.exports = router;
