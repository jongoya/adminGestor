function EstiloPublico(androidBundleId, iosBundleId, fondoLogin, iconoApp, primaryColor, primaryTextColor, secondaryTextColor, nombreApp) {
	this.estiloId = 0;
	this.androidBundleId = androidBundleId;
	this.iosBundleId = iosBundleId;
	this.fondoLogin = fondoLogin;
	this.iconoApp = iconoApp;
	this.primaryColor = primaryColor;
	this.primaryTextColor = primaryTextColor;
	this.secondaryTextColor = secondaryTextColor;
	this.nombreApp = nombreApp;

	return this;
}