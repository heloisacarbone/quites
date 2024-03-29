/* app.js
    Main Class, resposible for initialize the server and database. And also, handle the frontend requests to the server, sending them to the right module.
*/

var http = require('http');
var socketio = require('socket.io');
var express = require('express');
var io;

var server_config = require('./config/server.json');
var database = require('./backend/database_controller.js');
var login_registration_server = require('./backend/login_registration_server.js');
var user_action_controller = require('./backend/user_action_controller.js');
var debts_controller = require('./backend/debts_controller.js');

 /*
 	Initializes the server, specifying the folder that contains all the Frontend size to listen for requests
 */
function initializeServer() {
	var app = express();
	app.use(express.static('./frontend'));
	var port = (process.env.PORT ||  server_config.httpServerPort);
	var server = http.createServer(app).listen(port, function(){
		console.log('app.js @', port);
	});
	io = socketio.listen(server);
	io.sockets.on("connection", requestHandler);

}

/*
	This is where the magic happens.
	The message sent from the client must be a JSON in the following format
	{
		action_type: login/registration/news_post/search
		action: function-name
		message: everything that needs to be sent
		user_id
	}
    teste

*/
function requestHandler(socket){

    socket.on("message",function(data){
        /*This event is triggered at the server side when client sends the data using socket.send() method */
        data = JSON.parse(data);
        /*
        	The data sent from the frontend size is handled for the request listeners for all those classes
        */
        login_registration_server.requestListener(socket, data);
        user_action_controller.requestListener(socket, data);
        debts_controller.requestListener(socket, data);

    });
}


// Inits the magic. Connects to the database - Similar to the main
database.initialize(function () {
    console.log('Initializing server');
    // Initialize the server
    initializeServer();
});
