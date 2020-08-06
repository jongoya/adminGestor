var baseUrl = "https://gestor.djmrbug.com:8443/api/";
var localBaseUrl = "https://localhost:8443/api/";

function loginAdmin() {
    showLoadingState();
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
		hideLoadingState();
		if (http.readyState == 4) {
			if (http.status == 200) {
				collectLoginResponse(http.responseText);
				window.location.replace("plataforma.html");
			} else if (http.status == 411) {
				document.getElementById("header").appendChild(createAlertMessage("Este usuario no existe"));
			} else if (http.status == 412) {
				document.getElementById("header").appendChild(createAlertMessage("La contraseña es erronea"));
			} else {
				document.getElementById("header").appendChild(createAlertMessage("Error iniciando sesión intentelo de nuevo"));
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
    showLoadingState();
	var url = baseUrl + "get_comercios";
	var http = new XMLHttpRequest();
	http.open("GET", url, true);
	http.setRequestHeader("Authorization", "Bearer " + getTokenFromStorage());
	http.setRequestHeader("UniqueDeviceId", getUniqueDeviceIdFromStorage());
	http.onreadystatechange = function() {
		hideLoadingState();
		if (http.readyState == 4) {
			if (http.status == 200) {
				var jsonResponse = JSON.parse(http.responseText);
				addComerciosRows(jsonResponse);
			} else {
				document.getElementById("header").appendChild(createAlertMessage("Error recogiendo los comercios, recarge la pagina nuevamente"));
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
				document.getElementById("header").appendChild(createAlertMessage("Error creando comercio"));
			}
		}
	}

	http.send(params);
}

function deleteComercio(comercio) {
    showLoadingState();
	var url = baseUrl + "delete_comercio";
	var params = JSON.stringify({"comercioId": comercio.comercioId, "nombre": comercio.nombre});
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.setRequestHeader("Authorization", "Bearer " + getTokenFromStorage());
	http.setRequestHeader("UniqueDeviceId", getUniqueDeviceIdFromStorage());
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {
		hideLoadingState();
		if (http.readyState == 4) {
			if (http.status == 200) {
				window.location.reload();
			} else {
				document.getElementById("header").appendChild(createAlertMessage("Error eliminando comercio"));
			}
		}
	}

	http.send(params);
}


function updateLogin(login) {
	var url = baseUrl + "update_login";
	var params = JSON.stringify({"comercioId": login.comercioId, "nombre": login.nombre, "usuario": login.usuario, "password" : login.password, 
		"androidBundleId" : login.androidBundleId != null ? login.androidBundleId : "", "iosBundleId" : login.iosBundleId != null ? login.iosBundleId : "", 
		"numero_dispositivos" : login.numero_dispositivos, "active" : login.active});
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.setRequestHeader("Authorization", "Bearer " + getTokenFromStorage());
	http.setRequestHeader("UniqueDeviceId", getUniqueDeviceIdFromStorage());
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			if (http.status == 200) {
				var jsonResponse = JSON.parse(http.responseText);
				saveNombreApp(jsonResponse.nombre);
				document.getElementById("header").appendChild(createInformationMessage("Datos del login actualizados"));
			} else {
				document.getElementById("header").appendChild(createAlertMessage("Error Actualizando datos del login, inténtelo de nuevo"));
			}
		}
	}

	http.send(params);
}

function updateEstiloPublico(estiloPublico) {
	var url = baseUrl + "update_estilo_publico";
	var params = JSON.stringify({"estiloId": estiloPublico.estiloId, "androidBundleId": estiloPublico.androidBundleId, "iosBundleId": estiloPublico.iosBundleId, "fondoLogin" : estiloPublico.fondoLogin, 
		"primaryTextColor" : estiloPublico.primaryTextColor, "secondaryTextColor" : estiloPublico.secondaryTextColor, 
		"primaryColor" : estiloPublico.primaryColor, "nombreApp" : estiloPublico.nombreApp, "iconoApp" : estiloPublico.iconoApp});
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.setRequestHeader("Authorization", "Bearer " + getTokenFromStorage());
	http.setRequestHeader("UniqueDeviceId", getUniqueDeviceIdFromStorage());
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			if (http.status == 200) {
				document.getElementById("header").appendChild(createInformationMessage("Datos del estilo público actualizados"));
			} else {
				document.getElementById("header").appendChild(createAlertMessage("Error Actualizando datos del estilo público, inténtelo de nuevo"));
			}
		}
	}

	http.send(params);
}

function updateEstiloPrivado(estiloPrivado) {
	var url = baseUrl + "update_estilo_privado";
	var params = JSON.stringify({"estiloId": estiloPrivado.estiloId, "comercioId": estiloPrivado.comercioId, "primaryTextColor": estiloPrivado.primaryTextColor, "secondaryTextColor" : estiloPrivado.secondaryTextColor, 
		"primaryColor" : estiloPrivado.primaryColor, "secondaryColor" : estiloPrivado.secondaryColor, 
		"backgroundColor" : estiloPrivado.backgroundColor, "navigationColor" : estiloPrivado.navigationColor, "appSmallIcon" : estiloPrivado.appSmallIcon, "appName" : estiloPrivado.appName});
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.setRequestHeader("Authorization", "Bearer " + getTokenFromStorage());
	http.setRequestHeader("UniqueDeviceId", getUniqueDeviceIdFromStorage());
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			if (http.status == 200) {
				document.getElementById("header").appendChild(createInformationMessage("Datos del estilo privado actualizados"));
			} else {
				document.getElementById("header").appendChild(createAlertMessage("Error Actualizando datos del estilo privado, inténtelo de nuevo"));
			}
		}
	}

	http.send(params);

}