const { Film } = require('../models/index');

module.exports.createFilm = async (req, res, next) => {
    try {
        const { body, file: {filename} } = req;
        const film = await Film.create({...body, imagePath: filename});
        return res.status(201).send(film);
    } catch (error) {
        next(error)
    }
}

module.exports.getAllFilms = async (req, res, next) => {
    try {
        const allFilms = await Film.findAll();
        return res.status(200).send(allFilms);
    } catch (error) {
        next(error)
    }
}