
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

function deleteTokenCookie(name) { 
	window.sessionStorage.removeItem("token");
}
