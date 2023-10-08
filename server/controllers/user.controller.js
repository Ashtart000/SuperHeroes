const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (id, name, email, role) => {
    return jwt.sign(
        {id, name, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

module.exports.registration = async (req, res, next) => {
    try {
        const { body } = req;
        console.log(body);

        const hashPassword = await bcrypt.hash(body.password, 5);
        const user = await User.create({ ...body, password: hashPassword });

        const token = createToken(user.id, user.name, user.email, user.role);
        return res.json({token});
    } catch (error) {
        next(error)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw new Error('Користувач не знайден');
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            throw new Error ('Указан неверный пароль')
        }
        const token = createToken(user.id, user.name, user.email, user.role);
        return res.json({token});
    } catch (error) {
        next(error);
    }
}

module.exports.check = (req, res, next) => {
    const { user } = req;
    const token = createToken(user.id, user.name, user.email, user.role);
    return res.json({token});
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.findAll();
        return res.status(200).send(allUsers);
    } catch (error) {
        next(error)
    }
}