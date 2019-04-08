//print Ticket without form
function myFunction(){
    window.print();
}

function getTableCarRecieve() {

    var id = {
        id: location.search.substring(0)
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/mm/Repair/carRecieve/getTable",
        data: JSON.stringify(id),
        dataType: 'json',
        success: function (res) {
            console.log(res.length)

            console.log(res)
            var bill = res[0];
            var customer = res[2];
            var stock = res[4];

            var vat = parseInt(bill[0].vat);
            var table = {
                ID_TRN_car_recieve: "1",
                license_plate: stock[0].license_plate,
                type: stock[0].model,
                color: stock[0].color,
                price: stock[0].price
            }
            document.getElementById("mmRecieveDate").value = bill[0].date;
            document.getElementById("thisDate").value = bill[0].type;
            document.getElementById('recieveName').value = customer[0].firstname + " " + customer[0].lastname
            document.getElementById('recieveTel').value = customer[0].tel

            var json = []
            json.push(table)

            var td = "mmtd"
            var th = "mmBVth"
            var table = "mmBVtable"
            var tr = "mmBVtr"

            var tableHeader = "<table class=" + table + "><tr><th class=" + th + ">ลำดับที่</th ><th class=" + th + ">ข้อมูลรถ</th><th class=" + th + ">ประเภทรถ</th><th class=" + th + ">ประเภทการซ่อม</th></tr>";
            var tableContent = "";

            var pr = 0;
            var p;
            for (i = 0; i < json.length; i++) {
                tableContent = tableContent + "<tr class=" + tr + ">"
                    + "<td class=" + td + ">" + json[i].ID_TRN_car_Recieve +
                    "</td> <td class=" + td + ">" + json[i].license_platcar + 
                    "</td> <td class=" + td + ">" + json[i].type + json[i].color +
                    "</td> <td class=" + td + ">" + json[i].price +
                    "</tr>";

            }
            var tableFooter = "</table>";
            document.getElementById("mmtable").innerHTML = tableHeader + tableContent + tableFooter

        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });

}
