var Cookies2 = Cookies.noConflict()

if(Cookies2.get("Login") == "False"){
    window.location.replace("index.html")
}

$(document).ready(function(){
    $("#logout").click(function(){
        Cookies2.set("Login", "False")
        window.location.replace("index.html");
    });
});