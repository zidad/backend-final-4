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

router.get('/', categoryValidator.queryRules(), validate, getCategories);
router.get('/:id', categoryValidator.queryRules(), validate, getCategory);
router.post('/', categoryValidator.rules(), validate, addCategory);
router.put('/:id', categoryValidator.optionalRules(), validate, updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
