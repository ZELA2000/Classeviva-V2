//imposto funzione per i cookie
var CookiesStudenti = Cookies2.noConflict();

//funzione per il bottone "indietro"
$(document).ready(function(){
    $("#indietro").click(function(){
        window.location.replace("home.html");
    });
});
//gruppo di funzioni per TUTTO
$(document).ready(function(){
    //prendo il numero di classi
    let i = CookiesStudenti.get("NStudenti");
    //se non ci sono studenti inizializzo i a 0
    if(i==undefined || i==0){
        i=0;
    }else{
        $("#errore").css({"display":"none"});
    }
    //ciclo per la scrittura di tutte le classi salvate
    for(let j=0 ; j<i; j++){
        bott = document.createElement("button");
        bott.setAttribute("class", "studenti");
        bott.setAttribute("id", "studente-"+j);
        bott.setAttribute("onclick", "leggi(" + j + ")")
        bott.innerHTML = "Studente: "+ CookiesStudenti.get("Nome"+j) + " " +  CookiesStudenti.get("Cognome"+j);
        $("#list-studenti").append(bott);
    }
    //funzione per il bottone X presente nelle schermate di lettura studente e creazione studente
    $(".chiudi").click(function(){
        $("#lett-studente").css({"display":"none"});
        $("#box-lettura").css({"display":"none"});
        $("#list-studenti").css({"display":"block"});
    });
    //funzione per il bottone per aggiungere uno studente
    $("#aggiungi").click(function(){
    //controllo se c'è almeno una classe
        if(CookiesStudenti.get("NClassi")==0||CookiesStudenti.get("NClassi")==undefined){
            alert("ATTENZIONE: non è presente alcuna classe a cui associare lo studente")
        }else{
            $("#lett-studente").css({"display":"block"});
            $("#list-studenti").css({"display":"none"});
            $("#box-lettura").css({"display":"none"});
            let listaStudenti = "";
            for(j=0;j<CookiesStudenti.get("NClassi");j++){
                listaStudenti += "<option value='" + CookiesStudenti.get("Classe"+j)+CookiesStudenti.get("Sezione"+j) + "'> "+ CookiesStudenti.get("Classe"+j)+CookiesStudenti.get("Sezione"+j) + "</option>"; 
            }
            $("#classe").html(listaStudenti);
        }
    });
    //funzione per salvare le impostazioni
    $("#pubblica").click(function(){
        nome = $("#nome").val();
        cognome = $("#cognome").val();
        classe = $("#classe").val();
        CookiesStudenti.set("Nome"+i, nome, { sameSite: 'strict' });
        CookiesStudenti.set("Cognome"+i, cognome, { sameSite: 'strict' });
        CookiesStudenti.set("ClasseStrud"+i, classe, {sameSite: 'strict'});
        i++;
        CookiesStudenti.set("NStudenti", i, { sameSite: 'strict' });
        window.location.reload();
    });
});

//funzione per la lettura di una comunicazione
function leggi(id){
    $("#list-studenti").css({"display":"none"});
    $("#box-lettura").css({"display":"block"});
    $("#lett-studente").css({"display":"none"});
    document.getElementById("nome-lett").innerHTML = "";
    document.getElementById("cognome-lett").innerHTML = "";
    document.getElementById("classe-lett").innerHTML = "";
    document.getElementById("elimina").setAttribute("onclick","elimina(" + id +")");
    $("#nome-lett").append(CookiesStudenti.get("Nome"+id));
    $("#cognome-lett").append(CookiesStudenti.get("Cognome"+id));
    $("#classe-lett").append(CookiesStudenti.get("ClasseStrud"+id));
}

//funzione per l'eliminazione della comunicazione e quindi anche del cookie
function elimina(id){
    CookiesStudenti.set("NStudenti", CookiesStudenti.get("NStudenti")-1, { sameSite: 'strict' });
    for(i=id;i<CookiesStudenti.get("NStudenti");i++){
        CookiesStudenti.set("Nome"+i, CookiesStudenti.get("Nome"+(i+1)), { sameSite: 'strict' });
        CookiesStudenti.set("Cognome"+i, CookiesStudenti.get("Cognome"+(i+1)), { sameSite: 'strict' });
        CookiesStudenti.set("ClasseStrud"+i, CookiesStudenti.get("ClasseStrud"+(i+1)), { sameSite: 'strict' });
    }
    i = CookiesStudenti.get("NStudenti");
    CookiesStudenti.remove("Nome"+i, { path: '' }, { sameSite: 'strict' });
    CookiesStudenti.remove("Cognome"+i, { path: '' }, { sameSite: 'strict' });
    CookiesStudenti.remove("ClasseStrud"+i, {path: ''}, {sameSite: 'Strict'});
    window.location.reload();
}