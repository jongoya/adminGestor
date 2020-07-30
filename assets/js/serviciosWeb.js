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