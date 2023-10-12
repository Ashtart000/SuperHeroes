const MAX_LIMIT = 50;

module.exports.pagination = async (req, res, next) => {
    try {
        const {query: {limit, offset}} = req;
        if(!limit && !offset) {
            req.pagination = {
                limit: 15,
                offset: 0
            }
        } else {
            req.pagination = {
                limit: limit > MAX_LIMIT || limit <= 0 ? MAX_LIMIT : limit,
                offset: offset < 0 ? 0 : offset
            }
        }

        next();
    } catch (error) {
        next(error);
    }
}