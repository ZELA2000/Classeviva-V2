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
    if(i==undefined || i==0){
        i=0;
    }else{
        $("#errore").css({"display":"none"});
    }
    //funzione per il bottone X presente nelle schermate di lettura classe e creazione classe
    $(".chiudi").click(function(){
        $("#lett-classe").css({"display":"none"});
        $("#box-lettura").css({"display":"none"});
        $("#list-classi").css({"display":"block"});
        document.getElementById("modifica").removeAttribute("onclick");
    });
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
        $("#box-lettura").css({"display":"none"});
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
});

//funzione per la lettura
function leggi(id){
    $("#list-classi").css({"display":"none"});
    $("#box-lettura").css({"display":"block"});
    $("#lett-classe").css({"display":"none"});
    document.getElementById("classe-lett").innerHTML = "";
    document.getElementById("list-stud").innerHTML = "";
    document.getElementById("elimina").setAttribute("onclick","elimina(" + id +")");
    document.getElementById("modifica").setAttribute("onclick","modifica(" + id +")");
    $("#classe-lett").append("Classe: " + CookiesClassi.get("Classe"+id) + CookiesClassi.get("Sezione"+id));
    let lista = "Alunni della classe: <ul>";
    for(i=0;i<CookiesClassi.get("NStudenti");i++){
        if(CookiesClassi.get("ClasseStrud"+i)==CookiesClassi.get("Classe"+id)+CookiesClassi.get("Sezione"+id)){
            lista += "<li>" + CookiesClassi.get("Nome"+i) + " " + CookiesClassi.get("Cognome"+i) + "</li>";
        }
    }
    lista += "</ul>";
    $("#list-stud").append(lista);
}

//funzione per l'eliminazione
function elimina(id){
    let nStud = parseInt(CookiesClassi.get("NStudenti"));
    let nVoti;
    let nNote;
    let i=0;
    for(i=0;i<=nStud;i++){
        if(CookiesClassi.get("ClasseStrud"+i)==CookiesClassi.get("Classe"+id)+CookiesClassi.get("Sezione"+id)){
            nVoti = parseInt(CookiesClassi.get("NVoti"));
            let j;
            for(j=0;j<=nVoti;j++){
                if(CookiesClassi.get("PersVoto"+j)==CookiesClassi.get("Nome"+i)+" "+CookiesClassi.get("Cognome"+i)){
                    for(k=j;k<nVoti;k++){
                        CookiesClassi.set("PersVoto"+k, CookiesClassi.get("PersVoto"+(k+1)), { sameSite: 'strict' });
                        CookiesClassi.set("DescrizioneValutazione"+k, CookiesClassi.get("DescrizioneValutazione"+(k+1)), { sameSite: 'strict' });
                        CookiesClassi.set("DataValutazione"+k, CookiesClassi.get("DataValutazione"+(k+1)), { sameSite: 'strict' });
                        CookiesClassi.set("Valutazione"+k, CookiesClassi.get("Valutazione"+(k+1)), { sameSite: 'strict' });
                    }
                    nVoti=nVoti-1;
                    CookiesClassi.remove("PersVoto"+nVoti, {path:''},{sameSite: 'strict'});
                    CookiesClassi.remove("DescrizioneValutazione"+nVoti, {path:''},{sameSite: 'strict'});
                    CookiesClassi.remove("DataValutazione"+nVoti, {path:''},{sameSite: 'strict'});
                    CookiesClassi.remove("Valutazione"+nVoti, {path:''},{sameSite: 'strict'});
                    j--;
                    CookiesClassi.set("NVoti", nVoti, {sameSite:'strict'});
                }
            }
            nNote = parseInt(CookiesClassi.get("NNote"));
            for(j=0;j<=nNote;j++){
                if(CookiesClassi.get("PersNota"+j)==CookiesClassi.get("Nome"+i)+" "+CookiesClassi.get("Cognome"+i)){
                    for(k=j;k<nNote;k++){
                        CookiesClassi.set("PersNota"+k, CookiesClassi.get("PersNota"+(k+1)), { sameSite: 'strict' });
                        CookiesClassi.set("TestoNota"+k, CookiesClassi.get("TestoNota"+(k+1)), { sameSite: 'strict' });
                        CookiesClassi.set("DataNota"+k, CookiesClassi.get("DataNota"+(k+1)), { sameSite: 'strict' });
                    }
                    nNote=nNote-1;
                    CookiesClassi.remove("PersNota"+nNote, {path:''},{sameSite: 'strict'});
                    CookiesClassi.remove("TestoNota"+nNote, {path:''},{sameSite: 'strict'});
                    CookiesClassi.remove("DataNota"+nNote, {path:''},{sameSite: 'strict'});
                    j--;
                    CookiesClassi.set("NNote", nNote, {sameSite:'strict'});
                }
            }
            for(j=i;j<nStud;j++){
                CookiesClassi.set("Nome"+j, CookiesClassi.get("Nome"+(j+1)), { sameSite: 'strict' });
                CookiesClassi.set("Cognome"+j, CookiesClassi.get("Cognome"+(j+1)), {sameSite: 'strict'});
                CookiesClassi.set("ClasseStrud"+j, CookiesClassi.get("ClasseStrud"+(j+1)), {sameSite: 'strict'});
            }
            nStud=nStud-1;
            CookiesClassi.remove("Nome"+nStud, {path:''},{sameSite: 'strict'});
            CookiesClassi.remove("Cognome"+nStud, {path:''},{sameSite: 'strict'});
            CookiesClassi.remove("ClasseStrud"+nStud, {path:''},{sameSite: 'strict'});
            i--;
            CookiesClassi.set("NStudenti", nStud, {sameSite:'strict'});
        }
    }
    CookiesClassi.set("NClassi", CookiesClassi.get("NClassi")-1, {sameSite: 'strict'});
    for(i=id;i<CookiesClassi.get("NClassi");i++){
        CookiesClassi.set("Classe"+i, CookiesClassi.get("Classe"+(i+1)), { sameSite: 'strict' });
        CookiesClassi.set("Sezione"+i, CookiesClassi.get("Sezione"+(i+1)), { sameSite: 'strict' });
    }
    i = CookiesClassi.get("NClassi");
    CookiesClassi.remove("Classe"+i, { path: '' }, { sameSite: 'strict' });
    CookiesClassi.remove("Sezione"+i, { path: '' }, { sameSite: 'strict' });
    window.location.reload();
}