//check number
function isInputNumber(evt) {
    var ch = String.fromCharCode(evt.which);
    if (!(/[0-9&&,]/.test(ch))) {
        evt.preventDefault();
    }
}

//check string
function isInputLetter(evt) {
    var ch = String.fromCharCode(evt.which);
    if ((/[1-9]/.test(ch))) {
        evt.preventDefault();
    }
}

function save(){
    var id = document.getElementById("ID").value;
    var license_plate = document.getElementById("license_plate").value;
    var model = document.getElementById("model").value;
    var color = document.getElementById("color").value;
    var price = document.getElementById("price").value;
     if(id == "" || license_plate == "" || model == "" || color == "" ||price == ""){
         window.alert("กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง")
     }else{
         var data = {
            id : id ,
            license_plate : license_plate,
            model : model,
            color : color,
            price : price
         }
         $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:3000/api/stock",
            data: JSON.stringify(data),
            dataType: "json",
            success: function (customer) {
              var result = JSON.stringify(customer);
              console.log(result);
              if (JSON.stringify(customer) == "true") {
                alert("Save Successful!");
                window.location = "main.html";
              } else {
                alert("Save Incorrect!");
              }
            },
            error: function (e) {
              console.log("ERROR: ", e);
            }
          });
     }
}
var result = ""
function loadTable(){
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3000/api/stock/table",
        data: JSON.stringify(""),
        dataType: 'json',
        success: function (customer) {
            result = customer
            console.log(customer.length)
            for(var i=customer.length-1;i>=0;i--){
            var table = document.getElementById("table");
            var row   = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            c0 = customer[i].ID_MST_stock;
            c1 = customer[i].license_plate;
            c2 = customer[i].model;
            cell1.innerHTML = '<td> <a id=\"' + i + '\" onclick=\"showdata(this.id)\" value=\"' + c0 + '\" >'+c0+'</a></td>';
            cell2.innerHTML = '<td> <a id=\"' + i + '\" onclick=\"showdata(this.id)\" value=\"' + c1 + '\" >'+c1+'</a></td>';
            cell3.innerHTML = '<td> <a id=\"' + i + '\" onclick=\"showdata(this.id)\" value=\"' + c1 + '\" >'+c2+'</a></td>';
            }
            
        },
        error: function (e) {
          console.log("ERROR: ", e);
        }
      });    
}
function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }

  function showdata(id) {
    console.log(id)
    console.log(result[id].ID_MST_stock)
    document.getElementById('ID').value = result[id].ID_MST_stock;
    document.getElementById('license_plate').value = result[id].license_plate;
    document.getElementById("model").value = result[id].model;
    document.getElementById("color").value = result[id].color;
    document.getElementById("price").value = result[id].price;
  
    document.getElementById('ID').disabled = true
    document.getElementById("license_plate").disabled = true
    document.getElementById("model").disabled = true
    document.getElementById("color").disabled = true
    document.getElementById("price").disabled = true
  }

  function edit(){
    document.getElementById('ID').disabled = false
    document.getElementById("license_plate").disabled = false
    document.getElementById("model").disabled = false
    document.getElementById("color").disabled = false
    document.getElementById("price").disabled = false
  }