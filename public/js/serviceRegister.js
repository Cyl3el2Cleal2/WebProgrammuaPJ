var username, password, confirmpassword,firstname,lastname, tel, email, age, idcard, type, address;
var emailFilter = /^.+@.+\..{2,3}$/;
function register() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    confirmpassword = document.getElementById("confirmpassword").value;
    firstname = document.getElementById("firstname").value;
    lastname = document.getElementById("lastname").value;
    genderm = document.getElementById("r1").checked;
    genderw = document.getElementById("r2").checked;
    tel = document.getElementById("tel").value;
    email = document.getElementById("email").value;
    age = document.getElementById("age").value;
    idcard = document.getElementById("idcard").value;
    type = document.getElementById("type").value;
    address = document.getElementById("address").value;
    if (username == "") {
        alert("กรุณากรอกชื่อผู้ใช้");
        document.getElementById("username").focus();
    }
    else if (password == "") {
        alert("กรุณากรอกรหัสผ่าน");
        document.getElementById("password").focus();
    }
    else if (password != confirmpassword) {
        alert("รหัสผ่านไม่ตรงกัน");
        document.getElementById("confirmpassword").focus();
    }
    else if (genderm == false && genderw == false) {
       
        alert("กรุณาเลือกเพศ")
    }
    else if (tel == "") {
        alert("กรุณาเบอร์โทรศัพท์ให้ครบ 10 หลัก");
        document.getElementById("tel").focus();
    }
    else if (email == "") {
        alert("กรุณากรอกอีเมล");
        document.getElementById("email").focus();
    }
    else if (!(emailFilter.test(email))) {
        alert("กรุณากรอกอีเมลให้ถูกต้อง");
        document.getElementById("email").focus();
    }
    else if (age == "") {
        alert("กรุณากรอกอายุ");
        document.getElementById("age").focus();
    }

    else if (idcard == "" || idcard.length != 13) {
        alert("กรุณากรอกรหัสบัตรประชาชน 13 หลัก");
        document.getElementById("idcrad").focus();
    }

    else if (type == "") {
        alert("กรุณากรอกประเภทงาน");
        document.getElementById("type").focus();
    }

    else if (address == "") {
        alert("กรุณากรอกที่อยู่");
        document.getElementById("address").focus();
    } else {
       
       checkUsername();
    }
   
}
function checkUsername(){
    var data = {
        username: username
    };
    console.log(username)
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/register/username",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (customer) {
          var result = JSON.stringify(customer);
          console.log(result);
          if (JSON.stringify(customer) == "true") {
            insert();
          } else {
            alert("กรุณาเปลี่ยนชื่อผู้ใช้");
            document.getElementById("username").focus();
          }
        },
        error: function (e) {
          console.log("ERROR: ", e);
        }
      });
}
function insert() {
    var gender;
    genderm = document.getElementById("r1").checked;
    genderw = document.getElementById("r2").checked;
    
    if(genderm==true){
       gender = "ชาย";
    }else{
        gender = "หญิง";
    }
    var data = {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        tel: tel,
        email: email,
        age: age,
        idcard: idcard,
        type: type,
        address: address,
       
    }
    

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/register/insert",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (customer) {
            var result = JSON.stringify(customer);
            if (JSON.stringify(customer) == 'true') {
                alert("สมัครสมาชิกสำเร็จ!")
                window.location = 'login.html'

            } else {
                alert("กรุณาสมัครใหม่อีกครั้ง!");
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });
}


//---------------------------------------------------rgDetail----------------------------------------------------
var check = 0;
//addRow
function addToTable() {
    var v1 = document.getElementById("name").value;
    var v2 = document.getElementById("carNumber").value;
    var v3 = document.getElementById("carModel").value;
    var v4 = document.getElementById("price").value;

    if (v1 !== "" && v2 !== "" && v3 !== "" && v3 !== "") {
        if (check == 0) {
            document.getElementById("listTable").deleteRow(1);
            document.getElementById("listTable").deleteRow(1);
        }
        var table = document.getElementById("listTable");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = '<td >' + v1 + '</td>';
        cell2.innerHTML = '<td >' + v2 + '</td>';
        cell3.innerHTML = '<td >' + v3 + '</td>';
        cell4.innerHTML = '<td >' + v4 + '</td>';
        cell5.innerHTML = '<td ><center><a onclick="deleteToTable()" class="button delete">ลบ</a></center></td>';
        check = check + 1;
    } else {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    }
    console.log(v1 + " " + v2 + " " + v3 +" " +v4)

}

//deleteRow
function deleteToTable() {
    var index, table = document.getElementById('listTable');
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[4].onclick = function () {
            index = this.parentElement.rowIndex;
            table.deleteRow(index);
            console.log(index);
        };

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