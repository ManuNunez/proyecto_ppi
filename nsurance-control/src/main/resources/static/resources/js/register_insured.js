document.addEventListener("DOMContentLoaded", function () {

    // Function to register a new insured
    function insuredRegister() {
        const formInsuredName = document.getElementById("insuredName").value;
        const formInsuredPhone = document.getElementById("insuredPhone").value;

        const newInsured = {
            name: formInsuredName,
            phone: formInsuredPhone
        };

        const apiUrl = "http://localhost:8080/insureds";

        // Configure the request
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newInsured)
        };

        // Make the POST request
        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(insuredFromAPI => {
                console.log('New insured created:', insuredFromAPI);
                // Clear the form fields
                cleanFormFields();
                alert("¡Asegurado registrado con éxito!");
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error here
            });
    }

    // Function to clean form fields
    function cleanFormFields() {
        document.getElementById("insuredName").value = "";
        document.getElementById("insuredPhone").value = "";
    }

    // Add event listener to the register button
    const registerButton = document.getElementById("registerButton");
    if(registerButton) {
        registerButton.addEventListener("click", function () {
            insuredRegister();
        });
    } else {
        console.error("No se encontró el botón de registro.");
    }

});
