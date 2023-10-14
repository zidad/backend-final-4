const { asyncWrapper } = require('../../middleware');
const { createCustomError } = require('../errors/custom-error');

const express = require('express');
const router = express.Router();

// const User = require('../../models/userModel');
const { User, Cart, WishList } = require('../../models');


router.post('/api/register', asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, mobile, password, dateOfBirth, imageUrl } = req.body;

    if (!firstName || !lastName || !email || !mobile || !dateOfBirth || !imageUrl || !password) {
        return next(createCustomError('Please provide all required fields'), 400);
    }

    const alreadyExistsUser = await User.findOne({ where: { email } }).catch((err) => {
        console.log('Error:', err);
    });

    if (alreadyExistsUser) {
        return next(createCustomError(`User with ${email} already exists`), 400);
    }

    const newUser = await User.create({ firstName, lastName, email, mobile, dateOfBirth, password, imageUrl, role: 'customer' });
    const savedUser = await newUser.save().catch((err) => {
        console.log('Error: ', err);
        return next(createCustomError(`Can't register user at the moment`), 400);
    });

    // Create the cart associated with the user
    const cart = await Cart.findByPk(newUser.id);
    if (!cart) {
        await Cart.create({
            id: newUser.id,
            totalPrice: 0,
            userId: newUser.id,
        });
    }

    // Create the wishlist associated with the user.
    const wishlist = await WishList.findByPk(newUser.id);
    if (!wishlist) {
        await WishList.create({
            userId: newUser.id,
        });
    }

    if (savedUser) {
        res.status(200).json({
            success: true,
            message: 'Thanks for registering',
        });
    }
}));

module.exports = router;
