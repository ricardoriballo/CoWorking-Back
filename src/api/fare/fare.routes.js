const FareRoutes = require('express').Router();
const { isAuth } = require('../middlewares/auth.middleware');


const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
} = require('./fare.controller');

FareRoutes.get('/', getAll);
FareRoutes.get('/:id', getOne);
FareRoutes.post('/',[isAuth], postOne);
FareRoutes.patch('/:id',[isAuth], patchOne);
FareRoutes.delete('/:id',[isAuth], deleteOne);

module.exports = FareRoutes;