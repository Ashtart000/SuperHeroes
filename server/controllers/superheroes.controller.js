const { Sequelize, Superhero, Film, Power, Superimage, Prediction } = require('../models/index');

const powersToAdd = [{name: 'Intellect'}, {name: 'Detective skills'}, {name: 'Martial arts'}]

const filmsToAdd = [{}]

module.exports.createSuperhero = async (req, res, next) => {
    try {
        const { body, file: {filename}} = req;
        const createdHero = await Superhero.create({...body, imagePath: filename});
        
        const powers = await Power.bulkCreate(powersToAdd);
        const heroPowers = await createdHero.addPowers(powers);
        
        const predictionsToAdd = [
            {superheroId: createdHero.id, description: ''},
            {superheroId: createdHero.id, description: ''},
            {superheroId: createdHero.id, description: ''},
            {superheroId: createdHero.id, description: ''},
            {superheroId: createdHero.id, description: ''},
            {superheroId: createdHero.id, description: ''},
            {superheroId: createdHero.id, description: ''},
            {superheroId: createdHero.id, description: ''},
            {superheroId: createdHero.id, description: ''},
            {superheroId: createdHero.id, description: ''}
        ]

        const predictions = await Prediction.bulkCreate(predictionsToAdd);

        // const heroPredictions = await createdHero.addPredictions(predictions);

        return res.status(201).send({createdHero, heroPowers, predictions});
    } catch (error) {
        next(error)
    }
}

module.exports.getAllSuperheroes = async (req, res, next) => {
    try {
        const allSuperheroes = await Superhero.findAll({
            include: [
                {
                    model: Power,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Superimage,
                    attributes: ['imagePath']
                },
                {
                    model: Film
                }
            ]
        });
        return res.status(200).send(allSuperheroes);
    } catch (error) {
        next(error)
    }
}

module.exports.getOneHeroRandom = async (req, res, next) => {
    try {
        const randomSuperhero = await Superhero.findOne({
            order: Sequelize.literal('RANDOM()'),
            limit: 1,
            include: [
                {
                    model: Prediction,
                    order: Sequelize.literal('RANDOM()'),
                    limit: 1
                }
            ]
        });
        return res.status(200).send(randomSuperhero);
    } catch (error) {
        next(error);
    }
}

module.exports.addImagesToHero = async (req, res, next) => {
    try {
        const {params: {heroId}, files} = req;
        const images = files.map((file) => file.filename);
        const imagesToAdd = images.map(filename => ({ superheroId: heroId, imagePath: filename }));
        console.log(imagesToAdd);
        const heroImages = await Superimage.bulkCreate(imagesToAdd);
        return res.status(200).send(heroImages);

    } catch (error) {
        next(error)
    }
}