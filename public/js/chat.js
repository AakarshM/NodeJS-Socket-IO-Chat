/**
 * Created by Aakarsh on 2/5/17.
 */
    //custom JS
var socket = io();
socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);
    console.log(params);
    socket.emit('join', params, function(err){

    })
});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});
socket.on('newMessage', function (message) {
   console.log('new message received from server', message);
   var li = jQuery('<li></li>');
   li.text(`${message.from}: ${message.text}`);
   jQuery('#messages').append(li);
});
jQuery('#message-form').on('submit', function(e){ //event e argument
  e.preventDefault();
  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){

  });
});

//var locationButton = jQuery('#send-location');

jQuery('#send-location').on('click', function() {
  if(!navigator.geolocation){
    return alert('geolocation not supported by browser');
  }
  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
      return alert('unable to fetch location');
  });

});
