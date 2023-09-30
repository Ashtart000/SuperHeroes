const { Superhero, Film, Power, Superimage } = require('../models/index');

const powersToAdd = [{name: 'Agility'}, {name: 'Strength'}, {name: 'Speed'}, {name: 'Lasso of Truth'}]

module.exports.createSuperhero = async (req, res, next) => {
    try {
        const { body, file: {filename}} = req;
        const createdHero = await Superhero.create({...body, imagePath: filename});
        
        const powers = await Power.bulkCreate(powersToAdd);

        const heroWithPowers = await createdHero.addPowers(powers);

        return res.status(201).send(heroWithPowers);
    } catch (error) {
        next(error)
    }
}

module.exports.getAllSuperheroes = async (req, res, next) => {
    try {
        const allSuperheroes = await Superhero.findAll({
            include: [
                {
                    model: Power
                },
                {
                    model: Superimage
                }
            ]
        });
        return res.status(200).send(allSuperheroes);
    } catch (error) {
        next(error)
    }
}