var baseURL = myBaseURL();

function getAllTrip() {
    // Define the URL of the API
    const apiUrl = baseURL + "/trip/";

    
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
                var trip_id = encodeURIComponent(data[i]["trip_id"]);
                trip_id = '<a style="color: blue;" href="edit-trip.html?trip_id=' + trip_id + '">' + data[i]["trip_id"] + '</a>' ;
                current_row.push(trip_id);
                current_row.push(data[i]["trip_type"]);
                var trip_date = data[i]["trip_date"].toString().split("T");
                trip_date = trip_date[0];
                current_row.push(trip_date);
                current_row.push(data[i]["driver_id"]);
                current_row.push(data[i]["vehicle_registration_id"]);
                current_row.push(data[i]["total_revenue"]);
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
             
            new DataTable('#trip_table', {
                responsive: true,
                columns: [
                    { title: 'Trip ID' },
                    { title: 'Type' },
                    { title: 'Date' },
                    { title: 'Driver' },
                    { title: 'Vehicle RC' },
                    { title: 'Total Revenue' }
                ],
                data: dataSet
            });
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}


function createJob() {
    $('#loading').show();

    var driver = document.getElementById("driver").value;
    var job_start_date = document.getElementById("job_start_date").value;
    var job_start_time = document.getElementById("job_start_time").value;
    var start_km = document.getElementById("start_km").value;           
    var vehicle = document.getElementById("vehicle").value;
        
        


    // Define the URL of the API
    const apiUrl = baseURL + "/job/";

    // Define the data to be sent in the request body
    const requestData = {
        "driver_id": driver,
        "start_day": job_start_date,
        "start_time": job_start_time,
        "start_km": start_km,
        "vehicle_registration_id": vehicle
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
            var start_odometer_photo =document.getElementById("start_odometer_photo").files[0];
            var driver_selfie =document.getElementById("driver_selfie").files[0];
            if(start_odometer_photo != null || driver_selfie != null){
                uploadJobPhoto(data.job_id)
            }
            $('#loading').hide();
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
            $('#loading').hide();
        });
}

function endJob() {
    $('#loading').show();
    var job_id = document.getElementById("job_id").value;
    var job_end_date = document.getElementById("job_end_date").value;
    var job_end_time = document.getElementById("job_end_time").value;
    var end_km = document.getElementById("end_km").value;
        
        


    // Define the URL of the API
    const apiUrl = baseURL + "/job/job-end";

    // Define the data to be sent in the request body
    const requestData = {
        "job_id": job_id,
        "end_day": job_end_date,
        "end_time": job_end_time,
        "end_km": end_km
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
            var end_odometer_photo =document.getElementById("end_odometer_photo").files[0];
            var front_photo =document.getElementById("front_photo").files[0];
            var left_photo =document.getElementById("left_photo").files[0];
            var back_photo =document.getElementById("back_photo").files[0];
            var right_photo =document.getElementById("right_photo").files[0];
            var video =document.getElementById("video").files[0];
            if(end_odometer_photo != null || front_photo != null || left_photo != null || back_photo != null || right_photo != null || video != null){
                uploadJobEndPhoto(job_id)
            }
            $('#loading').hide();
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
            $('#loading').hide();
        });
}

