const Exercise = require('./exercise.model');

function fetchExercises({ query = {}, populate = [], lean = true } = {}) {
    const promise = Exercise.find({ ...query });
    const populatedPromise = promise.populate(...populate);
    return lean ? populatedPromise.lean() : populatedPromise;
};

function fetchExerciseById({ id = {}, populate = [], lean = true } = {}) {
    const promise = Exercise.findById(id);
    const populatedPromise = promise.populate(...populate);
    return lean ? populatedPromise.lean() : populatedPromise;
}

function createExercise(payload = {}) {
    const exercise = Exercise.create({ ...payload });
    return exercise;
};

function deleteExerciseById(exerciseId) {
    const exercise = Exercise.findByIdAndDelete(exerciseId);
    return exercise;
};

function updateExercise(payload = {}) {
    return Exercise.findById(payload._id)
        .then(exercise => {
            const { user, description, duration, date } = payload;
            exercise.user = user;
            exercise.description = description;
            exercise.duration = duration;
            exercise.date = date;
            return exercise;
        }).then(exercise =>
            exercise.save()
                .then(() => {
                    return exercise
                })
                .catch(err => console.log(err)))
};

module.exports = {
    fetchExercises,
    createExercise,
    fetchExerciseById,
    deleteExerciseById,
    updateExercise
};