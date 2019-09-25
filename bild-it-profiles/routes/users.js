const router = require('express').Router();
const User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/').post((req, res) => {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dob = Date.parse(req.body.dob);

    const newUser = new User({ username, firstName, lastName, dob });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => {
            res.status(400).json('Error: ' + err)
        });
});

module.exports = router;