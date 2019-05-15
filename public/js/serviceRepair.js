
var id_mst_customer;
function getData() {
    var data = {
        tell: location.search.substring(1),
    };
    // $.ajax({
    //     type: "POST",
    //     contentType: "application/json",
    //     url: "http://localhost:3000/api/bBuy/getCostum",
    //     data: JSON.stringify(data),
    //     dataType: "json",
    //     success: function (customer) {
    //         var result = JSON.stringify(customer);
    //         console.log(result);
    //         // alert(result)
    //         document.getElementById("name").value = customer.firstname + " " + customer.lastname;
    //         //alert(customer);
    //         id_mst_customer = customer._id;
    //     },
    //     error: function (e) {
    //         alert("Not found customer")
    //     }
    // });
}

var check = 0;
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
    var id = "MDR00002"
    var empID = document.getElementById("empID").value;
    var date = document.getElementById("date").value;
    var carLicense = document.getElementById("carLicense").value;
    var carModel = document.getElementById("carModel").value;
    var carColor = document.getElementById("carColor").value;
    var spare = [];

    //insert object to spare
    table = document.getElementById("listTable");
    var row = table.rows;
    for (i = 1; i <= (row.length - 1); i++) {
        var value1 = table.rows[i].cells[0].innerHTML
        var value2 = table.rows[i].cells[1].innerHTML
        var value3 = table.rows[i].cells[2].innerHTML

        if (value1 !== "xxx" && value2 !== "xxx") {
            var obj = { "nameSpare": value1, "numSpare": value2, "priceSpare": value3  };
            spare.push(obj)
        }
    }

    // console.log(empID);
    // console.log(date);
    // console.log(carLicense);
    // console.log(carModel);
    // console.log(carColor);
    // console.log(spare);

    //check input value
    if (empID == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (date == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    } else if (carLicense == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    }
    else if (carModel == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    }
    else if (carColor == "") {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    }
    else if (spare.length == 0) {
        window.alert("กรุณาเพิ่มข้อมูลอะไหล่และราคาให้ถูกต้องและครบถ้วน")
    }
    else {
        var data1 = {
            ID_TRNmaintennance_detail_repairman: id,
            date: date,
            carLicense: carLicense,
            carModel: carModel,
            carColor: carColor,
            ID_MST_employee: empID,
            ID_MST_customer: "5cdbec9726d4b323a4479bd0",
            carSpare: spare

        }
        // console.log(data1)

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:3000/api/insertToDB",
            data: JSON.stringify(data1),
            dataType: 'json',
            success: function (customer) {
                var result = JSON.stringify(customer);
                // console.log("AAA**");
                // console.log(result);
                id_mst_customer = customer._id;
                // console.log(id_mst_customer)
                 if (customer.status == 'true') {
                    alert("insert Successful!")
                    window.location.href = "./../../main/repair/rpDetailEmp.html?" + customer._id

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