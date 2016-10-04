function login() {
	var socket = io.connect("/");
	var data = { 
        action_type: "login",
        message: {
            identification: $('#loginEmail').val(),
            password: $('#loginPassword').val(),
        }, 
        user_id: undefined
                
    };
    
    socket.send(JSON.stringify(data)); 

    socket.on("message",function(message){  
        
        message = JSON.parse(message);
        console.log(message); /*converting the data into JS object */
        if (message.data) {
          addECookie("client_id", message.client_id)
          location.href = "home.html";
        } else {
            alert("There was a problem obtaining your credentials. Try again.");
        }

        $('#loginEmail').val('');
        $('#loginPassword').val('');
        
    });
}

function registerUser() {
	var socket = io.connect("/"); 

	var pass = $('#reg_password').val();
	var rpass = $("#reg_rep_password").val();

	if (pass === rpass) {
		$(".error").html("");
     
		var data = { 
	        action_type: "registration",
	        message: {
	        	username: $('#reg_username').val(),
	            email: $('#reg_email').val(),
	            password: pass,
	            name: $('#reg_name').val(),
	            birthdate: $("#reg_dob").val(),
	            gender: $("#reg_gender option:selected").val()

	        }, 
	        user_id: undefined      
	    };

	    socket.send(JSON.stringify(data)); 

	    $('#reg_username').val('');
	    $('#reg_password').val('');
	    $('#reg_rep_password').val('');
	    $('#reg_email').val('');
	    $('#reg_name').val('');
	    $('#reg_dob').val('');

		socket.on("message",function(message){  
	               
	        message = JSON.parse(message);
	   
	        if (message.data) {
	          
	            location.href = "index.html";
	            
	        } else {
	            alert("We were not able to create your account");
	            
	        }
	    });
	} else {
		$(".notice").html("Password and Repeat Password do not match");
	}
}