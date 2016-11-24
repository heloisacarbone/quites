var database = require('./database_controller.js');
var socketio = require('socket.io');

function addDebt(socket, req) {
    var message_to_client = {};

    if (req.message !== null && req.message !== undefined) {

        database['debts'].add(req.message.user_id, req.message.friends,req.message.debt, "split", function (err, debt) {
            if (err || !debt) {
                console.error('database.add: Could not add new debt. err:', err);
                message_to_client['data'] = undefined;
                socket.send(JSON.stringify(message_to_client));
            } else {
                message_to_client['data'] = debt;
                socket.send(JSON.stringify(message_to_client));
            }
        });
    }

}

function loadDebt() {
    var message_to_client = {};
    if (req.message !== null && req.message !== undefined) {
        database['debts'].find(req.message.user_id, function (err, debt) {
            if (err && !debt) {
                console.error('database.add: Could not return debts. err:', err);
                message_to_client['data'] = undefined;
                socket.send(JSON.stringify(message_to_client));
            }
        });
    }
}

function requestListener(socket, req) {

    switch (req.action_type) {
        case 'addDebt':
            addDebt(socket, req);
            break;
        case 'loadDebt':
            loadDebt(socket, req);
            break;
        default:
            return false;
    }

    return true;
}

exports.requestListener = requestListener;
