const router = require('express').Router();
const Exercise = require('./exercise.model');
const User = require('../users/user.model');
const auth = require('../../security/token.utils');
const ExerciseService = require('./exercise.service');

router.route('/').get(auth, (req, res) => {
    const opts = { populate: [{ path: "user" }] }
    const exercises = ExerciseService.fetchExercises(opts);
    exercises.then(exercises => {
        res.json(exercises)
    });
});


router.route('/').post(auth, (req, res) => {
    const user = req.body.user;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        user,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => {
            console.log(err);
            res.status(400).json('Error: ' + err)
        });

    User.findById(user)
        .populate('exercises')
        .then(user => {
            user.exercises.push(newExercise._id);
            user.save();
        })
});

router.route('/:id').get(auth, (req, res) => {
    ExerciseService.fetchExercises()
    Exercise.findById(req.params.id)
        .populate('user')
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(auth, (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(auth, (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.user = req.body.user;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;