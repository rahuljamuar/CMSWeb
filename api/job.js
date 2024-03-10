var baseURL = myBaseURL();

function getAllJob() {
    // Define the URL of the API
    const apiUrl = baseURL + "/job/";

    
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
                var job_id = encodeURIComponent(data[i]["job_id"]);
                job_id = '<a style="color: blue;" href="edit-job.html?job_id=' + job_id + '">' + data[i]["job_id"] + '</a>' ;
                current_row.push(job_id);
                var start_day = data[i]["start_day"].toString().split("T");
                start_day = start_day[0];
                if(data[i]["end_day"] != null){
                    var end_day = data[i]["end_day"].toString().split("T");
                    end_day = end_day[0];
                }else{
                    var end_day = encodeURIComponent(data[i]["job_id"]);
                    end_day = '<a style="color: blue;" href="end-job.html?job_id=' + end_day + '">End Job</a>' ;                    
                }
                
                current_row.push(data[i]["driver_id"]);
                current_row.push(data[i]["vehicle_registration_id"]);
                current_row.push(start_day);
                current_row.push(end_day);
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
             
            new DataTable('#job_table', {
                responsive: true,
                columns: [
                    { title: 'Job ID' },
                    { title: 'Driver' },
                    { title: 'Vehicle RC' },
                    { title: 'Start Date' },
                    { title: 'End Date' }
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
            }else{
                jobStarted();  
                $('#loading').hide();
                              
            }
            
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
            }else{
                jobEnded();
                $('#loading').hide();
                                
            }
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
            $('#loading').hide();
        });
}

