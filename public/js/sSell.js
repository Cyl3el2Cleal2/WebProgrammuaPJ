
function test() {
    // alert('Hi');
}

function sSellSave(){
    var table = document.getElementsByClassName('tablePang')[0];
    var temp = [];
    for (var r = 1, n = table.rows.length; r < n; r++) {

            temp.push(table.rows[r].cells[1].innerHTML);
        
    }


    var data = {
        "date" : document.getElementById("date").value,
        "ID_MST_employee" : document.getElementById("nameEmp").value,
        "ID_MST_stock" : temp,
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
    var table = document.getElementById("fixed_header");
    for(var i=1;i<table.clientHeight;i++){
        table.rows[i].cells[0] = i;
    }
}


function queryData() {
    var data = {
        id: document.getElementById('car').value
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
