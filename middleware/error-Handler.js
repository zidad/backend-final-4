const { CustomAPIError } = require("../utils/errors/custome-error")
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).json({ msg: err.message || "Something Wen Wrong" })
}

module.exports = errorHandler