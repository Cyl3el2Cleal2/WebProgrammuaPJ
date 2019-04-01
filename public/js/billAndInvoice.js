function getTableBill() {

    
    var id = {
        id:  location.search.substring(1)
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/buy/bill/getItem",
        data: JSON.stringify(id),
        dataType: 'json',
        success: function (res) {

            var con = res[0];
            var customer = res[1];
            var stock = res[3];

            var json = []
            var table = {
                ID_TRN_buy_bill: "BYB0001",
                license_plate: stock[0].license_plate,
                model: stock[0].model,
                ID_MST_stock: stock[0].ID_MST_stock,
                weight: "-"
            }
            json.push(table)
            /**************** css*////************** */
            var td = "BVtd"
            var th = "BVth"
            var table = "BVtable"
            var tr = "BVtr"
            /**************** *////************** */
            var tableHeader = "<table class=" + table + "><tr><th class=" + th + ">รหัสรถยนต์</th ><th class=" + th + ">ชื่อรถยนต์/รุ่น</th><th class=" + th + ">เลขทะเบียน</th><th class=" + th + ">เลขเครื่อง</th><th class=" + th + ">น้ำหนัก</th></tr>";
            var tableContent = "";


            var pr = 0;
            var p;
            for (i = 0; i < json.length; i++) {
                tableContent = tableContent + "<tr class=" + tr + ">"
                    + "<td class=" + td + ">" + json[i].ID_TRN_buy_bill +
                    "</td> <td class=" + td + ">" + json[i].model +
                    "</td> <td class=" + td + ">" + json[i].license_plate +
                    "</td> <td class=" + td + ">" + json[i].ID_MST_stock +
                    "</td> <td class=" + td + ">  " + json[i].weight +
                    "</tr>";

            }
            p = stock[0].price.split(",")
            var x = "";
            for (var i = 0; i < p.length; i++) {
                x = x + p[i]
            }
            pr = parseInt(x);

            var tableFooter = "</table>";
            document.getElementById("BVtable").innerHTML = tableHeader + tableContent + tableFooter;
            document.getElementById("priceHeader").innerHTML = pr
            document.getElementById("invB").innerHTML = " -"
            var vat = 0.5;
            var prs = pr * (vat / 100)
            document.getElementById("invH").innerHTML = prs
            document.getElementById("priceH2").innerHTML = pr
            document.getElementById("total").innerHTML = pr + prs
            document.getElementById("date").innerHTML = con[0].date
            document.getElementById("customer").innerHTML = customer[0].firstname + " " + customer[0].lastname
            ////query
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    })

}

function getTableInvoice() {

    var id = {
        id: location.search.substring(1)
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/buy/invoice/getItem",
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
                ID_TRN_taxlnvoice: "1",
                license_plate: stock[0].license_plate,
                type: stock[0].model,
                color: stock[0].color,
                price: stock[0].price
            }
            document.getElementById("num1").innerHTML = res[5];
            document.getElementById("num2").innerHTML = bill[0].ID_TRN_buy_bill;
            document.getElementById("date").value = bill[0].date;
            document.getElementById("type").value = bill[0].type;
            document.getElementById('name').value = customer[0].firstname + " " + customer[0].lastname
            document.getElementById('tel').value = customer[0].tel

            var json = []
            json.push(table)

            var td = "BVtd"
            var th = "BVth"
            var table = "BVtable"
            var tr = "BVtr"

            var tableHeader = "<table class=" + table + "><tr><th class=" + th + ">ลำดับที่</th ><th class=" + th + ">เลขทะเบียน</th><th class=" + th + ">ประเภทรถ</th><th class=" + th + ">สี</th><th class=" + th + ">ราคา</th></tr>";
            var tableContent = "";

            var pr = 0;
            var p;
            for (i = 0; i < json.length; i++) {
                tableContent = tableContent + "<tr class=" + tr + ">"
                    + "<td class=" + td + ">" + json[i].ID_TRN_taxlnvoice +
                    "</td> <td class=" + td + ">" + json[i].license_plate +
                    "</td> <td class=" + td + ">" + json[i].type +
                    "</td> <td class=" + td + ">" + json[i].color +
                    "</td> <td class=" + td + ">  " + json[i].price +
                    "</tr>";

                p = json[i].price.split(",")
                var x = "";
                for (var i = 0; i < p.length; i++) {
                    x = x + p[i]
                }
                pr = parseInt(x);

            }
            var tableFooter = "</table>";
            document.getElementById("BVtable").innerHTML = tableHeader + tableContent + tableFooter;

            document.getElementById("priceAll").innerHTML = pr;
            var inv = vat
            document.getElementById("inv").innerHTML = inv;

            var pri = pr + inv
            document.getElementById("priceAddinv").innerHTML = pri;


        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });

}

function insertItemBill() {
    var data = {
        date: $('#date').text(),
        type: $('#type').val(),
        total: $('#total').text(),
        vat: $('#invH').text(),
        insure: "",
        price: $('#priceH2').text(),
        ID_TRN_buy_contract: location.search.substring(1)
    }
  
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/buy/bill/insert",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (res) {
            console.log(res.id)
            if (res != null) {
                window.location.href = "bVat.html?" + res.id
            }

        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    })
}
function insertItemInvoie() {
    
    var data = {
        date: $('#date').val(),
        ID_TRN_buy_bill: location.search.substring(1)
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/buy/invoice/insert",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (res) {
            
            if (res == 'ture') {
                alert("ทำรายการ " + $('#type').val() + " " + "สำเร็จ")
                window.location.href = "./../main.html"
            }

        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    })
}