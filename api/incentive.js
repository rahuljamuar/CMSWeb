var baseURL = myBaseURL();

function getAllIncentive() {
    // Define the URL of the API
    const apiUrl = baseURL + "/incentive/";

    
    // Define the headers for the request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('email', 'rahuljamuar@hotmail.com')
    headers.append('token', 'test')

    // Define the options for the fetch request
    const requestOptions = {
        method: 'GET',
        headers: headers
    };
    // Make the API call using fetch
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON returned by the API
        })
        .then(data => {
            // Handle the data returned by the API
            console.log('API Response:', data);
            var count = Object.keys(data).length;
            console.log(count);
            var dataSet = [];
            
            for (i = 0; i < count; i++) {
                var current_row = [];
                var incentive_id = encodeURIComponent(data[i]["incentive_id"]);
                incentive_id = '<a style="color: blue;" href="edit-incentive.html?incentive_id=' + incentive_id + '">' + data[i]["incentive_id"] + '</a>' ;
                current_row.push(incentive_id);
                current_row.push(data[i]["driver_id"]);
                current_row.push(data[i]["vehicle_registration_id"]);
                current_row.push(data[i]["amount"]);
                dataSet.push(current_row);
            }
            
            dataSet.forEach(r => {
                var div1 = document.createElement('div');
                div1.innerHTML = r[1];
                r[1] = div1;
             
                var div3 = document.createElement('div');
                div3.innerHTML = r[3];
                r[3] = div3;
            })
             
            new DataTable('#incentive_table', {
                columns: [
                    { title: 'ID' },
                    { title: 'Driver' },
                    { title: 'Assigned Vehicle' },
                    { title: 'Amount' }
                ],
                data: dataSet
            });
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}


function createIncentive() {
    $('#loading').show();
    var driver = document.getElementById("driver").value;
    var vehicle = document.getElementById("vehicle").value;
    var incentive_date = document.getElementById("incentive_date").value;
    var incentive_amount = document.getElementById("incentive_amount").value;
    var reason = document.getElementById("reason").value;

    // Define the URL of the API
    const apiUrl = baseURL + "/incentive/";

    // Define the data to be sent in the request body
    const requestData = {
        "driver_id": driver,
        "vehicle_registration_id": vehicle,
        "incentive_date": incentive_date,
        "amount": incentive_amount,
        "reason": reason,
        
    };

    // Convert the data to JSON format
    const jsonData = JSON.stringify(requestData);
    console.log(jsonData);

    // Define the headers for the request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('email', 'rahuljamuar@hotmail.com')
    headers.append('token', 'test')

    // Define the options for the fetch request
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: jsonData
    };

    // Make the API call using fetch
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                $('#loading').hide();
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON returned by the API
        })
        .then(data => {
            // Handle the data returned by the API
            console.log('API Response:', data);
            
            $('#loading').hide();
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
            $('#loading').hide();
        });
}

async function getAIncentive(incentive_id) {
    // Define the URL of the API
    const apiUrl = baseURL + "/incentive/incentive_id/" + incentive_id;

    
    // Define the headers for the request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('email', 'rahuljamuar@hotmail.com')
    headers.append('token', 'test')

    // Define the options for the fetch request
    const requestOptions = {
        method: 'GET',
        headers: headers
    };
    // Make the API call using fetch
    await fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON returned by the API
        })
        .then(data => {
            // Handle the data returned by the API
            console.log('API Response:', data);
            document.getElementById("incentive_id").value = data.incentive_id;
            document.getElementById("driver").value = data.driver_id;
            var incentive_date = data.incentive_date.toString().split("T");
            incentive_date = incentive_date[0];
            document.getElementById("vehicle").value = data.vehicle_registration_id;
            document.getElementById("incentive_date").value = incentive_date;
            document.getElementById("incentive_amount").value = data.amount;
            document.getElementById("reason").value = data.reason;
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function updateIncentive() {
    $('#loading').show();
    var incentive_id = document.getElementById("incentive_id").value;
    var driver = document.getElementById("driver").value;
    var vehicle = document.getElementById("vehicle").value;
    var incentive_date = document.getElementById("incentive_date").value;
    var incentive_amount = document.getElementById("incentive_amount").value;
    var reason = document.getElementById("reason").value;

    // Define the URL of the API
    const apiUrl = baseURL + "/incentive/";

    // Define the data to be sent in the request body
    const requestData = {
        "incentive_id": incentive_id,
        "driver_id": driver,
        "vehicle_registration_id": vehicle,
        "incentive_date": incentive_date,
        "amount": incentive_amount,
        "reason": reason,
        
    };
    
    // Convert the data to JSON format
    const jsonData = JSON.stringify(requestData);
    console.log('Request:', jsonData);


    // Define the headers for the request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('email', 'rahuljamuar@hotmail.com')
    headers.append('token', 'test')

    // Define the options for the fetch request
    const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: jsonData
    };

    // Make the API call using fetch
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                $('#loading').hide();
                throw new Error('Network response was not ok');
                
            }
            return response.json(); // Parse the JSON returned by the API
        })
        .then(data => {
            // Handle the data returned by the API
            console.log('API Response:', data);
            $.gritter.add({
                title:	'Incentive Updated',
                text:	'Incentive is updated successfully!',
                sticky: false
            });
            $('.gritter-item').css('background-color','darkgreen');	
            $('#loading').hide();
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
            $('#loading').hide();
        });
}

