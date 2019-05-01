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
var ID_buy_con;
var ID_customer;
var ID_stock;
var ID_employee = "E00012";
var ID_buy;
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


function getData() {
    var id = {
        id: location.search.substring(1)
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/deal/getItem",
        data: JSON.stringify(id),
        dataType: 'json',
        success: function (res) {
            console.log(res)
            name_customer = res[3];
            license = res[5];
            model = res[4];
            color = res[6];
            ID_buy = res[0];
            ID_customer = res[1]
            ID_stock = res[2]
            money = res[7]
            init()
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    })
}

function init() {
    $("#name").val(name_customer)
    $("#emp").val("สุเทพ เทือกสูบรรณ")
    $("#address").val("130/1 อาคารปานศรี ซอยรัชดาภิเษก")
    $("#type").val(model)
    $("#license").val(license)
    $("#gen").val(model)
    $("#color").val(color)
    $("#money").val(money)
    showPdf();
}


function insertToDB() {

    var data = {
   
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
            if (res.status == 'true') {
                alert("insert Successful!")
                window.location.href = "bBill.html?" + res._id
            } else {
                alert("insert Incorrect!");
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    })
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