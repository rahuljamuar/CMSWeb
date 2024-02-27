var baseURL = myBaseURL();

function getAllProfile() {
    // Define the URL of the API
    const apiUrl = baseURL + "/profile/";

    
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
                var role = "";
                var current_row = [];
                var emp_id = encodeURIComponent(data[i]["emp_id"]);
                emp_id = '<a style="color: blue;" href="edit-profile.html?emp_id=' + emp_id + '">' + data[i]["emp_id"] + '</a>' ;
                current_row.push(emp_id);
                current_row.push(data[i]["full_name"]);
                
                if(data[i]["is_driver"] && data[i]["is_manager"]){
                    role = "Manager & Driver";
                }else if(data[i]["is_driver"]){
                    role = "Driver";
                }else if(data[i]["is_manager"]){
                    role = "Manager";
                }else{
                    role = "No role assigned";
                }
                current_row.push(role);
                current_row.push(data[i]["mobile_number"]);
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
             
            new DataTable('#example', {
                columns: [
                    { title: 'Emp ID' },
                    { title: 'Name' },
                    { title: 'Role' },
                    { title: 'Mobile Number' }
                ],
                data: dataSet
            });
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}


function createProfile() {
    $('#loading').show();
    var full_name = document.getElementById("full_name").value;
    var email = document.getElementById("email").value;
    var mobile = document.getElementById("mobile").value;
    var address = document.getElementById("address").value;
    var dl_number = document.getElementById("dl_number").value;
    var aadhar = document.getElementById("aadhar").value;
    var pan = document.getElementById("pan").value;
    var badge_number = document.getElementById("badge_number").value;
    var manager_role = 0;
    var driver_role = 0;
    if (document.getElementById('manager_role').checked) {
        manager_role = 1;
    }
    if (document.getElementById('driver_role').checked) {
        driver_role = 1;
    }

    // Define the URL of the API
    const apiUrl = baseURL + "/profile/";

    // Define the data to be sent in the request body
    const requestData = {
        "full_name": full_name,
        "mobile_number": mobile,
        "email_id": email,
        "full_address": address,
        "driving_license_no": dl_number,
        "aadhar": aadhar,
        "pan": pan,
        "is_driver": driver_role,
        "is_manager": manager_role,
        "badge": badge_number
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
            uploadProfilePhoto(data.emp_id)
            $('#loading').hide();
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
            $('#loading').hide();
        });
}

function getAProfile(emp_id) {
    // Define the URL of the API
    const apiUrl = baseURL + "/profile/emp_id/" + emp_id;

    
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
            document.getElementById("emp_id").value = data.emp_id;
            document.getElementById("full_name").value = data.full_name;
            document.getElementById("email").value = data.email_id;
            document.getElementById("mobile").value = data.mobile_number;
            document.getElementById("address").value = data.full_address;
            document.getElementById("dl_number").value = data.driving_license_no;
            document.getElementById("aadhar").value = data.aadhar;
            document.getElementById("pan").value = data.pan;
            document.getElementById("badge_number").value = data.badge;
            // document.getElementById("manager_role").checked = data.is_manager;
            document.getElementById("driver_role").checked = data.is_driver;
            $('#manager_role').attr('checked', false);
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function getProfilePhoto(emp_id) {
    // Define the URL of the API
    const apiUrl = baseURL + "/profile/profile_photo/" + emp_id;

    
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
                document.getElementById("profile_photo_display_thumbnail").src = data.content;
                document.getElementById("profile_photo_display_thumbnail").alt = data.file_name;
                document.getElementById("profile_photo_display").href = data.content;
            }else{
                document.getElementById("profile_photo_display_thumbnail").src = "/img/user.png";
                document.getElementById("profile_photo_display_thumbnail").alt = "User";
                document.getElementById("profile_photo_display").href = "/img/user.png";
            }
            
          
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function updateProfile() {
    $('#loading').show();
    var emp_id = parseInt(document.getElementById("emp_id").value);
    var full_name = document.getElementById("full_name").value;
    var email = document.getElementById("email").value;
    var mobile = document.getElementById("mobile").value;
    var address = document.getElementById("address").value;
    var dl_number = document.getElementById("dl_number").value;
    var aadhar = document.getElementById("aadhar").value;
    var pan = document.getElementById("pan").value;
    var badge_number = document.getElementById("badge_number").value;
    var manager_role = 0;
    var driver_role = 0;
    if (document.getElementById('manager_role').checked) {
        manager_role = 1;
    }
    if (document.getElementById('driver_role').checked) {
        driver_role = 1;
    }

    // Define the URL of the API
    const apiUrl = baseURL + "/profile/";

    // Define the data to be sent in the request body
    const requestData = {
        "emp_id": emp_id,
        "full_name": full_name,
        "mobile_number": mobile,
        "email_id": email,
        "full_address": address,
        "driving_license_no": dl_number,
        "aadhar": aadhar,
        "pan": pan,
        "is_driver": driver_role,
        "is_manager": manager_role,
        "badge": badge_number
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
            uploadProfilePhoto(emp_id);
            $.gritter.add({
                title:	'Profile Updated',
                text:	'Profile is updated successfully!',
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

function uploadProfilePhoto(emp_id) {
    var profile_photo =document.getElementById("profile_photo").files[0];
    console.log(profile_photo)
    // Define the URL of the API
    const apiUrl = baseURL + "/profile/profile_photo";

    // Define the data to be sent in the request body
    const formdata = new FormData();
    formdata.append("file_name", profile_photo);
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

function deleteProfile() {
    $('#loading').show();
    var emp_id = parseInt(document.getElementById("emp_id").value);
    // Define the URL of the API
    const apiUrl = baseURL + "/profile/emp_id/" + emp_id;

    
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