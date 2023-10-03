const Address = require('../models/addressModel')
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require("../utils/errors/custome-error")



// Create a new address in the database
const createAddress = asyncWrapper(async (req, res) => {
    const { street, postalCode, state, city, userId } = req.body;
    const address = await Address.create({ street, postalCode, state, city, userId });
    console.log('Created address: ', address?.firstName);
    res.status(201).json({ success: true, data: address });
});

// Get all addresses from the database
const getAddresses = asyncWrapper(async (req, res) => {
    const addresses = await Address.findAll();
    console.log("Addresses Are Fetched");
    res.status(200).json({ success: true, data: addresses });
});

// Get a single address by ID from the database
const getAddress = asyncWrapper(async (req, res, next) => {
    const id = Number(req.params.id);

    const address = await Address.findByPk(id);
    console.log('Address: ', address?.firstName);
    if (address) {
        return res.status(200).json({ success: true, data: address });
    } else {
        return next(createCustomError(`No address with id: ${id} is found`, 404));
    }

});


// Update a address by ID in the database
const updateAddress = asyncWrapper(async (req, res, next) => {
    const id = Number(req.params.id);

    const { street, postalCode, state, city, userId } = req.body;
    const [updatedRowCount] = await Address.update(
        { street, postalCode, state, city, userId },
        { where: { id } }
    );

    console.log('Updated Row Count: ', updatedRowCount);

    if (updatedRowCount === 0) {
        return next(createCustomError(`No address with id: ${id} is found`, 404));
    }

    const updatedAddress = await Address.findByPk(id);
    console.log('Updated address: ', updatedAddress?.firstName);
    res.status(200).json({ success: true, data: updatedAddress });
});

// Delete a address by ID from the database
const deleteAddress = asyncWrapper(async (req, res, next) => {
    const id = Number(req.params.id);

    const deletedRowCount = await Address.destroy({ where: { id } });

    if (deletedRowCount === 0) {
        return next(createCustomError(`No address with id: ${id} is found`, 404));
    }

    console.log('Deleted address : ', deletedRowCount);
    res.status(200).json({ success: true, msg: 'Address deleted successfully' });
});


module.exports = {
    createAddress,
    getAddresses,
    getAddress,
    updateAddress,
    deleteAddress,
};
