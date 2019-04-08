
function getTableBill() {


    var id = {
        id: location.search.substring(1)
    }
    $.ajax({    ///req post
        type: "POST",
        contentType: "application/json",   //type hearder data 
        url: "http://localhost:3000/api/buy/bill/getItem",  //url
        data: JSON.stringify(id),   //data
        dataType: 'json',           //type data
        success: function (res) {
            console.log(res)
            if (res.length < 5) {
                alert("เกิดข้อผิดพลาด")
            } else {

                var contract = res[0];      //array of contract
                var customer = res[1];  //array of customer
                var stock = res[3];      //array of stock 
                if (res[0].length == 0 || res[1].length == 0 || res[2].length == 0 || res[3].length == 0) {
                    alert("เกิดข้อผิดพลาด")
                } else {
                    var json = []
                    var table = {            //data of table
                        ID_TRN_buy_bill: stock[0].ID_MST_stock,
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
                    var tableFooter = "</table>";
                    /************ calculate price*****************/
                    p = stock[0].price.split(",")
                    var x = "";
                    for (var i = 0; i < p.length; i++) {
                        x = x + p[i]
                    }
                    pr = parseInt(x);

                    /************render table and data using *****************/
                    document.getElementById("BVtable").innerHTML = tableHeader + tableContent + tableFooter;
                    document.getElementById("priceHeader").innerHTML = pr
                    document.getElementById("invB").innerHTML = " -"
                    var vat = 0.5;
                    var prs = pr * (vat / 100)
                    document.getElementById("invH").innerHTML = prs
                    document.getElementById("priceH2").innerHTML = pr
                    document.getElementById("total").innerHTML = pr + prs
                    document.getElementById("date").innerHTML = contract[0].date
                    document.getElementById("customer").innerHTML = customer[0].firstname + " " + customer[0].lastname
                    var idc = 10000 + res[4]
                    console.log(idc)
                    document.getElementById("idbuy").innerHTML = idc
                }

            }


            ////query
        },
        error: function (e) {
            alert("เกิดข้อผิดพลาด")
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
            document.getElementById("date").innerHTML = bill[0].date;
            document.getElementById("typeCus").innerHTML = bill[0].type;
            document.getElementById('name').innerHTML = customer[0].firstname + " " + customer[0].lastname
            document.getElementById('tel').innerHTML = customer[0].tel

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
            alert("เกิดข้อผิดพลาด")
        }
    });

}

function insertItemBill() {
    var data = {
        date: $('#date').text(),
        type: $('#type').text(),
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
                alert("ทำรายการ " + $('#type').text() + " " + "สำเร็จ")
                window.location.href = "bVat.html?" + res.id
            }

        },
        error: function (e) {
            alert("เกิดข้อผิดพลาด")
        }
    })
}
function insertItemInvoie() {

    var data = {
        date: $('#date').text(),
        ID_TRN_buy_bill: location.search.substring(1)
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/buy/invoice/insert",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (res) {
            console.log(res)

            alert("ทำรายการ " + $('#type').text() + " " + "สำเร็จ")
            window.location.href = "./../main.html"


        },
        error: function (e) {
            alert("เกิดข้อผิดพลาด")
        }
    })
}
function PrintDiv() {
    var divToPrint = document.getElementById('forms'); // เลือก div id ที่เราต้องการพิมพ์
    var html = '<!DOCTYPE HTML>' + '<html>' + // 
        '<head>' +
        '<link href=\"print.css\" rel=\"stylesheet\" type=\"text/css\"/>' +
        '<link rel=\"stylesheet\" href=\"./../../css/style.css\" />' +
        '</head>' +
        '<body onload="\window.print(); window.close();\">' + divToPrint.innerHTML + '</body>' +
        '</html>';

    var popupWin = window.open();

    popupWin.document.open();
    popupWin.document.write(html); //โหลด print.css ให้ทำงานก่อนสั่งพิมพ์
    popupWin.document.close();

}