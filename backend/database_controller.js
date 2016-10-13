/* database.js
    Module responsible to deal with the database modules (folder: database), to make more simple the access of the functions of the database
    in other classes.
*/
var mongo = require('mongodb');

var database_modules_list = [
    'users'
];

function initialize_modules(main_database) {
    console.log("database.initialize_modules: Initializing database modules...");
    database_modules_list.forEach(function (coll) {
        module.exports[coll] = require('../database/' + coll + '.js')();
        module.exports[coll].initialize(main_database);
    });
}

var exportable = {

    connect: function (type, callback) {
        
        var mongo_uri = 'mongodb://127.0.0.1:27017/quites';

        if (type === "prod") {
            mongo_uri = 'mongodb://heroku_xj2nrdfv:d2vp9lmo3vsqq0n0c5lebegk1r@ds057386.mlab.com:57386/heroku_xj2nrdfv';
        }

        console.log('database.connect: Connecting @', mongo_uri);

        mongo.MongoClient.connect(mongo_uri, callback);
    },

    initialize: function (callback) {
        // mudar para dev quando for rodar
        exportable.connect("prod", function (error, client) {
            if (error) {
                throw error;
            }

            console.log('database.MongoClient.connect: Database connected @quites');

            initialize_modules(client);
			
			callback();
            
        });
    }
};

for (var method in exportable) {
    if (exportable.hasOwnProperty(method)) {
        exports[method] = exportable[method];
    }
}