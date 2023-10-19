const { createCustomError } = require('../utils/errors/custom-error');

const isAdmin = (req, res, next) => {
    // Check if the user has the 'admin' role.
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return next(createCustomError('Access denied. You are not an admin.', 403));
};

const isCustomer = (req, res, next) => {
    // Check if the user has the 'customer' role.
    if (req.user && req.user.role === 'customer') {
        return next();
    }
    return next(createCustomError('Access denied. You are not an customer.', 403));
};

const hasAccessToOwnData = (req, res, next) => {
    // Check if the user is trying to access their own data.
    if ((req.params || req.body) && req.user && Number((req.params.id) || Number(req.body.userId)) === Number(req.user.id)) {
        return next();
    }
    return next(createCustomError('Access denied. You do not have permission to access this data.', 403));
};

module.exports = { isAdmin, isCustomer, hasAccessToOwnData };
