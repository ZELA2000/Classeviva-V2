const pass = "Alleluja2024";
var Cookies2 = Cookies.noConflict();

if(Cookies2.get("Login")=="True"){
    window.location.replace("home.html");
}

$(document).ready(function(){
    $("#accedi").click(function(){
        let passGet = document.getElementById("password").value;
        if(passGet == pass){
            Cookies2.set("Login", "True", { sameSite: 'strict' });
            window.location.replace("home.html");
        }
        else{
            $("#password").css({"border-color":"red"});
            alert("Password non corretta"); 
        }
    });
    window.addEventListener("keyup", (enter) => {
        switch(enter.key){
            case "Enter":
                let passGet = document.getElementById("password").value;
                if(passGet == pass){
                    Cookies2.set("Login", "True", { sameSite: 'strict' });
                    window.location.replace("home.html");
                }
                else{
                    $("#password").css({"border-color":"red"});
                    alert("Password non corretta"); 
                }
                break;
        }
    })
});