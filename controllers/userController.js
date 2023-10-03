const User = require('../models/userModel')
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require("../utils/errors/custome-error")
const Address = require('../models/addressModel')

// Create a new user in the database
const createUser = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, mobile, dateOfBirth, password } = req.body;
    const exists = await User.findOne({ where: { email } })
    if (!exists) {
        const user = await User.create({ firstName, lastName, email, mobile, dateOfBirth, password });
        // To-DO small letters
        console.log('Created user: ', user?.firstName);
        return res.status(201).json({ success: true, data: user });
    } else {
        return next(createCustomError(`email ${email} is already exist`, 400));
    }
});

// Get all users from the database
const getUsers = asyncWrapper(async (req, res) => {
    const users = await User.findAll();
    console.log("Users Are Fetched");
    res.status(200).json({ success: true, data: users })
});

// Get a single user by ID from the database
const getUser = asyncWrapper(async (req, res, next) => {
    const id = Number(req.params.id);

    const user = await User.findByPk(id);
    console.log('User: ', user?.firstName);
    if (user) {
        return res.status(200).json({ success: true, data: user });
    } else {
        return next(createCustomError(`No user with id: ${id} is found`, 404));
    }

});


// Update a user by ID in the database
const updateUser = asyncWrapper(async (req, res, next) => {
    const id = Number(req.params.id);

    const { firstName, lastName, email, mobile, dateOfBirth, password } = req.body;
    const [updatedRowCount] = await User.update(
        { firstName, lastName, email, mobile, dateOfBirth, password },
        { where: { id } }
    );

    console.log('Updated Row Count: ', updatedRowCount);

    if (updatedRowCount === 0) {
        return next(createCustomError(`No user with id: ${id} is found`, 404));
    }

    const updatedUser = await User.findByPk(id);
    console.log('Updated user: ', updatedUser?.firstName);
    res.status(200).json({ success: true, data: updatedUser });
});

// Delete a user by ID from the database
const deleteUser = asyncWrapper(async (req, res, next) => {
    const id = Number(req.params.id);

    const deletedRowCount = await User.destroy({ where: { id } });

    if (deletedRowCount === 0) {
        return next(createCustomError(`No user with id: ${id} is found`, 404));
    }

    console.log('Deleted user : ', deletedRowCount);
    res.status(200).json({ success: true, msg: 'User deleted successfully' });
});

// Get all addresses for the user from the database
const getUserAddresses = asyncWrapper(async (req, res, next) => {
    const userId = Number(req.params.id);

    const user = await User.findByPk(userId);

    if (!user) {
        return next(createCustomError(`No user with id: ${userId} is found`, 404));
    }

    const address = await Address.findAll({ where: { userId } });
    return res.json({ userId, address });
});

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserAddresses
};