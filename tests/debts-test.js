var assert = require('assert');
var database = require('../backend/database_controller.js')
describe('Debts', function() {

	it('it should add a debet for two users', function() {
    database.initialize(function () {
          database['users'].add("admin", "admin", "admin", "admin", "2016-10-05","male", function(err, admin){
            database['users'].add("devel", "devel", "devel", "devel", "2016-10-05","male", function(err, devel){
              var friends = [
                {id: admin._id, name: admin.name},
                {id: devel._id, name: devel.name}
              ]; 
              database['debts'].add(admin._id, friends, "212.2", "split", function (err, debt) {         

                assert.ifError(err);
                assert.ok(!debt);

              });
            });
          
          });
          
      });
  		  
          
  	

	});
});