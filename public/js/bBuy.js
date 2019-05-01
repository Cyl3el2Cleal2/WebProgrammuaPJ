document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        getData()
    }
};
var id_mst_customer;


function getData() {
    var data = {
        tell: location.search.substring(1),
    };
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/bBuy/getCostum",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (customer) {
            var result = JSON.stringify(customer);
            console.log(result);
            // alert(result)
            document.getElementById("name").value = customer.firstname + " " + customer.lastname;
            //alert(customer);
            id_mst_customer = customer._id;
        },
        error: function (e) {
            alert("Not found customer")
        }
    });
}

function insert(idStock, cName) {
    var data = {
        date: document.getElementById("date").value,
        ID_MST_stock: idStock,
        name: cName,
        ID_MST_customer:id_mst_customer
    };
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/bBuy/insertBuy",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (customer) {
            var result = JSON.stringify(customer);
            console.log(result);
            // alert(result)
            window.location.href = "../buy/bDeal.html?" + customer._id

        },
        error: function (e) {
            alert("Not found customer")
        }
    });
}


function addStock() {

    if (checkNull() == false) {

    } else {
        var date = document.getElementById("date").value;
        var customerName = document.getElementById("name").value;
        var carPlate = document.getElementById("num").value;
        var model = document.getElementById("gen").value;
        var color = document.getElementById("colorcar").value;
        var price = document.getElementById("price").value;
        var data = {
            license_plate: carPlate,
            model: model,
            color: color,
            price: price,
            status: "buy"

        };
        console.log(data);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:3000/api/bBuy/addStock",
            data: JSON.stringify(data),
            dataType: "json",
            success: function (customer) {
                var result = JSON.stringify(customer);
                console.log(result);
                if (customer.status == "true") {
                    alert("add Successful!");
                } else {
                    alert("add fail!");
                }
                console.log(customer)
                insert(customer._id, document.getElementById("name").value)
            },
            error: function (e) {
                console.log("ERROR: ", e);
            }
        });
    }



}

function letDoIt() {
    url()
    addStock()

}

function checkNull() {
    var date = document.getElementById("date").value;
    var customerName = document.getElementById("name").value;
    var carPlate = document.getElementById("num").value;
    var model = document.getElementById("gen").value;
    var color = document.getElementById("colorcar").value;
    var price = document.getElementById("price").value;
    if (date == "" || customerName == "" || carPlate == "" || model == "" || model == "" || color == "" || price == "") {
        alert("กรุณากรอกข้อมูลให้ครบ")
        return false;
    }
    return true;
}