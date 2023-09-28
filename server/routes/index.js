const { Router } = require('express');
const filmsRouter = require('./filmsRouter');

const router = Router();

router.use('/films', filmsRouter);

module.exports = router;