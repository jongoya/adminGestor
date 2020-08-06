var loadingState;

function addLoadingState(parent) {
	loadingState = document.createElement("div");
	loadingState.style.width = "100%";
	loadingState.style.top = 0;
	loadingState.style.bottom = 0;
	loadingState.style.left = 0;
	loadingState.style.right = 0;
	loadingState.style.visibility = "hidden";
	loadingState.style.position = 'absolute';
	loadingState.style.zIndex = "3000";
	loadingState.style.textAlign = "center";

	var opacity = document.createElement("div");
	opacity.style.backgroundColor = "#000000";
	opacity.style.width = "100%";
	opacity.style.height = "100%";
	opacity.style.position = 'absolute';
	opacity.style.zIndex = "100";
	opacity.style.opacity = "0.5";

	var loadingView = document.createElement("div");
	loadingView.className = "spinner-border text-primary  align-self-center";
	loadingView.style.marginTop = (screen.height / 2) - 50 + "px";

	loadingState.appendChild(opacity);

	loadingState.appendChild(loadingView);

	parent.prepend(loadingState);
}

function showLoadingState() {
	loadingState.style.visibility = "visible";
}

function hideLoadingState() {
	loadingState.style.visibility = "hidden";
}