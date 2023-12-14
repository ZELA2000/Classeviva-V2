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
    let i;
    for(i=0;i<=nStud;i++){
        if(CookiesClassi.get("ClasseStrud"+i)==CookiesClassi.get("Classe"+id)+CookiesClassi.get("Sezione"+id)){
            for(j=i;j<nStud;j++){
                CookiesClassi.set("Nome"+j, CookiesClassi.get("Nome"+(j+1)), { sameSite: 'strict' });
                CookiesClassi.set("Cognome"+j, CookiesClassi.get("Cognome"+(j+1)), {sameSite: 'strict'});
                CookiesClassi.set("ClasseStrud"+j, CookiesClassi.get("ClasseStrud"+(j+1)), {sameSite: 'strict'});
            }
            nStud=nStud-1;
            CookiesClassi.remove("Nome"+nStud, {path:''},{sameSite: 'strict'});
            CookiesClassi.remove("Cognome"+nStud, {path:''},{sameSite: 'strict'});
            CookiesClassi.remove("ClasseStrud"+nStud, {path:''},{sameSite: 'strict'});
            i=0;
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