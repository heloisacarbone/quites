function loadUserPerfil() {
	
	var socket = io.connect("/");
	var data = {
        action_type: "getUser",
        message: {
            user_id: getCookies().client_id
        }

    };

    socket.send(JSON.stringify(data));

    socket.on("message",function(message){

        message = JSON.parse(message);
    
        if (message.data !== undefined) {
        	$("#usernamePerfil").html(message.data.name);
          
        } 

    });
}
