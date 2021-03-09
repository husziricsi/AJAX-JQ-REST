$(function () {

    $("#beolvas").on("click", adatBeolvas);
    $("#kuld").on("click", adBeir);
    $("article").delegate(".torol","click",adTorol);
    $("article").delegate(".szerkeszt","click",adatSzerkeszt);
    $("megse").on("click",adatMegse);
    $("#modosit").on("click",adatModosit);

});
var telefonkonyvem = [];
function kiir() {
    $("article").empty();
    for (var i = 0; i < telefonkonyvem.length; i++) {
        var ID= telefonkonyvem[i].ID;
         var nev= telefonkonyvem[i].nev;
        var tel=telefonkonyvem[i].tel;
        var kep=telefonkonyvem[i].kep;
          var elem = "<div> <h2>" + nev + "</h2> <p>" + tel + "</p> <p>" + kep + " </p><button class='torol'id='"+ID+"'>Töröl </button> </div> <button id ='" + i +"' class='szerkeszt'>Szerkeszt</button> <hr> </div>"; ;
    $("article").append(elem);
    
    }
  
}

function adatBeolvas(){
    $.ajax({
        type: "GET",
        url: "feldolgoz.php",
        success: function (result){
            console.log(result);
            telefonkonyvem = JSON.parse(result);
            console.log(telefonkonyvem);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok betöltésekor!");
        }
    });
}

function adBeir(){
    var szemely = {
        nev: $("#nev").val(),
        tel:  $("#tel").val(),
        kep: $("#kep").val()
    };

    $.ajax({
        type: "POST",
        url: "beir.php",
        data: szemely,
        success: function (ujSzemely){
            console.log(ujSzemely);
            telefonkonyvem.push(JSON.parse(ujSzemely));
            console.log(telefonkonyvem);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok mentésekor!");
        }
    });
}
function adTorol(){
    var aktelem = $(this).closest("div");
    var id= $(this).attr("id");
    console.log("Törlés***********"+id);
    $.ajax({
        type: "DELETE",
        url: "torles.php?ID="+id,
        success: function (){
            console.log("törlés");
            aktelem.remove();
        },
error:function (){
    alert("Hiba adatok törlésekor!");
}
    });
    }

function adatSzerkeszt(){
    $(".szerkesztes").removeClass("elrejt");
    
    var index = $(this).attr("id");
    console.log(index);
    $("#id2").val(telefonkonyvem[index].ID);
    $("#nev2").val(telefonkonyvem[index].nev);
    $("#tel2").val(telefonkonyvem[index].tel);
    $("#kep2").val(telefonkonyvem[index].kep);
}

function adatMegse(){
    $(".szerkesztes").addClass("elrejt");
   
}

function adatModosit(){
    var editSzemely = {
        ID: $("#id2").val(),
        nev: $("#nev2").val(),
        tel:  $("#tel2").val(),
        kep: $("#kep2").val()
    };
    
    $.ajax({
        type: "PUT",
        url: "modosit.php",
        data: editSzemely,
        success: function (){
            adatBeolvas();
        },
        error: function () {
            alert("Hiba az adatok modosításakor!");
        }
    });

    
}
