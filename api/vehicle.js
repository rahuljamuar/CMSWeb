var baseURL = myBaseURL();

function getAllVehicle() {
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
                var vehicle_registration_id = encodeURIComponent(data[i]["vehicle_registration_id"]);
                vehicle_registration_id = '<a style="color: blue;" href="edit-vehicle.html?vehicle_registration_id=' + vehicle_registration_id + '">' + data[i]["vehicle_registration_id"] + '</a>' ;
                current_row.push(vehicle_registration_id);
                current_row.push(data[i]["owner_id"]);
                current_row.push(data[i]["manufacturer"]);
                current_row.push(data[i]["vehicle_type"]);
                current_row.push(data[i]["cost"]);
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
             
            new DataTable('#vehicle_table', {
                responsive: true,
                columns: [
                    { title: 'Vehicle RC' },
                    { title: 'Owner' },
                    { title: 'Manufacturer' },
                    { title: 'Type' },
                    { title: 'Cost' }
                ],
                data: dataSet
            });
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}


function createVehicle() {
    $('#loading').show();
    var vehicle_registration_id = document.getElementById("vehicle_registration_id").value;
    var owner = document.getElementById("owner").value;
    var manufacturer = document.getElementById("manufacturer").value;
    var model = document.getElementById("model").value;
    var color = document.getElementById("color").value;
    var vehicle_type = document.getElementById("vehicle_type").value;
    var registration_date = document.getElementById("registration_date").value;
    var insurance_renewal_date = document.getElementById("insurance_renewal_date").value;
    var insurance_expiry_date = document.getElementById("insurance_expiry_date").value;
    var cost = document.getElementById("cost").value;

    // Define the URL of the API
    const apiUrl = baseURL + "/vehicle/";

    // Define the data to be sent in the request body
    const requestData = {
        "vehicle_registration_id": vehicle_registration_id,
        "owner_id": owner,
        "manufacturer": manufacturer,
        "model": model,
        "color": color,
        "vehicle_type": vehicle_type,
        "date_of_purchase": registration_date,
        "insurance_renewal_date": insurance_renewal_date,
        "insurance_expiry_date": insurance_expiry_date,
        "cost": cost
    };

    // Convert the data to JSON format
    const jsonData = JSON.stringify(requestData);

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
            // var vehicle_photo =document.getElementById("vehicle_photo").files[0];
            // if(vehicle_photo != null){
            //     // uploadVehiclePhoto(data.emp_id);
            // }
            
            $('#loading').hide();
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
            $('#loading').hide();
        });
}

function getAVehicle(vehicle_registration_id) {
    // Define the URL of the API
    const apiUrl = baseURL + "/vehicle/vehicle_registration_id/" + vehicle_registration_id;

    
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
            document.getElementById("vehicle_registration_id").value = data.vehicle_registration_id;
            document.getElementById("owner").value = data.owner_id;
            document.getElementById("manufacturer").value = data.manufacturer;
            document.getElementById("model").value = data.model;
            document.getElementById("color").value = data.color;
            document.getElementById("vehicle_type").value = data.vehicle_type;
            var registration_date = data.date_of_purchase.toString().split("T");
            registration_date = registration_date[0];
            document.getElementById("registration_date").value = registration_date;            
            var insurance_renewal_date = data.insurance_renewal_date.toString().split("T");
            insurance_renewal_date = insurance_renewal_date[0];
            document.getElementById("insurance_renewal_date").value = insurance_renewal_date;
            var insurance_expiry_date = data.insurance_expiry_date.toString().split("T");
            insurance_expiry_date = insurance_expiry_date[0];
            document.getElementById("insurance_expiry_date").value = insurance_expiry_date;
            document.getElementById("cost").value = data.cost;
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function getVehiclePhoto(emp_id) {
    // Define the URL of the API
    const apiUrl = baseURL + "/vehicle/vehicle_photo/" + emp_id;

    
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
            if(data != 'Photo not found'){
                document.getElementById("vehicle_photo_display_thumbnail").src = data.content;
                document.getElementById("vehicle_photo_display_thumbnail").alt = data.file_name;
                document.getElementById("vehicle_photo_display").href = data.content;
            }else{
                document.getElementById("vehicle_photo_display_thumbnail").src = "/img/user.png";
                document.getElementById("vehicle_photo_display_thumbnail").alt = "User";
                document.getElementById("vehicle_photo_display").href = "/img/user.png";
            }
            
          
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function updateVehicle() {
    $('#loading').show();
    var vehicle_registration_id = document.getElementById("vehicle_registration_id").value;
    var owner = document.getElementById("owner").value;
    var manufacturer = document.getElementById("manufacturer").value;
    var model = document.getElementById("model").value;
    var color = document.getElementById("color").value;
    var vehicle_type = document.getElementById("vehicle_type").value;
    var registration_date = document.getElementById("registration_date").value;
    var insurance_renewal_date = document.getElementById("insurance_renewal_date").value;
    var insurance_expiry_date = document.getElementById("insurance_expiry_date").value;
    var cost = document.getElementById("cost").value;

    // Define the URL of the API
    const apiUrl = baseURL + "/vehicle/";

    // Define the data to be sent in the request body
    const requestData = {
        "vehicle_registration_id": vehicle_registration_id,
        "owner_id": owner,
        "manufacturer": manufacturer,
        "model": model,
        "color": color,
        "vehicle_type": vehicle_type,
        "date_of_purchase": registration_date,
        "insurance_renewal_date": insurance_renewal_date,
        "insurance_expiry_date": insurance_expiry_date,
        "cost": cost
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
            // var vehicle_photo =document.getElementById("vehicle_photo").files[0];
            // if(vehicle_photo != null){
            //     uploadVehiclePhoto(emp_id);
            // }
            $.gritter.add({
                title:	'Vehicle Updated',
                text:	'Vehicle is updated successfully!',
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

function uploadVehiclePhoto(emp_id) {
    var vehicle_photo =document.getElementById("vehicle_photo").files[0];
    console.log(vehicle_photo)
    // Define the URL of the API
    const apiUrl = baseURL + "/vehicle/vehicle_photo";

    // Define the data to be sent in the request body
    const formdata = new FormData();
    formdata.append("file_name", vehicle_photo);
    formdata.append("emp_id", emp_id);


    // Define the headers for the request
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('email', 'rahuljamuar@hotmail.com')
    headers.append('token', 'test')
    console.log(formdata)
    // const jsonData = JSON.stringify(formdata);
    // console.log(jsonData)
    // Define the options for the fetch request
    const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: formdata
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
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);            
        });
}

function getAllOwner() {
    // Define the URL of the API
    const apiUrl = baseURL + "/profile/manager/";

    
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
            
            for (i = 0; i < count; i++) {
                $('#owner').append( '<option value=' + data[i]["emp_id"] +'>' + data[i]["full_name"] + '</option>' );  
            }
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function deleteVehicle() {
    $('#loading').show();
    var emp_id = parseInt(document.getElementById("emp_id").value);
    // Define the URL of the API
    const apiUrl = baseURL + "/vehicle/emp_id/" + emp_id;

    
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