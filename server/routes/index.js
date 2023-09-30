const { Router } = require('express');
const filmsRouter = require('./filmsRouter');
const superheroesRouter = require('./superheroesRouter');
const powersRouter = require('./powersRouter');
const usersRouter = require('./usersRouter');

const router = Router();

router.use('/films', filmsRouter);
router.use('/superheroes', superheroesRouter);
router.use('/powers', powersRouter);
router.use('/users', usersRouter);

module.exports = router;