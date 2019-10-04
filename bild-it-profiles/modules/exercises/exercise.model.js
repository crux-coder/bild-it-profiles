const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true }
}, {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
        timestamps: true,
    });

ExerciseSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'exercise'
});
const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;