getData();
function getData() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/sum",
        data: null,
        dataType: "json",
        success: function (getData) {
            var buy = 0, sale = 0, repair = 0, license = 0;
            for (i = 0; i < getData.length; i++) {
                console.log(getData[i])
                var x = getData[i]
                if (x.buy != undefined) {
                    buy += parseInt(x.buy);
                    console.log('+buy')
                    continue;
                }
                if (x.sale != undefined) {
                    sale = +parseInt(x.sale);
                    continue;
                }
                if (x.repair != undefined) {
                    repair += parseInt(x.repair);
                    continue;
                }
                if (x.license != undefined) {
                    license += parseInt(x.license);
                    continue;
                }
            }
            console.log(buy)
            console.log(sale)
            console.log(repair)
            console.log(license)
            $area = $("#area")
            str = '<div class="bar-group">\
            <div class="bar bar-2 stat-3" style="height: '+Math.min(buy/800000*100,100)+'%;"></div>\
            </div>';
            $area.append(str);
            str = '<div class="bar-group">\
            <div class="bar bar-2 stat-1" style="height: '+Math.min(sale/800000*100,100)+'%;"></div>\
            </div>';
            $area.append(str);
            str = '<div class="bar-group">\
            <div class="bar bar-2 stat-2" style="height: '+Math.min(repair/800000*100,100)+'%;"></div>\
            </div>';
            $area.append(str);
            str = '<div class="bar-group">\
            <div class="bar bar-2 stat-3" style="height: '+Math.min(license/800000*100,100)+'%;"></div>\
            </div>';
            $area.append(str);

            $("#buy").html("รายได้จากการขาย = "+buy)
            $("#sale").html("รายจ่ายจากการขาย = "+sale)
            $("#rp").html("รายได้จากการซ่อม = "+repair)
            $("#lc").html("รายได้จากการต่อทะเบียน = "+license)
            $("#plus").html("กำไร = "+Math.max(0,(license+sale+repair)-buy))
            $("#nega").html("ขาดทุน = "+Math.max(buy-(license+sale+repair),0))



        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });
}

$(document).ready(() => {

    // $area = $("#area")
    // str = '<div class="bar-group">\
    // <div class="bar bar-1 stat-1" style="height: 51%;"></div>\
    // <div class="bar bar-2 stat-2" style="height: 71%;"></div>\
    // <div class="bar bar-3 stat-3" style="height: 13%;"></div></div>';
    // $area.append(str);



})








