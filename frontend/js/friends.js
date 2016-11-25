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

function loadFriends() {

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

        if (message.data !== undefined && message.data.friends !== null && message.data.friends !== undefined) {

        	var htmlFriends = "<div>";
        	message.data.friends.forEach(function(friend) {

        		htmlFriends += '<div class="label"><label>'+friend.name+'</label><input type="checkbox" name="'+friend.id+'-'+friend.name+'"></div>';
        	});
        	htmlFriends+= "</div>";

        	$("#friendsdebt").html(htmlFriends);

        }

    });

}