async function getAJob(job_id) {
    // Define the URL of the API
    const apiUrl = baseURL + "/job/job_id/" + job_id;

    
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
            if(data.review_status == "Approved"){
                $(".btn").hide();                
                $("#basic_validate :input"). prop("disabled", true);
                
            }
            document.getElementById("job_id").value = data.job_id;
            document.getElementById("driver").value = data.driver_id;
            document.getElementById("reviewer_comment").value = data.reviewer_comment;

            var job_start_date = data.start_day.toString().split("T");
            job_start_date = job_start_date[0];
            document.getElementById("job_start_date").value = job_start_date;            
            document.getElementById("job_start_time").value = data.start_time;
            document.getElementById("start_km").value = data.start_km;
            if(data.end_day != null){
                var job_end_date = data.end_day.toString().split("T");
                job_end_date = job_end_date[0];
            }else{
                var job_end_date = "";
            }
            
            document.getElementById("job_end_date").value = job_end_date;
            document.getElementById("job_end_time").value = data.end_time;
            document.getElementById("end_km").value = data.end_km;

            document.getElementById("vehicle").value = data.vehicle_registration_id;
            
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function getJobPhoto(job_id) {
    // Define the URL of the API
    const apiUrl = baseURL + "/job/job-photo/" + job_id;

    
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
            if(data.start_km_photo != 'Photo not found'){
                document.getElementById("start_odometer_photo_thumbnail").src = data.start_km_photo.content;
                document.getElementById("start_odometer_photo_thumbnail").alt = data.start_km_photo.file_name;
                document.getElementById("start_odometer_photo_display").href = data.start_km_photo.content;
            }
            if(data.end_km_photo != 'Photo not found'){
                document.getElementById("end_odometer_photo_thumbnail").src = data.end_km_photo.content;
                document.getElementById("end_odometer_photo_thumbnail").alt = data.end_km_photo.file_name;
                document.getElementById("end_odometer_photo_display").href = data.end_km_photo.content;
            }
            if(data.driver_selfie != 'Photo not found'){
                document.getElementById("driver_selfie_thumbnail").src = data.driver_selfie.content;
                document.getElementById("driver_selfie_thumbnail").alt = data.driver_selfie.file_name;
                document.getElementById("driver_selfie_display").href = data.driver_selfie.content;
            }
            if(data.vehicle_front_photo != 'Photo not found'){
                document.getElementById("front_photo_thumbnail").src = data.vehicle_front_photo.content;
                document.getElementById("front_photo_thumbnail").alt = data.vehicle_front_photo.file_name;
                document.getElementById("front_photo_display").href = data.vehicle_front_photo.content;
            }
            if(data.vehicle_left_photo != 'Photo not found'){
                document.getElementById("left_photo_thumbnail").src = data.vehicle_left_photo.content;
                document.getElementById("left_photo_thumbnail").alt = data.vehicle_left_photo.file_name;
                document.getElementById("left_photo_display").href = data.vehicle_left_photo.content;
            }
            if(data.vehicle_back_photo != 'Photo not found'){
                document.getElementById("back_photo_thumbnail").src = data.vehicle_back_photo.content;
                document.getElementById("back_photo_thumbnail").alt = data.vehicle_back_photo.file_name;
                document.getElementById("back_photo_display").href = data.vehicle_back_photo.content;
            }
            if(data.vehicle_right_photo != 'Photo not found'){
                document.getElementById("right_photo_thumbnail").src = data.vehicle_right_photo.content;
                document.getElementById("right_photo_thumbnail").alt = data.vehicle_right_photo.download ;
                document.getElementById("right_photo_display").href = data.vehicle_right_photo.content;
            }
            if(data.vehicle_video != 'Video not found'){
                // document.getElementById("video_thumbnail").src = data.vehicle_video.content;
                // document.getElementById("video_thumbnail").alt = data.vehicle_video.file_name;
                document.getElementById("video_display").href = data.vehicle_video.content;
                document.getElementById("video_display").download  = data.vehicle_video.file_name;
                // var video = document.getElementById("video_display");
                // var binaryString = atob(data.vehicle_video.content);
                // var blob = new Blob([binaryString], {type: "video/mp4"}); // Replace "video/mp4" with the type MIME of your video
                // video.srcObject = window.URL.createObjectURL(blob);
            }
            
          
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function updateJob() {
    $('#loading').show();
    
    var job_id = document.getElementById("job_id").value
    var driver = document.getElementById("driver").value;
    var job_start_date = document.getElementById("job_start_date").value;
    var job_start_time = document.getElementById("job_start_time").value;
    var start_km = document.getElementById("start_km").value;           
    var vehicle = document.getElementById("vehicle").value;
    var job_end_date = document.getElementById("job_end_date").value;
    var job_end_time = document.getElementById("job_end_time").value;
    var end_km = document.getElementById("end_km").value;

    // Define the URL of the API
    const apiUrl = baseURL + "/job/";

    // Define the data to be sent in the request body
    const requestData = {
        "job_id": job_id,
        "driver_id": driver,
        "start_day": job_start_date,
        "start_time": job_start_time,
        "start_km": start_km,
        "vehicle_registration_id": vehicle,
        "end_day": job_end_date,
        "end_time": job_end_time,
        "end_km": end_km
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
                title:	'Job Updated',
                text:	'Job is updated successfully!',
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

function approveJob() {
    $('#loading').show();
    
    var job_id = document.getElementById("job_id").value

    const requestData = {
        "emp_id": 1001
    };

    const jsonData = JSON.stringify(requestData);
    console.log('Request:', jsonData);

    // Define the URL of the API
    const apiUrl = baseURL + "/job/approve/" + job_id;


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
                title:	'Job Approved',
                text:	'Job is approved successfully!',
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

function rejectJob() {
    $('#loading').show();
    
    var job_id = document.getElementById("job_id").value;
    var reviewer_comment = document.getElementById("reviewer_comment").value;

    const requestData = {
        "emp_id": 1001,
        "reviewer_comment": reviewer_comment
    };

    const jsonData = JSON.stringify(requestData);
    console.log('Request:', jsonData);

    // Define the URL of the API
    const apiUrl = baseURL + "/job/reject/" + job_id;


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
                title:	'Job Rejected',
                text:	'Job is rejected successfully!',
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
            jobStarted();  
            $('#loading').hide();        
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
            jobEnded();
            $('#loading').hide();
                          
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

function jobStarted(){
    $('#job_start').modal('show');
}

function jobEnded(){
    $('#job_end').modal('show');
}