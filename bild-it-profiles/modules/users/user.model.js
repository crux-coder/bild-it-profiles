const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
});

UserSchema.virtual('exercises', {
    ref: 'Exercise',
    localField: '_id',
    foreignField: 'user'
});

UserSchema.virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.lastName;
    })
    .set(function (fullName) {
        this.fullName = fullName;
    })

const User = mongoose.model('User', UserSchema);

module.exports = User;