async function getATrip(trip_id) {
    // Define the URL of the API
    const apiUrl = baseURL + "/trip/trip_id/" + trip_id;

    
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
            document.getElementById("trip_id").value = data.trip_id;
            document.getElementById("trip_type").value = data.trip_type;
            var trip_date = data.trip_date.toString().split("T");
            trip_date = trip_date[0];
            if(data.trip_type == "Company"){
                document.getElementById("driver").value = data.driver_id;                
                document.getElementById("trip_date").value = trip_date;
                document.getElementById("trip_start_time").value = data.trip_start_time;
                document.getElementById("trip_end_time").value = data.trip_end_time;
                document.getElementById("trip_count").value = data.trip_count;
                document.getElementById("business").value = data.business_id;  
                document.getElementById("vehicle").value = data.vehicle_registration_id;
                $("#total_earning_div").hide();
                $("#cash_div").hide();
                $("#upi_div").hide();
                $("#city_div").hide();
                $("#duration_div").hide();
                $("#business_div").show();
            }
            else if(data.trip_type == "Ola" || data.trip_type == "Uber" || data.trip_type == "Personal"){
                document.getElementById("driver").value = data.driver_id;
                document.getElementById("trip_date").value = trip_date;
                document.getElementById("trip_start_time").value = data.trip_start_time;
                document.getElementById("trip_end_time").value = data.trip_end_time;
                document.getElementById("total_earning").value = data.total_revenue;
                document.getElementById("trip_count").value = data.trip_count;
                document.getElementById("vehicle").value = data.vehicle_registration_id;
                document.getElementById("cash").value = data.cash_revenue; 
                document.getElementById("upi").value = data.upi_revenue;
                $("#total_earning_div").show();
                $("#cash_div").show();
                $("#upi_div").show();
                $("#city_div").hide();
                $("#business_div").hide();
                $("#duration_div").hide();
            }
            else if(data.trip_type == "Rental"){
                document.getElementById("driver").value = data.driver_id;
                document.getElementById("trip_date").value = trip_date;
                document.getElementById("trip_start_time").value = data.trip_start_time;
                document.getElementById("trip_end_time").value = data.trip_end_time;
                document.getElementById("total_earning").value = data.total_revenue;
                document.getElementById("trip_count").value = data.trip_count;
                document.getElementById("vehicle").value = data.vehicle_registration_id;
                document.getElementById("cash").value = data.cash_revenue; 
                document.getElementById("upi").value = data.upi_revenue;
                document.getElementById("city").value = data.city;
                document.getElementById("duration").value = data.duration_days;
                $("#total_earning_div").show();
                $("#cash_div").show();
                $("#upi_div").show();
                $("#business_div").hide();
                $("#duration_div").show();
                $("#city_div").show();
            }
            
            
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

function updateTrip() {
    $('#loading').show();
    var trip_type = document.getElementById("trip_type").value;
    var trip_id = document.getElementById("trip_id").value
    if(trip_type == "Company"){
        var driver = document.getElementById("driver").value;
        var trip_date = document.getElementById("trip_date").value;
        var trip_start_time = document.getElementById("trip_start_time").value;
        var trip_end_time = document.getElementById("trip_end_time").value;
        var total_earning = document.getElementById("total_earning").value;
        var trip_count = document.getElementById("trip_count").value;       
        var business = document.getElementById("business").value;        
        var vehicle = document.getElementById("vehicle").value;
        
        var requestData = {
            "trip_id": trip_id,
            "trip_type": trip_type,
            "driver_id": driver,
            "trip_date": trip_date,
            "trip_start_time": trip_start_time,
            "trip_end_time": trip_end_time,
            "trip_count": trip_count,
            "business_id": business,
            "vehicle_registration_id": vehicle
        };
    }
    else if(trip_type == "Ola" || trip_type == "Uber" || trip_type == "Personal"){
        var driver = document.getElementById("driver").value;
        var trip_date = document.getElementById("trip_date").value;
        var trip_start_time = document.getElementById("trip_start_time").value;
        var trip_end_time = document.getElementById("trip_end_time").value;
        var total_earning = document.getElementById("total_earning").value;
        var cash = document.getElementById("cash").value;
        var trip_count = document.getElementById("trip_count").value;   
        var upi = document.getElementById("upi").value;
        var vehicle = document.getElementById("vehicle").value;

        var requestData = {
            "trip_id": trip_id,
            "trip_type": trip_type,
            "driver_id": driver,
            "trip_date": trip_date,
            "trip_start_time": trip_start_time,
            "trip_end_time": trip_end_time,
            "total_revenue": total_earning,
            "trip_count": trip_count,
            "cash_revenue": cash,
            "upi_revenue": upi,
            "vehicle_registration_id": vehicle
        };
    }
    else if(trip_type == "Rental"){
        var driver = document.getElementById("driver").value;
        var trip_date = document.getElementById("trip_date").value;
        var trip_start_time = document.getElementById("trip_start_time").value;
        var total_earning = document.getElementById("total_earning").value;
        var trip_end_time = document.getElementById("trip_end_time").value;
        var trip_count = document.getElementById("trip_count").value;  
        var cash = document.getElementById("cash").value;
        var upi = document.getElementById("upi").value;
        var vehicle = document.getElementById("vehicle").value;
        var city = document.getElementById("city").value;
        var duration = document.getElementById("duration").value;

        var requestData = {
            "trip_id": trip_id,
            "trip_type": trip_type,
            "driver_id": driver,
            "trip_date": trip_date,
            "trip_start_time": trip_start_time,
            "trip_end_time": trip_end_time,
            "total_revenue": total_earning,
            "trip_count": trip_count,
            "cash_revenue": cash,
            "upi_revenue": upi,
            "vehicle_registration_id": vehicle,
            "city": city,
            "duration_days": duration
        };
    }

    // Define the URL of the API
    const apiUrl = baseURL + "/trip/";
    
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
                title:	'Trip Updated',
                text:	'Trip is updated successfully!',
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

function uploadJobPhoto(job_id) {
    var start_odometer_photo =document.getElementById("start_odometer_photo").files[0];
    var driver_selfie =document.getElementById("driver_selfie").files[0];

    // Define the URL of the API
    const apiUrl = baseURL + "/job/job_photo";

    // Define the data to be sent in the request body
    const formdata = new FormData();
    if(start_odometer_photo != null){
        formdata.append("start_km_photo", start_odometer_photo);
    }
    if(driver_selfie != null){
        formdata.append("driver_selfie", driver_selfie);
    }   
    
    formdata.append("job_id", job_id);

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
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);            
        });
}

function uploadJobEndPhoto(job_id) {
    var end_odometer_photo =document.getElementById("end_odometer_photo").files[0];
    var front_photo =document.getElementById("front_photo").files[0];
    var left_photo =document.getElementById("left_photo").files[0];
    var back_photo =document.getElementById("back_photo").files[0];
    var right_photo =document.getElementById("right_photo").files[0];
    var video =document.getElementById("video").files[0];

    // Define the URL of the API
    const apiUrl = baseURL + "/job/job-end-photo";

    // Define the data to be sent in the request body
    const formdata = new FormData();
    if(end_odometer_photo != null){
        formdata.append("end_km_photo", end_odometer_photo);
    }
    if(front_photo != null){
        formdata.append("vehicle_front_photo", front_photo);
    } 
    if(left_photo != null){
        formdata.append("vehicle_left_photo", left_photo);
    } 
    if(back_photo != null){
        formdata.append("vehicle_back_photo", back_photo);
    } 
    if(right_photo != null){
        formdata.append("vehicle_right_photo", right_photo);
    }
    if(video != null){
        formdata.append("vehicle_video", video);
    }   
    
    formdata.append("job_id", job_id);

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
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);            
        });
}


function deleteJob() {
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