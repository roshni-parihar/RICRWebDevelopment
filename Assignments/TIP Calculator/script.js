const audio = new Audio("remove sound.wav");
function Calculate() {
    audio.play();
  let bill = document.getElementById("BillAmount").value;
  let service = document.getElementById("Service").value;
  let persons = document.getElementById("Person").value;

  bill = Number(bill);
  service = Number(service);
  persons = Number(persons);

  if (bill <= 0 || service === 0 || persons <= 0) {
    alert("Please enter valid values!");
    return;
  }

  let tip = bill * service;
  let total = bill + tip;
  let perPersonBill = total / persons;
  let perPersonTip = tip/ persons;
 
   perPersonBill= parseFloat(perPersonBill);
    perPersonTip= parseFloat(perPersonTip);

  const d = document.createElement("div");
  d.classList.add("text-center", "text-light", "fs-4");

  d.innerHTML =`Total Amount : <span class="text-dark">${perPersonBill} </span> each.
 Tip Amount : <span class="text-dark">${perPersonTip} </span> each.
  
  `;

   document.getElementById("content").appendChild(d);
  
document.getElementById("BillAmount").value= "";
document.getElementById("Service").value= "";
document.getElementById("Person").value= "";

}

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    Calculate();

  }});
