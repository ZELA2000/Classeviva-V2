//imposto funzione per i cookie
var CookiesClassi = Cookies2.noConflict();

//funzione per il bottone "indietro"
$(document).ready(function () {
    $("#indietro").click(function () {
        window.location.replace("home.html");
    });
});

//gruppo di funzioni per TUTTO
$(document).ready(function () {
    //prendo il numero di classi
    let i = CookiesClassi.get("NClassi");
    //se non ci sono classi inizializzo i a 0
    if (i == undefined || i == 0) {
        i = 0;
    } else {
        $("#errore").css({ "display": "none" });
    }
    //funzione per il bottone X presente nelle schermate di lettura classe e creazione classe
    $(".chiudi").click(function () {
        $("#lett-classe").css({ "display": "none" });
        $("#box-lettura").css({ "display": "none" });
        $("#list-classi").css({ "display": "block" });
        $("#modifica-box").css({ "display": "none" });
        document.getElementById("modifica").removeAttribute("onclick");
        for (j = 1; j <= 5; j++) {
            document.getElementById("classe" + j).removeAttribute("selected");
        }
        for (j = 1; j <= 26; j++) {
            let sezioneSel;
            switch (j) {
                case 1:
                    sezioneSel = "A";
                    break;
                case 2:
                    sezioneSel = "B";
                    break;
                case 3:
                    sezioneSel = "C";
                    break;
                case 4:
                    sezioneSel = "D";
                    break;
                case 5:
                    sezioneSel = "E";
                    break;
                case 6:
                    sezioneSel = "F";
                    break;
                case 7:
                    sezioneSel = "G";
                    break;
                case 8:
                    sezioneSel = "H";
                    break;
                case 9:
                    sezioneSel = "I";
                    break;
                case 10:
                    sezioneSel = "J";
                    break;
                case 11:
                    sezioneSel = "K";
                    break;
                case 12:
                    sezioneSel = "L";
                    break;
                case 13:
                    sezioneSel = "M";
                    break;
                case 14:
                    sezioneSel = "N";
                    break;
                case 15:
                    sezioneSel = "O";
                    break;
                case 16:
                    sezioneSel = "P";
                    break;
                case 17:
                    sezioneSel = "Q";
                    break;
                case 18:
                    sezioneSel = "R";
                    break;
                case 19:
                    sezioneSel = "S";
                    break;
                case 20:
                    sezioneSel = "T";
                    break;
                case 21:
                    sezioneSel = "U";
                    break;
                case 22:
                    sezioneSel = "V";
                    break;
                case 23:
                    sezioneSel = "W";
                    break;
                case 24:
                    sezioneSel = "X";
                    break;
                case 25:
                    sezioneSel = "Y";
                    break;
                case 26:
                    sezioneSel = "Z";
                    break;
            }
            document.getElementById("sezione" + sezioneSel).removeAttribute("selected");
        }
    });
    //ciclo per la scrittura di tutte le classi salvate
    for (let j = 0; j < i; j++) {
        bott = document.createElement("button");
        bott.setAttribute("class", "classe");
        bott.setAttribute("id", "classe-" + j);
        bott.setAttribute("onclick", "leggi(" + j + ")")
        bott.innerHTML = "Classe: " + CookiesClassi.get("Classe" + j) + CookiesClassi.get("Sezione" + j);
        $("#list-classi").append(bott);
    }
    //funzione per il bottone per aggiungere una classe
    $("#aggiungi").click(function () {
        $("#lett-classe").css({ "display": "block" });
        $("#list-classi").css({ "display": "none" });
        $("#box-lettura").css({ "display": "none" });
        $("#modifica-box").css({ "display": "none" });
    });
    //funzione per salvare le impostazioni
    $("#pubblica").click(function () {
        classe = $("#classe").val();
        sezioneClasse = $("#sezione").val();
        let e = 0;
        for (let j = 0; j < CookiesClassi.get("NClassi"); j++) {
            if (CookiesClassi.get("Classe" + j) == classe && CookiesClassi.get("Sezione" + j) == sezioneClasse) {
                alert("ATTENZIONE: la classe inserita è già presente");
                e = 1;
            }
        }
        if (e == 0) {
            CookiesClassi.set("Classe" + i, classe, { sameSite: 'strict' });
            CookiesClassi.set("Sezione" + i, sezioneClasse, { sameSite: 'strict' });
            i++;
            CookiesClassi.set("NClassi", i, { sameSite: 'strict' });
            window.location.reload();
        }
    });
});

