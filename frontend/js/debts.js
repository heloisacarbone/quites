function closeOverlay() {
	$(".overlay").css("visibility", "hidden");
}

function openOverlay() {
	$(".overlay").css("visibility", "visible");

	loadFriends();
}

function addDebt() {
	var socket = io.connect("/");
	var data = {
        action_type: "addDebt",
        message: {
            user_id: getCookies().client_id,
         	debt: $(".overlay input").val(),
         	friends: [{id: getCookies().client_id, name: $("#usernamePerfil").html()}]
        }
    };

	$('#friendsdebt input:checked').each( function () {
		var e = $(this).attr('name');
		e = e.split("-");
		var d = {
			id: e[0],
			name: e[1]
		};
        data['message']['friends'].push(d);
    });

    socket.send(JSON.stringify(data));

    socket.on("message",function(message){

        message = JSON.parse(message);
    
        if (message.data !== undefined) {

        	alert("Nova divida adicionada");
        	$(".overlay input").val("");
        	$("#friendsdebt input:checked").attr('checked', false)
          
        } 

    });
    
}