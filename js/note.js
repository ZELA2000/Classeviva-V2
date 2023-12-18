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
        $("#list-note").append(bott);
    }
    //funzione per il bottone X presente nelle schermate di lettura note e creazione nota
    $(".chiudi").click(function(){
        $("#lett-nota").css({"display":"none"});
        $("#box-note").css({"display":"none"});
        $("#list-note").css({"display":"block"});
        document.getElementById("modifica").removeAttribute("onclick");
    });
    //funzione per il bottone aggiungi
    $("#aggiungi").click(function(){
        if(CookiesNote.get("NStudenti")==0||CookiesNote.get("NStudenti")==undefined){
            alert("ATTENZIONE: non è presente alcuno studente a cui associare la nota");
        }else{
            $("#lett-nota").css({"display":"block"});
            $("#list-note").css({"display":"none"});
            $("#box-note").css({"display":"none"});
            let listaNote = "";
            for(let j=0;j<CookiesNote.get("NStudenti");j++){
                listaNote += "<option value='" + CookiesNote.get("Nome"+j)+ " " + CookiesNote.get("Cognome"+j) + "'> "+ CookiesNote.get("Nome"+j)+ " " + CookiesNote.get("Cognome"+j) + "</option>"; 
            }
            $("#studenti").html(listaNote);
        }
    });
    $("#pubblica").click(function(){
        persNota = $("#studenti").val();
        testo = $("#corpo").val();
        data = $("#data").val();
        CookiesNote.set("PersNota"+i, persNota, { sameSite: 'strict' });
        CookiesNote.set("TestoNota"+i, testo, { sameSite: 'strict' });
        CookiesNote.set("DataNota"+i, data, { sameSite: 'strict' });
        i++;
        CookiesNote.set("NNote", i, { sameSite: 'strict' });
        window.location.reload();
    });
});

//funzione per leggere le note
function leggi(id){
    $("#lett-nota").css({"display":"none"});
    $("#list-note").css({"display":"none"});
    $("#box-note").css({"display":"block"});
    document.getElementById("studente-associato").innerHTML = "";
    document.getElementById("nota-lett").innerHTML = "";
    document.getElementById("data-nota").innerHTML = "";
    document.getElementById("elimina").setAttribute("onclick", "elimina("+id+")");
    document.getElementById("modifica").setAttribute("onclick", "modifica("+id+")");
    $("#studente-associato").html(CookiesNote.get("PersNota"+id));
    $("#nota-lett").html(CookiesNote.get("TestoNota"+id));
    $("#data-nota").html(CookiesNote.get("DataNota"+id));
}

//funzione per eliminare le note
function elimina(id){
    CookiesNote.set("NNote", CookiesNote.get("NNote")-1, { sameSite: 'strict' });
    for(let j=id;j<CookiesNote.get("NNote");j++){
        CookiesNote.set("PersNota"+j, CookiesNote.get("PersNota"+(j+1)), { sameSite: 'strict' });
        CookiesNote.set("Testo"+j, CookiesNote.get("Testo"+(j+1)), { sameSite: 'strict' });
        CookiesNote.set("Data"+j, CookiesNote.get("Data"+(j+1)), { sameSite: 'strict' });
    }
    i = CookiesNote.get("NNote");
    CookiesNoteremove("PersNota"+i);
    CookiesNote.remove("TestoNota"+i);
    CookiesNote.remove("DataNota"+i); 
    window.location.reload();
}