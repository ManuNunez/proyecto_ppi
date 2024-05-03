document.addEventListener("DOMContentLoaded", function () {

    // Function to fetch insureds and populate the select options
    function fetchInsuredsAndPopulateSelect() {
        const apiUrl = "http://localhost:8080/insureds"; // Endpoint for fetching insureds

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(insureds => {
                const insuredOwnerSelect = document.getElementById("insuredOwner");
                insureds.forEach(insured => {
                    const option = document.createElement("option");
                    option.value = insured.id;
                    option.textContent = insured.name;
                    insuredOwnerSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching insureds:', error);
                // Handle error here
            });
    }

    // Call the function to fetch insureds and populate the select options
    fetchInsuredsAndPopulateSelect();

    // Function to register a new policy
    function policyRegister() {
        const formPolicyNumber = document.getElementById("policyNumber").value;
        const formInsuredId = document.getElementById("insuredOwner").value; // Changed to get the selected insured ID
        const formInsuredVehicle = document.getElementById("insuredVehicle").value;
        const formPolicyType = document.getElementById("policyType").value;

        const newPolicy = {
            policy_number: formPolicyNumber,
            insured_id: formInsuredId,
            insured_vehicle: formInsuredVehicle,
            policy_type: formPolicyType
        };

        const apiUrl = "http://localhost:8080/polices"; // Assuming this is the correct API endpoint

        // Configure the request
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPolicy)
        };

        // Make the POST request
        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(policyFromAPI => {
                console.log('New policy created:', policyFromAPI);
                // Clear the form fields
                cleanFormFields();
                alert("¡Póliza registrada con éxito!");
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error here
            });
    }

    // Function to clean form fields
    function cleanFormFields() {
        document.getElementById("policyNumber").value = "";
        document.getElementById("insuredVehicle").value = "";
        document.getElementById("policyType").value = "";
    }

    // Add event listener to the register button
    const savePolicyButton = document.getElementById("savePolicyButton");
    if (savePolicyButton) {
        savePolicyButton.addEventListener("click", function () {
            policyRegister();
        });
    } else {
        console.error("No se encontró el botón de registro de póliza.");
    }

});
