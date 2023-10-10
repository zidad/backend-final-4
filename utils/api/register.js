const { asyncWrapper } = require('../../middleware');
const { createCustomError } = require('../errors/custom-error');

const express = require('express');
const router = express.Router();

const User = require('../../models/userModel');

router.post('/api/register', asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, mobile, password, dateOfBirth, imageUrl, role } = req.body;

    if (!firstName || !lastName || !email || !mobile || !dateOfBirth || !imageUrl || !password || !role) {
        return next(createCustomError('Please provide all required fields'), 400);
    }

    const alreadyExistsUser = await User.findOne({ where: { email } }).catch((err) => {
        console.log('Error:', err);
    });

    if (alreadyExistsUser) {
        return next(createCustomError(`User with ${email} already exists`), 400);
    }

    const newUser = await User.create({ firstName, lastName, email, mobile, dateOfBirth, password, imageUrl, role });
    const savedUser = await newUser.save().catch((err) => {
        console.log('Error: ', err);
        return next(createCustomError(`Can't register user at the moment`), 400);
    });

    if (savedUser) {
        res.status(200).json({
            success: true,
            message: 'Thanks for registering',
            // data: users,
        });
    }
}));

module.exports = router;
