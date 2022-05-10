const mongoose = require('mongoose');
const coworkingSchema = new mongoose.Schema(

    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: false, trim: true },
        space: { type: Number, required: false, trim: true },
        location: { type: String, required: false, trim: true },
        capacity: { type: String, require: true, trim: true },
        category: { type: String, require: true, trim: true },
        img: { type: String, trim: true, require: false},
        reviews: [{ type: String, trim: true, require: false }]
    },
    {
        timestamps: true
    }
);


const Coworking = mongoose.model('coworking', coworkingSchema);
module.exports = Coworking;