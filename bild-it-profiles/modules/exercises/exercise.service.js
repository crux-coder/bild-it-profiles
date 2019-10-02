const Exercise = require('./exercise.model');

function fetchExercises({ query = {}, populate = [], lean = true } = {}) {
    const promise = Exercise.find({ ...query });
    const populatedPromise = promise.populate(...populate);
    return lean ? populatedPromise.lean() : populatedPromise;
};

module.exports = {
    fetchExercises
};