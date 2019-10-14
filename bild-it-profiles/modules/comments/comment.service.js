const Comment = require('./comment.model');


function findCommentsByExerciseId({ query = {}, populate = [], lean = true } = {}) {
    const promise = Comment.find({ ...query });
    const populatedPromise = promise.populate(...populate);
    return lean ? populatedPromise.lean() : populatedPromise;
};

function createComment(payload = {}) {
    const comment = Comment.create({ ...payload });
    return comment;
};

function deleteCommentById(commentId) {
    const comment = Comment.findByIdAndDelete(commentId);
    return comment;
};

module.exports = {
    findCommentsByExerciseId,
    createComment,
    deleteCommentById
}