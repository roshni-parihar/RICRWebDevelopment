function submit() {
  console.log("submit button clicked");

  const nm = document.getElementById("FullName").value;

  const em = document.getElementById("Email").value;
  const contact = document.getElementById("Mobile").value;
  const dob = document.getElementById("DOB").value;
  const qual = document.getElementById("Qualification").value;
  const score = document.getElementById("Score").value;
  //const batch= document.querySelectorAll("input[name='batch']:checked");
  //{console.log(batch);

  //for checkbox
  let selectedBatchDay = [];
  document
    .querySelectorAll("input[name='batch']:checked")
    .forEach((element) => {
      selectedBatchDay.push(element.value);
    });
    console.log(selectedBatchDay);

    //for radio
 let selectedBatchTiming =[];
 document
    .querySelector("input[name='time']:checked").value;
    console.log(selectedBatchTiming);


  
  const add = document.getElementById("Address").value;
  const city = document.getElementById("City").value;
  const pin = document.getElementById("Pincode").value;
  const Guardian_Name = document.getElementById("Gname").value;
  const Guardian_number = document.getElementById("Gphone").value;
  // const source = document.getElementById("Hear").value;
  const text = document.getElementById("Requirement").value;

  console.log("FullName:" + nm);
  console.log("Email:" + em);
  console.log("Mobile:" + contact);
  console.log("DOB:" + dob);
  console.log("Qualification:" + qual);
  console.log("Percentage/Grade:" + score);
  console.log("Address:" + add);
  console.log("City:" + city);
  console.log("PINCode:" + pin);
  console.log("Guardian Name:" + Guardian_Name);
  console.log("Guardian's Contact:" + Guardian_number);
  console.log("Requirments?:" + text);

  alert("Submit done");
  document.getElementById("FullName").value = "";

  document.getElementById("Email").value = "";
  document.getElementById("Mobile").value = "";
  document.getElementById("DOB").value = "";
  document.getElementById("Qualification").value = "";
  document.getElementById("Score").value = "";
  //
  //
  document.getElementById("Address").value = "";
  document.getElementById("City").value = "";
  document.getElementById("Pincode").value = "";
  document.getElementById("Gname").value = "";
  document.getElementById("Gphone").value = "";
  // const source = document.getElementById("Hear").value;
  document.getElementById("Requirement").value = "";
}
