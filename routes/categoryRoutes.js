const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { categoryValidator } = require('../validators');

const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', categoryValidator.rules(), validate ,addCategory);
router.put('/:id',categoryValidator.optionalRules(), validate, updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
