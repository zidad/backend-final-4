// Import necessary modules and dependencies
const { WishList, WishListItem, User } = require('../models');
const { asyncWrapper } = require('../middleware');
const { createCustomError } = require('../utils/errors/custom-error');


/**
 * Fetch the user cart based on the authorized user
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const fetchWishList = asyncWrapper(async (req, res, next) => {
    const userId = req.body.userId; // Changed later to fetch from the jwt token  // origin
    // const userId = req.params.id; // Changed later to fetch from the jwt token

    // logging the process
    console.log('Fetching wish list from userId:' + userId);

    // Fetching the WishList based on the user
    const wishList = await WishList.findAll({
        where: {
            userId: userId,
        },
        include: WishListItem,
    });

    // If the cart is not found return error
    if (!wishList) {
        console.log('Error Fetching wish list from userId:' + userId);
        return next(createCustomError(`Invalid User`, 403));
    }

    // The wish list is Fetched and returned in the response
    console.log(`Fetching wish list from userId(${userId}) Successfully`);
    return res.status(200).json({
        success: true,
        message: `Wish list successfully Fetched`,
        data: wishList,
    });
});

/**
 * Add a product in the user's wish list.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const addItemToWishList = asyncWrapper(async (req, res, next) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return next(createCustomError('userId and productId are required in the request body', 400));
    }

    // Fetch the user from the user id from the body
    const user = await User.findByPk(userId);

    if (!user) {
        return next(createCustomError('User not found', 404));
    }

    // Get his wishlist (optional)
    let wishList = await user.getWishList();

    // If the user doesn't have a wishlist, create a new one
    if (!wishList) {
        wishList = await WishList.create();
        await user.setWishList(wishList);
    }

    // Check if the product already exists in the wish list
    const existProduct = await WishListItem.findOne({
        where: {
            wishListId: wishList ? wishList.id : null,
            productId: productId,
        },
    });

    // If the product already exists, return a response
    if (existProduct) {
        return next(createCustomError('Product already exists in wishlist', 200));
    }

    // Create a new WishList item and pass the userId and productId for it
    const wishListItem = await WishListItem.create({
        wishListId: wishList ? wishList.id : null,
        productId: productId,
    });

    return res.status(200).json({
        success: true,
        message: 'Product added to wishlist',
        data: wishListItem,
    });
});


/**
 * Remove a product from the user's wish list.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const removeItemFromWishList = asyncWrapper(async (req, res, next) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return next(createCustomError('userId and productId are required in the request body', 400));
    }

    // Fetch the user from the user id from the body
    const user = await User.findByPk(userId);

    if (!user) {
        return next(createCustomError('User not found', 404));
    }

    // Get his wishlist (optional)
    const wishList = await user.getWishList();

    // Check if the product exists in the wish list
    const existingWishListItem = await WishListItem.findOne({
        where: {
            wishListId: wishList ? wishList.id : null,
            productId: productId,
        },
    });

    // If the product doesn't exist, return a response
    if (!existingWishListItem) {
        return next(createCustomError('Product not found in wishlist', 404));
    }

    // Remove the product from the wishlist
    await existingWishListItem.destroy();

    return res.status(200).json({
        success: true,
        message: 'Product removed from wishlist',
        // data: wishList,
    });
});

/**
 * Delete all products in the wish list.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteWishListProducts = asyncWrapper(async (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
        return next(createCustomError('userId is required in the request body', 400));
    }

    // Fetch the user from the user id from the body
    const user = await User.findByPk(userId);

    if (!user) {
        return next(createCustomError('User not found', 404));
    }

    // Get his wishlist (optional)
    const wishList = await user.getWishList();

    // If the wishlist exists, delete all its products
    if (wishList) {
        await WishListItem.destroy({
            where: {
                wishListId: wishList.id,
            },
        });


        return res.status(200).json({
            success: true,
            message: 'All products in wishlist deleted successfully',
            // data: wishList,
        });
    }

    return next(createCustomError('Wishlist not found', 404));
});

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
    fetchWishList,
    addItemToWishList,
    removeItemFromWishList,
    deleteWishListProducts,
    createWishList,
    getWishListItems,
};
