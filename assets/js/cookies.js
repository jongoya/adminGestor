
function checkTokenInStorage() {
	var token = window.sessionStorage.getItem("token");
	if (token == null) {
		alert("No dispone de permisos, inicie sesión");
		window.location.replace("loginGestor.html");
	}
}

function setTokenInStorage(tokenValue) {
	window.sessionStorage.setItem("token", tokenValue);
}

function getTokenFromStorage() {
	return window.sessionStorage.getItem("token");
}

function deleteTokenCookie() { 
	window.sessionStorage.removeItem("token");
}

function setUniqueDeviceIdInStorage(uniqueDeviceId) {
	window.sessionStorage.setItem("uniqueDeviceId", uniqueDeviceId);
}

function getUniqueDeviceIdFromStorage() {
	return window.sessionStorage.getItem("uniqueDeviceId");
}

function deleteUniqueDeviceCookie() {
	window.sessionStorage.removeItem("uniqueDeviceId");
}

