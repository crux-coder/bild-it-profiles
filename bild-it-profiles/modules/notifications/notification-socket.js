
const io = require('socket.io')();

const notification = io.of('/notifications')
    .on('connection', function (socket) {
        console.log(socket.id)
        socket.on('SEND_NOTIFICATION', function (data) {
            socket.broadcast.emit('RECIEVE_NOTIFICATION', data);
        })
    });

module.exports = io;