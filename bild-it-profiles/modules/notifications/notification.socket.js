
const io = require('socket.io')();
const UserService = require('../users/user.service');
const NotificationService = require('./notification.service');
const Notification = require('./notification.model');

io.on('connection', function (socket) {
    socket.on('REGISTER_SOCKET', function (user) {
        user.socketId = socket.id;
        UserService.updateUser(user);
        const opts = { query:{recieverId: user._id}, populate: { path: 'sender', select: 'firstName lastName' } };
        const notifications = NotificationService.fetchNotifications(opts);
        notifications.then(notifications => {
            io.to(user.socketId).emit('UPDATE_NOTIFICATIONS', notifications);
        });
    });
    socket.on('SEND_NOTIFICATION', function (data) {
        if (data.recieverId != data.sender._id)
            NotificationService.createNotification(data).then(notif => {
                Notification.populate(notif, { path: 'sender', select: 'firstName lastName fullName' }, (err, notif) => {
                    UserService.fetchUserById({ id: data.recieverId }).then(user => {
                        socket.broadcast.to(user.socketId).emit('RECIEVE_NOTIFICATION', notif);
                    });
                });

            });
    });
});

module.exports = io;