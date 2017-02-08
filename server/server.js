/**
 * Created by Aakarsh on 2/5/17.
 */
var path = require('path');
var http = require('http');
var publicPath = path.join(__dirname, '../public');
var socketio = require('socket.io');
var {generateMessage} = require('./utils/message.js');
var {isRealString} = require('./utils/validation.js');

var express = require('express');
var app = express();
var server = http.createServer(app);
var io = socketio(server);



////

app.use(express.static(publicPath));

io.on('connection', function (socket) { //socket refers to a specific instance (ex one user)
   console.log("New user connected");
   ///ATTEMPT TO USE GLOBAL VARS
   var current_room = 'ABCDEFG';
   socket.on('join', function(params, callback){

     console.log(params);
      if(isRealString(params.name) || isRealString(params.join)){
        callback('name and room name req.');
      }
      current_room = params.join;
      socket.join(params.join);

      socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app on room: ', params.join));
      socket.broadcast.to(params.join).emit('newMessage', generateMessage('Admin', 'New User joined'));
        //socket.leave(params.join);
      callback();
   })
   socket.on('createMessage', function (message, callback) {
      console.log('Created message', message);
      console.log(current_room);
     io.to(current_room).emit('newMessage',generateMessage(message.from, message.text));   //This goes to everyone (even user sending message)
     callback('This is from the server');
   });
   socket.on('createLocationMessage', function(coords){
      io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
   });
   socket.on('disconnect', function () {
      console.log("User has disconnected");
   })
});

server.listen(3000, function () {
   console.log("Listening on 3000");
});
