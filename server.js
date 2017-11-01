var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	//res.sendFile(__dirname + '/chat.html');
});

app.use(express.static('public'));

io.on('connection', function(socket){
	socket.join('x room');
	socket.on('chat message', function(msg){
		//io.emit('chat message', msg);
		socket.broadcast.to('x room').emit('chat message', msg);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
