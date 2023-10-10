const express = require('express');
const router = express.Router();

const { User } = require('../../models');
const { asyncWrapper } = require('../../middleware');
const { createCustomError } = require('../errors/custom-error');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');


router.post('/api/login', asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    console.log('Received email:', email);
    console.log('Received password:', password);

    const userEmail = await User.findOne({ where: { email } });

    if (!userEmail) {
        return next(createCustomError('Email or password does not match!', 400));
    }

    if (userEmail.password !== password) {
        return next(createCustomError('Email or password does not match!', 400));
    }

    const jwToken = jwt.sign({ id: userEmail.id, email: userEmail.email }, config.development.jwt_secret);

    res.status(200).json({
        success: true,
        message: `Welcome Back ${userEmail.firstName}!`,
        data: jwToken
    });
}));

module.exports = router;
