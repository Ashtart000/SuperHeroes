const { Router } = require('express');
const PredictionController = require('../controllers/predictions.controller');

const predictionsRouter = Router();

predictionsRouter.get('/', PredictionController.getAllPredictions);
predictionsRouter.put('/:predictionId', PredictionController.updatePrediction);
predictionsRouter.delete('/:predictionId', PredictionController.deletePrediction);
predictionsRouter.post('/:heroId');

module.exports = predictionsRouter;