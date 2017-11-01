$(function () {
	var socket = io();
	$('form').submit(function () {
		var messageReceived = $('#message').val();
		var fullMessage = $('#username').val() + ": " + messageReceived;
		socket.emit('chat message', fullMessage);
		$('#username').val('');
		$('#message').val('');
		return false;
	});
	socket.on('chat message', function (msg) {
		var msg_color = "white";
		if (msg.indexOf('/setColor') >= 0) {
			msg_color = msg.split(" ")[2];
			msg = parse_message(msg.split(" "), 3);
			$('#messages').append($('<li>').css('color', msg_color).text(msg));
		}
		else if (msg.indexOf('/setBold') >= 0) {
			msg = parse_message(msg.split(" "), 2);
			$('#messages').append($('<li>').css('font-weight', 'bold').text(msg));
		}
		else if (msg.indexOf('/setItalic') >= 0) {
			msg = parse_message(msg.split(" "), 2);
			$('#messages').append($('<li>').css('font-style', 'italic').text(msg));
		}
		else if (msg.indexOf('/setBorder') >= 0) {
			msg = parse_message(msg.split(" "), 2);
			$('#messages').append($('<li>').css('border', 'solid 3px black').text(msg));
		}
		else {
			$('#messages').append($('<li>').text(msg));
		}
		//console.log(msg_color);
		//console.log(msg);
	});
});


var parse_message = function (msg, index) {
	return_msg = "";
	for (i = index; i < msg.length - 1; i++) {
		return_msg += msg[i] + " ";
	}
	return msg[0] + " " + return_msg + " " + msg[i];

}