var cerrarSessionButton = document.getElementsByClassName('cerrarSessionButton')[0];
cerrarSessionButton.addEventListener('click', function() {
	deleteTokenCookie();
	deleteUniqueDeviceCookie();
	window.location.replace("loginGestor.html");
});