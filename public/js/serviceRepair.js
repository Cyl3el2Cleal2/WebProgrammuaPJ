var check = 0;
//addRow
function addToTable() {
    var v1 = document.getElementById("nameSpare").value;
    var v2 = document.getElementById("priceSpare").value;

    if (v1 !== "" && v2 !== "") {
        if (check == 0) {
            document.getElementById("listTable").deleteRow(1);
            document.getElementById("listTable").deleteRow(1);
        }
        var table = document.getElementById("listTable");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = '<td >' + v1 + '</td>';
        cell2.innerHTML = '<td >' + v2 + '</td>';
        cell3.innerHTML = '<td ><center><a onclick="deleteToTable()" class="button delete">ลบ</a></center></td>';
        check = check + 1;
    } else {
        window.alert("กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน")
    }

}

//deleteRow
function deleteToTable() {
    var index, table = document.getElementById('listTable');
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[2].onclick = function () {

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
    var date = document.getElementById("date").value;;
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

        var obj = { "nameSpare": value1, "priceSpare": value2 };
        spare.push(obj)
    }

    var data1 = {
        ID_TRNmaintennance_detail_repairman: id,
        date: date,
        carLicense: carLicense,
        carModel: carModel,
        carColor: carColor,
        ID_MST_employee: empID,
        carSpare: spare

    }
    console.log(data1)

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/insertToDB",
        data: JSON.stringify(data1),
        dataType: 'json',
        success: function (customer) {
            var result = JSON.stringify(customer);
            console.log(result);
            if (JSON.stringify(customer) == 'true') {
                alert("insert Successful!")
                window.location = "./../../main/repair/rpDetailEmp.html"

            } else {
                alert("insert Incorrect!");
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });
}