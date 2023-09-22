var express = require('express');
var socket = require('socket.io');

//app setup
var app = express();

//server
var server = app.listen(5001, function(){
    console.log('listen to req  on port 3000');
});

//static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});