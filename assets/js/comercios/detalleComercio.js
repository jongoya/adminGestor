var firstUpload = new FileUploadWithPreview('fondoLoginImage');
var secondUpload = new FileUploadWithPreview('iconoAppPublico');
var thirdUpload = new FileUploadWithPreview('iconoAppPrivado');

var login = null;
var estiloPublico = null;
var estiloPrivado = null;

var fondoLoginImageSelected = false;
var iconoAppPublicoSelected = false;
var iconoAppPrivadoSelected = false;

var updateLoginButton = document.getElementById("saveLoginButton");
var updateEstiloPublicoButton = document.getElementById("saveEstiloPublicoButton");
var updateEstiloPrivadoButton = document.getElementById("saveEstiloPrivadoButton");

updateLoginButton.addEventListener("click", function() {
	updateLoginData();
});

updateEstiloPublicoButton.addEventListener("click", function() {
	updateEstiloPublicoData();
});

updateEstiloPrivadoButton.addEventListener("click", function() {
	updateEstiloPrivadoData();
});

function setFields() {
	var comercioId = getComercioId();
	var nombreApp = getNombreApp();

	getComercioDetails(comercioId, nombreApp);
}

function getComercioDetails(comercioId, nombreApp) {
	var url = baseUrl + "comercio_details";
	var params = JSON.stringify({"comercioId": comercioId, "nombre": nombreApp});
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.setRequestHeader("Authorization", "Bearer " + getTokenFromStorage());
	http.setRequestHeader("UniqueDeviceId", getUniqueDeviceIdFromStorage());
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			if (http.status == 200) {
				var jsonResponse = JSON.parse(http.responseText);
				fillComercioDetails(jsonResponse);
				fillEstiloPublicoDetails(jsonResponse);
				fillEstiloPrivadoDetails(jsonResponse);
			} else {
				alert("Error recogiendo los detalles del comercio");
			}
		}
	}

	http.send(params);
}

function fillComercioDetails(json) {
	this.login = json.login;
	document.getElementById("nombreComercio").value = json.login.nombre;
	document.getElementById("usuario").value = json.login.usuario;
	document.getElementById("password").value = json.login.password;
	document.getElementById("dispositivos").value = json.login.numero_dispositivos;
	document.getElementById("androidBundle").value = json.login.androidBundleId;
	document.getElementById("iosBundle").value = json.login.iosBundleId;
	if (json.login.active == true) {
		document.getElementById("status").checked = true;
	} else {
		document.getElementById("status").checked = false;
	}

	if (json.login.admin == true) {
		document.getElementById("admin").checked = true;
	} else {
		document.getElementById("admin").checked = false;
	}
}

function fillEstiloPublicoDetails(json) {
	if (json.estiloPublico == null) {
		this.estiloPublico = EstiloPublico(login.androidBundleId, login.iosBundleId, "", "", "#000000", "#000000", "#000000", login.nombre);
	} else {
		this.estiloPublico = json.estiloPublico;
	}

	//TODO las imagenes
	document.getElementById("colorPrimario").value = this.estiloPublico.primaryColor;
	document.getElementById("colorPrimarioTexto").value = this.estiloPublico.primaryTextColor;
	document.getElementById("colorSecundarioTexto").value = this.estiloPublico.secondaryTextColor;
}

function fillEstiloPrivadoDetails(json) {
	this.estiloPrivado = json.estiloPrivado;
	//TODO las imagenes
	document.getElementById("seccionApp").value = json.estiloPrivado.appName;
	document.getElementById("colorBackground").value = json.estiloPrivado.backgroundColor;
	document.getElementById("colorNavegacion").value = json.estiloPrivado.navigationColor;
	document.getElementById("colorPrimarioPrivado").value = json.estiloPrivado.primaryColor;
	document.getElementById("colorPrimarioTextoPrivado").value = json.estiloPrivado.primaryTextColor;
	document.getElementById("colorSecundarioAppPrivado").value = json.estiloPrivado.secondaryColor;
	document.getElementById("colorSecundarioTextoPrivado").value = json.estiloPrivado.secondaryTextColor;

}

function deleteFondoLogin() {
	fondoLoginImageSelected = false;
}

function deleteIconoAppPublico() {
	iconoAppPublicoSelected = false;
}

function deleteIconoAppPrivado() {
	iconoAppPrivadoSelected = false;
}

function updateLoginData() {
	var numDispositivos = parseInt(document.getElementById('dispositivos').value);

	if (isNaN(numDispositivos)) {
		alert("Deve incluir un numero de dipositivos válido");
		return;
	}

	login.nombre = document.getElementById("nombreComercio").value;
	login.usuario = document.getElementById("usuario").value;
	login.password = document.getElementById("password").value;
	login.numero_dispositivos = numDispositivos;
	login.androidBundleId = document.getElementById("androidBundle").value;
	login.iosBundleId = document.getElementById("iosBundle").value;
	login.active = document.getElementById("status").checked;
	login.admin = document.getElementById("admin").checked;

	updateLogin(login);
}

function updateEstiloPublicoData() {
	if (fondoLoginImageSelected) {
		var fondoLogin = getBase64StringFromImage(firstUpload);
		estiloPublico.fondoLogin = fondoLogin;
	}

	if (iconoAppPublicoSelected) {
		var iconoApp = getBase64StringFromImage(secondUpload);
		estiloPublico.iconoApp = iconoApp; 
	}

	estiloPublico.primaryColor = document.getElementById("colorPrimario").value;
	estiloPublico.primaryTextColor = document.getElementById("colorPrimarioTexto").value;
	estiloPublico.secondaryTextColor = document.getElementById("colorSecundarioTexto").value;

	updateEstiloPublico(estiloPublico);
}

function updateEstiloPrivadoData() {
	if (iconoAppPrivadoSelected) {
		var iconoApp = getBase64StringFromImage(thirdUpload);
		estiloPrivado.appSmallIcon = iconoApp;
	}

	estiloPrivado.backgroundColor = document.getElementById("colorBackground").value;
	estiloPrivado.appName = document.getElementById("seccionApp").value;
	estiloPrivado.navigationColor = document.getElementById("colorNavegacion").value;
	estiloPrivado.primaryColor = document.getElementById("colorPrimarioPrivado").value;
	estiloPrivado.primaryTextColor = document.getElementById("colorPrimarioTextoPrivado").value;
	estiloPrivado.secondaryColor = document.getElementById("colorSecundarioAppPrivado").value;
	estiloPrivado.secondaryTextColor = document.getElementById("colorSecundarioTextoPrivado").value;

	updateEstiloPrivado(estiloPrivado);
}

function getBase64StringFromImage(image) {
	var comaPosition = image.baseImage.indexOf(",");
	return image.baseImage.slice(comaPosition + 1);
}