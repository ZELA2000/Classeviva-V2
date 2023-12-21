//imposto funzione per i cookie
var CookiesStudenti = Cookies2.noConflict();

//funzione per il bottone "indietro"
$(document).ready(function () {
    $("#indietro").click(function () {
        window.location.replace("home.html");
    });
});
//gruppo di funzioni per TUTTO
$(document).ready(function () {
    //prendo il numero di classi
    let i = CookiesStudenti.get("NStudenti");
    //se non ci sono studenti inizializzo i a 0
    if (i == undefined || i == 0) {
        i = 0;
    } else {
        $("#errore").css({ "display": "none" });
    }
    //ciclo per la scrittura di tutte le classi salvate
    for (let j = 0; j < i; j++) {
        bott = document.createElement("button");
        bott.setAttribute("class", "studenti");
        bott.setAttribute("id", "studente-" + j);
        bott.setAttribute("onclick", "leggi(" + j + ")")
        bott.innerHTML = "Studente: " + CookiesStudenti.get("Nome" + j) + " " + CookiesStudenti.get("Cognome" + j);
        $("#list-studenti").append(bott);
    }
    //funzione per il bottone X presente nelle schermate di lettura studente e creazione studente
    $(".chiudi").click(function () {
        $("#lett-studente").css({ "display": "none" });
        $("#box-lettura").css({ "display": "none" });
        $("#list-studenti").css({ "display": "block" });
        $("#modifica-box").css({ "display": "none" });
        document.getElementById("modifica").removeAttribute("onclick");
    });
    //funzione per il bottone per aggiungere uno studente
    $("#aggiungi").click(function () {
        //controllo se c'è almeno una classe
        if (CookiesStudenti.get("NClassi") == 0 || CookiesStudenti.get("NClassi") == undefined) {
            alert("ATTENZIONE: non è presente alcuna classe a cui associare lo studente")
        } else {
            $("#lett-studente").css({ "display": "block" });
            $("#list-studenti").css({ "display": "none" });
            $("#box-lettura").css({ "display": "none" });
            $("#modifica-box").css({ "display": "none" });
            document.getElementById("nome").value = "";
            document.getElementById("cognome").value = "";
            let listaStudenti = "";
            for (let j = 0; j < CookiesStudenti.get("NClassi"); j++) {
                listaStudenti += "<option id='classe" + j + "Or' value='" + CookiesStudenti.get("Classe" + j) + CookiesStudenti.get("Sezione" + j) + "'> " + CookiesStudenti.get("Classe" + j) + CookiesStudenti.get("Sezione" + j) + "</option>";
            }
            $("#classe").html(listaStudenti);
        }
    });
    //funzione per salvare le impostazioni
    $("#pubblica").click(function () {
        if ($("#nome").val() != "" && $("#cognome").val() != "") {
            nome = $("#nome").val();
            cognome = $("#cognome").val();
            classe = $("#classe").val();
            CookiesStudenti.set("Nome" + i, nome, { sameSite: 'strict' });
            CookiesStudenti.set("Cognome" + i, cognome, { sameSite: 'strict' });
            CookiesStudenti.set("ClasseStrud" + i, classe, { sameSite: 'strict' });
            i++;
            CookiesStudenti.set("NStudenti", i, { sameSite: 'strict' });
            window.location.reload();
        }
        else if ($("#nome").val() == "" && $("#cognome").val() != "") {
            alert("ATTENZIONE: inserire un nome per lo studente");
            $("#nome").css("border-color", "red");
        }
        else if ($("#nome").val() != "" && $("#cognome").val() == "") {
            alert("ATTENZIONE: inserire un cognome per lo studente");
            $("#cognome").css("border-color", "red");
        }
        else if ($("#nome").val() == "" && $("#cognome").val() == "") {
            alert("ATTENZIONE: inserire un nome e un cognome per lo studente");
            $("#nome").css("border-color", "red");
            $("#cognome").css("border-color", "red");
        }
    });
});

//funzione per la lettura dello studente
function leggi(id) {
    $("#list-studenti").css({ "display": "none" });
    $("#box-lettura").css({ "display": "block" });
    $("#lett-studente").css({ "display": "none" });
    $("#modifica-box").css({ "display": "none" });
    document.getElementById("nome-lett").innerHTML = "";
    document.getElementById("cognome-lett").innerHTML = "";
    document.getElementById("classe-lett").innerHTML = "";
    document.getElementById("elimina").setAttribute("onclick", "elimina(" + id + ")");
    document.getElementById("modifica").setAttribute("onclick", "modifica(" + id + ")");
    $("#nome-lett").append(CookiesStudenti.get("Nome" + id));
    $("#cognome-lett").append(CookiesStudenti.get("Cognome" + id));
    $("#classe-lett").append(CookiesStudenti.get("ClasseStrud" + id));
}

