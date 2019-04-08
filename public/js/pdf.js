function PrintDiv() {
    var divToPrint = document.getElementById('print'); // เลือก div id ที่เราต้องการพิมพ์
    var html = '<html>' + // 
        '<head>' +
        '<link href="print.css" rel="stylesheet" type="text/css">' +
        '<link rel="stylesheet" href="./../../css/style.css" />' +
        '</head>' +
        '<body onload="window.print(); window.close();">' + divToPrint.innerHTML + '</body>' +
        '</html>';

    var popupWin = window.open();
    popupWin.document.open();
    popupWin.document.write(html); //โหลด print.css ให้ทำงานก่อนสั่งพิมพ์
    popupWin.document.close();
}

function showPdf() {
    document.getElementById("pdf_location").textContent = document.getElementById("location").value
    document.getElementById("pdf_date").textContent = document.getElementById("date").value
    document.getElementById("pdf_name").textContent = document.getElementById("name").value
    document.getElementById("pdf_emp").textContent = document.getElementById("emp").value
    document.getElementById("pdf_emp2").textContent = document.getElementById("emp").value
    document.getElementById("pdf_address").textContent = document.getElementById("address").value
    document.getElementById("pdf_type").textContent = document.getElementById("type").value
    document.getElementById("pdf_license").textContent = document.getElementById("license").value
    document.getElementById("pdf_gen").textContent = document.getElementById("gen").value
    document.getElementById("pdf_color").textContent = document.getElementById("color").value
    document.getElementById("pdf_money").textContent = document.getElementById("money").value
}
// รับมา
var ID_customer = "C00011";
var ID_stock = "ST00011";
var ID_employee = "E00012";
var ID_buy = "BY00010";
// กรอก
var location;
var money;
var name_customer;
var name_employee;
var address_customer;
var brand;
var license;
var model;
var color;


function init() {
    $("#name").val("ประยุทธ์ จันทร์โอซา")
    $("#emp").val("สุเทพ เทือกสูบรรณ")
    $("#address").val("130/1 อาคารปานศรี ซอยรัชดาภิเษก")
    $("#type").val("TOYOTA")
    $("#license").val("สว 250 กกต")
    $("#gen").val("Yalis")
    $("#color").val("Red")
    showPdf();
}
function getData() {
    var id = {
        id: "5c8e30f8ce43e42e980ac2d8"
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/buy/deal/getItem",
        data: JSON.stringify(id),
        dataType: 'json',
        // success: function (res) {
        //     console.log("HIHIHI"+res)
        //     name_customer;
        //     name_employee;
        //     address_customer;
        //     brand;
        //     license;
        //     model;
        //     color;
        // },
        // error: function (e) {
        //     console.log("ERROR: ", e);
        // }
    })
}

function insertToDB() {

    var data = {
        ID_buy_contract: "BC0001",
        ID_CUS: ID_customer,
        ID_EMP: ID_employee,
        ID_buy: ID_buy,
        ID_stock: ID_stock,
        DATE: $("#date").val()
    }
    console.log(data)
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/buy/deal/insertContract",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (res) {
            console.log(res);
            if (JSON.stringify(res) == 'true') {
                alert("insert Successful!")
                window.location.href = "bBill.html?" + data.ID_buy_contract
            } else {
                alert("insert Incorrect!");
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    })
}

function createID() {

}

function fill() {
    if ($("#location").val() == "") {
        alert("กรุณาใส่ข้อมูลให้ครบ")
    } else if ($("#date").val() == "") {
        alert("กรุณาใส่ข้อมูลให้ครบ")
    } else if ($("#money").val() == "") {
        alert("กรุณาใส่ข้อมูลให้ครบ")
    } else {
        insertToDB()
    }
}