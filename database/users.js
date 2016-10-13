/* users.js
    This module has all the functions of insert, update and search for the database in the collections of users
*/
var mongo = require('mongodb');

module.exports = function () {

    return {

        initialize: function (main_database) {
            users = main_database.collection('users');
            console.log("database.users: users collection created");
        },

        add: function (username, email, pass, name, birthdate, gender, callback) {
            var _userNotFound_then_add = function (err, obj) {
                if (err) {
                    callback(err, undefined);
                } else if (!obj) {
                    users.insert({username: username, email: email, pass: pass, name: name, registerDate: new Date(), birthdate: birthdate, gender: gender}, {safe: true}, callback);
                } else {
                    if (email === obj.email) {
                        callback({err: 'User email already in use'}, undefined);    
                    } else if (username === obj.username) {
                        callback({err: 'User username already in use'}, undefined);    
                    }
                }
            };

            users.findOne({$or: [{email: email}, {username: username}]}, _userNotFound_then_add);
        },

        remove: function (username, callback) {
            users.remove({username: username}, callback);
        },
        
        check: function (identification, pass, callback) {
            users.findOne({ $or: [{email: identification}, {username: identification}], pass: pass}, callback);
        },
        
        getUserEmail: function (email, callback) {
            users.findOne({email: email}, callback);
        },

        getUserId: function (userId, callback) {
            users.findOne({_id: new mongo.ObjectID(userId)}, callback);
        },

        getUserUsername: function (username, callback) {
            users.findOne({username: username}, callback);
        },

        getUserList: function (filter, number, callback) {
            users.find(filter).skip(number + 5).limit(5).toArray(callback);
        },


        editPassword: function (userId, new_pass, callback) {
            users.update({_id: new mongo.ObjectID(userId)}, {$set: { pass: new_pass }}, {safe: true}, callback);
           
        }

    };
}
