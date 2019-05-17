var id_mst_customer;
var check = 0;

//getData
function getData() {

    id_mst_customer = location.search.substring(1)
    console.log(id_mst_customer)

    var data = {
        tell: location.search.substring(1),
    };

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/register/getCustomer",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (customer) {
            var result = JSON.stringify(customer);
            console.log(result);
            // alert(result)
            document.getElementById("name").value = customer.firstname + " " + customer.lastname;
            //alert(customer);
            //id_mst_customer = customer._id;
        },
        error: function (e) {
            alert("Not found customer")
        }
    });
}

//addRow
function addToTable() {
    var v1 = document.getElementById("name").value;
    var v2 = document.getElementById("carNumber").value;
    var v3 = document.getElementById("carModel").value;
    var v4 = document.getElementById("price").value;

    if (v1 !== "" && v2 !== "" && v3 !== "" && v4 !== "") {
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

//insert
function insertToDB() {
    var detail = [];

    //insert object to spare
    table = document.getElementById("listTable");
    var row = table.rows;
    for (i = 1; i <= (row.length - 1); i++) {
        var value1 = table.rows[i].cells[0].innerHTML
        var value2 = table.rows[i].cells[1].innerHTML
        var value3 = table.rows[i].cells[2].innerHTML
        var value4 = table.rows[i].cells[3].innerHTML

        if (value1 != "xxx" && value2 != "xxx" && value3 != "xxx" && value4 != "xxx") {
            var obj = { "name": value1, "car_number": value2, "car_model": value3, "price": value4  };
            detail.push(obj)
        }
    }

    if (detail.length == 0) {
        window.alert("กรุณาเพิ่มข้อมูล")
    }
    else {
        var data1 = {
            ID_TRN_per_license_plate_detail: "",
            ID_MST_customer: id_mst_customer,
            detail: detail

        }
        // console.log(data1)

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:3000/api/register/insertToDB",
            data: JSON.stringify(data1),
            dataType: 'json',
            success: function (customer) {
                var result = JSON.stringify(customer);
                 if (customer.status == 'true') {
                    alert("insert Successful!")
                    console.log(customer._id)
                    window.location.href = "./../../main/regis/rgBill.html?" + customer._id

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