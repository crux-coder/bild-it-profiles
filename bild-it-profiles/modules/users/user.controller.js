const router = require('express').Router();
const User = require('./user.model');
const UserService = require('./user.service');
const ROLES = require('../../constants/roles');
const jwt = require('jsonwebtoken');
const config = require('../../security/config');
const auth = require('../../middleware/auth');

router.get('/', auth(ROLES.ADMIN), (req, res, next) => {
    const opts = { lean: false }
    UserService.fetchUsers(opts)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', auth(), (req, res) => {
    const opts = { id: req.params.id, populate: ['exercises'], lean: false }
    UserService.fetchUserById(opts)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', (req, res) => {
    User.findById(req.body._id)
        .then(user => {
            const { firstName, lastName, email, password, dob, approved } = req.body;
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.password = password;
            user.dob = dob;
            user.approved = approved;
            user.save()
                .then(() => {
                    return res.json(user);
                })
                .catch(err => res.json('Error: ' + err));
        });
});

router.post('/', (req, res) => {
    UserService.createUser(req.body)
        .then((user) => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user.email === email) {
                user.comparePassword(password, (err, result) => {
                    if (result) {
                        if (!user.approved) {
                            res.status(412).json('Account not approved. Contact admins for your approval.');
                        }
                        else {

                            let token = jwt.sign(user.toObject(),
                                config.secret,
                                {
                                    expiresIn: '1d'
                                });
                            res.json({ user, token });
                        }
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