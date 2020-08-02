var firstUpload = new FileUploadWithPreview('myFirstImage');
var secondUpload = new FileUploadWithPreview('mySecondImage');
var thirdUpload = new FileUploadWithPreview('myThirdImage');

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
}

function fillEstiloPublicoDetails(json) {

}

function fillEstiloPrivadoDetails(json) {

}