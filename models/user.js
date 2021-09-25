const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    refID: {
        type: String,
        trim: true,
    },
    referredByID: {
        type: String,
        trim: true,
    },
    referralLink: {
        type: String,
    },
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

const user = mongoose.model('User', userSchema);

module.exports = user;
