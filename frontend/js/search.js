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
	var htmlusers = "<h3>Resultados da Busca</h3>";
	users.forEach(function(u) {
		htmlusers += "<div><h4>"+u.name+"</h4><button type='button' onclick='addFriend(\""+u._id+"\")'>Adicionar Amigo</button></div>";
	});

	$("#searchUsers").html(htmlusers);
}