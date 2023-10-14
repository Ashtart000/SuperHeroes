const { Router } = require('express');
const PowersController = require('../controllers/powers.controller')

powersRouter = Router();

powersRouter.get('/', PowersController.getAllPowers);
powersRouter.delete('/remove/:heroId', PowersController.removePowerFromHero);
powersRouter.post('/add/:heroId', PowersController.addPowersToHero);

module.exports = powersRouter;