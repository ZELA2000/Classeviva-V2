//imposto funzione per i cookie
var CookiesClassi = Cookies2.noConflict();

//funzione per il bottone "indietro"
$(document).ready(function(){
    $("#indietro").click(function(){
        window.location.replace("home.html");
    });
});

//gruppo di funzioni per TUTTO
$(document).ready(function(){
    //prendo il numero di classi
    let i = CookiesClassi.get("NClassi");
    //se non ci sono classi inizializzo i a 0
    if(i==undefined){
        i=0;
    }
    //ciclo per la scrittura di tutte le classi salvate
    for(let j=0 ; j<i; j++){
        bott = document.createElement("button");
        bott.setAttribute("class", "classe");
        bott.setAttribute("id", "classe-"+j);
        bott.setAttribute("onclick", "leggi(" + j + ")")
        bott.innerHTML = "Classe: "+ CookiesClassi.get("Classe"+j) + CookiesClassi.get("Sezione"+j);
        $("#list-classi").append(bott);
    }
    //funzione per il bottone per aggiungere una classe
    $("#aggiungi").click(function(){
        $("#lett-classe").css({"display":"block"});
        $("#list-classi").css({"display":"none"});
    });
    //funzione per salvare le impostazioni
    $("#pubblica").click(function(){
        classe = $("#classe").val();
        sezioneClasse = $("#sezione").val();
        CookiesClassi.set("Classe"+i, classe, { sameSite: 'strict' });
        CookiesClassi.set("Sezione"+i, sezioneClasse, { sameSite: 'strict' });
        i++;
        CookiesClassi.set("NClassi", i, { sameSite: 'strict' });
        window.location.reload();
    });

    //FARE LETURA CLASSI CON GLI STUDENTI ASSOCIATI
});