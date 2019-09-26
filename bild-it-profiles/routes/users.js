const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

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
    let newUser = new User({ email, password, firstName, lastName, dob });
    bcrypt.hash(password, 10, (err, hash) => {
        newUser.password = hash;
        newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => {
                console.log(err)
                res.status(400).json('Error: ' + err)
            });
    });

});

router.route('/login').post((req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user.email === email) {
                bcrypt.compare(password, user.password, (err, result) => {
                    console.log(result)
                    if (result)
                        res.json(user);
                    else
                        res.json(user);
                    // res.status(403).json('Wrong username or password.');
                });
            }
            else
                res.status(403).json('Wrong username or password.');
        });
});

module.exports = router;