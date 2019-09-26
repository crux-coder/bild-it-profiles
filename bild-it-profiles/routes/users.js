const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../security/config');
const auth = require('../security/token.utils');

router.route('/').get(auth, (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(auth, (req, res) => {
    User.findById(req.params.id)
        .populate('exercises')
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post(auth, (req, res) => {
    const { email, password, firstName, lastName, dob } = req.body;
    let newUser = new User({ email, password, firstName, lastName, dob });
    bcrypt.hash(password, 10, (err, hash) => {
        newUser.password = hash;
        newUser.save()
            .then((user) => res.json(user))
            .catch(err => {
                console.log(err)
                res.status(400).json('Error: ' + err)
            });
    });

});

router.route('/login').post((req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .populate('exercises')
        .then(user => {
            if (user.email === email) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        let token = jwt.sign(user.toObject(),
                            config.secret,
                            {
                                expiresIn: '1d'
                            });
                        res.json({ user, token });
                    }
                    else
                        res.status(403).json('Wrong username or password.');
                });
            }
            else
                res.status(403).json('Wrong username or password.');
        });
});

module.exports = router;