//funzione per l'eliminazione della comunicazione e quindi anche del cookie
function elimina(id) {
    $("#avvertimento").css({ "display": "block" });
    $("#si").click(function () {
        let NVoti = parseInt(CookiesStudenti.get("NVoti"));
        let i;
        for (i = 0; i < NVoti; i++) {
            if (CookiesStudenti.get("PersVoto" + i) == CookiesStudenti.get("Nome" + id) + " " + CookiesStudenti.get("Cognome" + id)) {
                for (let j = i; j < NVoti; j++) {
                    CookiesStudenti.set("PersVoto" + j, CookiesStudenti.get("PersVoto" + (j + 1)), { sameSite: 'strict' });
                    CookiesStudenti.set("DescrizioneValutazione" + j, CookiesStudenti.get("DescrizioneValutazione" + (j + 1)), { sameSite: 'strict' });
                    CookiesStudenti.set("DataValutazione" + j, CookiesStudenti.get("DataValutazione" + (j + 1)), { sameSite: 'strict' });
                    CookiesStudenti.set("Valutazione" + j, CookiesStudenti.get("Valutazione" + (j + 1)), { sameSite: 'strict' });
                }
                NVoti = NVoti - 1;
                CookiesStudenti.remove("PersVoto" + NVoti, { path: '' }, { sameSite: 'strict' });
                CookiesStudenti.remove("DescrizioneValutazione" + NVoti, { path: '' }, { sameSite: 'strict' });
                CookiesStudenti.remove("DataValutazione" + NVoti, { path: '' }, { sameSite: 'strict' });
                CookiesStudenti.remove("Valutazione" + NVoti, { path: '' }, { sameSite: 'strict' });
                i--;
                CookiesStudenti.set("NVoti", NVoti, { sameSite: 'strict' });
            }
        }
        let NNote = parseInt(CookiesStudenti.get("NNote"));
        for (i = 0; i < NNote; i++) {
            if (CookiesStudenti.get("PersNota" + i) == CookiesStudenti.get("Nome" + id) + " " + CookiesStudenti.get("Cognome" + id)) {
                for (let j = i; j < NNote; j++) {
                    CookiesStudenti.set("PersNota" + j, CookiesStudenti.get("PersNota" + (j + 1)), { sameSite: 'strict' });
                    CookiesStudenti.set("TestoNota" + j, CookiesStudenti.get("TestoNota" + (j + 1)), { sameSite: 'strict' });
                    CookiesStudenti.set("DataNota" + j, CookiesStudenti.get("DataNota" + (j + 1)), { sameSite: 'strict' });
                }
                NNote = NNote - 1;
                CookiesStudenti.remove("PersNota" + NNote, { path: '' }, { sameSite: 'strict' });
                CookiesStudenti.remove("TestoNota" + NNote, { path: '' }, { sameSite: 'strict' });
                CookiesStudenti.remove("DataNota" + NNote, { path: '' }, { sameSite: 'strict' });
                i--;
                CookiesStudenti.set("NNote", NNote, { sameSite: 'strict' });
            }
        }
        CookiesStudenti.set("NStudenti", CookiesStudenti.get("NStudenti") - 1, { sameSite: 'strict' });
        for (i = id; i < CookiesStudenti.get("NStudenti"); i++) {
            CookiesStudenti.set("Nome" + i, CookiesStudenti.get("Nome" + (i + 1)), { sameSite: 'strict' });
            CookiesStudenti.set("Cognome" + i, CookiesStudenti.get("Cognome" + (i + 1)), { sameSite: 'strict' });
            CookiesStudenti.set("ClasseStrud" + i, CookiesStudenti.get("ClasseStrud" + (i + 1)), { sameSite: 'strict' });
        }
        i = CookiesStudenti.get("NStudenti");
        CookiesStudenti.remove("Nome" + i, { path: '' }, { sameSite: 'strict' });
        CookiesStudenti.remove("Cognome" + i, { path: '' }, { sameSite: 'strict' });
        CookiesStudenti.remove("ClasseStrud" + i, { path: '' }, { sameSite: 'Strict' });
        window.location.reload();
    });
    $("#no").click(function () {
        $("#avvertimento").css({ "display": "none" });
    });
}
function modifica(id) {
    $("#list-studenti").css({ "display": "none" });
    $("#box-lettura").css({ "display": "none" });
    $("#lett-studente").css({ "display": "none" })
    $("#modifica-box").css({ "display": "block" });
    let listaStudenti = "";
    for (let j = 0; j < CookiesStudenti.get("NClassi"); j++) {
        listaStudenti += "<option id='classe" + CookiesStudenti.get("Classe" + j) + CookiesStudenti.get("Sezione" + j) + "' value='" + CookiesStudenti.get("Classe" + j) + CookiesStudenti.get("Sezione" + j) + "'> " + CookiesStudenti.get("Classe" + j) + CookiesStudenti.get("Sezione" + j) + "</option>";
    }
    $("#classeMod").html(listaStudenti);
    document.getElementById("nomeMod").value = CookiesStudenti.get("Nome" + id);
    document.getElementById("cognomeMod").value = CookiesStudenti.get("Cognome" + id);
    document.getElementById("classe" + CookiesStudenti.get("ClasseStrud" + id)).setAttribute("selected", "selected");
    $("#pubblicaMod").click(function () {
        if ($("#nomeMod").val() != "" || $("#cognomeMod").val() != "") {
            nome = $("#nomeMod").val();
            cognome = $("#cognomeMod").val();
            classe = $("#classeMod").val();
            for (j = 0; j < CookiesStudenti.get("NNote"); j++) {
                if (CookiesStudenti.get("PersNota" + j) == CookiesStudenti.get("Nome" + id) + " " + CookiesStudenti.get("Cognome" + id)) {
                    CookiesStudenti.set("PersNota" + j, nome + " " + cognome, { sameSite: 'strict' });
                }
            }
            for (j = 0; j < CookiesStudenti.get("NVoti"); j++) {
                if (CookiesStudenti.get("PersVoto" + j) == CookiesStudenti.get("Nome" + id) + " " + CookiesStudenti.get("Cognome" + id)) {
                    CookiesStudenti.set("PersVoto" + j, nome + " " + cognome, { sameSite: 'strict' });
                }
            }
            CookiesStudenti.set("Nome" + id, nome, { sameSite: 'strict' });
            CookiesStudenti.set("Cognome" + id, cognome, { sameSite: 'strict' });
            CookiesStudenti.set("ClasseStrud" + id, classe, { sameSite: 'strict' });
            window.location.reload();
        }
    });
}