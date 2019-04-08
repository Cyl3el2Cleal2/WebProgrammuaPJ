var pic = ""
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
     $('#blah').attr('src', e.target.result);
       pic = e.target.result
    }
    console.log(input.files[0])
    reader.readAsDataURL(input.files[0]);

  }
}
function save() {
  // var pic = $('#blah').attr('src',base64Img)
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
var result = ""
function search() {
  $.ajax({
    type: "GET",
    contentType: "application/json",
    url: "http://localhost:3000/api/emp/search",
    data: JSON.stringify(""),
    dataType: 'json',
    success: function (customer) {
      result = customer
      for (var i = 0; i < customer.length; i++) {
        $("#myUL").append("<li><a id=\"" + (i) + "\" onclick=\"showdata(this.id)\" value=\"" + customer[i].ID_MST_employee + "\"> " + customer[i].ID_MST_employee + "</a></li>");
      }

    },
    error: function (e) {
      console.log("ERROR: ", e);
    }
  });

}
function filter() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function showdata(id) {
  document.getElementById('tell').value = result[id].tel;
  document.getElementById("mail").value = result[id].email;
  document.getElementById("id-card").value = result[id].idcard;
  document.getElementById("salary").value = result[id].salary;
  document.getElementById("id").value = result[id].ID_MST_employee;
  document.getElementById("position").value = result[id].employee_type;
  document.getElementById("name").value = result[id].name + " " + result[id].lastname;
  document.getElementById("gender").value = result[id].gender;
  document.getElementById("age").value = result[id].age;
  document.getElementById("address").value = result[id].address;
  document.getElementById('blah').src = result[id].picture;

  document.getElementById('tell').disabled = true
  document.getElementById("mail").disabled = true
  document.getElementById("id-card").disabled = true
  document.getElementById("salary").disabled = true
  document.getElementById("id").disabled = true
  document.getElementById("position").disabled = true
  document.getElementById("name").disabled = true
  document.getElementById("gender").disabled = true
  document.getElementById("age").disabled = true
  document.getElementById("address").disabled = true
  document.getElementById('upload').disabled = true
  // console.log(id)
  // console.log(result)
}

function edit() {
  document.getElementById('tell').disabled = false
  document.getElementById("mail").disabled = false
  document.getElementById("id-card").disabled = false
  document.getElementById("salary").disabled = false
  document.getElementById("id").disabled = false
  document.getElementById("position").disabled = false
  document.getElementById("name").disabled = false
  document.getElementById("gender").disabled = false
  document.getElementById("age").disabled = false
  document.getElementById("address").disabled = false
  document.getElementById('upload').disabled = false
}