const { Router } = require('express');
const SuperheroesController = require('../controllers/superheroes.controller');
const checkRole = require('../middlewares/checkRole.mw');

const path = require('path');
const multer = require('multer');
const {STATIC_PATH} = require('../config/path.config');
const { pagination } = require('../middlewares/pagination');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, STATIC_PATH)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname}`)
    }
});
const upload = multer({ storage });

const superheroesRouter = Router();

// superheroesRouter.post('/', checkRole('admin'), upload.single('superAvatar'), upload.array('images'), SuperheroesController.createSuperhero);
superheroesRouter.post('/', upload.fields([{name: 'superAvatar', maxCount: 1}, {name: 'images', maxCount: 10}]), SuperheroesController.createSuperhero);
superheroesRouter.post('/images/:heroId', upload.array('images'), SuperheroesController.addImagesToHero);
superheroesRouter.get('/', pagination, SuperheroesController.getAllSuperheroes);
superheroesRouter.get('/today', SuperheroesController.getOneHeroRandom);
superheroesRouter.delete('/:heroId', SuperheroesController.deleteHero);
superheroesRouter.get('/:heroId', SuperheroesController.getOneHero);
superheroesRouter.put('/avatar/:heroId', upload.single('superAvatar'), SuperheroesController.addHeroAvatar);
superheroesRouter.put('/:heroId', SuperheroesController.updateHero);

module.exports = superheroesRouter;