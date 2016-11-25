$(document).keypress(function(event) {
    var keycode = event.keyCode || event.which;
    if(keycode == '13') {
    	var text = $("#searchbar").val();
    	if (text !== "") {

			var socket = io.connect("/");
			var data = {
		        action_type: "searchUsers",
		        message: {
		            identification: text
		        }
		    };

		    socket.send(JSON.stringify(data));

		    socket.on("message",function(message){

		        message = JSON.parse(message);

		        if (message.data !== undefined) {
		        	displayUsers(message.data);

		        }

		    });
        }

    }
});

function displayUsers(users) {
	var htmlusers = "<div id='searchUsersDiv'><div><div id='friendNameDivSearch'></div><button id='exit' class='btnSair' type='button' onclick='closeSearch()'>X</button></div><h3>Resultados da Busca</h3>";
	users.forEach(function(u) {
		htmlusers += "<div><div id='friendNameDivSearch'><h4 class='friendName'>"+u.name+"</h4><button class='btnAddAmigo' type='button' onclick='addFriend(\""+u._id+"\",\""+u.name+"\")'>Adicionar Amigo</button><div  id='buttonFriendDiv'></div></div></div>";
	});
	htmlusers += "</div>";
	$("#searchUsers").html(htmlusers);
}

function closeSearch() {
	$("#searchUsers").html("");
	$("#searchbar").val("");
}
