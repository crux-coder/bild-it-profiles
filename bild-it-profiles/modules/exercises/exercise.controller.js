const router = require('express').Router();
const auth = require('../../middleware/auth');
const ROLES = require('../../constants/roles');
const ExerciseService = require('./exercise.service');

router.get('/', auth(), (req, res) => {
    const opts = { populate: [{ path: 'user', select: 'firstName lastName fullName' }], lean: false }
    const exercises = ExerciseService.fetchExercises(opts);
    exercises.then(exercises => {
        res.json(exercises)
    });
});


router.post('/', auth(), (req, res) => {
    const exercise = ExerciseService.createExercise(req.body);
    exercise.then(exercise => res.json(exercise));
});

router.get('/:id', auth(), (req, res) => {
    const opts = { id: req.params.id, populate: [{ path: 'user', select: 'firstName lastName fullName' }], lean: false }
    var exercise = ExerciseService.fetchExerciseById(opts);
    exercise.then(exercise => {
        res.json(exercise);
    });
});

router.delete('/:id', auth(ROLES.ADMIN), (req, res) => {
    const exercise = ExerciseService.deleteExerciseById(req.params.id);
    exercise.then(exercise => { res.json(exercise) });
});

router.post('/update/:id', auth(ROLES.ADMIN), (req, res) => {
    ExerciseService.updateExercise(req.body)
        .then(exercise => {
            res.json(exercise)
        });
});

module.exports = router;