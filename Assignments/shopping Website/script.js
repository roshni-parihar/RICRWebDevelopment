function checkout() {
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const payment = document.getElementById("payment").value;
  const quantity = document.getElementById("quantity").value;

  if (!name || !address || !phone || !email || !payment || !quantity) {
    alert(" Please fill all the details correctly");
    return;
  }

  alert("Thank you for shopping, ${name}! 🛍️");

  /*document.getElementById("name").value = "";
  document.getElementById("address").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("payment").value = "";
  document.getElementById("quantity").value = "";*/

  document.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
      checkout();
    }
  })
}
