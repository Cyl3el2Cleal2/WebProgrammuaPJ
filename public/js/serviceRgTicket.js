var count = 0;

function init() {
    // count++;
    // document.getElementById("numberOfTicket").innerHTML = "เลขที่___" + count + "___";
    var data = {
        tell: location.search.substring(1)
    };
    console.log(data)
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/LoadDataRpTicket",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(customer) {
            var result = JSON.stringify(customer);
            console.log(result);
            if (JSON.stringify(customer) != 'false') {
                alert("Load Successful!")
                document.getElementById("numberOfTicket").innerHTML = "เลขที่___" + customer[1] + "___";
                document.getElementById("numberCarAndNumberTank").innerHTML = "เอกสารที่ให้ไว้เพื่อแสดงว่ารถหมายเลขทะเบียนที่____" + customer[2] + "____" + "ตัวถังที่ ___" + customer[0].ID_TRN_per_license_plate_detail + "___";
                document.getElementById("timeData").innerHTML = "ได้ทำประกันภัยตามพระรายบัญญัติคุ้มคริงผู้ประสบภัยจากรถยนต์ 2562 โดยมีระยะเวลาประกันภัย วันที่ ___" + customer[0].date + "___";
                document.getElementById("numb").innerHTML = "ตามกรมธรรม์ประกันภัยเลขที่ ___" + customer[0].ID_TRN_license_bill + "___ ของบริษัท ____โชคทวีออโต้เซลล์____";
            } else {
                alert("Load Incorrect!");
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    });
}

function sendTo() {
    var data = {
        tell: location.search.substring(1)
    };
    window.location.href = "rgVat.html?" + data.tell;
}