async function getAllDriver() {
    // Define the URL of the API
    const apiUrl = baseURL + "/profile/driver/";

    
    // Define the headers for the request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('email', 'rahuljamuar@hotmail.com')
    headers.append('token', 'test')

    // Define the options for the fetch request
    const requestOptions = {
        method: 'GET',
        headers: headers
    };
    // Make the API call using fetch
    await fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON returned by the API
        })
        .then(data => {
            // Handle the data returned by the API
            console.log('API Response:', data);
            var count = Object.keys(data).length;
            console.log(count);            
            
            for (i = 0; i < count; i++) {
                $('#driver').append( '<option value=' + data[i]["emp_id"] +'>' + data[i]["full_name"] + '</option>' );  
            }
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

async function getAllVehicle() {
    // Define the URL of the API
    const apiUrl = baseURL + "/vehicle/";

    
    // Define the headers for the request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('email', 'rahuljamuar@hotmail.com')
    headers.append('token', 'test')

    // Define the options for the fetch request
    const requestOptions = {
        method: 'GET',
        headers: headers
    };
    // Make the API call using fetch
    await fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON returned by the API
        })
        .then(data => {
            // Handle the data returned by the API
            console.log('API Response:', data);
            var count = Object.keys(data).length;
            console.log(count);            
            
            for (i = 0; i < count; i++) {
                $('#vehicle').append( '<option value=' + data[i]["vehicle_registration_id"] +'>' + data[i]["vehicle_registration_id"] + '</option>' );  
            }
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function deleteIncentive() {
    $('#loading').show();
    var business_id = parseInt(document.getElementById("business_id").value);
    // Define the URL of the API
    const apiUrl = baseURL + "/business/business_id/" + business_id;

    
    // Define the headers for the request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('email', 'rahuljamuar@hotmail.com')
    headers.append('token', 'test')

    // Define the options for the fetch request
    const requestOptions = {
        method: 'DELETE',
        headers: headers
    };
    // Make the API call using fetch
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                $('#loading').hide();
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON returned by the API
        })
        .then(data => {
            // Handle the data returned by the API
            console.log('API Response:', data);
            $('#loading').hide();
           
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
            $('#loading').hide();
        });

}

function getAttachedVehicle(){
    var driver = document.getElementById("driver").value;
    // Define the URL of the API
    const apiUrl = baseURL + "/driver/driver_id/" + driver;

    
    // Define the headers for the request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('email', 'rahuljamuar@hotmail.com')
    headers.append('token', 'test')

    // Define the options for the fetch request
    const requestOptions = {
        method: 'GET',
        headers: headers
    };
    // Make the API call using fetch
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                return "404";
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON returned by the API
        })
        .then(data => {
            // Handle the data returned by the API
            console.log('API Response:', data);
            if(data != "404"){
                document.getElementById("vehicle").value = data.vehicle_assigned;
            }else{
                document.getElementById("vehicle").value = "";
            }
            
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}