document.querySelector("#form").addEventListener("submit",signUp)

signData=JSON.parse(localStorage.getItem("User"))||[]
function datafun(n,c,e,p){
    this.name=n;
    this.contact=c;
    this.mail=e;
    this.pass=p;
}

function signUp(){
    event.preventDefault();
    Uname=document.querySelector("#name").value;
    contact = document.querySelector("#contact").value;
    mail = document.querySelector("#mail").value;
    pass = document.querySelector("#pass").value;

    if(Uname===""||contact===""||mail===""||pass===""){
        alert("Enter All Details")
        return
    }
    console.log(Uname, contact, mail, pass)
    var user = new datafun(Uname,contact,mail,pass)
    signData.push(user)
    console.log(signData)

    localStorage.setItem("User",JSON.stringify(signData))

}