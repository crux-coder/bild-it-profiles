
const io = require('socket.io')();
const UserService = require('../users/user.service');

io.on('connection', function (socket) {
    socket.on('REGISTER_SOCKET', function (user) {
        user.socketId = socket.id;
        UserService.updateUser(user);
    });
    socket.on('SEND_NOTIFICATION', function (data) {
        UserService.fetchUserById({ id: data.recieverId }).then(user => {
            socket.broadcast.to(user.socketId).emit('RECIEVE_NOTIFICATION', data);
        })
    });
});

module.exports = io;