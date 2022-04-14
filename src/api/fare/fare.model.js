const mongoose = require('mongoose');

const fareSchema = new mongoose.Schema(
 
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: false, trim: true },
        service: [{type: String, required: true, trim: true }],
        price: {type: Number, required: true, trim: true},
        coworking: [{ type: mongoose.Schema.Types.ObjectId, ref: "coworking", required: true }]
    },
    {
        timestamps: true
    }
);

const Fare = mongoose.model('fares', fareSchema);
module.exports = Fare;