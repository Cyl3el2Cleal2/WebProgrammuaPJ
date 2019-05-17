var idCar = [];
function test() {
    // alert('Hi');
}

function checkQ(){
    var table = document.getElementById('fixed_header');

    if(table.rows.length == 2){
        window.open(window.location.href);
    }
}

function sSellSave(){
    var table = document.getElementById('fixed_header');
    var temp = [];
    if( table.rows.length == 1){
        alert("กรุณาเพิ่มรถ")
        return
    }



    var data = {
        "date" : document.getElementById("date").value,
        "ID_MST_employee" : document.getElementById("nameEmp").value,
        "ID_MST_stock" : idCar.pop(),
        "doc_number" : document.getElementById("num").value
    };
    console.log(data);
    
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/sSell/save",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (getData) {
            var result = JSON.stringify(getData);
            console.log(result);
            var x = JSON.parse(result);
            console.log(JSON.parse(result));
            
            if (x.ops.length < 0) {
                console.log('false')
                alert('บันทึกไม่สำเร็จ');
            } else {

                window.location.href= "../sell/sDeal.html?"+x.ops[0]._id;
            }
            
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });
    
}

function updateRow() {
    var table = document.getElementsByClassName("tablePang")[0];
    console.log(table)
    for(var i=1;i<table.clientHeight;i++){
        table.rows[i].cells[0] = i;
    }

}

function getEmpData(){
    var data = {
        emp_id: window.location.href.split('?')[1]
    }
    console.log(data)
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/emp/search",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (getData) {
            var result = JSON.stringify(getData);
            console.log(result);
            var item = document.getElementById("name");
            result = JSON.parse(result)
            item.value = result["firstname"]+" "+result["lastname"]

        },
        error: function (e) {
            console.log("ERROR: ", e);
        } 
    })
}


function queryData() {
    if(document.getElementById("fixed_header").rows.length>2){
        window.open(window.location.href +' '+document.getElementById('car').value)
    }
    var data = {
        id: document.getElementById('car').value,

    }
    console.log(data);
    var c1,c2,c3,c4,c5,c6;
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/sSell",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (getData) {
            var result = JSON.stringify(getData);
            console.log(result);
            if (JSON.stringify(getData[0]) == null) {
                console.log('false')
                alert('ไม่มีไอดีที่ค้นหา');
            } else {
                var table = document.getElementById("fixed_header");
                var row =   table.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
               
                c1 = getData[0].license_plate;
                c2 = getData[0].model;
                c3 = getData[0].color;
                c4 = getData[0].price;
                idCar.push(getData[0]._id)
                console.log(c1 + c2 + c3);

                cell1.innerHTML = '<td class = "tdPang">'+'1'+'</td>';
                cell2.innerHTML = '<td class = "tdPang cellData">'+c1+'</td>';
                cell3.innerHTML = '<td class = "tdPang">'+c2+'</td>';
                cell4.innerHTML = '<td class = "tdPang">'+c3+'</td>';
                cell5.innerHTML = '<td class = "tdPang">'+c4+'</td>';
                cell6.innerHTML = '<a class="button deleteRow" value="Delete" onclick="deleteRow(this)">ลบ</a>';
                updateRow();
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });

}
