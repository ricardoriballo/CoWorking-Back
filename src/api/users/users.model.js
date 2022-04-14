const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { setError } = require('../../utils/error/error');

const { validationPassword, validationEmail } = require('../../utils/validators/validators');
const userSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true, required: true },
        emoji: { type: String, trim: true, required: false },
        password: { type: String, trim: true, required: true },
        email: { type: String, trim: true, required: true },
    }
);

userSchema.pre("save", function(next){
    if (!validationPassword(this.password)) {
        
        return next(setError(404, 'Character missing'))
    }
    if (!validationEmail(this.email)) {
       
        return next(setError(404, 'Something went wrong'))
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model('users', userSchema);
module.exports = User;