var baseURL = myBaseURL();

function getUser() {

    $('#loading').show();
    document.getElementById("incorrect_id").innerHTML = "";
    const apiUrl = baseURL + "/auth/mobile_number";

    var mobile_number = document.getElementById("mobile_number").value
    var pass = document.getElementById("pass").value

    const requestData = {
        "mobile_number": mobile_number,
        "password": pass
    };
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
                document.getElementById("incorrect_id").innerHTML = "Incorrect user name and/or password!";
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON returned by the API
        })
        .then(data => {
            // Handle the data returned by the API
            console.log('API Response:', data);
            $('#loading').hide();
            setCookie("emp_id", data.emp_id);
            setCookie("full_name", data.full_name);
            setCookie("email_id", data.email_id);
            var role;
            if(data.is_driver == true && data.is_manager == true){
                role = "both";
                if('vehicle_assigned' in data && 'business_assigned' in data){
                    setCookie("driver_assigned_vehicle", data.vehicle_assigned);
                    setCookie("driver_assigned_business", data.business_assigned);
                }                
            }else if(data.is_manager == true){
                role = "manager";
            }else if(data.is_driver == true){                
                role = "driver";
                if('vehicle_assigned' in data && 'business_assigned' in data){
                    setCookie("driver_assigned_vehicle", data.vehicle_assigned);
                    setCookie("driver_assigned_business", data.business_assigned);
                }
            }
            setCookie("role", role);
            if(role == "both"){
                $('#myRole').modal('show');
            }else if(role == "manager"){
                window.location="manager-dashboard.html";
            }else if(role == "driver"){
                window.location="index.html";
            }
            
            
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function driverLogin(){
    window.location="index.html";
}

function managerLogin(){
    setCookie("driver_assigned_vehicle", "");
    setCookie("driver_assigned_business", "");
    window.location="manager-dashboard.html";
}