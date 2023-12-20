//importo le funzioni per i cookie
var CookiesVoti = Cookies2.noConflict();

//funzione per il bottone "indietro"
$(document).ready(function () {
    $("#indietro").click(function () {
        window.location.replace("home.html");
    });
});

//funzione con tutto
$(document).ready(function () {
    //prendo il numero di voti
    let i = CookiesVoti.get("NVoti");
    //se non ci sono voti inizializzo i a 0
    if (i == undefined || i == 0) {
        i = 0;
    } else {
        $("#errore").css({ "display": "none" });
    }
    //ciclo per la scrittura di tutti i voti salvati
    for (let j = 0; j < i; j++) {
        bott = document.createElement("button");
        bott.setAttribute("class", "comm");
        bott.setAttribute("id", "comm-" + j);
        bott.setAttribute("onclick", "leggi(" + j + ")")
        bott.innerHTML = "Voto di: " + CookiesVoti.get("PersVoto" + j);
        $("#list-voti").append(bott);
    }
    //funzione per il bottone X presente nelle schermate di lettura voto e creazione voto
    $(".chiudi").click(function () {
        $("#lett-voto").css({ "display": "none" });
        $("#box-voto").css({ "display": "none" });
        $("#list-voti").css({ "display": "block" });
        $("#modifica-box").css({ "display": "none" });
        document.getElementById("modifica").removeAttribute("onclick");
    });
    //funzione per il bottone aggiungi
    $("#aggiungi").click(function () {
        if (CookiesVoti.get("NStudenti") == 0 || CookiesVoti.get("NStudenti") == undefined) {
            alert("ATTENZIONE: non è presente alcuno studente a cui associare il voto");
        } else {
            $("#lett-voto").css({ "display": "block" });
            $("#list-voti").css({ "display": "none" });
            $("#box-voto").css({ "display": "none" });
            $("#modifica-box").css({ "display": "none" });
            let listaVoti = "";
            for (let j = 0; j < CookiesVoti.get("NStudenti"); j++) {
                listaVoti += "<option value='" + CookiesVoti.get("Nome" + j) + " " + CookiesVoti.get("Cognome" + j) + "'> " + CookiesVoti.get("Nome" + j) + " " + CookiesVoti.get("Cognome" + j) + "</option>";
            }
            $("#studenti").html(listaVoti);
        }
    });
    $("#pubblica").click(function () {
        persVoto = $("#studenti").val();
        descrizione = $("#descrizione").val();
        data = $("#data").val();
        valutazione = $("#voto").val();
        CookiesVoti.set("PersVoto" + i, persVoto, { sameSite: 'strict' });
        CookiesVoti.set("DescrizioneValutazione" + i, descrizione, { sameSite: 'strict' });
        CookiesVoti.set("DataValutazione" + i, data, { sameSite: 'strict' });
        CookiesVoti.set("Valutazione" + i, valutazione, { sameSite: 'strict' });
        i++;
        CookiesVoti.set("NVoti", i, { sameSite: 'strict' });
        window.location.reload();
    });
});

//funzione per la lettura del voto
function leggi(id) {
    $("#lett-voto").css({ "display": "none" });
    $("#list-voti").css({ "display": "none" });
    $("#box-voto").css({ "display": "block" });
    $("#modifica-box").css({ "display": "none" });
    document.getElementById("studente-associato").innerHTML = "";
    document.getElementById("voto-lett").innerHTML = "";
    document.getElementById("data-valutazione").innerHTML = "";
    document.getElementById("descrizione-lett").innerHTML = "";
    document.getElementById("elimina").setAttribute("onclick", "elimina(" + id + ")");
    document.getElementById("modifica").setAttribute("onclick", "modifica(" + id + ")");
    $("#studente-associato").html(CookiesVoti.get("PersVoto" + id));
    $("#descrizione-lett").html(CookiesVoti.get("DescrizioneValutazione" + id));
    $("#data-valutazione").html(CookiesVoti.get("DataValutazione" + id));
    $("#voto-lett").html(CookiesVoti.get("Valutazione" + id));
}

//funzione per eliminare il voto
function elimina(id) {
    CookiesVoti.set("NVoti", CookiesVoti.get("NVoti") - 1, { sameSite: 'strict' });
    for (let j = id; j < CookiesVoti.get("NVoti"); j++) {
        CookiesVoti.set("PersVoto" + j, CookiesVoti.get("PersVoto" + (j + 1)), { sameSite: 'strict' });
        CookiesVoti.set("DescrizioneValutazione" + j, CookiesVoti.get("DescrizioneValutazione" + (j + 1)), { sameSite: 'strict' });
        CookiesVoti.set("DataValutazione" + j, CookiesVoti.get("DataValutazione" + (j + 1)), { sameSite: 'strict' });
        CookiesVoti.set("Valutazione" + j, CookiesVoti.get("Valutazione" + (j + 1)), { sameSite: 'strict' });
    }
    i = CookiesVoti.get("NVoti");
    CookiesVoti.remove("PersVoto" + i);
    CookiesVoti.remove("DescrizioneValutazione" + i);
    CookiesVoti.remove("DataValutazione" + i);
    CookiesVoti.remove("Valutazione" + i);
    window.location.reload();
}

function modifica(id) {
    $("#lett-voto").css({ "display": "none" });
    $("#list-voti").css({ "display": "none" });
    $("#box-voto").css({ "display": "none" });
    $("#modifica-box").css({ "display": "block" });
    let listaStudenti = "";
    for (let j = 0; j < CookiesVoti.get("NStudenti"); j++) {
        listaStudenti += "<option id='" + CookiesVoti.get("Nome" + j) + " " + CookiesVoti.get("Cognome" + j) + "ver' value='" + CookiesVoti.get("Nome" + j) + " " + CookiesVoti.get("Cognome" + j) + "'> " + CookiesVoti.get("Nome" + j) + " " + CookiesVoti.get("Cognome" + j) + "</option>";
    }
    $("#studentiMod").html(listaStudenti);
    let voto = CookiesVoti.get("Valutazione" + id);
    document.getElementById(voto).setAttribute("selected", "selected");
    document.getElementById("dataMod").value = CookiesVoti.get("DataValutazione" + id);
    document.getElementById("descrizioneMod").value = CookiesVoti.get("DescrizioneValutazione" + id);
    document.getElementById(CookiesVoti.get("PersVoto" + id) + "ver").setAttribute("selected", "selected");
    $("#pubblicaMod").click(function () {
        if ($("#dataMod").val() != "" || $("#descrizioneMod").val() != "") {
            persVoto = $("#studentiMod").val();
            data = $("#dataMod").val();
            descrizione = $("#descrizioneMod").val();
            valutazione = $("#votoMod").val();
            CookiesVoti.set("PersVoto" + id, persVoto, { sameSite: 'strict' });
            CookiesVoti.set("DataValutazione" + id, data, { sameSite: 'strict' });
            CookiesVoti.set("DescrizioneValutazione" + id, descrizione, { sameSite: 'strict' });
            CookiesVoti.set("Valutazione" + id, valutazione, { sameSite: 'strict' });
            window.location.reload();
        }
    });
}