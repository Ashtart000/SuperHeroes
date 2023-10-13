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
            const heroPredictions = await Prediction.bulkCreate(predictionToAdd)
        }

        if(typeof body.prediction === 'string') {
            const heroOnePrediction = await Prediction.create({superheroId: createdHero.id, description: body.prediction})
        }
        
        return res.status(201).send({data: createdHero})

    } catch (error) {
        next(error)
    }
}

module.exports.getAllSuperheroes = async (req, res, next) => {
    try {
        const { pagination } = req;
        const allSuperheroes = await Superhero.findAll({
            ...pagination,
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
        
        const heroImages = await Superimage.bulkCreate(imagesToAdd);
        return res.status(200).send(heroImages);

    } catch (error) {
        next(error)
    }
}

module.exports.deleteHero = async (req, res, next) => {
    try {
        const { params: {heroId} } = req;
        const hero = await Superhero.findByPk(heroId);

        const heroWithoutPower = await hero.setPowers(null);
        // console.log(heroWithoutPower)

        const result = await Superhero.destroy({
            where: {
                id: heroId
            }
        });
        if(result > 0) {
            return res.status(200).json({ message: 'Succesfull delete!' });
        } else {
            return res.status(404).json({ message: 'Such hero does not exist!' });
        }  
    } catch (error) {
        next(error)
    }
}

module.exports.getOneHero = async (req, res, next) => {
    try {
        const { params: {heroId} } = req;
        const oneHero = await Superhero.findByPk(heroId, {
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
                    model: Prediction,
                    attributes: ['description']
                }
            ]
        });
        return res.status(200).send(oneHero); 
    } catch (error) {
        next(error)
    }
}

module.exports.addHeroAvatar = async (req, res, next) => {
    try {
        const { params: {heroId}, file: {filename}} = req;
        console.log(filename)
        const [rowCount, [updatedHero]] = await Superhero.update({
            imagePath: filename
        }, {
            where: {
                id: heroId
            },
            returning: true
        })
        return res.send(updatedHero);
    } catch (error) {
        next(error)
    }
}

module.exports.updateHero = async (req, res, next) => {
    try {
        const { params: {heroId}, body } = req;
        const updatedHero = await Superhero.update(body, {
            where: {
                id: heroId
            }
        })
        console.log(updatedHero)
        return res.send(updatedHero);
    } catch (error) {
        next(error)
    }
}