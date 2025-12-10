function Calculate() {
  const DOB = document.getElementById("dob").value;
  const CD = document.getElementById("cdate").value;
  if (DOB === "" || !CD) {
    alert("Enter Both Dates(DOB & current date)");
    return;
  }

  let birthdate = new Date(DOB);
  let currentdate = new Date(CD);

  if (currentdate < birthdate) {
    alert("enter valid date!");
    return;
  }

  let years = currentdate.getFullYear() - birthdate.getFullYear();
  let months = currentdate.getMonth() - birthdate.getMonth();
  let days = currentdate.getDate() - birthdate.getDate();


  const d = document.createElement("div");
  d.classList.add(
    "text-center",
    "mb-4",
    "bg-dark-subtle",
    "w-75",
    "text-dark",
    "rounded",
    "rounded-3",
    "fw-bold",
    "fs-4", "ms-5"
  );
  d.innerHTML =`Your age is <span class="text-primary">${years} </span> years.`;

  document.getElementById("M2").appendChild(d);
  
document.getElementById("dob").value= "";
document.getElementById("cdate").value= "";

}
