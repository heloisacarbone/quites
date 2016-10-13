
/* login_registration_server.js
    This module is responsible to deal with the requests that come from the frontend side related with login and registration.
*/
var database = require('./database_controller.js');
var socketio = require('socket.io');

// Registration of a user in the system
function registration(req, callback) {
    var message_to_client = {};
      
    if (req.message !== null && req.message !== undefined) {
        database['users'].add(req.message.username, req.message.email, req.message.password, req.message.name, req.message.birthdate, req.message.gender, function (err, user) {
            if (err || !user) {
                console.error('database.add: Could not add new user. err:', err);
                message_to_client['data'] = false;
                message_to_client['err'] = err;
                callback(message_to_client);
            } else {
                console.log('database.add: User ', req.message.email, " was successfully created", user);
                message_to_client['data'] = true;
                message_to_client['id'] = user.ops[0]._id;
                callback(message_to_client);
            }
        });
    } 

}

// When a user try to login into the system, this function checks the user information
function requestLogin(req, callback) {
    var message_to_client = {};
        
    if (req.message !== null && req.message !== undefined) {
        database['users'].check(req.message.identification, req.message.password, function (err, user) {
            if (err || !user) {
                console.error('database.check: Could not authenticate user. err:', err);
                message_to_client['data'] = false;
                callback(message_to_client);
            } else {
                message_to_client['client_id'] = user._id;
                console.log('database.check: User ', req.message.email, " was authenticated", user);
                message_to_client['data'] = true;
                callback(message_to_client);
            }
        });
    }
}

function requestListener(socket, req) {
    var message = function(msg){
        socket.send(JSON.stringify(msg));
    };

    switch (req.action_type) {
        case 'registration':
            registration(req, message);
            break;
        case 'login':
        	requestLogin(req, message);
        	break;
        default:
            return false;
    }

    return true;
}

exports.requestListener = requestListener;
exports.requestLogin = requestLogin;
exports.registration = registration;