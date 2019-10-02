const router = require('express').Router();
const auth = require('../../security/token.utils');
const ExerciseService = require('./exercise.service');

router.route('/').get(auth, (req, res) => {
    const opts = { populate: [{ path: 'user', select: 'firstName lastName fullName' }], lean: false }
    const exercises = ExerciseService.fetchExercises(opts);
    exercises.then(exercises => {
        res.json(exercises)
    });
});


router.route('/').post(auth, (req, res) => {
    const exercise = ExerciseService.createExercise(req.body);
    exercise.then(exercise => res.json(exercise));
});

router.route('/:id').get(auth, (req, res) => {
    const opts = { id: req.params.id, populate: [{ path: 'user', select: 'firstName lastName fullName' }], lean: false }
    var exercise = ExerciseService.fetchExerciseById(opts);
    exercise.then(exercise => {
        res.json(exercise);
    });
});

router.route('/:id').delete(auth, (req, res) => {
    const exercise = ExerciseService.deleteExerciseById(req.params.id);
    exercise.then(exercise => { res.json(exercise) });
});

router.route('/update/:id').post(auth, (req, res) => {
    ExerciseService.updateExercise(req.body)
        .then(exercise => {
            res.json(exercise)
        });
});

module.exports = router;