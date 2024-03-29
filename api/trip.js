var baseURL = myBaseURL();


$("#trip_type").change(function () {
    if(this.value == "Company"){
        $("#total_earning_div").hide();
        $("#cash_div").hide();
        $("#upi_div").hide();
        $("#city_div").hide();
        $("#duration_div").hide();
        $("#business_div").show();
        $("#is_escort_div").show();
        $("#company_trip_number_div").show();
    }
    else if(this.value == "Ola" || this.value == "Uber" || this.value == "Personal"){
        $("#total_earning_div").show();
        $("#cash_div").show();
        $("#upi_div").show();
        $("#business_div").hide();
        $("#duration_div").hide();
        $("#company_trip_number_div").hide();
        $("#is_escort_div").hide();
    }
    else if(this.value == "Rental"){
        $("#total_earning_div").show();
        $("#cash_div").show();
        $("#upi_div").show();
        $("#business_div").hide();
        $("#duration_div").show();
        $("#city_div").show();
        $("#company_trip_number_div").hide();
        $("#is_escort_div").hide();
    }
});

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


function createTrip() {
    const trip_validate = validateTrip();
    if(trip_validate == false){
        return;
    }
    $('#loading').show();
    var trip_type = document.getElementById("trip_type").value;
    var job_id = getCookie("job_id");
    
    if(trip_type == "Company"){
        var driver = document.getElementById("driver").value;
        var trip_date = document.getElementById("trip_date").value;
        var trip_start_time = document.getElementById("trip_start_time").value;
        var total_earning = document.getElementById("total_earning").value;
        var trip_count = document.getElementById("trip_count").value;       
        var business = document.getElementById("business").value;        
        var vehicle = document.getElementById("vehicle").value;
        var company_trip_number = document.getElementById("company_trip_number").value;
        var is_escort = 0;
        if (document.getElementById('is_escort').checked) {
            is_escort = 1;
        }
        
        var requestData = {
            "job_id": job_id,
            "trip_type": trip_type,
            "driver_id": driver,
            "trip_date": trip_date,
            "trip_start_time": trip_start_time,
            "trip_count": trip_count,
            "business_id": business,
            "vehicle_registration_id": vehicle,
            "company_trip_number": company_trip_number,
            "is_escort": is_escort
        };
    }
    else if(trip_type == "Ola" || trip_type == "Uber" || trip_type == "Personal"){
        var driver = document.getElementById("driver").value;
        var trip_date = document.getElementById("trip_date").value;
        var trip_start_time = document.getElementById("trip_start_time").value;
        var total_earning = document.getElementById("total_earning").value;
        var cash = document.getElementById("cash").value;
        var trip_count = document.getElementById("trip_count").value;   
        var upi = document.getElementById("upi").value;
        var vehicle = document.getElementById("vehicle").value;

        var requestData = {
            "job_id": job_id,
            "trip_type": trip_type,
            "driver_id": driver,
            "trip_date": trip_date,
            "trip_start_time": trip_start_time,
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
        var trip_count = document.getElementById("trip_count").value;  
        var cash = document.getElementById("cash").value;
        var upi = document.getElementById("upi").value;
        var vehicle = document.getElementById("vehicle").value;
        var city = document.getElementById("city").value;
        var duration = document.getElementById("duration").value;

        var requestData = {
            "job_id": job_id,
            "trip_type": trip_type,
            "driver_id": driver,
            "trip_date": trip_date,
            "trip_start_time": trip_start_time,
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
            tripStarted();
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
                document.getElementById("company_trip_number").value = data.company_trip_number;
                $('#is_escort').prop('checked',data.is_escort);
                $.uniform.update('#is_escort');

                $("#total_earning_div").hide();
                $("#cash_div").hide();
                $("#upi_div").hide();
                $("#city_div").hide();
                $("#duration_div").hide();
                $("#business_div").show();
                $("#company_trip_number_div").show();
                $("#is_escort_div").show();
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
                $("#company_trip_number_div").hide();
                $("#is_escort_div").hide();
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
                $("#company_trip_number_div").hide();
                $("#is_escort_div").hide();$("#is_escort").hide();
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
        var company_trip_number = document.getElementById("company_trip_number").value;
        var is_escort = 0;
        if (document.getElementById('is_escort').checked) {
            is_escort = 1;
        }
        
        var requestData = {
            "trip_id": trip_id,
            "trip_type": trip_type,
            "driver_id": driver,
            "trip_date": trip_date,
            "trip_start_time": trip_start_time,
            "trip_end_time": trip_end_time,
            "trip_count": trip_count,
            "business_id": business,
            "vehicle_registration_id": vehicle,
            "company_trip_number": company_trip_number,
            "is_escort": is_escort
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
            
            var current_role = getCookie("role")
            if(current_role == "driver"){
                document.getElementById('driver').value = getCookie("emp_id");
                document.getElementById('driver').disabled = true;
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
            var current_role = getCookie("role");
            if(current_role == "driver"){
                document.getElementById('vehicle').value = getCookie("driver_assigned_vehicle");
                document.getElementById('vehicle').disabled = true;
            }
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

async function getAllBusiness() {
    // Define the URL of the API
    const apiUrl = baseURL + "/business/";

    
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
                $('#business').append( '<option value=' + data[i]["business_id"] +'>' + data[i]["business_name"] + '</option>' );  
            }
            var current_role = getCookie("role");
            if(current_role == "driver"){
                document.getElementById('business').value = getCookie("driver_assigned_business");
                document.getElementById('business').disabled = true;
            }
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function deleteTrip() {
    $('#loading').show();
    var trip_id = parseInt(document.getElementById("trip_id").value);
    // Define the URL of the API
    const apiUrl = baseURL + "/trip/trip_id/" + trip_id;

    
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

function tripStarted(){
    $('#confirmation').modal('show');
}

function validateTrip(){
    var trip_type = document.getElementById("trip_type").value;
    if(trip_type == ""){
        $.gritter.add({
            title:	'Failed',
            text:	'Please select trip type',
            sticky: false
        });
        $('.gritter-item').css('background-color','red');
        return false;
    }
    if(trip_type == "Company"){
        var driver = document.getElementById("driver").value;
        var trip_date = document.getElementById("trip_date").value;
        var trip_start_time = document.getElementById("trip_start_time").value;
        var trip_count = document.getElementById("trip_count").value;       
        var business = document.getElementById("business").value;        
        var vehicle = document.getElementById("vehicle").value;

        if(vehicle == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please select vehicle number',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(driver == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please select driver',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(trip_date == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please select trip date',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(trip_start_time == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please select trip start time',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(trip_count == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please enter trip count',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(business == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please select business',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        
        
    }
    else if(trip_type == "Ola" || trip_type == "Uber" || trip_type == "Personal"){
        var driver = document.getElementById("driver").value;
        var trip_date = document.getElementById("trip_date").value;
        var trip_start_time = document.getElementById("trip_start_time").value;
        var total_earning = document.getElementById("total_earning").value;
        var trip_count = document.getElementById("trip_count").value;   
        var vehicle = document.getElementById("vehicle").value;

        if(vehicle == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please select vehicle number',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(driver == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please select driver',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(trip_date == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please select trip date',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(trip_start_time == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please select trip start time',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(total_earning == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please enter total earning',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(trip_count == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please enter trip count',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
    }
    else if(trip_type == "Rental"){
        var driver = document.getElementById("driver").value;
        var trip_date = document.getElementById("trip_date").value;
        var trip_start_time = document.getElementById("trip_start_time").value;
        var total_earning = document.getElementById("total_earning").value;
        var trip_count = document.getElementById("trip_count").value;  
        var vehicle = document.getElementById("vehicle").value;

        if(vehicle == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please select vehicle number',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(driver == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please select driver',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(trip_date == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please select trip date',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(trip_start_time == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please select trip start time',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(total_earning == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please enter total earning',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
        if(trip_count == ""){
            $.gritter.add({
                title:	'Failed',
                text:	'Please enter trip count',
                sticky: false
            });
            $('.gritter-item').css('background-color','red');
            return false;
        }
    }
    return true;
}