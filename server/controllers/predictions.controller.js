const { Prediction } = require('../models/');

module.exports.createPrediction = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports.getAllPredictions = async (req, res, next) => {
    try {
        const allPredictions = await Prediction.findAll();
        return res.status(200).send(allPredictions);
    } catch (error) {
        next(error)
    }
}

module.exports.updatePrediction = async (req, res, next) => {
    try {
        const {body, params: {predictionId}} = req;
        const result = await Prediction.update(body, {
            where: {
                id: predictionId
            }
        });
        return res.status(200).send('Prediction updated');
    } catch (error) {
        next(error);
    }
}