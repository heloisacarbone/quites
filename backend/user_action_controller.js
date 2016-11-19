var database = require('./database_controller.js');
var socketio = require('socket.io');

function getUser(socket, req) {
    var message_to_client = {};

    if (req.message !== null && req.message !== undefined) {
    
        database['users'].getUserId(req.message.user_id, function (err, user) {
            if (err || !user) {
                console.error('database.add: Could not get user. err:', err);
                message_to_client['data'] = undefined;
                socket.send(JSON.stringify(message_to_client));
            } else {
                console.log('database.add: User ', req.message.email, " was successfully created", user);
                message_to_client['data'] = user;
                socket.send(JSON.stringify(message_to_client));
            }
        });
    }

}

function requestListener(socket, req) {

    switch (req.action_type) {
        case 'getUser':
            getUser(socket, req);
            break;
        case 'login':
        	requestLogin(socket, req);
        	break;
        default:
            return false;
    }

    return true;
}

exports.requestListener = requestListener;
