const router = require('express').Router();
const User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .populate('exercises')
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/').post((req, res) => {
    const { email, password, firstName, lastName, dob } = req.body;
    const newUser = new User({ email, password, firstName, lastName, dob });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => {
            console.log(err)
            res.status(400).json('Error: ' + err)
        });
});

router.route('/login').post((req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user.email === email && user.password == password)
                res.json(user);
            else
                res.status(403).json('Wrong username or password.')
        });
});

module.exports = router;