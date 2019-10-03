let jwt = require('jsonwebtoken');
const config = require('../security/config.js');


module.exports = function (roles = ['USER']) {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    const secret = config.secret;
    return function (req, res, next) {
        verifyToken(req, res, secret);
        if (roles.length && !req.user.roles.some(role => roles.includes(role))) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    }
}

function verifyToken(req, res, secret) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid.'
                });
            } else {
                req.user = user;
                req.token = token;
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied.'
        });
    }
};