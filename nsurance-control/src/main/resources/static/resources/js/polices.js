document.addEventListener("DOMContentLoaded", function () {

    const url = "http://localhost:8080/polices";

    // Function to populate table from JSON data
    async function populateTableFromJSON(url) {
        cleanTableRows();
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue válida. Código de estado: ' + response.status);
            }
            const allPoliciesFromDB = await response.json();
            const tableBody = document.querySelector("#policyTable tbody");
            allPoliciesFromDB.forEach(policy => {
                const row = document.createElement("tr");
                let idNumber = policy.id;
                row.innerHTML = `
                    <td class="id">${idNumber}</td>
                    <td contenteditable="false">${policy.policyNumber}</td>
                    <td contenteditable="false">${policy.insuredId}</td>
                    <td contenteditable="false">${policy.insuredVehicle}</td>
                    <td contenteditable="false">${policy.policyType}</td>
                    <td><button type="button" class="btn btn-danger" id="${idNumber}" onclick="deletePolicyButton(id)">Eliminar</button>
                    <button type="button" class="btn btn-warning" id="${idNumber}" onclick="editPolicy(id)">Editar</button></td>
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

    function editPolicy(buttonPressId) {
        // Obtener la fila que fue seleccionada
        let row = document.getElementById(buttonPressId);

        let policyNumberCell = row.children.item(1);
        let insuredIdCell = row.children.item(2);
        let insuredVehicleCell = row.children.item(3);
        let policyTypeCell = row.children.item(4);

        // Cambiar la propiedad contenteditable
        policyNumberCell.setAttribute("contenteditable", "true");
        insuredIdCell.setAttribute("contenteditable", "true");
        insuredVehicleCell.setAttribute("contenteditable", "true");
        policyTypeCell.setAttribute("contenteditable", "true");

        // Poner el foco sobre la primera celda editable
        row.children.item(1).focus();

        // Cambiar el texto y color del botón de editar por "Guardar"
        let editButton = row.children.item(5).children.item(1);
        editButton.setAttribute("class","btn btn-success");
        editButton.innerHTML = "Guardar";

        // Al presionar el botón de guardar, llamar al método savePolicy con los datos de la fila
        editButton.setAttribute("onClick","savePolicy("+buttonPressId+")");
    }

    function savePolicy(idButtonPress) {
        let row = document.getElementById(idButtonPress);

        let idCell = row.children.item(0);
        let policyNumberCell = row.children.item(1);
        let insuredIdCell = row.children.item(2);
        let insuredVehicleCell = row.children.item(3);
        let policyTypeCell = row.children.item(4);

        const policyUpdated = {
            id: idCell.innerHTML,
            policyNumber: policyNumberCell.innerHTML,
            insuredId: insuredIdCell.innerHTML,
            insuredVehicle: insuredVehicleCell.innerHTML,
            policyType: policyTypeCell.innerHTML
        };

        const apiUrl = "http://localhost:8080/polices";

        // Configurar la solicitud
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(policyUpdated)
        };

        // Realizar la solicitud PUT
        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP! Estado: ${response.status}`);
                }
                return response.json();
            })
            .then(policyFromAPI => {
                console.log('Éxito:', policyFromAPI);
                populateTableFromJSON(url);
            })
            .catch(error => {
                console.error('Error:', error);
                // Manejar el error aquí
            });
    }

    function cleanTableRows() {
        var tableHeaderRowCount = 1;
        var table = document.getElementById('policyTable');
        var rowCount = table.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            table.deleteRow(tableHeaderRowCount);
        }
    }

    function deletePolicyButton(id) {
        if (confirm("¿Estás seguro de eliminar la póliza con ID: " + id + "?")) {
            deletePolicy(id);
        } else {
            console.log("No se eliminó la póliza");
        }
    }

    function deletePolicy(id) {
        const deleteUrl = "http://localhost:8080/polices/deletePolicyById?id=" + id;
        fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                // Agregar cualquier otra cabecera si es necesario
            },
            // Puedes incluir un cuerpo de solicitud si es necesario
            // body: JSON.stringify({ id: id })
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
                // Manejar errores, mostrar un mensaje de error o volver a intentar la operación
            });
    }
});
