const { Power, Superhero } = require('../models/index');

module.exports.getAllPowers = async (req, res, next) => {
    try {
        const allPowers = await Power.findAll({
            attributes: ['name']
        });
        return res.status(200).send(allPowers);
    } catch (error) {
        next(error)
    }
}

module.exports.removePowerFromHero = async (req, res, next) => {
    try {
        const { params: {heroId}, body} = req;

        const hero = await Superhero.findByPk(heroId);
        const power = await Power.findOne({
            where: {
                ...body
            }
        })

        const result = await hero.removePower(power)
        if(result > 0) {
            return res.status(200).send({message: 'Успішно видалено'})
        } 
        if(result === 0) {
            return res.status(404).send({message: 'Суперсила не знайдена'})
        }
    } catch (error) {
        next(error)
    }
}

module.exports.addPowersToHero = async (req, res, next) => {
    try {
        const { params: {heroId}, body} = req;
        console.log(body)

        const hero = await Superhero.findByPk(heroId);

        let allPowers = []

        if(Array.isArray(body.newPowers)) {
            console.log(body.newPowers)
            const newPowersToAdd = body.newPowers.map(power => {
                return { name: power }
            })
            const newPowers = await Power.bulkCreate(newPowersToAdd);
            allPowers = [...body.newPowers]
        }

        if(typeof body.newPowers === 'string') {
            const oneNewPower = await Power.create({name: body.newPowers});
            allPowers.push(body.newPowers)
            console.log(oneNewPower)
        }

        console.log(body.powersToAdd)
        if(Array.isArray(body.powersToAdd)) {
            allPowers = [...allPowers, ...body.powersToAdd]
        }

        if(typeof body.powersToAdd === 'string') {
            const powers = body.powers.split(',');
            allPowers.push(body.powersToAdd);
        }

        console.log(allPowers)

        if(allPowers.length > 0) {
            const existPower = await Power.findAll({
                where: {
                    name: allPowers
                }
            });
            const powerToHero = await hero.addPowers(existPower);
            return res.status(200).send(powerToHero);
            console.log(powerToHero)
        }

    } catch (error) {
        next(error)
    }
}