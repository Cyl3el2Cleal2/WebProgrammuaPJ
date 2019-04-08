
var check = 0;
//check number only
function isInputNumber(evt) {
    var ch = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(ch))) {
        evt.preventDefault();
    }
}

function isInputLetter(evt) {
    var ch = String.fromCharCode(evt.which);
    if ((/[0-9]/.test(ch))) {
        evt.preventDefault();
    }
}

//addRow
function addToTable() {
    var v1 = document.getElementById("nameSpare").value;
    var v2 = document.getElementById("numSpare").value;
    var v3 = document.getElementById("priceSpare").value * v2;

    if (v1 !== "" && v2 !== "" && v3 !== "") {
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
        cell1.innerHTML = '<td >' + v1 + '</td>';
        cell2.innerHTML = '<td >' + v2 + '</td>';
        cell3.innerHTML = '<td >' + v3 + '</td>';
        cell4.innerHTML = '<td ><center><a onclick="deleteToTable()" class="button delete">ลบ</a></center></td>';
        check = check + 1;
    } else {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    }
    console.log(v1 + " " + v2 + " " + v3)

}

//deleteRow
function deleteToTable() {
    var index, table = document.getElementById('listTable');
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[3].onclick = function () {
            index = this.parentElement.rowIndex;
            table.deleteRow(index);
            console.log(index);
        };

    }
}


//insert
function insertToDB() {
    var id = "MDA00001"
    var nameCus = document.getElementById("nameCus").value;
    var date = document.getElementById("date").value;;
    var carLicense = document.getElementById("carLicense").value;
    var carModel = document.getElementById("carModel").value;
    var carColor = document.getElementById("carColor").value;
    var empID = document.getElementById("empID").value;
    var spare = [];
    //insert object to spare
    table = document.getElementById("listTable");
    var row = table.rows;
    for (i = 1; i <= (row.length - 1); i++) {
        var value1 = table.rows[i].cells[0].innerHTML
        var value2 = table.rows[i].cells[1].innerHTML
        var value3 = table.rows[i].cells[2].innerHTML

        var obj = { "nameSpare": value1, "numSpare": value2, "priceSpare": value3 };
        spare.push(obj)
    }
    
    if (nameCus == "") {
        alert("กรุณากรอกชื่อลูกค้าให้ครบถ้วน")
    } else if (date == "") {
        alert("กรุณากรอกวันที่ให้ครบถ้วน")
    } else if (carLicense == "") {
        alert("กรุณากรอกทะเบียนรถให้ครบถ้วน")
    } else if (carModel == "") {
        alert("กรุณากรอกรุ่นรถให้ครบถ้วน")
    } else if (carColor == "") {
        alert("กรุณากรอกสีรถให้ครบถ้วน")
    } else if (empID == "") {
        alert("กรุณากรอกรหัสพนักงานให้ครบถ้วน")
    } else if (spare == "") {
        alert("กรุณากรอกชิ้นส่วนอุปกรณ์ให้ครบถ้วน")
    } else {
        var data1 = {
            ID_TRNmaintennance_detail_administer: id,
            nameCus: nameCus,
            date: date,
            carLicense: carLicense,
            carModel: carModel,
            carColor: carColor,
            ID_TRNmaintennance_detail_repairman: empID,
            carSpare: spare
        }
        console.log(data1)
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:3000/api/insertToDBEmp",
            data: JSON.stringify(data1),
            dataType: 'json',
            success: function (customer) {
                var result = JSON.stringify(customer);
                console.log(result);
                if (JSON.stringify(customer) == 'true') {
                    alert("insert Successful!")
                    //window.location = "./../../main/repair/rpDetailEmp.html";

                } else {
                    alert("insert Incorrect!");
                }
            },
            error: function (e) {
                console.log("ERROR: ", e);
            }
        });
    }
}