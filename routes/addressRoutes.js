const express = require('express');
const router = express.Router();


const {
    createAddress,
    getAddresses,
    getAddress,
    updateAddress,
    deleteAddress,
} = require('../controllers/addressController');

router.get('/', getAddresses);
router.get('/:id', getAddress);
router.post('/', createAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);


module.exports = router;