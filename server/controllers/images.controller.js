const { Sequelize, Superimage } = require('../models/index');

module.exports.getAllImages = async (req, res, next) => {
    try {
        const allImages = await Superimage.findAll({
            attributes: ['imagePath'],
            order: Sequelize.literal('RANDOM()'),
            limit: 10
        });
        return res.status(200).send(allImages);
    } catch (error) {
        next(error)
    }
}
