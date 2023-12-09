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
    document.getElementById("classe-lett").innerHTML = "";
    document.getElementById("list-stud").innerHTML = "";
    document.getElementById("elimina").setAttribute("onclick","elimina(" + id +")");
    $("#classe-lett").append("Classe: " + CookiesClassi.get("Classe"+id) + CookiesClassi.get("Sezione"+id));
    let lista = "Alunni della classe: <ul>";
    for(i=0;i<CookiesClassi.get("NStudenti");i++){
        if(CookiesClassi.get("ClasseStrud"+i)==id){
            lista += "<li>" + CookiesClassi.get("Nome"+i) + " " + CookiesClassi.get("Cognome"+i) + "</li>";
        }
    }
    lista += "</ul>";
    $("#list-stud").append(lista);
}

//funzione per l'eliminazione
function elimina(id){
    let j=0;
    let ver = true;
    let tmp = -1;
    let tmp2 = 0;
    let ctm = 0;
    let NStudenti = parseInt(CookiesClassi.get("NStudenti"));
    while(ver){
        for(i=0;i<NStudenti&&tmp==-1;i++){
            if(CookiesClassi.get("ClasseStrud"+i)==id){
                tmp=i;
                if(tmp2==0){
                    tmp2=tmp;
                }
                ctm++;
                ver=true;
            }else{
                tmp=-1;
            }
        }
        if(tmp!=-1){
            for(i=tmp;i<NStudenti;i++){
                CookiesClassi.set("Nome"+i, CookiesClassi.get("Nome"+(i+1)), {sameSite: 'strict'});
                CookiesClassi.set("Cognome"+i, CookiesClassi.get("Cognome"+(i+1)), {sameSite: 'strict'});
                CookiesClassi.set("ClasseStrud"+i, CookiesClassi.get("ClasseStrud"+(i+1)), {sameSite: 'strict'});    
            }
            tmp=-1;
        }else{
            ver=false;
        }
    }
    for(i=CookiesClassi.get("NStudenti")-ctm;i<CookiesClassi.get("NStudenti");i++){
        CookiesClassi.remove("Nome"+i, { path: '' }, { sameSite: 'strict' });
        CookiesClassi.remove("Cognome"+i, { path: '' }, { sameSite: 'strict' });
        CookiesClassi.remove("ClasseStrud"+i, {path: ''}, {sameSite: 'Strict'});
    }
    CookiesClassi.set("NStudenti", CookiesClassi.get("NStudenti")-ctm, { sameSite: 'strict' });
    CookiesClassi.set("NClassi", CookiesClassi.get("NClassi")-1, {sameSite: 'strict'});
    for(i=tmp2;i<CookiesClassi.get("NClassi");i++){
        CookiesClassi.set("Classe"+i, CookiesClassi.get("Classe"+(i+1)), { sameSite: 'strict' });
        CookiesClassi.set("Sezione"+i, CookiesClassi.get("Sezione"+(i+1)), { sameSite: 'strict' });
    }
    for(i=id; i<CookiesClassi.get("NStudenti");i++){
        CookiesClassi.set("ClasseStrud"+i, CookiesClassi.get("ClasseStrud"+i)-1, {sameSite: 'strict'});
    }
    i = CookiesClassi.get("NClassi");
    CookiesClassi.remove("Classe"+i, { path: '' }, { sameSite: 'strict' });
    CookiesClassi.remove("Sezione"+i, { path: '' }, { sameSite: 'strict' });
    window.location.reload();
}