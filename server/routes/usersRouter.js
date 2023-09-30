const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.mw');
const usersRouter = Router();

usersRouter.post('/registration', UserController.registration);
usersRouter.post('/login', UserController.login);
usersRouter.get('/auth', authMiddleware, UserController.check);
// usersRouter.get('/auth', (req, res) => {
//     res.json({message: 'All working!'})
// });
usersRouter.get('/', UserController.getAllUsers);

module.exports = usersRouter;