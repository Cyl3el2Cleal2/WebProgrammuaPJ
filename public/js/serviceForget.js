function forget() {
    var email = $("#email").val();
    var data = {
        email: email,
    }
   
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/forget",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (customer) {
            var resultEmail,resultPassword,resultName ;
            console.log(customer.length)
            if(customer.length>0){
                for (var i = 0; i < customer.length; i++) {
                    resultEmail = customer[i].email
                    resultPassword = customer[i].password
                    resultName = customer[i].firstname+" "+customer[i].lastname
                }

                alert("Please, check password your email!")
                window.location = 'login.html'
            }else{
                alert("Email incorect!");
            }

        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });
}





