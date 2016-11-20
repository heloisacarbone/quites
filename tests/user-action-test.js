
var assert = require('assert');
var database = require('../backend/database_controller.js')
describe('Users Actions', function() {
	before(function (done) {
        database.initialize(function () {
            database['users'].add("admin", "admin", "admin", "admin", "2016-10-05","male", function(err, obj){
              database['users'].add("devel", "devel", "devel", "devel", "2016-10-05","male", function(err, obj){          
              });
            
            });
            done();
        });
    });

  	it('it should search for a user', function() {
   
   		database['users'].getSearchUsers("devel", function(err, obj){

    		  assert.ifError(err);
        	assert.ok(!obj);
            
    	});
 
  	});

});