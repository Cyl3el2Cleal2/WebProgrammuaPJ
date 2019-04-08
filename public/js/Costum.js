
function getRedio() {
    if (document.getElementById('r1').checked == true) {
        return document.getElementById('r1').value;
    } else if (document.getElementById('r2').checked == true) {
        return document.getElementById('r2').value;
    }
}

function checknull() {

}
function save() {
    if (document.getElementById('r1').checked == false && document.getElementById('r2').checked == false) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    } else if (document.getElementById('type').value == "" || document.getElementById('name').value == "" || document.getElementById('sername').value == ""
        || document.getElementById('age').value == "" || document.getElementById('tel').value == "" || document.getElementById('email').value == ""
        || document.getElementById('IDcard').value == "") {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    } else {
        var costum_type = document.getElementById('type').value
        var name = document.getElementById('name').value
        var sername = document.getElementById('sername').value
        var gender = getRedio()
        var age = document.getElementById('age').value
        var tel = document.getElementById('tel').value
        var email = document.getElementById('email').value
        var costum_id = document.getElementById('IDcard').value

        var data = {
            costum_type: costum_type,
            name: name,
            sername: sername,
            gender: gender,
            age: age,
            tel: tel,
            email: email,
            costum_id: costum_id
        };
        console.log(data)
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:3000/api/Custum",
            data: JSON.stringify(data),
            dataType: "json",
            success: function (customer) {
                var result = JSON.stringify(customer);
                console.log(result);
                if (JSON.stringify(customer) == "true") {
                    alert("Save Successful!");
                    window.location = "../buy/bBuy.html?" + tel
                } else {
                    alert("Save Incorrect!");
                }
            },
            error: function (e) {
                console.log("ERROR: ", e);
            }
        });
    }

}

//check number
function isInputNumber(evt) {
    var ch = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(ch))) {
        evt.preventDefault();
    }
}

//check string
function isInputLetter(evt) {
    var ch = String.fromCharCode(evt.which);
    if ((/[1-9]/.test(ch))) {
        evt.preventDefault();
    }
}