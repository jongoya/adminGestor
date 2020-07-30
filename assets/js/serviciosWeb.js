var baseUrl = "https://gestor.djmrbug.com:8443/api/";

function loginAdmin() {
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var nombreApp = "webAdmin";
	var deviceId = "web";
	var modeloMovil = "web";
	var url = baseUrl + "login_admin";
	var params = JSON.stringify({"usuario": username, "password": password, "nombre_dispositivo" : modeloMovil, "unique_deviceId" : deviceId, "nombre" : nombreApp});
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			if (http.status == 200) {
				collectLoginResponse(http.responseText);
				window.location.replace("plataforma.html");
			} else if (http.status == 411) {
				alert("Este usuario no existe");
			} else if (http.status == 412) {
				alert("La contraseña es erronea");
			} else {
				alert("Error iniciando sesión intentelo de nuevo");
			}
		}
	}

	http.send(params);
}

function collectLoginResponse(loginResponse) {
	var jsonResponse = JSON.parse(loginResponse);
	setTokenInStorage(jsonResponse.token);
	setUniqueDeviceIdInStorage(jsonResponse.unique_deviceId);
}

function getComercios() {
	var url = baseUrl + "get_comercios";
	var http = new XMLHttpRequest();
	http.open("GET", url, true);
	http.setRequestHeader("Authorization", "Bearer " + getTokenFromStorage());
	http.setRequestHeader("UniqueDeviceId", getUniqueDeviceIdFromStorage());
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			if (http.status == 200) {
				var jsonResponse = JSON.parse(http.responseText);
				addComerciosRows(jsonResponse);
			} else {
				alert("Error iniciando sesión intentelo de nuevo");
			}
		}
	}

	http.send();
}

function addComercio() {
	var nombreComercio = document.getElementById('nombreInput').value;
	var usuario = document.getElementById('usuarioInput').value;
	var password = document.getElementById('passInput').value;
	var numDispositivos = parseInt(document.getElementById('numDevicesInput').value);

	if (nombreComercio.length < 6) {
		alert("El comercio deve ser único y al menos tener 6 letras");
		return;
	}

	if (usuario.length < 6) {
		alert("El usuario deve contener al menos 6 letras");
		return;
	}

	if (password.length  < 6) {
		alert("La contraseña deve contener al menos 6 letras");
		return;
	}

	if (isNaN(numDispositivos)) {
		alert("Deve incluir un numero válido");
		return;
	}

	var url = baseUrl + "register_comercio";
	var params = JSON.stringify({"nombre": nombreComercio, "usuario": usuario, "password" : password, "numero_dispositivos" : numDispositivos, "active" : "false"});
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.setRequestHeader("Authorization", "Bearer " + getTokenFromStorage());
	http.setRequestHeader("UniqueDeviceId", getUniqueDeviceIdFromStorage());
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			if (http.status == 201) {
				window.location.replace("comercios.html");
			} else {
				alert("Error creando comercio");
			}
		}
	}

	http.send(params);
}