const { Router } = require('express');
const PowersController = require('../controllers/powers.controller')

powersRouter = Router();

powersRouter.get('/', PowersController.getAllPowers);

module.exports = powersRouter;