var mongo = require('mongodb');
var createTokens = require('../backend/create_tokens.js');

module.exports = function () {

    return {

        initialize: function (main_database) {
            debts = main_database.collection('debts');
            console.log("database.users: users collection created");
        },

        add: function (owner, users, value, division, callback) {
            debts.insert({owner:owner, users: users, value: value, division: division}, {safe: true}, callback);
        },

        find: function(userId, callback) {
            debts.find({$or: [{owner: userId}, {"users.id": {$in: userId}]})
        }
    };
}