//funzione per la lettura
function leggi(id) {
    $("#list-classi").css({ "display": "none" });
    $("#box-lettura").css({ "display": "block" });
    $("#lett-classe").css({ "display": "none" });
    $("#modifica-box").css({ "display": "none" });
    document.getElementById("classe-lett").innerHTML = "";
    document.getElementById("list-stud").innerHTML = "";
    document.getElementById("elimina").setAttribute("onclick", "elimina(" + id + ")");
    document.getElementById("modifica").setAttribute("onclick", "modifica(" + id + ")");
    $("#classe-lett").append("Classe: " + CookiesClassi.get("Classe" + id) + CookiesClassi.get("Sezione" + id));
    let lista = "Alunni della classe: <ul>";
    for (i = 0; i < CookiesClassi.get("NStudenti"); i++) {
        if (CookiesClassi.get("ClasseStrud" + i) == CookiesClassi.get("Classe" + id) + CookiesClassi.get("Sezione" + id)) {
            lista += "<li>" + CookiesClassi.get("Nome" + i) + " " + CookiesClassi.get("Cognome" + i) + "</li>";
        }
    }
    lista += "</ul>";
    $("#list-stud").append(lista);
}

//funzione per l'eliminazione
function elimina(id) {
    $("#avvertimento").css({ "display": "block" });
    $("#si").click(function () {
        let nStud = parseInt(CookiesClassi.get("NStudenti"));
        let nVoti;
        let nNote;
        let i = 0;
        for (i = 0; i <= nStud; i++) {
            if (CookiesClassi.get("ClasseStrud" + i) == CookiesClassi.get("Classe" + id) + CookiesClassi.get("Sezione" + id)) {
                nVoti = parseInt(CookiesClassi.get("NVoti"));
                let j;
                for (j = 0; j <= nVoti; j++) {
                    if (CookiesClassi.get("PersVoto" + j) == CookiesClassi.get("Nome" + i) + " " + CookiesClassi.get("Cognome" + i)) {
                        for (k = j; k < nVoti; k++) {
                            CookiesClassi.set("PersVoto" + k, CookiesClassi.get("PersVoto" + (k + 1)), { sameSite: 'strict' });
                            CookiesClassi.set("DescrizioneValutazione" + k, CookiesClassi.get("DescrizioneValutazione" + (k + 1)), { sameSite: 'strict' });
                            CookiesClassi.set("DataValutazione" + k, CookiesClassi.get("DataValutazione" + (k + 1)), { sameSite: 'strict' });
                            CookiesClassi.set("Valutazione" + k, CookiesClassi.get("Valutazione" + (k + 1)), { sameSite: 'strict' });
                        }
                        nVoti = nVoti - 1;
                        CookiesClassi.remove("PersVoto" + nVoti, { path: '' }, { sameSite: 'strict' });
                        CookiesClassi.remove("DescrizioneValutazione" + nVoti, { path: '' }, { sameSite: 'strict' });
                        CookiesClassi.remove("DataValutazione" + nVoti, { path: '' }, { sameSite: 'strict' });
                        CookiesClassi.remove("Valutazione" + nVoti, { path: '' }, { sameSite: 'strict' });
                        j--;
                        CookiesClassi.set("NVoti", nVoti, { sameSite: 'strict' });
                    }
                }
                nNote = parseInt(CookiesClassi.get("NNote"));
                for (j = 0; j <= nNote; j++) {
                    if (CookiesClassi.get("PersNota" + j) == CookiesClassi.get("Nome" + i) + " " + CookiesClassi.get("Cognome" + i)) {
                        for (k = j; k < nNote; k++) {
                            CookiesClassi.set("PersNota" + k, CookiesClassi.get("PersNota" + (k + 1)), { sameSite: 'strict' });
                            CookiesClassi.set("TestoNota" + k, CookiesClassi.get("TestoNota" + (k + 1)), { sameSite: 'strict' });
                            CookiesClassi.set("DataNota" + k, CookiesClassi.get("DataNota" + (k + 1)), { sameSite: 'strict' });
                        }
                        nNote = nNote - 1;
                        CookiesClassi.remove("PersNota" + nNote, { path: '' }, { sameSite: 'strict' });
                        CookiesClassi.remove("TestoNota" + nNote, { path: '' }, { sameSite: 'strict' });
                        CookiesClassi.remove("DataNota" + nNote, { path: '' }, { sameSite: 'strict' });
                        j--;
                        CookiesClassi.set("NNote", nNote, { sameSite: 'strict' });
                    }
                }
                for (j = i; j < nStud; j++) {
                    CookiesClassi.set("Nome" + j, CookiesClassi.get("Nome" + (j + 1)), { sameSite: 'strict' });
                    CookiesClassi.set("Cognome" + j, CookiesClassi.get("Cognome" + (j + 1)), { sameSite: 'strict' });
                    CookiesClassi.set("ClasseStrud" + j, CookiesClassi.get("ClasseStrud" + (j + 1)), { sameSite: 'strict' });
                }
                nStud = nStud - 1;
                CookiesClassi.remove("Nome" + nStud, { path: '' }, { sameSite: 'strict' });
                CookiesClassi.remove("Cognome" + nStud, { path: '' }, { sameSite: 'strict' });
                CookiesClassi.remove("ClasseStrud" + nStud, { path: '' }, { sameSite: 'strict' });
                i--;
                CookiesClassi.set("NStudenti", nStud, { sameSite: 'strict' });
            }
        }
        CookiesClassi.set("NClassi", CookiesClassi.get("NClassi") - 1, { sameSite: 'strict' });
        for (i = id; i < CookiesClassi.get("NClassi"); i++) {
            CookiesClassi.set("Classe" + i, CookiesClassi.get("Classe" + (i + 1)), { sameSite: 'strict' });
            CookiesClassi.set("Sezione" + i, CookiesClassi.get("Sezione" + (i + 1)), { sameSite: 'strict' });
        }
        i = CookiesClassi.get("NClassi");
        CookiesClassi.remove("Classe" + i, { path: '' }, { sameSite: 'strict' });
        CookiesClassi.remove("Sezione" + i, { path: '' }, { sameSite: 'strict' });
        window.location.reload();
    });
    $("#no").click(function () {
        $("#avvertimento").css({ "display": "none" });
    });
}

