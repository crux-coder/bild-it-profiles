
const io = require('socket.io')();

io.of('/notifications')
    .on('connection', function (socket) {
        socket.on('SEND_NOTIFICATION', function (data) {
            io.emit('RECIEVE_NOTIFICATION', data);
        })
    });

module.exports = io;