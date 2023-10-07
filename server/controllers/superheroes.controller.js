const InvalidDataError = require('../errors/InvalidDataError');
const { Sequelize, Superhero, Film, Power, Superimage, Prediction } = require('../models/index');

module.exports.createSuperhero = async (req, res, next) => {
    try {
        const { body, files } = req;

        const existingHero = await Superhero.findOne({
            where: {
                nickname: body.nickname
            }
        })

        if(existingHero) {
            throw new InvalidDataError('Superhero with such name already exists');
        }

        const imagePath = files.superAvatar ? files.superAvatar[0].filename : null;

        const createdHero = await Superhero.create({...body, imagePath});

        let allPowers = []

        if(Array.isArray(body.newPower)) {
            console.log(body.newPower)
            const newPowersToAdd = body.newPower.map(power => {
                return { name: power }
            })
            const newPowers = await Power.bulkCreate(newPowersToAdd);
            allPowers = [...body.newPower]
        }

        if(typeof body.newPower === 'string') {
            const oneNewPower = await Power.create({name: body.newPower});
            allPowers.push(body.newPower)
        }

        if(Array.isArray(body.powers)) {
            const powers = body.powers.split(',');
            allPowers = allPowers.concat(powers);
        }

        if(typeof body.powers === 'string') {
            const powers = body.powers.split(',');
            allPowers.push(...powers);
        }

        allPowers = allPowers.filter(power => power.trim() !== '');

        if(allPowers.length > 0) {
            const existPower = await Power.findAll({
                where: {
                    name: allPowers
                }
            });
            const powerToHero = await createdHero.addPowers(existPower);
        }

        if(files.images) {
            const filenames = files.images.map(image => image.filename);
            const imagesToAdd = filenames.map(filename => ({ superheroId: createdHero.id, imagePath: filename }));
            console.log(imagesToAdd);
            const heroImages = await Superimage.bulkCreate(imagesToAdd);
        }
   
        if(Array.isArray(body.prediction)) {
            console.log('hello from prediction')
            const predictionToAdd = body.prediction.map(prediction => ({superheroId: createdHero.id, description: prediction}))
            const heroPredictions = Prediction.bulkCreate(predictionToAdd)
        }

        if(typeof body.prediction === 'string') {
            const heroOnePrediction = Prediction.create({superheroId: createdHero.id, description: body.prediction})
        }
        
        return res.status(201).send({data: createdHero})

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