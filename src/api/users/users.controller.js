const User = require('./users.model');
const bcrypt = require('bcrypt');
const JwtUtils = require('../../utils/jwt/jwt');
const { setError } = require('../../utils/error/error');

const register = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const userExist = await User.findOne({ email: user.email })
        if (userExist) {            
            return next(setError(404, 'El usuario ya existe, prueba creando otro.'))
        }
        const userDB = await user.save();
        return res.status(201).json(userDB.name)

    } catch (error) {
        return next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(setError(404, 'El email es incorrecto.'))
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = JwtUtils.generateToken(user._id, user.email);
            return res.status(200).json(token);
        }
    } catch (error) {

    }
}

const logout = (req, res, next) => {
    try {
        const token = null;
        return res.status(201).json(token)
    } catch (error) {
        return next(error)
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('coworking').populate('favorites');
        res.status(200).json(user);
    } catch (error) {
        return next(error)
    }
}

const patchUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id)
        const user = new User(req.body);
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.favorites = req.body.favorites;
        user.coworking = req.body.coworking;
        if (req.file) user.img = req.file.path
        user._id = id;
        const updateUser = await User.findByIdAndUpdate(id, user);
        return res.status(200).json(updateUser);
    } catch (error) {
        return next(error);
    }
}

module.exports = { register, login, logout, getUser, patchUser }