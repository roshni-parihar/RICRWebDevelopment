function GrossSalary(basic) {
  const hra = basic * 0.2;
  const da = basic * 0.1;
  const gross = basic + hra + da;

  return { basic, hra, da, gross };
}

function formatINR(amount) {
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}

function GetGrossSal() {
  const basicS = document.getElementById("bsalary");
  const error = document.getElementById("errormsg");
  const result = document.getElementById("result");

  const basic = parseFloat(basicS.value);

  if ( isNaN(basic) || basic < 0) {
    error.classList.remove("d-none");
    result.classList.add("d-none");
    return;
  }

  error.classList.add("d-none");

  const { hra, da, gross } =GrossSalary(basic);

  
  result.classList.remove("d-none");
  result.innerHTML = `
    <h3 class="text-success fw-bold">Salary Calculated Successfully!</h3>
    <div class="fs-5">
      <p>Basic Salary : ${formatINR(basic)}</p>
      <p>HRA (20%) : ${formatINR(hra)}</p>
      <p>DA (10%) : ${formatINR(da)}</p>
      <hr />
      <p class="fw-bold text-warning">Gross Salary : ${formatINR(gross)}</p>
    </div>
  `;
}
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    GetGrossSal();
  }
});

function Reset() {
  document.getElementById("bsalary").value = "";
  document.getElementById("result").classList.add("d-none");
  document.getElementById("errormsg").classList.add("d-none");
}
  document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    Reset();
  }
});
