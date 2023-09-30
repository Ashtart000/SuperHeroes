const { Superhero, Film, Power, Superimage } = require('../models/index');

const powersToAdd = [{name: 'Agility'}, {name: 'Strength'}, {name: 'Speed'}, 
{name: 'Durability'}, {name: 'Flight'}, {name: 'Heat vision'}, {name: 'Ice breath'}, 
{name: 'X-ray vision'}]

const filmsToAdd = [{}]

module.exports.createSuperhero = async (req, res, next) => {
    try {
        const { body, file: {filename}} = req;
        const createdHero = await Superhero.create({...body, imagePath: filename});
        
        const powers = await Power.bulkCreate(powersToAdd);

        const heroWithPowers = await createdHero.addPowers(powers);

        return res.status(201).send({createdHero, heroWithPowers});
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