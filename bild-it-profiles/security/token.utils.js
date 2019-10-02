let jwt = require('jsonwebtoken');
const config = require('./config.js');

module.exports = auth = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid.'
                });
            } else {
                req.decoded = decoded;
                req.token = token;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied.'
        });
    }
};
