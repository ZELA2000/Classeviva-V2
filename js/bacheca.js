var Cookies3 = Cookies2.noConflict();

$(document).ready(function(){
    $("#indietro").click(function(){
        window.location.replace("home.html");
    });
});

$(document).ready(function(){
    Cookies2.set("Comm", "True");
    $("#aggiungi").click(function(){

    })
})