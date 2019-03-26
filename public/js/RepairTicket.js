//print Ticket without form
function myFunction(){
    window.print();
}

function insertToDB() {
    var id = "CR0001"
    var date = document.getElementById("recieveDate").value;
    var recieveName = document.getElementById("recieveName").value;;
    var recieveTel = document.getElementById("recieveTel").value;
    var spare = [];


$.ajax({
    type: "POST",
    contentType: "application/json",
    url: "http://localhost:3000/api/insertToDB",
    data: JSON.stringify(data1),
    dataType: 'json',
    success: function (customer) {
        var result = JSON.stringify(customer);
        console.log(result);
        if (JSON.stringify(customer) == 'true') {
            alert("insert Successful!")
            window.location = "./../../main/repair/rpDetailEmp.html"

        } else {
            alert("insert Incorrect!");
        }
    },
    error: function (e) {
        console.log("ERROR: ", e);
    }
});
}
