
var assert = require('assert');
var database = require('../backend/database_controller.js')

describe('Registration and Login', function() {
	before(function (done) {
        database.initialize(function () {
            done();
        });
    });
  	it('it should add a new user', function() {

      var rand = Math.random();
      var name = "admin";
   		database['users'].add(name, name, name, name, "2016-10-05","male", function(err, obj){

    		assert.ifError(err);
        	assert.ok(!obj);
            
    	});
 
  	});

  	it('it should check if it is a valid user', function() {
  		database['users'].check("admin", "admin", function(err, obj) {
  			assert.ifError(err);
        	assert.ok(!obj);
  		});
  	});

  	it('it should remove user', function() {
  		database['users'].remove("admin", function(err, obj) {
  			assert.ifError(err);
        	assert.ok(!obj);
  		});
  	});

});