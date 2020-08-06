function createAlertMessage(text) {
	var alertDiv = document.createElement('div');
	alertDiv.setAttribute("id", "alertContent");
	alertDiv.className = "alert alert-arrow-right alert-icon-right alert-light-danger mb-4 alert_generic";
	alertDiv.setAttribute("role", "alert");

	var button = document.createElement('button');
	button.setAttribute("type", "button");
	button.className = "close";
	button.setAttribute("data-dismiss", "alert");
	button.setAttribute("aria-label", "Close");

	var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svg.setAttribute("data-dismiss", "alert");
	svg.setAttribute("width", "24");
	svg.setAttribute("height", "24");
	svg.setAttribute("viewBox", "0 0 24 24");
	svg.setAttribute("fill", "none");
	svg.setAttribute("stroke", "currentColor");
	svg.setAttribute("stroke-width", "2");
	svg.setAttribute("stroke-linecap", "round");
	svg.setAttribute("stroke-linejoin", "round");
	svg.setAttribute("class", "feather feather-x close");

	var line1 = document.createElementNS("http://www.w3.org/2000/svg","line");
	line1.setAttribute("x1", "18");
	line1.setAttribute("y1", "6");
	line1.setAttribute("x2", "6");
	line1.setAttribute("y2", "18");

	var line2 = document.createElementNS("http://www.w3.org/2000/svg","line");
	line2.setAttribute("x1", "6");
	line2.setAttribute("y1", "6");
	line2.setAttribute("x2", "18");
	line2.setAttribute("y2", "18");


	var svg2 = document.createElementNS("http://www.w3.org/2000/svg","svg");
	svg2.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svg2.setAttribute("width", "24");
	svg2.setAttribute("height", "24");
	svg2.setAttribute("viewBox", "0 0 24 24");
	svg2.setAttribute("fill", "none");
	svg2.setAttribute("stroke", "currentColor");
	svg2.setAttribute("stroke-width", "2");
	svg2.setAttribute("stroke-linecap", "round");
	svg2.setAttribute("stroke-linejoin", "round");
	svg2.setAttribute("class", "feather feather-alert-circle");

	var circle1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
	circle1.setAttribute("cx", "12");
	circle1.setAttribute("cy", "12");
	circle1.setAttribute("r", "10");

	var line3 = document.createElementNS("http://www.w3.org/2000/svg","line");
	line3.setAttribute("x1", "12");
	line3.setAttribute("y1", "8");
	line3.setAttribute("x2", "12");
	line3.setAttribute("y2", "12");


	var line4 = document.createElementNS("http://www.w3.org/2000/svg","line");
	line4.setAttribute("x1", "12");
	line4.setAttribute("y1", "16");
	line4.setAttribute("x2", "12");
	line4.setAttribute("y2", "16");

	var strong = document.createElement("strong");
	strong.setAttribute("id", "alertMessage");
	strong.style.marginRight = "15px";
	strong.innerHTML = text;

	alertDiv.style.marginLeft = window.screen.width + "px";
	alertDiv.style.marginTop = "75px";

	button.appendChild(svg);
	svg.appendChild(line1);
	svg.appendChild(line2);
	alertDiv.appendChild(button);

	svg2.appendChild(circle1);
	svg2.appendChild(line3);
	svg2.appendChild(line4);

	alertDiv.appendChild(svg2);
	alertDiv.appendChild(strong);

	setTimeout(function () {
    	moveMessage(alertDiv);
    }, 100);

	return alertDiv;
}

function createInformationMessage(text) {
	var alertDiv = document.createElement('div');
	alertDiv.setAttribute("id", "alertContent");
	alertDiv.className = "alert alert-arrow-left alert-icon-left alert-light-primary mb-4 alert_generic";
	alertDiv.setAttribute("role", "alert");
	var button = document.createElement('button');
	button.setAttribute("type", "button");
	button.className = "close";
	button.setAttribute("onclick", "hideAlertMessage()");
	button.setAttribute("data-dismiss", "alert");
	button.setAttribute("aria-label", "Close");

	var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svg.setAttribute("data-dismiss", "alert");
	svg.setAttribute("width", "24");
	svg.setAttribute("height", "24");
	svg.setAttribute("viewBox", "0 0 24 24");
	svg.setAttribute("fill", "none");
	svg.setAttribute("stroke", "currentColor");
	svg.setAttribute("stroke-width", "2");
	svg.setAttribute("stroke-linecap", "round");
	svg.setAttribute("stroke-linejoin", "round");
	svg.setAttribute("class", "feather feather-x close");

	var line1 = document.createElementNS("http://www.w3.org/2000/svg","line");
	line1.setAttribute("x1", "18");
	line1.setAttribute("y1", "6");
	line1.setAttribute("x2", "6");
	line1.setAttribute("y2", "18");

	var line2 = document.createElementNS("http://www.w3.org/2000/svg","line");
	line2.setAttribute("x1", "6");
	line2.setAttribute("y1", "6");
	line2.setAttribute("x2", "18");
	line2.setAttribute("y2", "18");


	var svg2 = document.createElementNS("http://www.w3.org/2000/svg","svg");
	svg2.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svg2.setAttribute("width", "24");
	svg2.setAttribute("height", "24");
	svg2.setAttribute("viewBox", "0 0 24 24");
	svg2.setAttribute("fill", "none");
	svg2.setAttribute("stroke", "currentColor");
	svg2.setAttribute("stroke-width", "2");
	svg2.setAttribute("stroke-linecap", "round");
	svg2.setAttribute("stroke-linejoin", "round");
	svg2.setAttribute("class", "feather feather-alert-circle");

	var path1 = document.createElementNS("http://www.w3.org/2000/svg","path");
	path1.setAttribute("d", "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9");

	var path2 = document.createElementNS("http://www.w3.org/2000/svg","path");
	path2.setAttribute("d", "M13.73 21a2 2 0 0 1-3.46 0");

	var strong = document.createElement("strong");
	strong.setAttribute("id", "alertMessage");
	strong.style.marginRight = "15px";
	strong.innerHTML = text;

	alertDiv.style.marginLeft = window.screen.width + "px";
	alertDiv.style.marginTop = "75px";

	button.appendChild(svg);
	svg.appendChild(line1);
	svg.appendChild(line2);
	alertDiv.appendChild(button);

	svg2.appendChild(path1);
	svg2.appendChild(path2);

	alertDiv.appendChild(svg2);
	alertDiv.appendChild(strong);

	setTimeout(function () {
    	moveMessage(alertDiv);
    }, 100);

	return alertDiv;
}


function moveMessage(div) {
	div.classList.add('horizTranslate');
}