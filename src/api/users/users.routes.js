const UserRoutes = require('express').Router();
const { isAuth } = require('../middlewares/auth.middleware');
const { register, login, logout, getUser, patchUser } = require('./users.controller');

UserRoutes.post('/register', register);
UserRoutes.post('/login', login);
UserRoutes.post('/logout', [isAuth], logout);
UserRoutes.get('/:id', getUser);
UserRoutes.patch('/:id', [isAuth], patchUser);

module.exports = UserRoutes;