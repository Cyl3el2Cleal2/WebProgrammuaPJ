function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#blah').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);

  }
}

function save() {
  var pic = $('#blah').attr('src')
  var tell = document.getElementById("tell").value;
  var email = document.getElementById("mail").value;
  var id_card = document.getElementById("id-card").value;
  var salary = document.getElementById("salary").value;
  var id = document.getElementById("id").value;
  var position = document.getElementById("position").value;
  var name = document.getElementById("name").value;
  var gender = document.getElementById("gender").value;
  var age = document.getElementById("age").value;
  var address = document.getElementById("address").value;
  console.log(pic);
  if (tell == "" || email == "" || id_card == "" || salary == "" || id == "" || position == "" || name == "" || age == "" || address == "") {
    window.alert("กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง")
  } else {
    var data = {
      picture: pic,
      id: id,
      email: email,
      gender: gender,
      tel: tell,
      age: age,
      employee_type: position,
      address: address,
      salary: salary,
      name: name,
      id_card: id_card

    };
    console.log(data);
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "http://localhost:3000/api/emp",
      data: JSON.stringify(data),
      dataType: "json",
      success: function (customer) {
        var result = JSON.stringify(customer);
        console.log(result);
        if (JSON.stringify(customer) == "true") {
          alert("Save Successful!");
          window.location = "main.html";
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