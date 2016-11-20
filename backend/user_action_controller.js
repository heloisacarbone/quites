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
                message_to_client['data'] = user;
                socket.send(JSON.stringify(message_to_client));
            }
        });
    }

}

function searchUsers(socket, req) {
	var message_to_client = {};
	if (req.message !== null && req.message !== undefined) {
		database['users'].getSearchUsers(req.message.identification, function(err, users) {
			if (err || !users) {
                console.error('database.add: Could not find users. err:', err);
                message_to_client['data'] = undefined;
                socket.send(JSON.stringify(message_to_client));
            } else {
            	console.log("usersFriend: ", users);
                message_to_client['data'] = users;
                socket.send(JSON.stringify(message_to_client));
            }
		});
	}
}

function addFriend(socket, req) {
	var message_to_client = {};
	if (req.message !== null && req.message !== undefined) {
		database['users'].addFriend(req.message.userId, req.message.friendId, req.message.friendName, function(err, users) {
			if (err || !users) {
                console.error('database.add: Could not add friend. err:', err);
                message_to_client['data'] = undefined;
                socket.send(JSON.stringify(message_to_client));
            } else {
            	console.log("usersFriend: ", users);
                message_to_client['data'] = users;
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
        case 'searchUsers':
        	searchUsers(socket, req);
        	break;
        case 'addFriend':
        	addFriend(socket, req);
        	break;
        default:
            return false;
    }

    return true;
}

exports.requestListener = requestListener;
