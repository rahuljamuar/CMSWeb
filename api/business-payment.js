var baseURL = myBaseURL();

function getAllBusinessPayment() {
    // Define the URL of the API
    const apiUrl = baseURL + "/business-payment/";

    
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
                var business_payment_id = encodeURIComponent(data[i]["business_payment_id"]);
                business_payment_id = '<a style="color: blue;" href="edit-business-payment.html?business_payment_id=' + business_payment_id + '">' + data[i]["business_payment_id"] + '</a>' ;
                current_row.push(business_payment_id);
                current_row.push(data[i]["business_id"]);
                var payment_duration = data[i]["for_month"] + " - " + data[i]["for_year"]
                current_row.push(payment_duration);
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
             
            new DataTable('#business_payment_table', {
                columns: [
                    { title: 'ID' },
                    { title: 'Business' },
                    { title: 'Payment Period' },
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


function createBusinessPayment() {
    $('#loading').show();
    var business = document.getElementById("business").value;
    var payment_date = document.getElementById("payment_date").value;
    var amount = document.getElementById("amount").value;
    var payment_period_month = document.getElementById("payment_period").value.split("-")[0];
    var payment_period_year = document.getElementById("payment_period").value.split("-")[1];
    // Define the URL of the API
    const apiUrl = baseURL + "/business-payment/";

    // Define the data to be sent in the request body
    const requestData = {
        "business_id": business,
        "payment_date": payment_date,
        "amount": amount,
        "for_month": payment_period_month,
        "for_year": payment_period_year
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

async function getABusinessPayment(business_payment_id) {
    // Define the URL of the API
    const apiUrl = baseURL + "/business-payment/business-payment-id/" + business_payment_id;

    
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
            document.getElementById("business_payment_id").value = data.business_payment_id;
            document.getElementById("business").value = data.business_id;
            var payment_date = data.payment_date.toString().split("T");
            payment_date = payment_date[0];
            document.getElementById("payment_date").value = payment_date;
            document.getElementById("amount").value = data.amount;
            document.getElementById("payment_period").value = data.for_month + '-' + data.for_year;
            
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });

}

function updateBusinessPayment() {
    $('#loading').show();
    var business_payment_id = document.getElementById("business_payment_id").value;
    var business = document.getElementById("business").value;
    var payment_date = document.getElementById("payment_date").value;
    var amount = document.getElementById("amount").value;
    var payment_period_month = document.getElementById("payment_period").value.split("-")[0];
    var payment_period_year = document.getElementById("payment_period").value.split("-")[1];

    // Define the URL of the API
    const apiUrl = baseURL + "/business-payment/";

    // Define the data to be sent in the request body
    const requestData = {
        "business_payment_id": business_payment_id,
        "business_id": business,
        "payment_date": payment_date,
        "amount": amount,
        "for_month": payment_period_month,
        "for_year": payment_period_year
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
                title:	'Business Payment Updated',
                text:	'Business Payment is updated successfully!',
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

function deleteBusinessPayment() {
    $('#loading').show();
    var business_payment_id = parseInt(document.getElementById("business_payment_id").value);
    // Define the URL of the API
    const apiUrl = baseURL + "/business-payment/business-payment-id/" + business_payment_id;

    
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

function setPaymentDuration(){
    for (var i = 3; i >= 0; i--) {
        var date = new Date(Date.now());
        var newDate = new Date(date.setMonth(date.getMonth()-i));
        var month = newDate.toLocaleString('en-US', {month: 'long'});
        var year = newDate.getFullYear()
        $('#payment_period').append( '<option value=' + month + '-' + year +'>' + month + ' - ' + year + '</option>' );  
    }
}