
    const url = "http://localhost:8080/insureds";

    // Function to populate table from JSON data
    async function populateTableFromJSON(url) {
        cleanTableRows();
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue válida. Código de estado: ' + response.status);
            }
            const allInsuredsFromDB = await response.json();
            const tableBody = document.querySelector("#insuredTable tbody");
            allInsuredsFromDB.forEach(insured => {
                const row = document.createElement("tr");
                let idNumber = insured.id;
                row.innerHTML = `
                    <td class="id">${idNumber}</td>
                    <td contenteditable="false">${insured.name}</td>
                    <td contenteditable="false">${insured.phone}</td>
                    <td>
                        <button type="button" class="btn btn-danger" id="${idNumber}" onclick="deleteInsuredButton(id)">Eliminar</button>
                        <button type="button" class="btn btn-warning" id="${idNumber}" onclick="editInsured(id)">Editar</button>
                    </td>
                `;
                row.setAttribute("id", idNumber);
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Hubo un problema con la operación de obtención de datos:', error);
        }
    }

    // Call the function to populate table
    populateTableFromJSON(url);

    function editInsured(buttonPressId) {
        // Obtener la fila que fue seleccionada
        let row = document.getElementById(buttonPressId);

        let nameCell = row.children.item(1);
        let phoneCell = row.children.item(2);

        // Cambiar la propiedad contenteditable
        nameCell.setAttribute("contenteditable", "true");
        phoneCell.setAttribute("contenteditable", "true");

        // Poner el foco sobre la primera celda editable
        row.children.item(1).focus();

        // Cambiar el texto y color del botón de editar por "Guardar"
        let editButton = row.children.item(3).children.item(1);
        editButton.setAttribute("class","btn btn-success");
        editButton.innerHTML = "Guardar";

        // Al presionar el botón de guardar, llamar al método saveInsured con los datos de la fila
        editButton.setAttribute("onClick","saveInsured("+buttonPressId+")");
    }

    function saveInsured(idButtonPress) {
        let row = document.getElementById(idButtonPress);

        let idCell = row.children.item(0);
        let nameCell = row.children.item(1);
        let phoneCell = row.children.item(2);

        const insuredUpdated = {
            id: idCell.innerHTML,
            name: nameCell.innerHTML,
            phone: phoneCell.innerHTML
        };

        const apiUrl = "http://localhost:8080/insureds";

        // Configurar la solicitud
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(insuredUpdated)
        };

        // Realizar la solicitud PUT
        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP! Estado: ${response.status}`);
                }
                return response.json();
            })
            .then(insuredFromAPI => {
                console.log('Éxito:', insuredFromAPI);
                populateTableFromJSON(url);
            })
            .catch(error => {
                console.error('Error:', error);
                // Manejar el error aquí
            });
    }

    function cleanTableRows() {
        var tableHeaderRowCount = 1;
        var table = document.getElementById('insuredTable');
        var rowCount = table.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            table.deleteRow(tableHeaderRowCount);
        }
    }

    function deleteInsuredButton(id) {
        if (confirm("¿Estás seguro de eliminar el asegurado con ID: " + id + "?")) {
            deleteInsured(id);
        } else {
            console.log("No se eliminó el asegurado");
        }
    }

    function deleteInsured(id) {
        const deleteUrl = "http://localhost:8080/insureds/deleteInsuredById?id=" + id;
        fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue válida');
                }
                return response;
            })
            .then(data => {
                console.log('OK', data);
                populateTableFromJSON(url);
            })
            .catch(error => {
                console.error('Hubo un problema con la operación de obtención de datos:', error);
            });
    }

