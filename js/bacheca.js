//imposto funzione per i cookie
var Cookies3 = Cookies2.noConflict();

//funzione per il bottone "indietro"
$(document).ready(function(){
    $("#indietro").click(function(){
        window.location.replace("home.html");
    });
});

//gruppo di funzioni per TUTTO
$(document).ready(function(){
    //prendo il numero di comunicazioni
    let i = Cookies3.get("NComm");
    //se non ci sono comunicazioni inizializzo i a 0
    if(i==undefined || i==0){
        i=0;
    }else{
        $("#errore").css({"display":"none"});
    }
    //ciclo per la scrittura di tutte le comunicazioni salvate
    for(let j=0 ; j<i; j++){
        bott = document.createElement("button");
        bott.setAttribute("class", "comm");
        bott.setAttribute("id", "comm-"+j);
        bott.setAttribute("onclick", "leggi(" + j + ")")
        bott.innerHTML = "Comunicazione: "+ Cookies3.get("TitComm"+j);
        $("#box-comm").append(bott);
    }
    //funzione per il bottone per aggiungere le comunicazioni
    $("#aggiungi").click(function(){
        $("#lett-comm").css({"display":"block"});
        $("#box-comm").css({"display":"none"});
        $("#box-lett").css({"display":"none"});
        $("#modifica-box").css({"display":"none"});
        document.getElementById("titolo").value = "";
        document.getElementById("corpo").value = "";
    });
    //funzione per il bottone X presente nelle schermate di lettura comunicazione e creazione comm.
    $(".chiudi").click(function(){
        $("#lett-comm").css({"display":"none"});
        $("#box-lett").css({"display":"none"});
        $("#box-comm").css({"display":"block"});
        $("#modifica-box").css({"display":"none"});
        document.getElementById("modifica").removeAttribute("onclick");
    });
    //funzione per il salvataggio del cookie con la nuova comunicazione
    $("#pubblica").click(function(){
        if($("#titolo").val()!="" || $("#corpo").val()!=""){
            commTitoli = $("#titolo").val();
            commCorpo = $("#corpo").val();
            Cookies3.set("TitComm"+i, commTitoli, { sameSite: 'strict' });
            Cookies3.set("CorpoComm"+i, commCorpo, { sameSite: 'strict' });
            i++;
            Cookies3.set("NComm", i, { sameSite: 'strict' });
            window.location.reload();
        }
    //Verifica se sono stati inseriti il titolo e il corpo
        else if($("#titolo").val()=="" && $("#corpo").val()!=""){
            alert("ATTENZIONE: inserire un titolo per la comunicazione");
            $("#titolo").css("border-color","red");
        }
        else if($("#titolo").val()!="" && $("#corpo").val()==""){
            alert("ATTENZIONE: inserire il corpo della comunicazione");
            $("#corpo").css("border-color","red");
           
        }
        else if($("#titolo").val()=="" && $("#corpo").val()==""){
            alert("COMUNICAZIONE VUOTA: prima di pubblicarla assicurati di aver compilato sia il titolo sia il corpo di essa");
            $("#corpo").css("border-color","red");
            $("#titolo").css("border-color","red");
        }
    });
});

//funzione per la lettura di una comunicazione
function leggi(id){
    $("#box-comm").css({"display":"none"});
    $("#box-lett").css({"display":"block"});
    $("#lett-comm").css({"display":"none"});
    $("#modifica-box").css({"display":"none"});
    document.getElementById("titolo-comm").innerHTML = "";
    document.getElementById("corpo-comm").innerHTML = "";
    document.getElementById("elimina").setAttribute("onclick","elimina(" + id +")");
    document.getElementById("modifica").setAttribute("onclick","modifica(" + id +")");
    $("#titolo-comm").append(Cookies3.get("TitComm"+id));
    $("#corpo-comm").append(Cookies3.get("CorpoComm"+id));
}

//funzione per l'eliminazione della comunicazione e quindi anche del cookie
function elimina(id){
    Cookies3.set("NComm", Cookies3.get("NComm")-1, { sameSite: 'strict' });
    for(i=id;i<Cookies3.get("NComm");i++){
        Cookies3.set("TitComm"+i, Cookies3.get("TitComm"+(i+1)), { sameSite: 'strict' });
        Cookies3.set("CorpoComm"+i, Cookies3.get("CorpoComm"+(i+1)), { sameSite: 'strict' });
    }
    i = Cookies3.get("NComm");
    Cookies3.remove("TitComm"+i, { path: '' }, { sameSite: 'strict' });
    Cookies3.remove("CorpoComm"+i, { path: '' }, { sameSite: 'strict' });
    window.location.reload();
}

function modifica(id){
    $("#box-comm").css({"display":"none"});
    $("#box-lett").css({"display":"none"});
    $("#lett-comm").css({"display":"none"})
    $("#modifica-box").css({"display":"block"});
    document.getElementById("titoloMod").value = Cookies3.get("TitComm"+id);
    document.getElementById("corpoMod").value = Cookies3.get("CorpoComm"+id);
    $("#pubblicaMod").click(function(){
        if($("#titoloMod").val()!="" || $("#corpoMod").val()!=""){
            commTitoli = $("#titoloMod").val();
            commCorpo = $("#corpoMod").val();
            Cookies3.set("TitComm"+id, commTitoli, { sameSite: 'strict' });
            Cookies3.set("CorpoComm"+id, commCorpo, { sameSite: 'strict' });
            window.location.reload();
        }
    });
}