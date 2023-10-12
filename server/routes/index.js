const { Router } = require('express');
const filmsRouter = require('./filmsRouter');
const superheroesRouter = require('./superheroesRouter');
const powersRouter = require('./powersRouter');
const usersRouter = require('./usersRouter');
const imagesRouter = require('./imagesRouter')
const predictionsRouter = require('./predictionsRouter');
const adminRouter = require('./admin');

const router = Router();

router.use('/films', filmsRouter);
router.use('/superheroes', superheroesRouter);
router.use('/powers', powersRouter);
router.use('/users', usersRouter);
router.use('/predictions', predictionsRouter);
router.use('/images', imagesRouter);
router.use('/admin', adminRouter);

module.exports = router;