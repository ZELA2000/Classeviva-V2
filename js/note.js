//imposto funzione per i cookie
var CookiesNote = Cookies2.noConflict();

//funzione per il bottone "indietro"
$(document).ready(function () {
    $("#indietro").click(function () {
        window.location.replace("home.html");
    });
});

//funzione con tutto 
$(document).ready(function () {
    //prendo il numero di classi
    let i = CookiesNote.get("NNote");
    //se non ci sono classi inizializzo i a 0
    if (i == undefined || i == 0) {
        i = 0;
    } else {
        $("#errore").css({ "display": "none" });
    }
    //ciclo per la scrittura di tutte le note salvate
    for (let j = 0; j < i; j++) {
        bott = document.createElement("button");
        bott.setAttribute("class", "comm");
        bott.setAttribute("id", "comm-" + j);
        bott.setAttribute("onclick", "leggi(" + j + ")")
        bott.innerHTML = "Nota di: " + CookiesNote.get("PersNota" + j);
        $("#list-note").append(bott);
    }
    //funzione per il bottone X presente nelle schermate di lettura note e creazione nota
    $(".chiudi").click(function () {
        $("#lett-nota").css({ "display": "none" });
        $("#box-note").css({ "display": "none" });
        $("#list-note").css({ "display": "block" });
        $("#modifica-box").css({ "display": "none" });
        document.getElementById("modifica").removeAttribute("onclick");
    });
    //funzione per il bottone aggiungi
    $("#aggiungi").click(function () {
        if (CookiesNote.get("NStudenti") == 0 || CookiesNote.get("NStudenti") == undefined) {
            alert("ATTENZIONE: non è presente alcuno studente a cui associare la nota");
        } else {
            $("#lett-nota").css({ "display": "block" });
            $("#list-note").css({ "display": "none" });
            $("#box-note").css({ "display": "none" });
            $("#modifica-box").css({ "display": "none" });
            document.getElementById("corpoN").value = "";
            document.getElementById("data").value = "";
            let listaNote = "";
            for (let j = 0; j < CookiesNote.get("NStudenti"); j++) {
                listaNote += "<option value='" + CookiesNote.get("Nome" + j) + " " + CookiesNote.get("Cognome" + j) + "'> " + CookiesNote.get("Nome" + j) + " " + CookiesNote.get("Cognome" + j) + "</option>";
            }
            $("#studenti").html(listaNote);
        }
    });
    $("#pubblica").click(function () {
        if ($("#corpoN").val() != "" && $("#data").val() != "") {
            persNota = $("#studenti").val();
            testo = $("#corpoN").val();
            data = $("#data").val();
            CookiesNote.set("PersNota" + i, persNota, { sameSite: 'strict' });
            CookiesNote.set("TestoNota" + i, testo, { sameSite: 'strict' });
            CookiesNote.set("DataNota" + i, data, { sameSite: 'strict' });
            i++;
            CookiesNote.set("NNote", i, { sameSite: 'strict' });
            window.location.reload();
        }
        else if ($("#corpoN").val() == "" && $("#data").val() != "") {
            alert("ATTENZIONE: inserire il corpo della nota");
            $("#corpoN").css("border-color", "red");
        }
        else if ($("#corpoN").val() != "" && $("#data").val() == "") {
            alert("ATTENZIONE: inserire la data della nota");
            $("#data").css("border-color", "red");
        }
        else if ($("#corpoN").val() == "" && $("#data").val() == "") {
            alert("ATTENZIONE: inserire il corpo e la data della nota");
            $("#corpoN").css("border-color", "red");
            $("#data").css("border-color", "red");
        }
    });
});

//funzione per leggere le note
function leggi(id) {
    $("#lett-nota").css({ "display": "none" });
    $("#list-note").css({ "display": "none" });
    $("#box-note").css({ "display": "block" });
    $("#modifica-box").css({ "display": "none" });
    document.getElementById("studente-associato").innerHTML = "";
    document.getElementById("nota-lett").innerHTML = "";
    document.getElementById("data-nota").innerHTML = "";
    document.getElementById("elimina").setAttribute("onclick", "elimina(" + id + ")");
    document.getElementById("modifica").setAttribute("onclick", "modifica(" + id + ")");
    $("#studente-associato").html(CookiesNote.get("PersNota" + id));
    $("#nota-lett").html(CookiesNote.get("TestoNota" + id));
    $("#data-nota").html(CookiesNote.get("DataNota" + id));
}

//funzione per eliminare le note
function elimina(id) {
    $("#avvertimento").css({ "display": "block" });
    $("#si").click(function () {
        CookiesNote.set("NNote", CookiesNote.get("NNote") - 1, { sameSite: 'strict' });
        for (let j = id; j < CookiesNote.get("NNote"); j++) {
            CookiesNote.set("PersNota" + j, CookiesNote.get("PersNota" + (j + 1)), { sameSite: 'strict' });
            CookiesNote.set("Testo" + j, CookiesNote.get("Testo" + (j + 1)), { sameSite: 'strict' });
            CookiesNote.set("Data" + j, CookiesNote.get("Data" + (j + 1)), { sameSite: 'strict' });
        }
        i = CookiesNote.get("NNote");
        CookiesNote.remove("PersNota" + i);
        CookiesNote.remove("TestoNota" + i);
        CookiesNote.remove("DataNota" + i);
        window.location.reload();
    });
    $("#no").click(function () {
        $("#avvertimento").css({ "display": "none" });
    });
}

function modifica(id) {
    $("#lett-nota").css({ "display": "none" });
    $("#list-note").css({ "display": "none" });
    $("#box-note").css({ "display": "none" });
    $("#modifica-box").css({ "display": "block" });
    let listaStudenti = "";
    for (let j = 0; j < CookiesNote.get("NStudenti"); j++) {
        listaStudenti += "<option id='" + CookiesNote.get("Nome" + j) + " " + CookiesNote.get("Cognome" + j) + "ver' value='" + CookiesNote.get("Nome" + j) + " " + CookiesNote.get("Cognome" + j) + "'> " + CookiesNote.get("Nome" + j) + " " + CookiesNote.get("Cognome" + j) + "</option>";
    }
    $("#studentiMod").html(listaStudenti);
    document.getElementById("corpoMod").value = CookiesNote.get("TestoNota" + id);
    document.getElementById("dataMod").value = CookiesNote.get("DataNota" + id);
    document.getElementById(CookiesNote.get("PersNota" + id) + "ver").setAttribute("selected", "selected");
    $("#pubblicaMod").click(function () {
        if ($("#nota-mod").val() != "" || $("#data-mod").val() != "") {
            persNota = $("#studentiMod").val();
            testo = $("#corpoMod").val();
            data = $("#dataMod").val();
            CookiesNote.set("PersNota" + id, persNota, { sameSite: 'strict' });
            CookiesNote.set("TestoNota" + id, testo, { sameSite: 'strict' });
            CookiesNote.set("DataNota" + id, data, { sameSite: 'strict' });
            window.location.reload();
        }
    });
}