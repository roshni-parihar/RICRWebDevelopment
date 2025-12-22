function calculateBill() {
  const KM = document.getElementById("km").value;

  document.getElementById("Error").innerText = "";
  
  const km = parseFloat(KM);

  if (KM === "" || isNaN(km) || km < 0) {
    document.getElementById("Error").innerText =
      "Please enter a non-negative number of kilometers";
    return;
  }

  let dis = km;

  let slab1 = Math.min(dis, 10);
  dis = dis - slab1;

  let slab2 = Math.min(dis, 40);
  dis = dis - slab2;


  const cost1 = slab1 * 11;
  const cost2 = slab2 * 10;

  let total = cost1 + cost2;

  const list = document.createElement("ul");
  list.classList.add("list-group");

  list.innerHTML = `
  <li>${slab1.toFixed(2)} km * Rs.11 = Rs. ${cost1.toFixed(2)}</li>
  <li>${slab2.toFixed(2)} km * Rs.10 = Rs. ${cost2.toFixed(2)}</li>
`;

  const d = document.createElement("div");
  d.classList.add("mt-4");

  const heading = document.createElement("h4");
  heading.classList.add("text-dark", "fw-bolder");
  heading.innerText = "Bill Details";

  const Total = document.createElement("h4");
  Total.classList.add("text-danger", "mt-3", "text-center");
  Total.innerHTML = `Total Bill = Rs. ${total.toFixed(2)}`;

  d.appendChild(heading);
  d.appendChild(list);
  d.appendChild(Total);
  document.getElementById("output").innerHTML = "";
  document.getElementById("output").appendChild(d);
}

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    calculateBill();
  }
});
