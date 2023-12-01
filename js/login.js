const pass = "Alleluja2024";
var Cookies2 = Cookies.noConflict();
Cookies2.set("Login", "False");

if(Cookies2.get("Login")=="True"){
    window.location.replace("home.html");
}

$(document).ready(function(){
    $("#accedi").click(function(){
        let passGet = document.getElementById("password").value;
        if(passGet == pass){
            Cookies2.set("Login", "True");
            window.location.replace("home.html");
        }
    });
});