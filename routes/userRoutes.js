const express = require('express');
const router = express.Router();


const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserAddresses,
    getUserRatingReviews,
} = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/addresses/:id', getUserAddresses);
router.get('/ratingreviews/:id', getUserRatingReviews);



module.exports = router;
