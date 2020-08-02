var visibleComercios;

function addComerciosRows(comercios) {
	visibleComercios = comercios;
	for (i = 0; i < comercios.length; i++) {
		var comercio = comercios[i];
		var tableRow = document.createElement('tr');

		tableRow.appendChild(createCenteredTableData(comercio.nombre));
		tableRow.appendChild(createCenteredTableData(comercio.usuario));
		tableRow.appendChild(createCenteredTableData(comercio.password));
		tableRow.appendChild(createCenteredTableData(comercio.numero_dispositivos));
		tableRow.appendChild(createCenteredTableData(comercio.androidBundleId));
		tableRow.appendChild(createCenteredTableData(comercio.iosBundleId));
		tableRow.appendChild(createStatusTableData(comercio.active));
		tableRow.appendChild(createActionTableData(i));

		
		document.getElementById("comercios_table_body").appendChild(tableRow);
	}
}

function createCenteredTableData(text) {
	var tableData = document.createElement('td');
	tableData.innerHTML = text;
	tableData.className = "text-center";

	return tableData;
}

function createStatusTableData(status) {
	var tableData = document.createElement('td');
	tableData.className = "text-center";
	var span = document.createElement('span');
	var active = status;
	if (active == true) {
		span.className = "badge badge-success";
		span.innerHTML = "Activo";
	} else {
		span.className = "badge badge-danger";
		span.innerHTML = "Desactivo";
	}
	
	tableData.appendChild(span);

	return tableData;
}

function createActionTableData(position) {
	var tableData = document.createElement('td');
	tableData.className = "text-center";
	tableData.setAttribute("id", position);

	var ul = document.createElement('ul');
	ul.className = "table-controls";

	var li = document.createElement('li');

	var a = document.createElement('a');
	a.addEventListener('click', function() {
		openComercioDetail(visibleComercios[position]);
	});

	var img = document.createElement("img");
	img.setAttribute('src', 'assets/img/pencil.png');
	img.setAttribute('height', '20');
	img.setAttribute('width', '20');

	a.appendChild(img);
	li.appendChild(a);
	ul.appendChild(li);

	var li2 = document.createElement('li');

	var a2 = document.createElement('a');
	a2.addEventListener('click', function() {
		deleteComercioAlert(visibleComercios[position]);
	});

	var img2 = document.createElement("img");
	img2.setAttribute('src', 'assets/img/trash.png');
	img2.setAttribute('height', '20');
	img2.setAttribute('width', '20');

	a2.appendChild(img2);

	li2.appendChild(a2);

	ul.appendChild(li2);

	tableData.appendChild(ul);

	return tableData;
}

function deleteComercioAlert(comercio) {
	if (confirm("Se eliminarán todos los datos del comercio, ¿Estas seguro?") == true) {
		deleteComercio(comercio);
	}
}

function openComercioDetail(comercio) {
	saveComercioId(comercio.comercioId);
	saveNombreApp(comercio.nombre);
	window.open("detalleComercio.html", "_self")
}
