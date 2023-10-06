const InvalidDataError = require("./errors/InvalidDataError")

module.exports.errorHandler = (err, req, res, next) => {
    if(err instanceof InvalidDataError) {
        return res.status(400).json({ error: err.message });
    }
}