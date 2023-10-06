const express = require('express');
const router = express.Router();


const {
    createWishList,
    getWishLists,
    getWishList,
    updateWishList,
    deleteWishList,
    getWishListProducts
} = require('../controllers/wishListController');

router.get('/', getWishLists);
router.get('/:id', getWishList);
router.post('/', createWishList);
router.put('/:id', updateWishList);
router.delete('/:id', deleteWishList);
router.get('/products/:id', getWishListProducts);


module.exports = router;