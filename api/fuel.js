var baseURL = myBaseURL();

async function getAllFuel() {
    // Define the URL of the API
    const apiUrl = baseURL + "/fuel/";

    
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
            var dataSet = [];
            
            for (i = 0; i < count; i++) {
                var current_row = [];
                var fuel_id = encodeURIComponent(data[i]["fuel_id"]);
                fuel_id = '<a style="color: blue;" href="edit-fuel.html?fuel_id=' + fuel_id + '">' + data[i]["fuel_id"] + '</a>' ;
                current_row.push(fuel_id);
                current_row.push(data[i]["refill_quantity"]);
                current_row.push(data[i]["refill_cost"]);
                current_row.push(data[i]["driver_id"]);
                current_row.push(data[i]["vehicle_registration_id"]);
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
             
            new DataTable('#fuel_table', {
                responsive: true,
                columns: [
                    { title: 'Fuel ID' },
                    { title: 'Quantity' },
                    { title: 'Cost' },
                    { title: 'Driver' },
                    { title: 'Vehicle RC' }
                ],
                data: dataSet
            });
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}


function createFuel() {
    $('#loading').show();
    var vehicle = document.getElementById("vehicle").value;
    var driver = document.getElementById("driver").value;
    var refill_date = document.getElementById("refill_date").value;
    var refill_time = document.getElementById("refill_time").value;
    var quantity = document.getElementById("quantity").value;
    var cost = document.getElementById("cost").value;
    var current_km = document.getElementById("current_km").value;
    var job_id = document.getElementById("job_id").value;

    // Define the URL of the API
    const apiUrl = baseURL + "/fuel/";

    // Define the data to be sent in the request body
    const requestData = {
        "refill_date": refill_date,
        "refill_time": refill_time,
        "refill_quantity": quantity,
        "refill_cost": cost,
        "current_km": current_km,
        "driver_id": driver,
        "vehicle_registration_id": vehicle,
        "job_id": job_id
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
            var receipt_photo =document.getElementById("receipt_photo").files[0];
            var odometer_photo =document.getElementById("odometer_photo").files[0];
            if(receipt_photo != null || odometer_photo != null){
                uploadFuelDocs(data.fuel_id)
            }else{
                fuelAdded();
                $('#loading').hide();                
            }
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
            $('#loading').hide();
        });
}

async function getAFuel(fuel_id) {
    // Define the URL of the API
    const apiUrl = baseURL + "/fuel/fuel_id/" + fuel_id;

    
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
            document.getElementById("fuel_id").value = data.fuel_id;
            document.getElementById("vehicle").value = data.vehicle_registration_id;
            document.getElementById("driver").value = data.driver_id;
            document.getElementById("refill_date").value = data.refill_date;
            document.getElementById("refill_time").value = data.refill_time;
            document.getElementById("quantity").value = data.refill_quantity;
            document.getElementById("cost").value = data.refill_cost;
            document.getElementById("current_km").value = data.current_km;
            var refill_date = data.refill_date.toString().split("T");
            refill_date = refill_date[0];
            document.getElementById("refill_date").value = refill_date;
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function getFuelDoc(fuel_id) {
    // Define the URL of the API
    const apiUrl = baseURL + "/fuel/fuel_doc/" + fuel_id;

    
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
            if(data.receipt_photo != 'Photo not found'){
                document.getElementById("receipt_photo_thumbnail").src = data.receipt_photo.content;
                document.getElementById("receipt_photo_thumbnail").alt = data.receipt_photo.file_name;
                document.getElementById("receipt_photo_display").href = data.receipt_photo.content;
            }else{
                document.getElementById("receipt_photo_thumbnail").src = "/img/user.png";
                document.getElementById("receipt_photo_thumbnail").alt = "User";
                document.getElementById("receipt_photo_display").href = "/img/user.png";
            }
            if(data.current_km_photo != 'Photo not found'){
                document.getElementById("current_km_photo_thumbnail").src = data.current_km_photo.content;
                document.getElementById("current_km_photo_thumbnail").alt = data.current_km_photo.file_name;
                document.getElementById("current_km_photo_display").href = data.current_km_photo.content;
            }else{
                document.getElementById("current_km_photo_thumbnail").src = "/img/user.png";
                document.getElementById("current_km_photo_thumbnail").alt = "User";
                document.getElementById("current_km_photo_display").href = "/img/user.png";
            }
            
          
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function updateFuel() {
    $('#loading').show();
    var fuel_id = document.getElementById("fuel_id").value;
    var vehicle = document.getElementById("vehicle").value;
    var driver = document.getElementById("driver").value;
    var refill_date = document.getElementById("refill_date").value;
    var refill_time = document.getElementById("refill_time").value;
    var quantity = document.getElementById("quantity").value;
    var cost = document.getElementById("cost").value;
    var current_km = document.getElementById("current_km").value;

    // Define the URL of the API
    const apiUrl = baseURL + "/fuel/";

    // Define the data to be sent in the request body
    const requestData = {
        "fuel_id": fuel_id,
        "refill_date": refill_date,
        "refill_time": refill_time,
        "refill_quantity": quantity,
        "refill_cost": cost,
        "current_km": current_km,
        "driver_id": driver,
        "vehicle_registration_id": vehicle
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
            var receipt_photo =document.getElementById("receipt_photo").files[0];
            var odometer_photo =document.getElementById("odometer_photo").files[0];
            if(receipt_photo != null || odometer_photo != null){
                uploadFuelDocs(data.fuel_id)
            }
            
            $.gritter.add({
                title:	'Fuel Updated',
                text:	'Fuel is updated successfully!',
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

function uploadFuelDocs(fuel_id) {
    var receipt_photo =document.getElementById("receipt_photo").files[0];
    var odometer_photo =document.getElementById("odometer_photo").files[0];

    // Define the URL of the API
    const apiUrl = baseURL + "/fuel/docs";

    // Define the data to be sent in the request body
    const formdata = new FormData();
    if(receipt_photo != null){
        formdata.append("receipt_photo", receipt_photo);
    }
    if(odometer_photo != null){
        formdata.append("current_km_photo", odometer_photo);
    }

    
    
    formdata.append("fuel_id", fuel_id);


    // Define the headers for the request
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('email', 'rahuljamuar@hotmail.com')
    headers.append('token', 'test')

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
            fuelAdded();    
            $('#loading').hide();       
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);            
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

function deleteFuel() {
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

function fuelAdded(){
    $('#fuel_added').modal('show');
}