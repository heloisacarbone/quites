function closeOverlay() {
    $(".overlay .debt").html("");
	$(".overlay").css("visibility", "hidden");
}

function openOverlay() {
	$(".overlay").css("visibility", "visible");
}

function addDebtOverlay() {
	var html = '<div><div><h2>Adicionar Divida</h2></div><div></div></div><button type="button" class="btnSair" onClick="closeOverlay()">X</button><input type="text" placeholder="R$ 000.00"><div id="friendsdebt"></div><button type="button" onclick="addDebt()">Adicionar Divida</button>';
	$(".overlay .debt").html(html);
}

function addLoadOverlay() {
    var html = '<div><div><h2>Dividas</h2></div><div></div></div><button type="button" class="btnSair" onClick="closeOverlay()">X</button><div id="friendsdebt"></div>';
    $(".overlay .debt").html(html);   
}

function openDebtOverlay(){
	openOverlay();
	addDebtOverlay();
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

function loadDebt() {
	var socket = io.connect("/");
	var data = {
        action_type: "loadDebt",
        message: {
            user_id: getCookies().client_id
        }
    };

    socket.send(JSON.stringify(data));

    socket.on("message",function(message){

        message = JSON.parse(message);

        if (message.data !== undefined) {
			var html = "";
            message.data.forEach( function (a) {
                if (a.owner === getCookies().client_id) {
                    var v = Number(a.value)/a.users.length * (a.users.length - 1);
                    html+='<div><div class="label">Você receberá R$' + v.toFixed(2) +' de';
                    a.users.forEach(function(u, i) {
                        html += ' ';

                        if (i > 1) {

                            html += 'e ';
                        }

                        if (u.id !== getCookies().client_id) {
                            html += u.name;
                        }
                    });
                    html += "</div><div class='inputcheck'><button onclick='quitar(\"" + a._id.trim() + "\")''>Quites</button></div></div>";
                }   else {
                    var v = Number(a.value)/a.users.length;
                    html+='<div><div class="label">Você precisa pagar R$' + v.toFixed(2) +' para ';
                    a.users.forEach(function(u) {
                        if (u.id === a.owner) {
                            html += u.name;
                        }
                    });
                    html += '</div></div>';
                }     
                $("#friendsdebt").html(html);
        		
			});


        }

    });
}

function viewDebt() {
    openOverlay();
    addLoadOverlay();
    loadDebt();
}

function quitar(id) {
    var socket = io.connect("/");
    var data = {
        action_type: "quitar",
        message: {
            user_id: getCookies().client_id,
            debt_id: id
            
        }
    };

    socket.send(JSON.stringify(data));

    socket.on("message",function(message){

        message = JSON.parse(message);

        if (message.data !== undefined) {

            alert("Divida Quitada");

            closeOverlay();
            

        }

    });
}
