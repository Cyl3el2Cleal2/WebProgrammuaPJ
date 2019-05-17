function getTableCarRecieve() {

    var id = {
        id: location.search.substring(1)
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/mm/Repair/carRecieve/getTable",
        data: JSON.stringify(id),
        dataType: 'json',
        success: function(res) {
            console.log(res.length)

            console.log(res)
            var bill = res[0];
            var customer = res[2];
            var stock = res[1];
            console.log(customer)
            var detail = stock[0].carSpare
            var json = []
          
            for(var i =0;i<detail.length;i++){
                var table = {
                    ID_TRN_car_recieve: i,
                    license_plate: bill[0].carLicense,
                    type: bill[0].carModel,
                    Rep : detail[i].nameSpare
                    
                }
                json.push(table)
            }
           
            document.getElementById("mmRecieveDate").value = stock[0].date;
            document.getElementById("thisDate").innerHTML = stock[0].date;
            document.getElementById('recieveName').innerHTML = customer[0].firstname + " " + customer[0].lastname
            document.getElementById('recieveTel').innerHTML = customer[0].tel


            var td = "mmtd"
            var th = "mmBVth"
            var table = "mmBVtable"
            var tr = "mmBVtr"

            var tableHeader = "<table class=" + table + "><tr><th class=" + th + ">ลำดับที่</th ><th class=" + th + ">ข้อมูลรถ</th><th class=" + th + ">ประเภทรถ</th><th class=" + th + ">ประเภทการซ่อม</th></tr>";
            var tableContent = "";

            var pr = 0;
            var p;
            for (i = 0; i < json.length; i++) {
                tableContent = tableContent + "<tr class=" + tr + ">" +
                    "<td class=" + td + ">" + json[i].ID_TRN_car_recieve +
                    "</td> <td class=" + td + ">" + json[i].license_plate +
                    "</td> <td class=" + td + ">" + json[i].type +
                    "</td> <td class=" + td + ">" + json[i].Rep +
                    "</tr>";

            }
            var tableFooter = "</table>";

            document.getElementById("mmtable").innerHTML = tableHeader + tableContent + tableFooter

        },
        error: function(e) {
            alert("เกิดข้อผิดพลาด")
        }
    });

}

function PrintDiv() {
    document.getElementById('print').style.display = "none"
    document.getElementById('insert').style.display = "none"
    window.print();
    if(window.closed == false || window.close == true){
        document.getElementById('print').style.display = "block"
        document.getElementById('insert').style.display = "block"
    }
}
function InsertTicket(){
    var data = {
       
    recieveName : $('#recieveName').text(),
    recieveTel : $('#recieveTel').text(),
    date : $('#mmRecieveDate').text(),
    TRN_maintennance_detail_administer : location.search.substring(1)
        
    }
    console.log(data)

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/car_recieve/Ticket/insert",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (res) {
          
                alert("ทำรายการ " + $('#typeCus').text() + " " + "สำเร็จ")
                window.location.href = "rpBill.html?" + res.id
          
              
            

        },
        error: function (e) {
            alert("ทำรายการ " + $('#typeCus').text() + " " + "ไม่สำเร็จ")
        }
    })
}