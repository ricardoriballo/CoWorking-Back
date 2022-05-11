const Coworking = require("./coworking.model");
const { deleteImgCloudinary } = require("../middlewares/deleteFile.middleware");
const { setError } = require('../../utils/error/error');



const getAll = async (req, res, next) => {
  try {
    const coworking = await Coworking.find();
    res.status(200).json(coworking);
  } catch (error) {
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coworking = await Coworking.findById(id);
    res.status(200).json(coworking);
  } catch (error) {
    return next(error);
  }
};

const postOne = async (req, res, next) => {
  try {
    const coworking = new Coworking();
    coworking.name = req.body.name;
    coworking.description = req.body.description;
    coworking.space = req.body.space;
    coworking.location = req.body.location;
    coworking.capacity = req.body.capacity;
    coworking.category = req.body.category;
    if (req.file) coworking.img = req.file.path;

    const coworkingDB = await coworking.save();
    return res.status(201).json(coworkingDB);
  } catch (error) {
    return next(error);
  }
};

const patchOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coworking = new Coworking(req.body);
    coworking.name = req.body.name;
    coworking.description = req.body.description;
    coworking.space = req.body.space;
    coworking.location = req.body.location;
    coworking.capacity = req.body.capacity;     
    coworking.reviews = req.body.reviews;
     if (req.file) coworking.img = req.file.path;
    coworking._id = id;
     const updateCoworking = await Coworking.findByIdAndUpdate(id, coworking);
     return res.status(200).json(updateCoworking);
  } catch (error) {
     return next(error);
   }
 };

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coworking = await Coworking.findByIdAndDelete(id);
    if (coworking.img) deleteImgCloudinary(coworking.img);

    return res.status(200).json(coworking);
  } catch (error) {
    return next(error);
  }
};

// const patchOne = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     // coworking._id = id;
//     console.log("INFO-API: (coworking-addActivity):", req.body);
//     const coworking = await Coworking.findByIdAndUpdate(id, req.body);
//     console.log("coworking", coworking);

//     const coworkingToSend = await Coworking.findById(id);
//     res.status(200).json(coworkingToSend);
//   } catch (error) {
//     return next(setError(error.statusCode, "Item not modified"));
//   }
// };

module.exports = {
  getAll,
  getOne,
  postOne,
  patchOne,
  deleteOne,
};
