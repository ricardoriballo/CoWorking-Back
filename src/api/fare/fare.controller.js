const Fare = require('./fare.model');


const getAll = async (req, res, next) => {
    try {
        const fares = await Fare.find().populate('coworking');
        res.status(200).json(fares);
    } catch (error) {
        return next(error)
    }
}

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const fare = await Fare.findById(id).populate('coworking');
        res.status(200).json(fare);
    } catch (error) {
        return next(error)
    }
}

const postOne = async (req, res, next) => {
    try {
        const fare = new Fare();
        fare.name = req.body.name;
        fare.description = req.body.description;
        fare.service = req.body.service;
        fare.price = req.body.price;
        fare.coworking = req.body.coworking;
        const fareDB = await fare.save();
        return res.status(201).json(fareDB)
    } catch (error) {
        return next(error)
    }
}

const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const fare = new Fare(req.body);
        fare.name = req.body.name;
        fare.description = req.body.description;
        fare.service = req.body.service;
        fare.price = req.body.price;
        fare.coworking = req.body.coworking;
        fare._id = id;
        const updateFare = await Fare.findByIdAndUpdate(id, fare);
        return res.status(200).json(updateFare);
    } catch (error) {
        return next(error);
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const fare = await Fare.findByIdAndDelete(id);
        return res.status(200).json(fare);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
}