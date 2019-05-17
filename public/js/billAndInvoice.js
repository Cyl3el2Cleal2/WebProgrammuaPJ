
/******************getTalbeBill**************************** */

/*********invoice sale get insert *************************/
/*********invoice car_re get insert***************************/
/*********invoice rg get insert ***********************************************/

function getTableBill(collection) {

    if (collection == 'TRN_buy_contract') {
        getbillBuy()
    } else if (collection == 'TRN_sale_contract') {
        getbillSale()
    } else if (collection == 'TRN_car_recieve') {
        getbillCarRecieve()
    } else if (collection == 'TRN_license_bill') {
        getbillLicense()
    }

}
function getbillBuy() {
    var id = {
        id: location.search.substring(1),

    }

    $.ajax({    ///req post
        type: "POST",
        contentType: "application/json",   //type hearder data 
        url: "http://localhost:3000/api/buy/bill/getItem",  //url
        data: JSON.stringify(id),   //data
        dataType: 'json',           //type data
        success: function (res) {
            console.log(res)


            var contract = res[0];      //array of contract
            var customer = res[1];  //array of customer
            var stock = res[3];      //array of stock 
            if (res[0].length == 0 || res[1].length == 0 || res[2].length == 0 || res[3].length == 0) {
                alert("เกิดข้อผิดพลาด")
            } else {
                var json = []
                console.log(stock[0])
                var table = {            //data of table
                    ID_TRN_buy: stock[0].ID_TRN_buy,
                    license_plate: stock[0].license_plate,
                    model: stock[0].model,
                    ID_MST_stock: stock[0]._id,
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
                        + "<td class=" + td + ">" + json[i].ID_TRN_buy +
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




            ////query
        },
        error: function (e) {
            alert("เกิดข้อผิดพลาด")
        }
    })
}
function getbillSale() {

    var id = {
        id: location.search.substring(1),

    }
    $.ajax({    ///req post
        type: "POST",
        contentType: "application/json",   //type hearder data 
        url: "http://localhost:3000/api/sale/bill/getItem",  //url
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
                    console.log(stock[0])
                    var table = {            //data of table
                        _id: stock[0].ID_TRN_buy,
                        license_plate: stock[0].license_plate,
                        model: stock[0].model,
                        ID_MST_stock: stock[0]._id,
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
                            + "<td class=" + td + ">" + json[i]._id +
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

function getbillCarRecieve() {

    var id = {
        id: location.search.substring(1),
    }
    console.log(id)
    $.ajax({    ///req post
        type: "POST",
        contentType: "application/json",   //type hearder data 
        url: "http://localhost:3000/api/car_recieve/bill/getItem",  //url
        data: JSON.stringify(id),   //data
        dataType: 'json',           //type data
        success: function (res) {
            console.log(res)
            if (res.length < 5) {
                alert("เกิดข้อผิดพลาด")
            } else {
                var pricetotal = 0
                var contract = res[0];      //array of contract
                var customer = res[3];  //array of customer
                var stock = res[2];      //array of stock 
                if (res[0].length == 0 || res[1].length == 0 || res[2].length == 0 || res[3].length == 0) {
                    alert("เกิดข้อผิดพลาด")
                } else {
                    var json = []
                    console.log(stock[0].carSpare)
                    var detail = stock[0].carSpare
                    for (var i = 0; i < detail.length; i++) {
                        var table = {            //data of table
                            _id: i,
                            license_plate: detail[0].nameSpare,
                            model: detail[0].numSpare,
                            ID_MST_stock: detail[0].priceSpare,

                        }
                        json.push(table)
                        pricetotal = pricetotal + parseInt(detail[i].priceSpare) * detail[0].numSpare
                    }


                    /**************** css*////************** */
                    var td = "BVtd"
                    var th = "BVth"
                    var table = "BVtable"
                    var tr = "BVtr"
                    /**************** *////************** */
                    var tableHeader = "<table class=" + table + "><tr><th class=" + th + ">ลำดับ</th><th class=" + th + ">ชิ้นส่วน</th ><th class=" + th + ">จำนวน</th><th class=" + th + ">ราคา</th></tr>";
                    var tableContent = "";


                    var pr = 0;
                    var p;
                    for (i = 0; i < json.length; i++) {
                        tableContent = tableContent + "<tr class=" + tr + ">"
                            + "<td class=" + td + ">" + json[i]._id +
                            "</td> <td class=" + td + ">" + json[i].license_plate +
                            "</td> <td class=" + td + ">" + json[i].model +
                            "</td> <td class=" + td + ">" + json[i].ID_MST_stock +

                            "</tr>";

                    }
                    var tableFooter = "</table>";
                    /************ calculate price*****************/
                    // p = stock[0].carSpare[0].priceSpare.split(",")
                    // // var x = "";
                    // // for (var i = 0; i < p.length; i++) {
                    // //     x = x + p[i]
                    // // }
                    // pr = parseInt(p);

                    /************render table and data using *****************/
                    document.getElementById("BVtable").innerHTML = tableHeader + tableContent + tableFooter;
                    document.getElementById("priceHeader").innerHTML = pricetotal
                    document.getElementById("invB").innerHTML = " -"
                    var vat = 0.5;
                    var prs = pricetotal * (vat / 100)
                    document.getElementById("invH").innerHTML = prs
                    document.getElementById("priceH2").innerHTML = pricetotal
                    document.getElementById("total").innerHTML = pricetotal + prs
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
function getbillLicense() {
    var id = {
        id: location.search.substring(1),

    }

    $.ajax({    ///req post
        type: "POST",
        contentType: "application/json",   //type hearder data 
        url: "http://localhost:3000/api/license/bill/getItem",  //url
        data: JSON.stringify(id),   //data
        dataType: 'json',           //type data
        success: function (res) {
            console.log(res)


            //array of contract
            var customer = res[1];  //array of customer
            var stock = res[0];
            var pricetotal = 0;
            //array of stock 
            if (res[0].length == 0 || res[1].length == 0) {
                alert("เกิดข้อผิดพลาด")
            } else {
                var json = []
                console.log(stock[0])
                var detail = stock[0].detail

                console.log(detail)
                for (var i = 0; i < detail.length; i++) {
                    var table = {            //data of table
                        ID_TRN_buy: i,
                        license_plate: detail[i].car_number,
                        model: detail[i].name,
                        ID_MST_stock: stock[0]._id,
                        weight: "-"

                    }

                    pricetotal = pricetotal + parseInt(detail[i].price)

                    json.push(table)
                }

                /**************** css*////************** */
                var td = "BVtd"
                var th = "BVth"
                var table = "BVtable"
                var tr = "BVtr"
                /**************** *////************** */
                var tableHeader = "<table class=" + table + "><tr><th class=" + th + ">รหัสรถยนต์</th ><th class=" + th + ">ชื่อรถยนต์/รุ่น</th><th class=" + th + ">เลขทะเบียน</th><th class=" + th + ">เลขเครื่อง</th><th class=" + th + ">น้ำหนัก</th></tr>";
                var tableContent = "";


                console.log(pricetotal)

                for (i = 0; i < json.length; i++) {
                    tableContent = tableContent + "<tr class=" + tr + ">"
                        + "<td class=" + td + ">" + json[i].ID_TRN_buy +
                        "</td> <td class=" + td + ">" + json[i].model +
                        "</td> <td class=" + td + ">" + json[i].license_plate +
                        "</td> <td class=" + td + ">" + json[i].ID_MST_stock +
                        "</td> <td class=" + td + ">  " + json[i].weight +
                        "</tr>";
                }
                var tableFooter = "</table>";
                /************ calculate price*****************/
                //p = stock[0].price.split(",")
                // var x = "";
                // for (var i = 0; i < p.length; i++) {
                //     x = x + p[i]
                // }
                // pr = parseInt(x);

                /************render table and data using *****************/
                document.getElementById("BVtable").innerHTML = tableHeader + tableContent + tableFooter;
                document.getElementById("priceHeader").innerHTML = pricetotal
                document.getElementById("invB").innerHTML = " -"
                var vat = 0.5;
                var prs = pricetotal * (vat / 100)
                document.getElementById("invH").innerHTML = prs
                document.getElementById("priceH2").innerHTML = pricetotal
                document.getElementById("total").innerHTML = pricetotal + prs
                let current_datetime = new Date()
                let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
               
                document.getElementById("date").innerHTML = formatted_date
                document.getElementById("customer").innerHTML = customer[0].firstname + " " + customer[0].lastname
                var idc = 10000+ parseInt(current_datetime.getMinutes())

                document.getElementById("idbuy").innerHTML = idc
            }


            ////query
        },
        error: function (e) {
            alert("เกิดข้อผิดพลาด")
        }
    })
}





//******************************insert bill**************************************** */
function insertItemBill(collection) {
    console.log(collection)
    if (collection == "TRN_buy_contract") {
        insertBill("http://localhost:3000/api/buy/bill/insert", "bVat.html?")
    } else if (collection == "TRN_sale_contract") {
        insertBill("http://localhost:3000/api/sale/bill/insert", "sVat.html?")

    } else if (collection == "TRN_car_recieve") {
        insertBill("http://localhost:3000/api/Car_recieve/bill/insert", "rpVat.html?")

    } else if (collection == "TRN_license_bill") {
        insertBill("http://localhost:3000/api/license/bill/insert", "rgTicket.html?")
    }

}
function insertBill(url, next) {


    var data = {
        date: $('#date').text(),
        type: $('#type').text(),
        total: $('#total').text(),
        vat: $('#invH').text(),
        insure: "",
        price: $('#priceH2').text(),
        fk: location.search.substring(1)
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: url,
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (res) {
            console.log(res.id)
            if (res != null) {
                alert("ทำรายการ " + $('#type').text() + " " + "สำเร็จ")
                window.location.href = next + res.id
            }

        },
        error: function (e) {
            alert("เกิดข้อผิดพลาด")
        }
    })
}























function getTableInvoice(collection) {
    if (collection == "TRN_buy_bill") {
        getTableBuyInvoice()
    } else if (collection == "TRN_sale_bill") {
        getTableSaleInvoice()
    } else if (collection == "TRN_car_recieve_bill") {
        getTableCarInvoice()
    } else if (collection == "TRN_license_bill") {
        console.log("lic")
        getTableLicenseInvoice()
    }
}


function getTableBuyInvoice() {
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
function getTableSaleInvoice() {
    var id = {
        id: location.search.substring(1)
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/sale/invoice/getItem",
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
            document.getElementById("num2").innerHTML = bill[0].ID_TRN_sale_bill;
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

function getTableCarInvoice() {
    var id = {
        id: location.search.substring(1)
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/car_recieve/invoice/getItem",
        data: JSON.stringify(id),
        dataType: 'json',
        success: function (res) {
            console.log(res.length)
            console.log(res)
            var bill = res[0];
            var customer = res[4];
            var stock = res[3];
            var vat = parseInt(bill[0].vat);
            var detail = stock[0].carSpare
            var json = []
            for (var i = 0; i < detail.length; i++) {
                var table = {
                    ID_TRN_taxlnvoice: i,
                    nameSpare: detail[i].nameSpare,
                    numSpare: detail[i].numSpare,

                    price: detail[i].priceSpare
                }

                json.push(table)
            }
            document.getElementById("num1").innerHTML = res[5];
            document.getElementById("num2").innerHTML = bill[0].ID_TRN_maintainance_bill;
            document.getElementById("date").innerHTML = bill[0].date;
            document.getElementById("typeCus").innerHTML = bill[0].type;
            document.getElementById('name').innerHTML = customer[0].firstname + " " + customer[0].lastname
            document.getElementById('tel').innerHTML = customer[0].tel
            var td = "BVtd"
            var th = "BVth"
            var table = "BVtable"
            var tr = "BVtr"
            var tableHeader = "<table class=" + table + "><tr><th class=" + th + ">ลำดับที่</th ><th class=" + th + ">ชิ้นส่วน</th><th class=" + th + ">จำนวน</th><th class=" + th + ">ราคา</th></tr>";
            var tableContent = "";
            var pr = 0;
            var p;
            for (i = 0; i < json.length; i++) {
                tableContent = tableContent + "<tr class=" + tr + ">"
                    + "<td class=" + td + ">" + json[i].ID_TRN_taxlnvoice +
                    "</td> <td class=" + td + ">" + json[i].nameSpare +
                    "</td> <td class=" + td + ">" + json[i].numSpare +
                    "</td> <td class=" + td + ">  " + json[i].price +
                    "</tr>";
            }
            var tableFooter = "</table>";
            document.getElementById("BVtable").innerHTML = tableHeader + tableContent + tableFooter;
            document.getElementById("priceAll").innerHTML = bill[0].price;
            document.getElementById("inv").innerHTML = bill[0].vat;
            document.getElementById("priceAddinv").innerHTML = bill[0].total;
        },
        error: function (e) {
            alert("เกิดข้อผิดพลาด")
        }
    });
}
function getTableLicenseInvoice() {
    var id = {
        id: location.search.substring(1)
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/repair/invoice/getItem",
        data: JSON.stringify(id),
        dataType: 'json',
        success: function (res) {
            console.log(res.length)

            console.log(res)
            var bill = res[0];
            var customer = res[2];
            var stock = res[1];
            var detail = stock[0].detail

            var vat = parseInt(bill[0].vat);
            var json = []

            for (var i = 0; i < detail.length; i++) {
                var table = {            //data of table
                    ID_TRN_buy: i,
                    license_plate: detail[i].car_number,
                    model: detail[i].name,
                    ID_MST_stock: detail[i].price,
                    weight: "-",

                }


                json.push(table)
            }
            document.getElementById("num1").innerHTML = res[3];
            document.getElementById("num2").innerHTML = bill[0].TRN_license_bill;
            document.getElementById("date").innerHTML = bill[0].date;
            document.getElementById("typeCus").innerHTML = bill[0].type;
            document.getElementById('name').innerHTML = customer[0].firstname + " " + customer[0].lastname
            document.getElementById('tel').innerHTML = customer[0].tel
            var td = "BVtd"
            var th = "BVth"
            var table = "BVtable"
            var tr = "BVtr"

            var tableHeader = "<table class=" + table + "><tr><th class=" + th + ">ลำดับที่</th ><th class=" + th + ">เลขทะเบียน</th><th class=" + th + ">ประเภทรถ</th><th class=" + th + ">ราคา</th></tr>";
            var tableContent = "";


            for (i = 0; i < json.length; i++) {
                tableContent = tableContent + "<tr class=" + tr + ">"
                    + "<td class=" + td + ">" + json[i].ID_TRN_buy +
                    "</td> <td class=" + td + ">" + json[i].license_plate +
                    "</td> <td class=" + td + ">" + json[i].model +
                    "</td> <td class=" + td + ">  " + json[i].ID_MST_stock +
                    "</tr>";


            }
            var tableFooter = "</table>";
            document.getElementById("BVtable").innerHTML = tableHeader + tableContent + tableFooter;
            document.getElementById("priceAll").innerHTML = bill[0].price;
            document.getElementById("inv").innerHTML = bill[0].vat;
            document.getElementById("priceAddinv").innerHTML = bill[0].total

        },
        error: function (e) {
            alert("เกิดข้อผิดพลาด")
        }
    });
}


/*******insert invoicre*************** */
function insertItemInvoie(collection) {
    if (collection == "TRN_buy_bill") {
        insertInvoieBill()
    } else if (collection == "TRN_sale_bill") {
        insertInvoieSale()
    } else if (collection == "TRN_car_recieve_bill") {
        console.log("car")
        insertInvoieRepair()
    } else if (collection == "TRN_license_bill") {
        insertInvoieLicense()
    }

}
function insertInvoieBill() {
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
            if (res == true) {
                alert("ทำรายการ " + $('#typeCus').text() + " " + "สำเร็จ")
                window.location.href = "./../main.html"
            } else {
                alert("ทำรายการ " + $('#typeCus').text() + " " + "ไม่สำเร็จ")
            }

        },
        error: function (e) {
            alert("เกิดข้อผิดพลาด")
        }
    })
}
function insertInvoieSale() {
    var data = {
        date: $('#date').text(),
        ID_TRN_sale_bill: location.search.substring(1)
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/sale/invoice/insert",
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
function insertInvoieRepair() {
    var data = {
        date: $('#date').text(),
        ID_TRN_car_bill: location.search.substring(1)
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/Car_recieve/invoice/insert",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (res) {
            console.log(res)
            if (res == true) {
                alert("ทำรายการ " + $('#type').text() + " " + "สำเร็จ")
                window.location.href = "./../main.html"
            }
        },
        error: function (e) {
            alert("เกิดข้อผิดพลาด")
        }
    })
}
function insertInvoieLicense() {
    var data = {
        date: $('#date').text(),
        ID_TRN_repair_bill: location.search.substring(1)
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/license/invoice/insert",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (res) {
            console.log(res)
            if (res == true) {
                alert("ทำรายการ " + $('#type').text() + " " + "สำเร็จ")
                window.location.href = "./../main.html"
            }
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