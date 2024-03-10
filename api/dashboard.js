var baseURL = myBaseURL();
async function getCurrentTrip() {

    var current_job_id = document.getElementById("current_job_id").value;
    if(current_job_id == ''){
        console.log("no job")
        document.getElementById("bg_lo").style.display = 'none';
        document.getElementById("bg_ly").style.display = 'none';
        return
    }
    // Define the URL of the API
    var driver_id = getCookie("emp_id");  
    const apiUrl = baseURL + "/trip/current-trip/" + driver_id;
    
    // Define the headers for the request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('email', 'rahuljamuar@hotmail.com');
    headers.append('token', 'test');

    // Define the options for the fetch request
    const requestOptions = {
        method: 'GET',
        headers: headers
    };
    // Make the API call using fetch
    await fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                if(response.status == 404){                    
                    return "404"
                }
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON returned by the API
        })
        .then(data => {
            // Handle the data returned by the API
            console.log('API Response:', data); 
            if (data != "404") {
                document.getElementById("current_trip_id").value = data.trip_id;
                document.getElementById("bg_ly").style.display = 'none';
                document.getElementById("bg_ls").style.display = 'none';
            } else {
                document.getElementById("bg_lo").style.display = 'none';                
                document.getElementById("bg_ly").style.display = 'block';
            }
            
                       
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            
            console.error('There was a problem with the fetch operation:', error);
        });

}

function endCurrentTrip() {
    $('#loading').show();
    
    var current_trip_id = document.getElementById("current_trip_id").value;
    var current_time = document.getElementById("current_time").value;

    // Define the URL of the API
    const apiUrl = baseURL + "/trip/end-trip";

    // Define the data to be sent in the request body
    const requestData = {
        "trip_id": current_trip_id,
        "trip_end_time": current_time
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
            $('#loading').hide();            
            $('#confirmation').modal('show');
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
            $('#loading').hide();
        });
}

async function getCurrentJob() {
    // Define the URL of the API
    var driver_id = getCookie("emp_id");  
    const apiUrl = baseURL + "/job/current-job/" + driver_id;
    
    // Define the headers for the request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('email', 'rahuljamuar@hotmail.com');
    headers.append('token', 'test');

    // Define the options for the fetch request
    const requestOptions = {
        method: 'GET',
        headers: headers
    };
    // Make the API call using fetch
    await fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                if(response.status == 404){                    
                    return "404"
                }
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON returned by the API
        })
        .then(data => {
            // Handle the data returned by the API
            console.log('API Response:', data); 
            if (data != "404") {
                document.getElementById("current_job_id").value = data.job_id;
                getFuelByJob(data.job_id);
                setCookie("job_id", data.job_id);
                document.getElementById("bg_lb").style.display = 'none';
            } else {
                document.getElementById("bg_ls").style.display = 'none';
                document.getElementById("bg_lg").style.display = 'none';
                document.getElementById("bg_lb").style.display = 'block';
                document.getElementById("fuel_details").style.display = 'none';
                
            }
           
                        
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function getFuelByJob(job_id) {
    // Define the URL of the API
     
    const apiUrl = baseURL + "/fuel/job-id/" + job_id;
    
    // Define the headers for the request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('email', 'rahuljamuar@hotmail.com');
    headers.append('token', 'test');

    // Define the options for the fetch request
    const requestOptions = {
        method: 'GET',
        headers: headers
    };
    // Make the API call using fetch
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                if(response.status == 404){                    
                    return "404"
                }
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON returned by the API
        })
        .then(data => {
            // Handle the data returned by the API
            console.log('API Response:', data);
            var quantity = data.quantity;
            var cost = data.cost; 
            if(quantity == null){
                quantity = 0;
            }    
            if(cost == null){
                cost = 0;
            }        
            document.getElementById("fuel_quantity").innerHTML = "Quantity: " + "<b>" + quantity + " Litres";
            document.getElementById("fuel_amount").innerHTML = "Amount: " + "<b>Rs. " + cost; 
                        
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function endCurrentJob(){
    var job_id = document.getElementById('current_job_id').value;
    window.location="end-job.html?job_id=" + job_id;
}

async function getDriverAssignedDetails() {
    // Define the URL of the API
    var driver_id = getCookie("emp_id");  
    const apiUrl = baseURL + "/driver_id/" + driver_id;
    
    // Define the headers for the request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('email', 'rahuljamuar@hotmail.com');
    headers.append('token', 'test');

    // Define the options for the fetch request
    const requestOptions = {
        method: 'GET',
        headers: headers
    };
    // Make the API call using fetch
    await fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                if(response.status == 404){
                    return "404"
                }
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON returned by the API
        })
        .then(data => {
            // Handle the data returned by the API
            console.log('API Response:', data); 
            document.getElementById("fuel_quantity")
                        
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function addFuel(){
    var job_id = document.getElementById('current_job_id').value;
    window.location="fuel.html?job_id=" + job_id;
}