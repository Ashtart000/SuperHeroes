const { Router } = require('express');
const SuperheroesController = require('../controllers/superheroes.controller');

adminRouter = Router();

adminRouter.get('/superheroes/:heroId', SuperheroesController.getOneHero);

module.exports = adminRouter;