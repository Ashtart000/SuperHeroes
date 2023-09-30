const { Power } = require('../models/index');

module.exports.getAllPowers = async (req, res, next) => {
    try {
        const allPowers = await Power.findAll();
        return res.status(200).send(allPowers);
    } catch (error) {
        next(error)
    }
}