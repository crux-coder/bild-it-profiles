
const io = require('socket.io')();
const UserService = require('../users/user.service');
const NotificationService = require('./notification.service');

io.on('connection', function (socket) {
    socket.on('REGISTER_SOCKET', function (user) {
        user.socketId = socket.id;
        UserService.updateUser(user);
    });
    socket.on('SEND_NOTIFICATION', function (data) {
        NotificationService.createNotification(data).then(notif => {
            UserService.fetchUserById({ id: data.recieverId }).then(user => {
                socket.broadcast.to(user.socketId).emit('RECIEVE_NOTIFICATION', notif);
            })
        });
    });
});

module.exports = io;