document.querySelector("#form").addEventListener("submit",login)

regUser = JSON.parse(localStorage.getItem("User"))


function login(){
    let flag=false
    event.preventDefault();
    enteredMail = document.querySelector("#mail").value;
    enteredPass = document.querySelector("#pass").value;
    for (i = 0; i < regUser.length; i++) {
        if (enteredMail === regUser[i].mail && enteredPass === regUser[i].pass){
            window.location.href="./index.html"
            flag=true
            break;
        }
    }
    if (flag === true) {
        alert("Credentails Matchs")
    }
    else {
        alert("User Credentails Invalid\nIf New User SignUp First")
    }

}