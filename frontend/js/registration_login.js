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


// TODO: NAO ARRUMEI ESSE AINDA
function registerUser() {
	var socket = io.connect("/"); 

	var pass = $('#reg_password').val();
	var rpass = $("#reg_rep_password").val();

	if (pass === rpass) {
		$(".error").html("");

    var profileImage = document.getElementById("profileImage").src;

    if(profileImage ==  "http://www.mv.mu/en/forfait/img/point_interrogation.png"){
      profileImage = null;
    }
     

		var data = { 
	        action_type: "registration",
	        message: {
	            email: $('#reg_email').val(),
	            password: pass,
	            name: $('#reg_name').val(),
	            birthdate: $("#reg_dob").val(),
	            gender: $("#reg_gender option:selected").val(),
              image: profileImage

	        }, 
	        user_id: undefined      
	    };

	    data['message']['preferences'] = [];
	    $('#reg_preferences input:checked').each( function () {
	        data['message']['preferences'].push($(this).attr('name'));
	    });

	    socket.send(JSON.stringify(data)); 

	    $('#reg_password').val('');
	    $('#reg_rep_password').val('');
	    $('#reg_email').val('');
	    $('#reg_name').val('');
	    $('#reg_dob').val('');
	    $("#reg_preferences input:checked").attr('checked', false)

		socket.on("message",function(message){  
	               
	        message = JSON.parse(message);
	   
	        if (message.data) {
	          
	            openEcoForm(message.id);
	            
	        } else {
	            alert("We were not able to create your account");
	            
	        }
	    });
	} else {
		$(".notice").html("Password and Repeat Password do not match");
	}
}