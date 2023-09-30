const { Router } = require('express');
const filmsRouter = require('./filmsRouter');
const superheroesRouter = require('./superheroesRouter');
const powersRouter = require('./powersRouter');

const router = Router();

router.use('/films', filmsRouter);
router.use('/superheroes', superheroesRouter);
router.use('/powers', powersRouter);

module.exports = router;