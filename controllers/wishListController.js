// Import necessary modules and dependencies
const { WishList, WishListItem } = require('../models');
const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');

/**
 * Creates a new wish list in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const createWishList = asyncWrapper(async (req, res) => {
    // Destructure required properties from the request body
    const { userId } = req.body;

    // Create a new wish list in the database
    const wishList = await WishList.create({
        userId
    });

    // Log the created wish list and send a success response
    console.log('Created wish list: ', wishList?.title);
    res.status(201).json({
        success: true,
        message: 'Wish List created successfully',
        data: wishList,
    });
});

/**
 * Retrieves all wish lists from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getWishLists = asyncWrapper(async (req, res) => {
    // Fetch all wish lists from the database
    const wishLists = await WishList.findAll();

    // Log the successful retrieval and send a response with the wish lists
    console.log('Wish Lists are fetched');
    res.status(200).json({
        success: true,
        message: 'Wish list fetched successfully',
        data: wishLists,
    });
});

// /**
//  * Retrieves a single wish list by ID from the database.
//  * @param {Object} req - Express request object.
//  * @param {Object} res - Express response object.
//  * @param {function} next - Express next middleware function.
//  */
// const getWishList = asyncWrapper(async (req, res, next) => {
//   // Extract wishList ID from request parameters
//   const id = Number(req.params.id);

//   // Find the wish list by ID in the database
//   const wishList = await WishList.findByPk(id);

//   // If the wish list is found, send a success response; otherwise, invoke the next middleware with a custom error
//   if (wishList) {
//     return res.status(200).json({
//       success: true,
//       message: 'Wish list fetched successfully',
//       data: wishList,
//     });
//   } else {
//     return next(createCustomError(`No wish list with id: ${id} is found`, 404));
//   }
// });

/**
 * Retrieves a single wish list by ID from the database along with its wish list items
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getWishList = asyncWrapper(async (req, res, next) => {
    // Extract wish list ID from request parameters
    const id = Number(req.params.id);

    // Find the wish list by ID in the database
    const wishList = await WishList.findByPk(id);

    // If the wish list is found, fetch all wish list items associated with the wishList
    if (wishList) {
        const wishListItem = await WishListItem.findAll({ where: { wishListId: id } });

        // Send a response with wish list and associated wish list items
        return res.status(200).json({
            success: true,
            message: 'Wish List and wish list items fetched successfully',
            data: { wishList, wishListItem },
        });
    } else {
        // If the wish list is not found, invoke the next middleware with a custom error
        return next(createCustomError(`No wish list with id: ${id} is found`, 404));
    }
});


/**
 * Updates a wish list by ID in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const updateWishList = asyncWrapper(async (req, res, next) => {
    // Extract wish list ID from request parameters
    const id = Number(req.params.id);

    // Destructure wish list properties from the request body
    const {
        userId
    } = req.body;

    // Update the wish list in the database
    const [updatedRowCount] = await WishList.update(
        {
            userId
        },
        { where: { id } }
    );

    // If no rows are updated, invoke the next middleware with a custom error; otherwise, fetch the updated wish list and send a success response
    if (updatedRowCount === 0) {
        return next(createCustomError(`No wish list items with id: ${id} is found`, 404));
    }

    const updatedWishList = await WishList.findByPk(id);
    console.log('Updated wish list: ', updatedWishList?.title);
    res.status(200).json({
        success: true,
        message: 'Wish list updated successfully',
        data: updatedWishList,
    });
});

/**
 * Deletes a wish list by ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const deleteWishList = asyncWrapper(async (req, res, next) => {
    // Extract wish list ID from request parameters
    const id = Number(req.params.id);

    // Delete the wish list from the database
    const deletedRowCount = await WishList.destroy({ where: { id } });

    // If no rows are deleted, invoke the next middleware with a custom error; otherwise, log the deletion and send a success response
    if (deletedRowCount === 0) {
        return next(createCustomError(`No wish list with id: ${id} is found`, 404));
    }

    console.log('Deleted wish list: ', deletedRowCount);
    res.status(200).json({
        success: true,
        message: 'Wish List deleted successfully',
    });
});

/**
 * Retrieves all wish lists for a wish list items from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getWishListItems = asyncWrapper(async (req, res, next) => {
    // Extract WishList ID from request parameters
    const wishListId = Number(req.params.id);

    // Find the wish list by ID in the database
    const wishList = await WishList.findByPk(wishListId);

    // If the wish list is not found, invoke the next middleware with a custom error
    if (!wishList) {
        return next(createCustomError(`No wish list with id: ${wishListId} is found`, 404));
    }

    // Fetch all wish list items associated with the wish list
    const wishListItem = await WishListItem.findAll({ where: { wishListId } });

    // Send a response with wish list and associated wish list items
    return res.json({
        success: true,
        message: 'Wish list and wish list item fetched successfully',
        data: { wishList: wishListId, wishListItem: wishListItem },
    });
});

// Export the API functions
module.exports = {
    createWishList,
    getWishLists,
    getWishList,
    updateWishList,
    deleteWishList,
    getWishListItems
};
