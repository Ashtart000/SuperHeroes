const { Router } = require('express');
const SuperheroesController = require('../controllers/superheroes.controller');
const checkRole = require('../middlewares/checkRole.mw');

const path = require('path');
const multer = require('multer');
const {STATIC_PATH} = require('../config/path.config');

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

superheroesRouter.post('/', checkRole('admin'), upload.single('superAvatar'), SuperheroesController.createSuperhero)
superheroesRouter.get('/', SuperheroesController.getAllSuperheroes)

module.exports = superheroesRouter;