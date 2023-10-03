const express = require('express');
const router = express.Router();


const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserAddresses
} = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/addresses/:id', getUserAddresses);


module.exports = router;
