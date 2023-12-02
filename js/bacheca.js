var Cookies3 = Cookies2.noConflict();

$(document).ready(function(){
    $("#indietro").click(function(){
        window.location.replace("home.html");
    });
});

$(document).ready(function(){
    let i = Cookies3.get("NComm");
    if(i==undefined){
        i=0;
    }
    for(let j=0 ; j<i; j++){
        bott = document.createElement("button");
        bott.setAttribute("class", "comm");
        bott.setAttribute("id", "comm-"+j);
        bott.setAttribute("onclick", "leggi(" + j + ")")
        bott.innerHTML = "Comunicazione: "+ Cookies3.get("TitComm"+j);
        $("#box-comm").append(bott);
    }
    $("#aggiungi").click(function(){
        $("#lett-comm").css({"display":"block"});
        $("#box-comm").css({"display":"none"});
    });
    $("#chiudi").click(function(){
        $("#lett-comm").css({"display":"none"});
        $("#box-lett").css({"display":"none"});
        $("#box-comm").css({"display":"block"});
    });
    $("#pubblica").click(function(){
        commTitoli = $("#titolo").val();
        commCorpo = $("#corpo").val();
        Cookies3.set("TitComm"+i, commTitoli);
        Cookies3.set("CorpoComm"+i, commCorpo);
        i++;
        Cookies3.set("NComm", i);
        window.location.reload();
    });
});

function leggi(id){
    $("#box-comm").css({"display":"none"});
    $("#box-lett").css({"display":"block"});
    document.getElementById("titolo-comm").innerHTML = "";
    document.getElementById("corpo-comm").innerHTML = "";
    document.getElementById("elimina").setAttribute("onclick","elimina(" + id +")");
    $("#titolo-comm").append(Cookies3.get("TitComm"+id));
    $("#corpo-comm").append(Cookies3.get("CorpoComm"+id));
}

function elimina(id){
    Cookies3.set("NComm", Cookies3.get("NComm")-1);
    for(i=id;i<Cookies3.get("NComm");i++){
        Cookies3.set("TitComm"+i, Cookies3.get("TitComm"+(i+1)));
        Cookies3.set("CorpoComm"+i, Cookies3.get("CorpoComm"+(i+1)));
    }
    Cookies3.remove("TitComm"+Cookies3.get("Ncomm")+1);
    Cookies3.remove("CorpoComm"+Cookies3.get("Ncomm")+1);
    window.location.reload();
}