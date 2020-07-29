
var togglePassword = document.getElementById("toggle-password");
var formContent = document.getElementsByClassName('form-content')[0]; 
var getFormContentHeight = formContent.clientHeight;

var formImage = document.getElementsByClassName('form-image')[0];
if (formImage) {
	var setFormImageHeight = formImage.style.height = getFormContentHeight + 'px';
}
if (togglePassword) {
	togglePassword.addEventListener('click', function() {
	  var x = document.getElementById("password");
	  if (x.type === "password") {
	    x.type = "text";
	  } else {
	    x.type = "password";
	  }
	});
}

var loginButton = document.getElementsByClassName('btn-primary')[0];
loginButton.addEventListener('click', function() {
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var nombreApp = "heme_gestor";
	var deviceId = "web";
	var modeloMovil = "web";
	var url = "https://localhost:8443/api/login_comercio";
	var params = JSON.stringify({"usuario": username, "password": password, "nombre_dispositivo" : modeloMovil, "unique_deviceId" : deviceId, "nombre" : nombreApp});
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			if (http.status == 200) {
				collectLoginResponse(http.responseText);
			} else if (http.status == 411) {
				alert("Este usuario no existe en este comercio");
			} else if (http.status == 412) {
				alert("La contraseña es erronea");
			} else if (http.status == 413) {
				alert("Ha superado el límite de conexiones disponibles");
			} else {
				alert("Error iniciando sesión intentelo de nuevo");
			}
		}
	}

	http.send(params);
});

function collectLoginResponse(loginResponse) {
	//TODO hay que guardar todos estos datos
	var jsonResponse = JSON.parse(loginResponse);
	var login = jsonResponse.login;
	var dispositivos = jsonResponse.dispositivos;
	var estiloPrivado = jsonResponse.estiloPrivado;
	setTokenInStorage(login.token);

	window.location.replace("plataforma.html");
}