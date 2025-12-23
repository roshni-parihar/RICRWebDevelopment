function contact(){
  const nm= document.getElementById("name").value.trim();
   const em= document.getElementById("email").value.trim();
    const msg= document.getElementById("message").value.trim();

    if (!nm|| !em || !msg) {
    alert(" Please fill all the details correctly");
    return;
  }
  alert("Thank you for contacting us, ${nm}!");
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("Message").value = "";


  document.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
    contact();
  };
  })
}
