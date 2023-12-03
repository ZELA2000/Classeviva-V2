var Cookies2 = Cookies.noConflict();

if(Cookies2.get("Login") != "True"){
    window.location.replace("index.html")
}

$(document).ready(function(){
    $("#logout").click(function(){
        Cookies2.set("Login", "False", { sameSite: 'strict' })
        window.location.replace("index.html");
    });
});