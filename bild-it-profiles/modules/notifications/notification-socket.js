
const io = require('socket.io')();

const notification = io.of('/notifications')
    .on('connection', function (socket) {
        socket.on('SEND_NOTIFICATION', function (data) {
            notification.emit('RECIEVE_NOTIFICATION', data);
        })
    });

module.exports = io;