function modifica(id) {
    $("#list-classi").css({ "display": "none" });
    $("#box-lettura").css({ "display": "none" });
    $("#lett-classe").css({ "display": "none" });
    $("#modifica-box").css({ "display": "block" });
    let classe = CookiesClassi.get("Classe" + id);
    let sezione = CookiesClassi.get("Sezione" + id);
    document.getElementById("classe" + classe).setAttribute("selected", "selected");
    document.getElementById("sezione" + sezione).setAttribute("selected", "selected");
    $("#pubblicaMod").click(function () {
        if ($("#classeMod").val() != "" || $("#sezioneMod").val() != "") {
            classe = $("#classeMod").val();
            sezioneClasse = $("#sezioneMod").val();
            for (i = 0; i < CookiesClassi.get("NStudenti"); i++) {
                if (CookiesClassi.get("ClasseStrud" + i) == CookiesClassi.get("Classe" + id) + CookiesClassi.get("Sezione" + id)) {
                    CookiesClassi.set("ClasseStrud" + i, classe + sezioneClasse, { sameSite: 'strict' });
                }
            }
            CookiesClassi.set("Classe" + id, classe, { sameSite: 'strict' });
            CookiesClassi.set("Sezione" + id, sezioneClasse, { sameSite: 'strict' });
            window.location.reload();
        }
    });
}