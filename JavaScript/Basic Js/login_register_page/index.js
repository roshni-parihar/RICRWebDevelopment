function Login(){
console.log("login Button Clicked");

const em = document.getElementById("LoginEmail").value;
const ps = document.getElementById("LoginPassword").value;
//console.log(em,ps);
console.log("Email:"+em);
console.log("Password:"+ps);

alert("Login Done");

document.getElementById("LoginEmail").value="";
  document.getElementById("LoginPassword").value="";
}
function Registration(){
console.log("Registration Button Clicked");
const nm = document.getElementById("RegistrationName").value;
const em = document.getElementById("RegistrationEmail").value;
const ps1 = document.getElementById("RegistrationCreatePassword").value;
const ps2 = document.getElementById("RegistrationConfirmPassword").value;
console.log("name:"+nm);
console.log("Email:"+em);
console.log("Password1:"+ps1);
console.log("Password2:"+ps2);


document.getElementById("RegistrationName").value="";
 document.getElementById("RegistrationEmail").value= "";
 document.getElementById("RegistrationCreatePassword").value="";
document.getElementById("RegistrationConfirmPassword").value="";
}