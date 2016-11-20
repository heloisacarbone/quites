function addFriend(friendId, name) {
	var socket = io.connect("/");
	var data = {
        action_type: "addFriend",
        message: {
            userId: getCookies().client_id,
            friendId: friendId,
            friendName: name
        }

    };

    socket.send(JSON.stringify(data));

    socket.on("message",function(message){

        message = JSON.parse(message);
    
        if (message.data !== undefined) {
        	alert("Você adicionou "+name+" como amigo" );
          
        } 

    }); 
}