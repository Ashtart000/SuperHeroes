const { Prediction } = require('../models/');

module.exports.createPrediction = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}

module.exports.deletePrediction = async (req, res, next) => {
    console.log("START PREDICTION DELETE")
    try {
        const { params: {predictionId} } = req;
        const result = await Prediction.destroy({
            where: {
                id: predictionId
            }
        });
        console.log(result)
        if(result > 0) {
            return res.status(200).send({message: 'Успішно видалено'})
        } 
        if(result === 0) {
            return res.status(404).send({message: 'Передбачення не знайдено'})
        }
    } catch (error) {
        next(error)
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