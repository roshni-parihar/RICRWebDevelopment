const audio = new Audio("remove sound.wav");
function calculateBill() {
    audio.play();
  const units = document.getElementById("units").value.trim();

  const Units = parseFloat(units);

  if (isNaN(Units) || Units < 0) {
    alert("Please enter valid units");
    return;
  }

  let remaining = Units;
  let Rate1 = Math.min(remaining, 50);
  remaining -= Rate1;

  let Rate2 = Math.min(remaining, 150);
  remaining -= Rate2;

  let Rate3 = Math.min(remaining, 250);
  remaining -= Rate3;

  let Rate4 = remaining;

  let cost1 = Rate1 * 0.5;
  let cost2 = Rate2 * 0.75;
  let cost3 = Rate3 * 1.2;
  let cost4 = Rate4 * 1.5;

  let subtotal = cost1 + cost2 + cost3 + cost4;
  let surcharge = subtotal * 0.2;
  let total = subtotal + surcharge;

  const list = document.createElement("ul");
  list.classList.add("list-group");

  list.innerHTML = `
  <li class="list-group-item">First 50 Units: ${Rate1} * ₹0.50 = ₹${cost1.toFixed(2)}</li>
    <li class="list-group-item">Next 150 Units: ${Rate2} * ₹0.75 = ₹${cost2.toFixed(2)}</li>
    <li class="list-group-item">Next 250 Units: ${Rate3} * ₹1.20 = ₹${cost3.toFixed(2)}</li>
    <li class="list-group-item">Above 450 Units: ${Rate4} * ₹1.50 = ₹${cost4.toFixed(2)}</li>
    <li class="list-group-item">Subtotal: ₹${subtotal.toFixed(2)}</li>
    <li class="list-group-item">Surcharge (20%): ₹${surcharge.toFixed(2)}</li>
    <li class="list-group-item text-danger">Grand Total: ₹${total.toFixed(2)}</li>
  `;

  const d = document.createElement("div");
  d.classList.add("mt-4", "bg-light", "rounded-5");

  const heading = document.createElement("h4");
  heading.classList.add("text-dark", "fw-bolder");
  heading.innerText = "Bill Details";

  d.appendChild(heading);
  d.appendChild(list);
  document.getElementById("temp").appendChild(d);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateBill();
  }
});

function reset() {
  document.getElementById("units").value = "";
  document.getElementById("temp").innerHTML ="";
}
