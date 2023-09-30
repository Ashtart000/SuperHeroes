const { Router } = require('express');
const FilmController = require('../controllers/film.controller');

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

const filmsRouter = Router();

filmsRouter.post('/', upload.single('filmPoster'), FilmController.createFilm);
filmsRouter.get('/', FilmController.getAllFilms);

module.exports = filmsRouter;