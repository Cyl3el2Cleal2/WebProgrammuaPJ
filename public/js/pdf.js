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
    document.getElementById("pdf_address").textContent = document.getElementById("address").value
    document.getElementById("pdf_type").textContent = document.getElementById("type").value
    document.getElementById("pdf_license").textContent = document.getElementById("license").value
    document.getElementById("pdf_gen").textContent = document.getElementById("gen").value
    document.getElementById("pdf_color").textContent = document.getElementById("color").value
    document.getElementById("pdf_money").textContent = document.getElementById("money").value
}
// รับมา
var ID_customer = "E00010";
var ID_stock;
var ID_employee;
var ID_buy;
// กรอก
var location;
var date;
var money;

function init(){
    document.getElementById("location").value = "rp89"
}
function getData(){
    var id = {
        id: ID_customer
    } 
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/buy/deal/getItem",
        data: JSON.stringify(id),
        dataType: 'json',
        success: function (res) {
            console.log("HIHIHI")
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    })
}

function insertToDB(){
    // ID_this;
    // date = document.getElementById("date").value;
    // ID_stock;
    // ID_emp;
    // ID_cus;
    // ID_sale; 
    // create()
    // var test = $("#put").val()
    // alert(test)
    window.location.href="bBill.html?"+5 
    alert(date)
    $("#show").text("DL SODA")
}

// function insertOfficer() {
//     var user = $("#user").val();
//     var passwd = $("#pass").val();
//     var id = $("#idoff").val();
//     var fnl = $("#fandl").val();
//     var ofic = $("#offi").val();
//     var dataOff = {
//         username: user,
//         password: passwd,
//         id: id,
//         fnl: fnl,
//         ofic: ofic
//     }
//     // console.log(dataOff)

//     $.ajax({
//         type: "POST",
//         contentType: "application/json",
//         url: "http://localhost:8080/api/officer/insertItem",
//         data: JSON.stringify(dataOff),
//         dataType: 'json',
//         success: function (customer) {
//             var result = JSON.stringify(customer);
//             // console.log(result);
//             if (JSON.stringify(customer) == 'true') {
//                 alert("insert Successful!")
//                 window.location.reload();

//             } else {
//                 alert("insert Incorrect!");
//             }
//         },
//         error: function (e) {
//             console.log("ERROR: ", e);
//         }
//     });
// }