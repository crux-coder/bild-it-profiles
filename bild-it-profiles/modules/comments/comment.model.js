const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    exercise: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true }

}, {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
        timestamps: true
    });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;