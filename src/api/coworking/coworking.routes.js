const CoworkingRoutes = require('express').Router();
const { isAuth } = require('../middlewares/auth.middleware');
const upload = require("../middlewares/updateFile. middleware");


const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne,
    postOneReview
} = require('./coworking.controller');

CoworkingRoutes.get('/', getAll);
CoworkingRoutes.get('/:id', getOne);
CoworkingRoutes.post('/',[isAuth], upload.single('img'), postOne);
CoworkingRoutes.patch('/:id',[isAuth], upload.single('img'), patchOne);
CoworkingRoutes.delete('/:id',[isAuth], deleteOne);

module.exports = CoworkingRoutes;