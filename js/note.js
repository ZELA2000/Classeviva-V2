//imposto funzione per i cookie
var CookiesNote = Cookies2.noConflict();

//funzione per il bottone "indietro"
$(document).ready(function(){
    $("#indietro").click(function(){
        window.location.replace("home.html");
    });
});

//funzione con tutto
$(document).ready(function(){
    //prendo il numero di classi
    let i = CookiesNote.get("NNote");
    //se non ci sono classi inizializzo i a 0
    if(i==undefined || i==0){
        i=0;
    }else{
        $("#errore").css({"display":"none"});
    }
    //ciclo per la scrittura di tutte le note salvate
    for(let j=0 ; j<i; j++){
        bott = document.createElement("button");
        bott.setAttribute("class", "comm");
        bott.setAttribute("id", "comm-"+j);
        bott.setAttribute("onclick", "leggi(" + j + ")")
        bott.innerHTML = "Nota di: "+ CookiesNote.get("PersNota"+j);
        $("#box-comm").append(bott);
    }
    //funzione per il bottone X presente nelle schermate di lettura classe e creazione classe
    $(".chiudi").click(function(){
        $("#lett-classe").css({"display":"none"});
        $("#box-lettura").css({"display":"none"});
        $("#list-classi").css({"display":"block"});
    });
})